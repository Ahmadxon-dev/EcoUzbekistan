const {Router} = require('express')
const router = Router()
const Inspector = require("../models/Inspector")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const login = require("../middleware/login")
// /inspector/....
router.post("/signup", (req, res) => {
    const {email, password, region, role} = req.body
    if (!email || !password || !region) {
        return res.status(400).json({error: "Hamma maydonlarni to'ldiring"})
    }
    Inspector.findOne({email: email})
        .then(savedUser => {
            if (savedUser) {
                return res.status(400).json({error: "Foydalanuvchi avval qo'shilgan"})
            }
            bcrypt.hash(password, 10)
                .then(hashedPass => {
                    const inspector = new Inspector({
                        email,
                        password: hashedPass,
                        region,
                        role,
                    })
                    return inspector.save()

                })
                .then(() => res.json({msg: "Inspektor muvaffaqiyatli qo'shildi"}))
                .catch(error => {
                    console.log(error)
                    return res.status(500).json({msg: "Internal Server Error"})
                })

        })
        .catch(error =>{
            console.log(error)
            return res.status(500).json({msg: "Internal Server Error"})
        })
})

router.post("/signin", (req,res)=>{
    const {email, password} = req.body
    if (!email || !password){
        return res.status(400).json({error: "Hamma maydonlarni to'ldiring"})
    }
    Inspector.findOne({email:email})
        .then(savedUser=>{
            if (!savedUser){
                return res.status(400).json({error:"Bunday foydalanuvchi topilmadi"})
            }
            bcrypt.compare(password, savedUser.password)
                .then(doMatch=>{
                    if (doMatch){
                        const token = jwt.sign({_id: savedUser._id}, process.env.JWT_SECRET)
                        const {email, region, role, notifications} = savedUser
                        return res.json({
                            msg:"Muvaffaqiyatli kirildi",
                            token: token,
                            userInspector: {email, region, role, notifications}
                        })
                    }else{
                        return res.status(400).json({error: "Parolingiz xato"})
                    }
                })
                .catch(error=>{
                    console.log(error)
                    return res.status(500).json({error:"Internal Server Error"})
                })
        })
        .catch(error=>{
            console.log(error)
            return res.status(500).json({error: "Internal Server Error"})
        })
})

router.post("/getuser", async (req,res)=>{
    const {token} = req.body
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    await  Inspector.findOne({_id: decoded._id})
        .then(user=>{
            const {email, region, role, notifications} = user
            res.status(200).json({email, region, role, notifications})
        })


})

router.get("/notified-statistics/:region", async (req,res)=>{
    const {region} = req.params
    await Inspector.findOne({region}).populate("notifications.postData")
        .then(data=>{
            res.status(200).json({data})
        })
})
module.exports = router