const express = require('express');
const path = require('path');
const env = require('dotenv');
const bodyParser = require('body-parser');
const { connectDB } = require('./utils/connectDb')
const cors = require('cors');

const userRoutes = require('./routes/auth')
const studentRoutes = require('./routes/students')
const SubjectRoutes = require('./routes/subjects')
const teacherRoutes = require('./routes/teachers')
const classRoutes = require('./routes/classes')

const app = express();

//constants
env.config();
connectDB();

//Middlewares

app.use(cors());
app.use('/public', express.static(path.join(__dirname, 'uploads')))
app.use(bodyParser.json())

app.use('/api', userRoutes)
app.use('/api', studentRoutes)
app.use('/api', SubjectRoutes)
app.use('/api', teacherRoutes)
app.use('/api', classRoutes)



app.listen(process.env.PORT, () => {
  console.log(`server listening on port ${process.env.PORT}`)
})