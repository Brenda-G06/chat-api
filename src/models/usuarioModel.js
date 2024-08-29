const db = require("./db"); 

async function registrarUsuario(nick) {
    return await db.insertOne("usuario", { "nick": nick });
}

async function sairSala(nick, idSala) {
    const dbInstance = await db.connect(); 
    return await dbInstance.collection("usuarios").updateOne(
        { nick: nick },
        { $pull: { salas: idSala } } 
    );
}

module.exports = { registrarUsuario, sairSala };