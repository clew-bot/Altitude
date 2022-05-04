const router = require('express').Router();

router.get("/", (req, res) => {
    console.log("I'm Hit!")
})

module.exports = router;