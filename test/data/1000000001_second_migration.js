'use strict';

const tools = require('itaas-nodejs-tools');
const uuid = require('uuid').v4;
const queries = require('../test/helpers/queries');

let config = {};
let logger = tools.createLogger({logOutput: 'rotating-file', logDirectory: 'logs/migration'});
let serviceLocator = tools.createServiceLocator();
let context = tools.createCallContext(uuid(), config, logger, serviceLocator);

const migration = {
  up : function (db, handler) {
    let query = queries.secondMigrationUp;
    let params = [];

    tools.cassandra.cql.executeNonQuery(context, db, query, params)
      .then ((result)=>{
        handler(false, true);
      })
      .catch((err)=>{
        handler(err, false);
      });
  },
  down : function (db, handler) {
    let query = queries.secondMigrationDown;
    let params = [];
    
    tools.cassandra.cql.executeNonQuery(context, db, query, params)
      .then ((result)=>{
        handler(false, true);
      })
      .catch((err)=>{
        handler(err, false);
      });
  }
};

module.exports = migration;
