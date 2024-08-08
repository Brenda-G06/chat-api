const db = require("./db)");
async function registrarUsuario(nick){
    return await db.insertOne("usuario", {"nick": nick});
}

module.exports = {registrarUsuario}