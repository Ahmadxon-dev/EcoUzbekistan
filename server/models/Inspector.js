const {Schema, model} = require('mongoose')
//for both inspectors and admins
const inspectorAuthSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required: true
    },
    region:{
        type:String,
        required:true
    },
    role: {
        type: String,
        enum: ["admin", "inspector"],
        default:"inspector",
        required: true

    }
},  {timestamps:true}
)

module.exports = model("Inspectors", inspectorAuthSchema)
