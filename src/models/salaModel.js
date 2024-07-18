const db = require('./db.js');

async function listarSalas(){
    return await db.findAll('salas');
}

module.exports = {listarSalas};