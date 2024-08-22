const express = require('express');
const app = express();
app.use(express.urlencoded({extended : true}));
app.use(express.json());
const router = express.Router();

app.use('/', router.get('/', (req, res) =>{
    res .status(200).send("<h1>API - CHAT</h1>")
}));

app.use('/', router.get('/sobre', (req, res) => {
    res.status(200).send({
    "nome": "API-CHAT",
    "versão": "1.0.0",
    "autor": "Brenda"
    })
}));

app.use('/', router.get('/salas', async (req, res)=>{
    const salaController = require('./controllers/salaController');
    const resp = await salaController.get();
    res.status(200).send(resp);
}));

app.use("/salas",router.get("/salas", async(req, res, next)=>{
    if(await 
        TokenExpiredError.checkToken(req.headres.token,req.headers.iduser,req.headers.nick)

    ){
        let resp = await salaController.get();
        res.status(200).sen(resp);

    }else{
        res.status(400).send({msg:"User não encontrado"});

    }
})),

app.use("/sala/entrar", router.put("/sala/entrar",async(req, res )=>{
    if(!token.checkToken(req.headers.token,req.headers.iduser,req.headers.nick))
return false;
    let resp = await salaController.enviarMensagem(req.headers.nick,
        req.body.msg,req.body.idSala);
        res.status(200).send(resp);
    
})),


app.use("/sala/mensagens/", router.get("/sala/mensagens", async (req, res) => {
    if(!token.checkToken(req.headers.token,req.headers.iduser,req.headers.nick)) return false;
    let resp= await salaController.buscarMensagens(req.query.idSala, req.query.timestamp);
    res.status(200).send(resp);
  }))
  

module.exports=app;