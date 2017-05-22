import {Express} from "express";
import {Db, MongoClient} from 'mongodb';
import * as MySql from 'mysql';
import {IError} from "mysql";

import {testLogistics} from './logisticsApiConnectors';

const googleMapsClient = require('@google/maps').createClient({
    key: process.env.GMAPS_API_KEY
});

import Users from "./users.mode";
import Stops from "./stops.model";

let usersModel = new Users();
let stopsModel = new Stops();

let dataStoreConnections = {
    mySqlDbRef: null,
    mongoDbRef: <Db>null,
    logistics: {
        testLogistics
    },
    googleMapsClient
};


function initDataStoreConnections(app: Express): Promise<any> {
    let sqlConnectionPromise = new Promise((resolve, reject) => {
        dataStoreConnections.mySqlDbRef = MySql.createConnection({
            host: process.env.SQL_HOST_URL,
            user: process.env.SQL_USER,
            database: process.env.SQL_DB_NAME,
        });

        dataStoreConnections.mySqlDbRef.connect((err: IError, ...args: any[]) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(true);
        });
    });

    let mongoConnectionPromise = new Promise((resolve, reject) => {
        MongoClient.connect(process.env.MONGO_DB_CONNECTION_URL, (err, db) => {
            if (err) {
                reject(err);
                return;
            }

            dataStoreConnections.mongoDbRef = db;
            resolve(true);
        });
    });

    return Promise.all([sqlConnectionPromise, mongoConnectionPromise]);
}

export  {
    usersModel,
    stopsModel,
    dataStoreConnections,
    initDataStoreConnections
}

