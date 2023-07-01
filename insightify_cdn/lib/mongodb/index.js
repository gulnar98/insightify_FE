const { MongoClient } = require('mongodb');
const path = require('path');

require('dotenv').config({
    path: path.join(__dirname, '../../', process.env.NODE_ENV === 'production' ? '.env' : '.env.development')
});

const {
  MONGODB_USERNAME,
  MONGODB_PASSWORD,
  MONGODB_HOSTNAME,
  MONGODB_PORT,
  MONGODB_DATABASE,
} = process.env;
 
const mongoDbUri = `mongodb://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_HOSTNAME}:27017/?maxPoolSize=20&w=majority&auth=admin`;

// mongodb://hllgszowclnrba:f26b8ab553cfd4767216dbc7be7702fcad1b0115a6347e871faab86174d7ed4e@172.31.22.92:27017/?maxPoolSize=20&w=majority&auth=admin
const mongoClient = new MongoClient(mongoDbUri);

mongoClient.connect()
.then(() => console.log("mongo client was connected successfully"))
.catch(error => console.error("Mongo connection error:", error));

module.exports = function getDatabase() {
  return mongoClient.db(MONGODB_DATABASE);
}