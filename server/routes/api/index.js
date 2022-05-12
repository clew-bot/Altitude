const router = require("express").Router();
const db = require("../../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const multer = require("multer");
const { uploadFile, getFileStream } = require("../../s3");
const fs = require("fs");
const util = require("util"); 
const unlinkFile = util.promisify(fs.unlink); 

// const getFileStream = require("../../s3");
require("isomorphic-fetch");

const upload = multer({ dest: "uploads/" });



const authorization = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (token === undefined) {
    return res.sendStatus(403);
  }
  try {
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
    // save first time logged in date 
    await user.update({
      createdAt: new Date(),
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

      db.User.findOneAndUpdate({ email: req.body.email }, { $set: { lastLogin: Date.now() }}, {new: true}, function(err,user){
      })      
      
      // const updateLastLogin = db.User.getLastLogin(findUser._id);
      // console.log("updateLastLogin =", updateLastLogin);
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
      from: process.env.MAIL_USERNAME,
      to: findUser.email,
      subject: "Password Retrieval",
      text: `Hello ${findUser.username},\n\nYou are receiving this because you (or someone else) have requested the reset of the password for your account.\n\nPlease click on the following link, or paste this into your browser to complete the process:\n\nhttp://localhost:3000/reset/${findUser.username}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n\nThank you,\n\nThe Altitude Team`,
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

router.get("/getEditDetails", authorization, async(req, res) => {
  const findUser = await db.User.findOne({ email: req.user.user.email }).select("-password");
  res.json(findUser);
})


router.post("/editprofile", authorization, async (req, res) => {
  const response = await db.User.findOneAndUpdate({ email: req.user.user.email }, {
    headline: req.body.headline,
    bio: req.body.bio,
    favoriteMovies: req.body.movie,
    favoriteMusic: req.body.music,
    favoriteBooks: req.body.books,
    favoriteFood: req.body.food,
    favoriteHobbies: req.body.hobbies,
  }
    );
    console.log("Edit Profile = ", response);
  res.json({ message: "Profile has been updated" });
});




router.post("/uploadprofilepic", authorization, upload.single("image"), async (req, res) => {
  console.log(req.body);
  console.log("Req.user", req.user);
  const file = req.file;
  console.log(file);
  const result = await uploadFile(file)
  console.log("THE RESULT =", result);
  // const updateUserPhoto = await db.User.findOneAndUpdate({ email: req.user.user.email }, {
  //   $push: { profilePic: result.Key }, 
  // });
  const updateUserProfilePicture = await db.User.findOneAndUpdate({ email: req.user.user.email }, {
    profilePic: result.Key,
  });
  console.log("Update User Photo = ", updateUserProfilePicture);
  await(unlinkFile(file.path))
  res.send({ "url": "/images/" + file.filename, "name": file.originalname });
});



router.get("/images/:key", (req, res) => {
  const key = req.params.key;
  const readStream = getFileStream(key);
  readStream.pipe(res);
})



router.post("/profile", async (req, res) => {
  console.log(req.body)
  try {
  const findUser = await db.User.findOne({ username: req.body.query }).select("-password");
  if (!findUser) {
    console.log("img hit")
    res.json({ message: "User does not exist" });
  } else {
  console.log("findUser = ", findUser)
  res.json(findUser);
  }
  } catch (err) {
    console.log("Couldn't find any user with that account name ", err)
  }
});

module.exports = router;
