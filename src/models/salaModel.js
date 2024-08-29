const { MongoClient } = require('mongodb');

let singleton;

async function connect() {
    if (singleton) return singleton;

    const client = new MongoClient(process.env.DB_HOST, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();

    singleton = client.db(process.env.DB_DATABASE);
    return singleton;
}

let findAll = async (collection) => {
    const db = await connect();
    return await db.collection(collection).find().toArray(); 
}

let listarSalas = async () => {
    return await findAll("salas");
}

let atualizarMensagens = async (salaId, mensagens) => {
    const db = await connect();
    return await db.collection("salas").updateOne(
        { _id: salaId },
        { $set: { msgs: mensagens } } 
    );
}

let buscarMensagens = async (idsala, timestamp) => {
    const salas = await findAll("salas");
    const sala = salas.find(sala => sala._id.toString() === idsala);
    if (!sala) {
        throw new Error("Sala não encontrada");
    }

    if (sala.msgs) {
        const msgs = sala.msgs.filter(msg => msg.timestamp >= timestamp);
        return {
            timestamp: msgs.length > 0 ? msgs[msgs.length - 1].timestamp : timestamp,
            msgs: msgs
        };
    }
    return {
        timestamp: timestamp,
        msgs: []
    };
}

module.exports = { findAll, listarSalas, atualizarMensagens, buscarMensagens };
