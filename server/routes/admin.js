const {Router} = require('express')
const router = Router()
const Inspector = require("../models/Inspector")

router.get("/inspectorslist",  async (req,res)=>{
    const data = await Inspector.find()
    const filteredData = data.filter(inspector => inspector.role==="inspector")
    return res.status(200).json(filteredData)

})
router.post("/inspectorslist/delete/:id", async (req,res)=>{
    const {id} = req.params
    try {
        const deletedItem = await Inspector.findByIdAndDelete(id);
        if (!deletedItem) {
            return res.json({error: "Bunday id lik inspektor yo'q"})
        } else {
            const newData = await Inspector.find()
            const filteredNewData = newData.filter(inspector => inspector.role==="inspector")
            return res.json({msg: "Inspektor muvaffaqiyatli o'chirildi", filteredNewData})
        }
    } catch (error) {
        return res.json({error})
    }
})

router.post("/inspectorslist/edit/:id", async (req,res)=>{
    const {id} = req.params
    try{
        const updateInspector = await Inspector.findByIdAndUpdate(id, req.body, {new:true})
        if (!updateInspector){
            return res.json({error:"Inspektor topilmadi"})
        }else{
            const newData = await Inspector.find()
            const filteredNewData = newData.filter(inspector => inspector.role==="inspector")
            return res.json({msg:"Inspektor muvaffaqiyatli yangilandi", filteredNewData})
        }
    }catch (e){
        return res.json({error: e})
    }
})

module.exports = router