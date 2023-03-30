const { Stuff } = require("../models/Stuff.model")

const router = require("express").Router()

const handleErr = (err, res) => {
    console.log(err)
    res.status(500).json({ message: "error." })
}

router.get("/", async (req, res) => {
    try {
        const stuffList = await Stuff.find()
        res.status(200).json(stuffList)
    }
    catch (err) { handleErr(err, res) }
})

router.post("/", async (req, res) => {
    const { name, role, image } = req.body
    try {
        const newStuff = await new Stuff({ name, role, image })
        res.status(200).json(newStuff)
    }
    catch (err) { handleErr(err, res) }
})

router.delete("/:id", (req, res) => {
    const { id } = req.params
    try {
        const deletedStuff = Stuff.findByIdAndDelete(id)
        res.status(200).json(deletedStuff)
    }
    catch (err) { handleErr(err, res) }
})

router.put("/:id", (req, res) => {
    try {
        const updatedStuff = Stuff.findByIdAndDelete(id, { ...req.body })
        res.status(200).json(updatedStuff)
    }
    catch (err) { handleErr(err, res) }
})

module.exports = router