
const db = require("./db");


async function listarSalas(){
    return await db.findAll('salas')

}
// let listarSalas = async ()=>{
//     let salas = await db.findAll("salas");
//     return salas;
// };
module.exports = {listarSalas}
