const router = require('express').Router();
const db = require("../../models");

router.get("/", (req, res) => {
    res.json({Hello:"World"});
})

router.post("/signup", async (req, res) => {
    console.log(req.body)
    console.log("I'm Hit!")
    const findUser = await db.User.findOne({email: req.body.email});
    if(findUser) {
        res.json({message: "User already exists"});
    } else {
    const user = await db.User.create({email: req.body.email, password: req.body.password});
    res.json({message:"User has been created" + user});
    }

})

module.exports = router;