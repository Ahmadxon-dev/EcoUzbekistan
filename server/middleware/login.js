const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const Inspector = require('../models/Inspector')

// module.exports = (req,res,next) =>{
//     const {authorization} = req.headers
//     if (!authorization){
//         return res.status(400).json({error: ""})
//     }
// }