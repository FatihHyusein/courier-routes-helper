import {Express} from "express";
import {Db, MongoClient} from 'mongodb';
import {testLogistics} from './logisticsApiConnectors';

const googleMapsClient = require('@google/maps').createClient({
    key: process.env.GMAPS_API_KEY
});

import Users from "./users.mode";
import Stops from "./stops.model";

let usersModel = new Users();
let stopsModel = new Stops();

let dataStoreConnections = {
    sql: '',
    mongoDbRef: <Db>null,
    logistics: {
        testLogistics
    },
    googleMapsClient
};


function initDataStoreConnections(app: Express): Promise<boolean> {
    const url = process.env.MONGO_DB_CONNECTION_URL;

    return new Promise((resolve, reject) => {
        MongoClient.connect(url, function (err, db) {
            if (err) {
                reject(err);
                return;
            }

            dataStoreConnections.mongoDbRef = db;
            resolve(true);
        });
    });
}

export  {
    usersModel,
    stopsModel,
    dataStoreConnections,
    initDataStoreConnections
}

