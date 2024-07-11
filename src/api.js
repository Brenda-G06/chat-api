const express = require('express');
const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());

const router = express.Router();

app.use('/', router.get('/', (req, res) =>{
    res.status(200).send("<h1> API-CHAT</h1>")
}));



app.use('/', router.get("/sobre", (req, res, next)=>{
    res.status(200).send({
        "nome": "api - chat",
        "versao": "0.1.0",
        "autor": "brenda Gomes"
    })
}))


app.use("/salas", router.get("/salas", (req, res, next)=>{
    const salaController = require("./controllers/salaController");
    let resp= await salaController.get();
    res.status(200).send(resp);
}))
module.exports = app;