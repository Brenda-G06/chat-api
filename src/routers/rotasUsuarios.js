append.use("/entrar",router.post("/entrar", async(req,res, next)=>{
    const usuarioController = require("./controllers/usuarioController");
    let resp = await usuarioController.entrar(req.body.nick);
    res.status(200).send(resp);
}))

append.use("/sair",router.post("/sair", async(req,res, next)=>{
    const usuarioController = require("./controllers/usuarioController");
    let resp = await usuarioController.sairSala(req.body.nick);
    res.status(200).send(resp);
}))