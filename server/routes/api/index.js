const router = require("express").Router();
const db = require("../../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const multer = require("multer");
const { uploadFile, getFileStream } = require("../../s3");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);
const { authorization } = require("../../lib/middleware/index.js");
const { createTransport } = require("../../lib/utils/index.js");
const mongoose = require("mongoose");
require("isomorphic-fetch");
const toId = mongoose.Types.ObjectId;

const upload = multer({ dest: "uploads/" });

router.get("/auth/check", authorization, (req, res) => {
  res.json({ Checking: "World", auth: true });
});

router.get("/", (req, res) => {
  res.json({ Hello: "World" });
});

router.post("/signup", async (req, res) => {
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

  if (findUser) {
    const pass = findUser.password;
    console.log();

    const passwordMatch = await bcrypt.compare(req.body.password, pass);
    console.log(passwordMatch);
    if (passwordMatch) {
      console.log("Match");
      const accessToken = jwt.sign(
        { user: { email: req.body.email} },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "20m" }
      );

      db.User.findOneAndUpdate(
        { email: req.body.email },
        { $set: { lastLogin: Date.now() } },
        { new: true }
      );
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
  console.log("im hit");
  const fetchProgrammingNews = await fetch(
    "https://www.reddit.com/r/ProgrammerHumor.json"
  );
  const programmingNews = await fetchProgrammingNews.json();
  console.log(programmingNews);
  let data = programmingNews.data.children;
  res.json(data);
});

router.post("/forgotPassword", async (req, res) => {
  const findUser = await db.User.findOne({ email: req.body.email });
  if (findUser) {
    let transporter = createTransport;

    let mailOptions = {
      from: process.env.MAIL_USERNAME,
      to: findUser.email,
      subject: "Password Retrieval",
      text: `Hello ${findUser.username},\n\nYou are receiving this because you (or someone else) have requested the reset of the password for your account.\n\nPlease click on the following link, or paste this into your browser to complete the process:\n\nhttp://localhost:3000/reset/${findUser.username}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n\nThank you,\n\nThe Altitude Team`,
    };

    transporter.sendMail(mailOptions, function (err) {
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

router.get("/getEditDetails", authorization, async (req, res) => {
  const findUser = await db.User.findOne({ email: req.user.user.email });
  res.json(findUser);
});

router.post("/editprofile", authorization, async (req, res) => {
  const response = await db.User.findOneAndUpdate(
    { email: req.user.user.email },
    {
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

router.post(
  "/uploadprofilepic",
  authorization,
  upload.single("image"),
  async (req, res) => {
    const file = req.file;
    const result = await uploadFile(file);
    const updateUserProfilePicture = await db.User.findOneAndUpdate(
      { email: req.user.user.email },
      {
        profilePic: result.Key,
      }
    );
    console.log("Update User Photo = ", updateUserProfilePicture);
    await unlinkFile(file.path);
    res.send({ url: "/images/" + file.filename, name: file.originalname });
  }
);

router.get("/images/:key", (req, res) => {
  const key = req.params.key;
  if (key === "undefined") {
    return res.status(400).send({ error: "Key is required" });
  }
  const readStream = getFileStream(key);
  readStream.pipe(res);
});

router.post("/profile", async (req, res) => {
  const randomUsers = await db.User.aggregate([{ $sample: { size: 5 } }]);
  try {
    const findUser = await db.User.findOne({ username: req.body.query });

    if (!findUser) {
      res.json({ message: "User does not exist" });
    } else {
      res.json({ findUser: findUser, randomUsers: randomUsers });
    }
  } catch (err) {
    console.log("Couldn't find any user with that account name ", err);
  }
});

router.post("/savePost", authorization, async (req, res) => {
  const findUser = await db.User.findOne({ email: req.user.user.email }).select(
    "-password"
  );
  const author = toId(findUser._id);
  const newPost = new db.Post({
    author: author,
    post: req.body.post,
  });
  console.log(newPost.author);
  newPost.save();
  const postId = toId(newPost._id);
  console.log("NewPost", newPost);
  const updateMe = await db.User.findOneAndUpdate(
    { _id: findUser._id },
    { $push: { posts: postId } }
  );
  console.log("findUser", updateMe);
});

router.get("/allPosts", authorization, async (req, res) => {
  const Posts = await db.Post.find({})
.populate('author').limit(50).sort({ createdAt: -1 });
  res.json(Posts);
});

router.post("/sendMessage", async (req, res) => {
  const { message } = req.body;
  const userToSend = await db.User.findOne({ username: message.from }).select(
    "-password"
  );

  console.log("userToSend", userToSend);

  const sender = toId(userToSend._id);
  const userToRecieve = await db.User.findOne({ username: message.to }).select(
    "-password"
  );
  const reciever = toId(userToRecieve._id);

  const newMessage = new db.Message({
    to: reciever,
    from: sender,
    message: message.body,
  });
  newMessage.save();
  const options = {
    reciever,
    sender,
  };

  const updateMsg = db.User.updateMany(
    { username: options },
    { $push: { messages: newMessage._id } }
  );
  console.log("UD", updateMsg);
  res.json({ message: "Message has been sent" });
});

router.get("/getMessages", authorization, async (req, res) => {
  const findUser = await db.User.findOne({ email: req.user.user.email }).select(
    "-password"
  );
  const userId = toId(findUser._id);
  const messages = await db.Message.find({ to: userId }).populate("from");

  res.json(messages);
});

router.post("/getPrivateMessages", authorization, async (req, res) => {
  console.log("hi");
  const { name } = req.body;
  const messagesFrom = await db.User.findOne({ username: name }).select(
    "-password"
  );
  const user = toId(messagesFrom._id);

  const me = await db.User.findOne({ email: req.user.user.email }).select(
    "-password"
  );
  const toMessages = await db.Message.find({ to: user, from: me }).populate("from");
  const fromMessages = await db.Message.find({ from: user, to: me }).populate("from");
  res.json({ toMessages, fromMessages });

});


router.post("/addComment", authorization, async (req, res) => {
  const author = await db.User.findOne({ email: req.user.user.email }).select(
    "-password"
  );
  const authorId = toId(author._id);
  const postId = toId(req.body.comment.post._id);

  const newComment = await new db.PostComments({
    postToComment: postId,
    comment: req.body.comment.comment,
    author: authorId,
  });
  newComment.save();
  const addReplyNumber = db.Post.findOneAndUpdate(
    { _id: postId },
    { $inc : { "replies": 1 }, $push: { "comments": newComment._id } }
  );
  addReplyNumber.exec();
  res.json({ message: "Comment has been added" });
})



router.post("/getComments", authorization, async (req, res) => {
  console.log(req.body.post)
  const postId = toId(req.body.post._id);
  console.log("POSTID", postId);
  const ids = req.body.post.comments
  console.log(ids)
  const comments = await db.Post.find({ _id: postId }).populate({
    path: 'comments',
    model: 'PostComments',
    // select: ["username", "comment", "createdAt"],
    populate: {
      path: 'author',
      model: 'User',
      select: "username"
    }
  });
  console.log(comments)
   res.json(comments);
})

router.post("/likeUser", authorization, async (req, res) => {
  const personToLike = await db.User.findOne({ username: req.body.username }).select(
    "-password"
  );
  const user = await db.User.findOne({ email: req.user.user.email }).select("-password");
  if (user.likedUsers.includes(personToLike._id)) {
    res.json({ liked: false});
  } else {
    const userId = toId(user._id);
    const likeUser = await db.User.findOneAndUpdate(
      { _id: userId },
      { $push: { likedUsers: personToLike._id } }
    );
    console.log("LikeUser", likeUser);
    res.json({ liked: true });
  }
});


router.get("/getLikedUsers", authorization, async (req, res) => {
  const user = await db.User.findOne({ email: req.user.user.email }).select("-password").populate("likedUsers");
  if (user.likedUsers < 1) {
    res.json({message: "No Liked Users"})
  } else {
  console.log(user)
  res.json(user);
  }
  
})

module.exports = router;