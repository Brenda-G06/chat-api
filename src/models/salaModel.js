const {MongoClient} = require("mongodb");

let singleton;

async function connect(){
    if (singleton) return singleton;

    const client = new MongoClient(process.env.DB_HOST); 
    await client.connect();

    singleton = client.db(process.env.DB_DATABASE);
    return singleton;
}

let findAll = async (collection)=>{
const db = await connect();
return await db.collection(collection).find().toArray();
}

let listarSalas = async()=>{
    let salas = await db.findAll("salas");
    return salas;
}

let atualizarMensagens=async (sala)=>{
    return await db.updateOne("salas", sala,{_id:sala._id});
  }
  
  

let buscarMensagens = async (idsala, timestamp)=>{
    let sala = await buscarSala(idsala);
    if(sala.msgs){
      let msgs=[];
      sala.msgs.forEach((msg)=>{
        if(msg.timestamp >= timestamp){
          msgs.push(msg);
        }
      });
      return msgs;
    }
    return [];
}

module.exports = {findAll, listarSalas, atualizarMensagens, buscarMensagens}