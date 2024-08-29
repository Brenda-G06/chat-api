const { MongoClient } = require("mongodb");
require('dotenv').config();

let singleton;

async function connect() {
    if (singleton) return singleton;

    try {
        const client = new MongoClient(process.env.DB_HOST, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        await client.connect();
        singleton = client.db(process.env.DB_DATABASE);
        console.log("Conectado ao MongoDB");
    } catch (error) {
        console.error("Erro ao conectar ao MongoDB:", error);
        throw error; 
    }

    return singleton;
}

const findAll = async (collection) => {
    try {
        const db = await connect();
        return await db.collection(collection).find().toArray();
    } catch (error) {
        console.error("Erro ao encontrar documentos:", error);
        throw error;
    }
};

const insertOne = async (collection, objeto) => {
    try {
        const db = await connect();
        return await db.collection(collection).insertOne(objeto);
    } catch (error) {
        console.error("Erro ao inserir documento:", error);
        throw error;
    }
};

module.exports = { findAll, insertOne };
