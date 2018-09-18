const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const db =require('./server/config/key').mongoURI;
// const items = require('./routes/api/items');

//BodyParser MiddleWare
app.use(bodyParser.json());

//connect to db
mongoose
  .connect(db , {useNewUrlParser:true})
  .then(() => console.log('Mongo DB Connected'))
  .catch(err =>console.log(err));

const port = process.env.PORT || 5000;

// use routes

// app.use('/api/items',items);

app.listen(port ,() => console.log(`server started at port ${port}`));