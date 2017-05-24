'use strict';

const tools = require('itaas-nodejs-tools');
const cassandra = tools.cassandra;
const context = require('./context-factory')();
const queries = require('./queries');

function getTestDriverOptions() {
  let driverOptions = {
    contactPoints: (process.env.DBHOST || 'localhost').split(','),
    keyspace: 'testing_cassandra_migrate'
  };

  return driverOptions;
}

function createClient (clientOptions){
  let client = new cassandra.client(clientOptions);
  return client;
}

function setupDatabase()
{
  let clientOptions = {
    contactPoints: (process.env.DBHOST || 'localhost').split(',')
  };
  
  let client = createClient(clientOptions);

  return tools.cassandra.cql.executeNonQuery(context, client, queries.dropKeySpace)
    .then(()=>{
      return tools.cassandra.cql.executeNonQuery(context, client, queries.createKeySpace);
    });
}

module.exports = {
  getTestDriverOptions: getTestDriverOptions,
  createClient: createClient,
  setupDatabase: setupDatabase
};
