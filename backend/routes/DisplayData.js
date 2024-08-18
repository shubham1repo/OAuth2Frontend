const express = require('express')
const router = express.Router()

router.post("/foodData", (req, res) => {
    try {
        res.send([global.foodcategory,global.food_items])
       
    } catch (error) {
        console.error(error)
        res.send("Server errorr")
    }
})

module.exports = router;