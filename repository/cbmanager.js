import couchbase from "couchbase";
import 'dotenv/config';



export async function couchbaseConnect() {
    return couchbase.connect(process.env.CBDOMAIN, {
      username: process.env.CBUSERNAME,
      password: process.env.CBPASSWORD
    });
}

export async function getbucket(cluster) {
    return cluster.bucket("Library");
}

export async function getCollection(scope) {
    return scope.collection("Books");
}