exports.get = async(req,res)=>{
    const salaModel = require('../models/salaModel')
    return {"status": "OK", "controller": "sala"};
}