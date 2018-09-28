const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var routes = require('./server/routes.js');
const app = express();
const fileUpload = require('express-fileupload');
var cors = require('cors');
const db =require('./server/settings/key').mongoURI;
// const items = require('./routes/api/items');

//BodyParser MiddleWare
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// use routes
app.use('/api/v1', routes);
app.use(fileUpload());

//connect to db
mongoose
  .connect(db , {useNewUrlParser:true})
  .then(() => console.log('Mongo DB Connected'))
  .catch(err =>console.log(err));

const port = process.env.PORT || 5000;

app.listen(port ,() => console.log(`server started at port ${port}`));