import { couchbaseConnect, getbucket, getCollection } from "./cbmanager.js";

export async function getBookbyID(key) {
    try{
        const cluster = await couchbaseConnect();
        const bucket = await getbucket(cluster);
        const scope = await bucket.scope("_default");
        const collection = await getCollection(scope);
        const result = await collection.get(key)
        console.log(result)
        return result
    } catch(error){
        console.error(error)
    }
}

export async function createBook( book) {
    const key = Math.floor(Math.random()*9000)
    try{
        const cluster = await couchbaseConnect();
        const bucket = await getbucket(cluster);
        const scope = bucket.scope("_default");
        const collection = await getCollection(scope);
         await collection.insert(key, book)
        return key
    } catch(error){
        console.error(error)
    }
}

export async function updateBookbyID(key, book) {
    try{
        const cluster = await couchbaseConnect();
        const bucket = await getbucket(cluster);
        const scope = await bucket.scope("_default");
        const collection = await getCollection(scope);
        const result = await collection.replace(key, book)
        console.log(result)
        return result
    } catch(error){
        console.error(error)
    }
}

export async function deleteBookbyID(key) {
    try{
        const cluster = await couchbaseConnect();
        const bucket = await getbucket(cluster);
        const scope = await bucket.scope("_default");
        const collection = await getCollection(scope);
        const result = await collection.remove(key)
        console.log(result)
        return result
    } catch(error){
        console.error(error)
    }
}

export async function getBooks() {
    try{
        const cluster = await couchbaseConnect();
         const bucket = await getbucket(cluster);
        const scope = bucket.scope("_default");
        const query = `SELECT * FROM Books`
        const result = await scope.query(query)
        result.rows.forEach((row) => {
            console.log('Query Row: ', row)
        })
        return result.rows
    } catch(error){
        console.error(error)
    }
}

export async function searchBooksByQuery(search) {
    try{
        const cluster = await couchbaseConnect();
         const bucket = await getbucket(cluster);
        const scope = bucket.scope("_default");
        const query = `SELECT * FROM Books WHERE title LIKE $1 OR author LIKE $1`
        const options = {parameters:[`%${search}%`]}
        console.log(options)
        const result = await scope.query(query, options)
        console.log(result)
        result.rows.forEach((row) => {
            console.log('Query Row: ', row)
        })
        return result.rows
    } catch(error){
        console.error(error)
    }
}