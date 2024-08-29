const token = require('../util/token');
const usuarioModel = require('../models/usuarioModel');
const salaModel = require('../models/salaModel');

exports.entrar = async (nick) => {
    let resp = await usuarioModel.registrarUsuario(nick);
    if (resp.insertedId) {
        return {
            "idUser": resp.insertedId,
            "token": await token.setToken(String(resp.insertedId), nick),
            "nick": nick
        };
    }
    throw new Error("Falha ao registrar o usuário");
};

exports.sairSala = async (nick, idSala) => {
    try {
        // Remover o usuário da sala especificada
        const result = await usuarioModel.sairSala(nick, idSala);
        if (result.modifiedCount > 0) {
            // Atualizar a sala para remover mensagens do usuário
            const sala = await salaModel.findAll("salas");
            const salaAtual = sala.find(s => s._id.toString() === idSala);

            if (salaAtual && salaAtual.msgs) {
                salaAtual.msgs = salaAtual.msgs.filter(msg => msg.nick !== nick);
                await salaModel.atualizarMensagens(salaAtual._id.toString(), salaAtual.msgs);
            }

            return { msg: "Usuário saiu da sala com sucesso" };
        } else {
            throw new Error("Usuário ou sala não encontrados");
        }
    } catch (error) {
        throw new Error(`Erro ao sair da sala: ${error.message}`);
    }
};
