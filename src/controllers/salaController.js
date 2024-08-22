exports.get = async function (){
    const salaModel = require('../models/salaModel');
    return await salaModel.listarSalas();
}

exports.enviarMensagem = async (nick, msg, idsala)=>{
    const sala = await salaModel.buscarSala(idsala);
    if(!sala.msgs){
        sala.msgs=[];
    }
    timestamp=Date.now()
    sala.msgs.push(
      {
        timestamp:timestamp,
        msg:msg,
        nick:nick
      }
    )
    let resp = await salaModel.atualizarMensagens(sala);
    return {"msg":"OK", "timestamp":timestamp};
  }

  exports.buscarMensagens = async (idsala, timestamp)=>{
    let mensagens=await salaModel.buscarMensagens(idsala, timestamp);
    return {
      "timestamp":mensagens[mensagens.length - 1].timestamp,
      "msgs":mensagens
    };
  }  
  