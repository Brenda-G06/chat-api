const express = require('express');
const app = express();
const router = express.Router();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const salaController = require('./controllers/salaController');
const usuarioController = require('./controllers/usuarioController');
const token = require('./util/token');


router.get('/', (req, res) => {
    res.status(200).send("<h1>API - CHAT</h1>");
});


router.get('/sobre', (req, res) => {
    res.status(200).send({
        "nome": "API-CHAT",
        "versão": "1.0.0",
        "autor": "Brenda"
    });
});


router.post('/usuarios/entrar', async (req, res) => {
    try {
        const { nick } = req.body;
        let resp = await usuarioController.entrar(nick);
        res.status(201).send(resp);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});


router.get('/salas', async (req, res) => {
    try {
        const authToken = req.headers.authorization?.split(' ')[1];
        if (authToken && await token.checkToken(authToken, req.headers.iduser, req.headers.nick)) {
            const salas = await salaController.listarSalas();
            res.status(200).send(salas);
        } else {
            res.status(401).send({ msg: "Token inválido ou não fornecido" });
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});


router.post('/sala/entrar', async (req, res) => {
    try {
        const tokenValid = await token.checkToken(req.headers.token, req.headers.iduser, req.headers.nick);
        if (!tokenValid) {
            return res.status(401).send({ msg: "Token inválido" });
        }
        const { idSala, msg } = req.body;
        let resp = await salaController.entrarSala(req.headers.nick, idSala, msg);
        res.status(200).send(resp);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});


router.delete('/sala/sair', async (req, res) => {
    try {
        const { nick, idSala } = req.body;
        if (!await token.checkToken(req.headers.token, req.headers.iduser, req.headers.nick)) {
            return res.status(401).send({ msg: "Token inválido" });
        }
        const result = await salaController.sairSala(nick, idSala);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});


router.get('/sala/mensagens', async (req, res) => {
    try {
        const authToken = req.headers.authorization?.split(' ')[1];
        if (!authToken || !await token.checkToken(authToken, req.headers.iduser, req.headers.nick)) {
            return res.status(401).send({ msg: "Token inválido ou não fornecido" });
        }
        const { idSala, timestamp } = req.query;
        let resp = await salaController.buscarMensagens(idSala, parseInt(timestamp));
        res.status(200).send(resp);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

router.delete('/usuarios/sair', async (req, res) => {
    try {
        const { nick, idSala } = req.body;
        if (!await token.checkToken(req.headers.token, req.headers.iduser, req.headers.nick)) {
            return res.status(401).send({ msg: "Token inválido" });
        }
        const result = await usuarioController.sairSala(nick, idSala);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.use('/', router);

module.exports = app;
