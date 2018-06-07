'use strict';

const mongoClient = require('mongodb').MongoClient;

// TODO: all that const should reside in config
const DB_URL = 'mongodb://mongodb';
const DATABASE_NAME = 'mood';
const COLLECTION_NAME = 'mood';
const INITIAL_MOOD = {mood : 'sad'};

let getCollectionConnection = (name, cb) => {
    mongoClient.connect(DB_URL, function(err, client) {
        let db = client.db(DATABASE_NAME);
        cb(db.collection(COLLECTION_NAME), client);
    });
}

let insertFirstDoc = cb => {
    getCollectionConnection(COLLECTION_NAME, (collection, client) => {
        collection.insert([
            INITIAL_MOOD
        ], function (err, result) {
            cb(result);
        });
        client.close();
    });
}

module.exports = {
    getMood: (cb) => {
        getCollectionConnection(COLLECTION_NAME, (collection, client) => {
            collection.find({}).toArray(function (err, docs) {
                if (docs.length === 0) {
                    insertFirstDoc(() => cb(INITIAL_MOOD));
                    return;
                }
                cb(docs[0]);
            })
            client.close();
        });
    }
}

