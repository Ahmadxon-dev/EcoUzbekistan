const express = require('express')
const mongoose = require('mongoose')
require("dotenv").config()
const cors = require('cors')
const path = require('path')
const PORT = process.env.PORT || 5000
const Post = require("./models/Post")
const Inspector = require('./models/Inspector')
const app = express()
const deadlineLogic = require("./utils/cronJobs")

app.use(cors({
    origin:"*",
    credentials:true,
    optionsSuccessStatus: 200,
}))
app.use(express.json())

app.use("",require("./routes/post"))
app.use("/inspector", require('./routes/authinspector'))
app.use("/admin", require("./routes/admin"))

deadlineLogic()
mongoose.connect(process.env.MONGO_URI).then(()=>console.log("db connected successfully")).catch(err=> console.log(err))
app.get('/', (req,res)=>{
    res.send('Server working')
})



app.listen(PORT, (req,res)=>{
    console.log("server has been started on port " +PORT)
    console.log(`http://localhost:${PORT}`)
})
