const   mongoose = require('mongoose'),
        Institutes = require('./institutesData'),
        parser = require('json-parser'),
        http = require('http');
        options = {
            server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
            replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
        };

module.exports={

    getAllInstitutes(){
        return Institutes.find();
    }

};