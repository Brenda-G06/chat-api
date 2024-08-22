const db = require("./db)");
async function registrarUsuario(nick){
    return await db.insertOne("usuario", {"nick": nick});
}
async function insertOne(collection, objeto){
    db = await connect();
    return dbb.collection(collection).insertOne(objeto)
}

module.exports = {registrarUsuario, insertOne}