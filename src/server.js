const express = require('express');
const path = require('path');
const env = require('dotenv');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./routes/auth/auth')
const studentRoutes = require('./routes/students')
const courseRoutes = require('./routes/courses')
const teacherRoutes = require('./routes/teachers')
const classRoutes = require('./routes/classes')

const app = express();

//constants
env.config();

mongoose.connect(
  `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.g3zzd.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
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

//Middlewares

app.use(cors());
//app.use('/public', express.static(path.join(__dirname, 'uploads')))
app.use(bodyParser.json())
app.use('/api', userRoutes)
app.use('/api', studentRoutes)
app.use('/api', courseRoutes)
app.use('/api', teacherRoutes)
app.use('/api', classRoutes)


app.listen(process.env.PORT, () => {
  console.log(`server listening on port ${process.env.PORT}`)
})