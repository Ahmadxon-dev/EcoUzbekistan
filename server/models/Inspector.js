const {Schema, model} = require('mongoose')

const inspectorAuthSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required: true
    },
    region:{
        type:String,
        required:true
    }
})

module.exports = model("Inspectors", inspectorAuthSchema)
