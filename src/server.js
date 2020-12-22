const express = require('express');
const path = require('path');
const env = require('dotenv');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const app = express();

//constants
env.config();

mongoose.connect(
  `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@webstore.9mzti.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
 {
   useNewUrlParser: true,
   useUnifiedTopology: true,
   useCreateIndex: true,
   useFindAndModify: false
  })
  .then(() => {
    console.log("database connected!!")
  })
  .catch(err => console.log(`error happened: ${err}`)
);


app.listen(process.env.PORT, () => {
  console.log(`server listening on port ${process.env.PORT}`)
})