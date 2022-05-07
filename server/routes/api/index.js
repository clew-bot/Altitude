const router = require('express').Router();
const db = require("../../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// const authenticateJWT = (req, res, next) => {
//     const authHeader = req.headers.authorization;

//     if (authHeader) {
//         const token = authHeader.split(' ')[1];

//         jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//             if (err) {
//                 return res.sendStatus(403);
//             }
//             req.user = user;
//             console.log("SUccessfully authenticated user");
//             console.log(req.user)
//             next();
//         });
//     } else {
//         res.sendStatus(401);
//     }
// }

const authorization = (req, res, next) => {
    const token = req.cookies.accessToken;
    console.log(token)
    if (token === undefined) {
        console.log("No Token")
      return res.sendStatus(403);
    }
    try {
        console.log("Yes Token")
      const data = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.user = data;
      return next();
    } catch {
      return res.sendStatus(403);
    }
  };

router.get("/", (req, res) => {
    res.json({Hello:"World"});
})

router.get("/auth", authorization, (req, res) => {
    res.json({Hello:"World", auth: true});
});

router.get("/auth/check", authorization, (req, res) => {
    res.json({"Checking":"World", auth: true});

})

router.post("/signup", async (req, res) => {
    console.log(req.body)
    console.log("I'm Hit!")
    const findUser = await db.User.findOne({email: req.body.email});
    if(findUser) {
        res.json({message: "User already exists"});
    } else {
    // const user = await db.User.create({email: req.body.email, password: req.body.password, username: req.body.username});
    const accessToken = jwt.sign({ user: { email: req.body.email, password: req.body.password} }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '20m' });
    // const refreshToken = jwt.sign({ user }, process.env.REFRESH_TOKEN_SECRET);
    res.cookie("accessToken", accessToken, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7 }).json({message:"User has been created", token: accessToken, loggedIn: true});
    }
})

router.get("/logout", (req, res) => {
    res.clearCookie("accessToken").json({message:"User has been logged out"});
})

router.post("/login", async (req, res) => {
    const findUser = await db.User.findOne({email: req.body.email});
    console.log("FINDUSER =", findUser.username)
    if(findUser) {
        const passwordMatch = await bcrypt.compare(req.body.password, findUser.password);
        if(passwordMatch) {
            const accessToken = jwt.sign({ user: { email: req.body.email, password: req.body.password} }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '20m' });
            // const refreshToken = jwt.sign({ findUser }, process.env.REFRESH_TOKEN_SECRET);
            res.cookie("accessToken", accessToken, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7 }).json({message:"User has been logged in", loggedIn: true, username: findUser.username});
        } else {
            res.json({message:"Password is incorrect", loggedIn: false});
        }
    } else {
        res.json({message:"User does not exist", loggedIn: false});
    }
})

module.exports = router;