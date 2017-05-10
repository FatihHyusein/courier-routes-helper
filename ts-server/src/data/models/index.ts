import { Express } from "express";
import { Db, MongoClient } from 'mongodb';

import Users from "./users.mode";
import Stops from "./stops.model";

let usersModel = new Users();
let stopsModel = new Stops();

let dataStoreConnections = {
    sql: '',
    mongoDbRef: <Db>null,
    gmaps: {
        apikey:'AIzaSyCBm1oErlZqO9UJFqedvw5jr1nQpiKJdV4',
        geocodeBaseUrl: 'https://maps.googleapis.com/maps/api/geocode/json'
    },
    logistics: ''
};


function initDataStoreConnections(app: Express): Promise<boolean> {
    const url = `mongodb://<dbuser>:<dbpass>@ds111791.mlab.com:11791/courier-router-helper-nosql`;

    return new Promise((resolve, reject) => {
        MongoClient.connect(url, function (err, db) {
            if (err) {
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

