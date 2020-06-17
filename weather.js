const MongoClient = require('mongodb').MongoClient;
let config = require('./config');



insertWeatherData = async function (data) {
    const client = await MongoClient
        .connect(config.mongodbURL, { useNewUrlParser: true, useUnifiedTopology: true })
        .catch(err => { throw err });

    try {
        const db = client.db(config.database);
        let collection = db.collection('weather');
        await collection.insertOne(data);
    } catch (err) {
        throw err;
    } finally {
        client.close();
    }
}

getBackupWeatherData = async function () {
    const client = await MongoClient
        .connect(config.mongodbURL, { useNewUrlParser: true, useUnifiedTopology: true })
        .catch(err => { throw err });

    try {
        const db = client.db(config.database);
        let collection = db.collection('weather');
        let result = await collection.find({}, { sort: { _id: -1 }, limit: 1 }).toArray();
        return result;
    } catch (err) {
        throw err;
    } finally {
        client.close();
    }
}

module.exports.getBackupWeatherData = getBackupWeatherData;
module.exports.insertWeatherData = insertWeatherData;