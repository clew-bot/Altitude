const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 3000;
const routes = require('./routes')
const dotenv = require('dotenv');
const cookieParser = require("cookie-parser");
const path = require('path');
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
    // "mongodb://localhost/vuetify-router",
    options,
    (err) => {
     if(err) console.log(err) 
     else console.log("mongdb is connected");
    }
  );

//   Heroku
app.use(express.static(path.join(__dirname, '../dist')));
app.use(routes);

if (process.env.NODE_ENV === "production") {
    app.get("*", (req, res) => {
        res.sendFile(path.join( "/app/dist/index.html"));
    });
}
app.listen(process.env.PORT || PORT, function() {
    console.log('Server is running on port: ', process.env.PORT || 3000);
})









