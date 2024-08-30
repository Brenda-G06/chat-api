const usuarioController = require('./usuarioController');
const salaModel = require('../models/salaModel');

exports.get = async function() {
    return await salaModel.findAll("salas");
}

exports.entrarSala = async (nick, idSala, msg, token) => {
   
    const user = await usuarioController.entrar(nick); 
    if (!user) {
        throw new Error("Falha ao registrar o usuário");
    }

    const salas = await salaModel.findAll("salas");
    const sala = salas.find(sala => sala._id.toString() === idSala);
    if (!sala) {
        throw new Error("Sala não encontrada");
    }

    if (msg) {
        if (!sala.msgs) {
            sala.msgs = [];
        }
        const timestamp = Date.now();
        sala.msgs.push({
            timestamp: timestamp,
            msg: msg,
            nick: nick
        });
        await salaModel.atualizarMensagens(sala._id, sala.msgs); 
        return { msg: "Mensagem enviada", timestamp: timestamp };
    }

    return { msg: "Usuário entrou na sala", sala: sala.nome };
}

exports.enviarMensagem = async (nick, msg, idsala) => {
    const salas = await salaModel.findAll("salas");
    const sala = salas.find(sala => sala._id.toString() === idsala);
    if (!sala) {
        throw new Error("Sala não encontrada");
    }

    if (!sala.msgs) {
        sala.msgs = [];
    }
    const timestamp = Date.now();
    sala.msgs.push({
        timestamp: timestamp,
        msg: msg,
        nick: nick
    });
    await salaModel.atualizarMensagens(sala._id, sala.msgs); 
    return { msg: "Mensagem enviada", timestamp: timestamp };
}

exports.buscarMensagens = async (idsala, timestamp) => {
    return await salaModel.buscarMensagens(idsala, timestamp);
}

exports.sairSala = async (nick, idSala) => {
    const salas = await salaModel.findAll("salas");
    const sala = salas.find(sala => sala._id.toString() === idSala);
    if (!sala) {
        throw new Error("Sala não encontrada");
    }

    if (sala.msgs) {
        sala.msgs = sala.msgs.filter(msg => msg.nick !== nick);
        await salaModel.atualizarMensagens(sala._id, sala.msgs); 
    }

    return { msg: "Usuário saiu da sala", sala: sala.nome };
}
