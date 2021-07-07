const mongoose = require('mongoose')
const env = require('dotenv');

const connectDB = async () => {
  //constants
  env.config();
  try {
    await mongoose.connect(
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
  } catch (error) {
    console.log(error)
  }
}

exports.connectDB = connectDB