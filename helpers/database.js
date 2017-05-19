'use strict';

const cassandra = require('itaas-nodejs-tools').cassandra;

class Database {
  constructor() {
    this.clientOptions = {
      contactPoints: (process.env.DBHOST || 'localhost').split(','),
      keyspace: process.env.DBKEYSPACE
    };
    
    let username = process.env.DBUSER;
    let password = process.env.DBPASSWORD;

    if (username && password) {
      this.clientOptions.cassandraUser = username;
      this.clientOptions.cassandraPassword = password;
    }

    let client = new cassandra.client(this.clientOptions);

    return client;
  }
}

module.exports = Database;
