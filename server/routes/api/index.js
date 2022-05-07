const router = require("express").Router();
const db = require("../../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

require("isomorphic-fetch");
const authorization = (req, res, next) => {
  const token = req.cookies.accessToken;
  console.log(token);
  if (token === undefined) {
    console.log("No Token");
    return res.sendStatus(403);
  }
  try {
    console.log("Yes Token");
    const data = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = data;
    return next();
  } catch {
    console.log("Token Expired.");
    return res.sendStatus(403);
  }
};

router.get("/", (req, res) => {
  res.json({ Hello: "World" });
});

router.get("/auth", authorization, (req, res) => {
  res.json({ Hello: "World", auth: true });
});

router.get("/auth/check", authorization, (req, res) => {
  res.json({ Checking: "World", auth: true });
});

router.post("/signup", async (req, res) => {
  console.log(req.body);
  console.log("I'm Hit!");
  const findUser = await db.User.findOne({ email: req.body.email });
  if (findUser) {
    res.json({ message: "User already exists" });
  } else {
    const user = await db.User.create({
      email: req.body.email,
      password: req.body.password,
      username: req.body.username,
    });
    const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "20m",
    });
    // const refreshToken = jwt.sign({ user }, process.env.REFRESH_TOKEN_SECRET);
    res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
      })
      .json({
        message: "User has been created",
        token: accessToken,
        loggedIn: true,
      });
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("accessToken").json({ message: "User has been logged out" });
});

router.post("/login", async (req, res) => {
  const findUser = await db.User.findOne({ email: req.body.email });
  console.log("FINDUSER =", findUser);
  if (findUser) {
    const passwordMatch = await bcrypt.compare(
      req.body.password,
      findUser.password
    );
    if (passwordMatch) {
      const accessToken = jwt.sign(
        { user: { email: req.body.email, password: req.body.password } },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "20m" }
      );
      // const refreshToken = jwt.sign({ findUser }, process.env.REFRESH_TOKEN_SECRET);
      res
        .cookie("accessToken", accessToken, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 7,
        })
        .json({
          message: "User has been logged in",
          loggedIn: true,
          username: findUser.username,
        });
    } else {
      res.json({ message: "Password is incorrect", loggedIn: false });
    }
  } else {
    res.json({ message: "User does not exist", loggedIn: false });
  }
});

router.get("/n/programming", authorization, async (req, res) => {
  const fetchProgrammingNews = await fetch(
    "https://www.reddit.com/r/ProgrammerHumor.json"
  );
  const programmingNews = await fetchProgrammingNews.json();
  let data = programmingNews.data.children;

  res.json(data);
});

router.post("/forgotPassword", async (req, res) => {
  const findUser = await db.User.findOne({ email: req.body.email });
  if (findUser) {
    console.log("Found");
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
      },
    });

    let mailOptions = {
      from: "lewchad11@gmail.com",
      to: findUser.email,
      subject: "Password Retrieval",
      text: `Hello ${findUser.username},\n\nYou are receiving this because you (or someone else) have requested the reset of the password for your account.\n\nPlease click on the following link, or paste this into your browser to complete the process:\n\nhttp://localhost:3000/reset/${findUser.username}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n\nThank you,\n\nThe VuetifyRouter Team`,
    };

    transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        console.log("Error " + err);
      } else {
        res.json({ message: "Email has been sent" });
      }
    });
  } else {
      res.json({ message: "User does not exist" });
  }
});

module.exports = router;
