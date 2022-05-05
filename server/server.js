const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 3000;
const routes = require('./routes');


app.use(cors());


mongoose.connect("mongodb://localhost/vuetify-router", {"useNewUrlParser": true, "useUnifiedTopology": true}, () => {
    console.log("Connected to MongoDB");
});

app.listen(PORT, function() {
    console.log('Server is running on port: ', PORT);
})

app.use(bodyParser.urlencoded({ extended: false }));           
app.use(bodyParser.json()) 
app.use(routes);






