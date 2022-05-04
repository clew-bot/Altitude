const router = require('express').Router();

router.get("/", (req, res) => {
    res.json({Hello:"World"});
})

router.post("/signup", (req, res) => {
    console.log(req.body)
    console.log("I'm Hit!")
    res.json({message:"User has been created"});
})

module.exports = router;