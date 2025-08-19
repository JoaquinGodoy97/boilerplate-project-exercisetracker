let mongoose = require('mongoose');

require('dotenv').config()

const APP_NAME = process.env.APP_NAME;
const DATABASE_NAME = process.env.DATABASE_NAME;
const DATABASE_USER = process.env.DATABASE_USER; 
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD; 

class Database {
    constructor() {
        this._connect();
    }

    _connect() {
        mongoose
            .connect(`mongodb+srv://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_NAME}.vdtpeor.mongodb.net/?retryWrites=true&w=majority&appName=${APP_NAME}`)
            .then(() => {
                console.log('Database connection successful');
            })
            .catch((err) => {
                console.error('Database connection error');
            });
    }
}

module.exports = new Database();