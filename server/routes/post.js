const {Router} = require("express")
const router = Router()
const mongoose = require('mongoose')
const Post = require("../models/Post")
const cron = require('node-cron');

router.post("/add", (req, res) => {
    const {region, fish, additionalData, contact, crimeType, image} = req.body
    if (!region || !fish || !additionalData || !contact || !crimeType || !image) {
        return res.status(422).json({error: "Hamma bo'shliqlarni to'ldiring"})
    }
    const post = new Post({
        region,
        fish,
        contact,
        crimeType,
        image,
        additionalData,

    })

    post.save()
        .then(result => res.json({post: result}))
        .catch(err => res.status(500).json({error: "Failed to save post", details: err}))

})

router.get("/getstatistics", (req, res) => {
    Post.find()
        .then(posts => res.json({posts}))
})

router.get("/getstatistics/:id", (req, res) => {
    const {id} = req.params
    Post.findById(id)
        .then(post => {
            res.json({post: post})
        })
})

router.post("/updatestatistics/:id", async (req, res) => {
    const {id} = req.params
    const {proofImage} = req.body
    const updatedPost =await Post.findByIdAndUpdate(id,
        {$set: {proofImage: proofImage, isDone:true}},
        {new: true}
    )
    if (!updatedPost) {
        return res.status(400).json({ error: "Rasm qo'shilmadi" });
    }
    return res.status(200).json({msg:"Rasm qo'shildi", post:updatedPost});
})

module.exports = router