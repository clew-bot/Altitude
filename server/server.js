const express = require('express');
const app = express();
// const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 3000;
const routes = require('./routes')
// let rando = require('crypto').randomBytes(64).toString('hex')
const dotenv = require('dotenv');
const cookieParser = require("cookie-parser");
// const nodemailer = require("nodemailer");

// console.log(rando)
// get config vars
dotenv.config();




app.use(cors());

let options = {
    "useNewUrlParser": true
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
mongoose.connect(
    process.env.MONGO_URI,
    options,
    (err) => {
     if(err) console.log(err) 
     else console.log("mongdb is connected");
    }
  );

if (process.env.NODE_ENV === "production") {
    app.use(express.static('/dist'));

    app.get("*", (req, res) => {
        res.sendFile(path.sendFile( "/dist/index.html"));
    });
}

console.log(__dirname)
app.use(routes);

app.listen(process.env.PORT || PORT, function() {
    console.log('Server is running on port: ', process.env.PORT || 3000);
})









