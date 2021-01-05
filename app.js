var express = require("express");
var bodyParse = require("body-parser");
var mongoose = require("mongoose")
var app = express();
var cors = require("cors")
var path = require('path');
var routes = require("./routes/index");
var methodOverride = require("method-override");

app.use(express.static(path.join(__dirname, 'css')));
app.use(cors())
app.options('*', cors())
app.use(methodOverride("_method"));
app.use(bodyParse.urlencoded({ extended: true }));
mongoose.connect("mongodb+srv://sanyika:Nem99@cluster0.hg5xp.mongodb.net/orders?retryWrites=true&w=majority");
app.use(routes);





app.listen(process.env.PORT)