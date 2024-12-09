const {Schema, model } = require('mongoose')

const postSchema = new Schema({
    region: {
        type: String,
        required: true
    },
    fish: {
        type:String,
        required: true
    },
    contact:{
        type:String,
        required: true
    },
    crimeType:{
        type:String,
        required: true
    },
    image:{
        type:String,
        required: true
    },
    additionalData: {
        type:String,
        required:true
    },
    isDone:{
        type:Boolean,
        default: false
    },
    isApproved:{
        type:Boolean,
        default: false
    },
    proofImage:{
        type:String,
        default:""
    },
    areTenDaysPassed: {
        type: Boolean,
        default: false
    },
    isnotified:{
        type:Boolean,
        default: false
    }
},
    {timestamps:true}
)

module.exports = model("Post", postSchema)