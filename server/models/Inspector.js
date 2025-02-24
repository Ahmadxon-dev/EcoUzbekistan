const {Schema, model} = require('mongoose')
const mongoose = require("mongoose");
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

    },
    notifications: [
        {
            message: {type:String},
            time : { type : Date, default: Date.now },
            postData:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Post"
            }
        }
    ]
},  {timestamps:true}
)

module.exports = model("Inspectors", inspectorAuthSchema)
