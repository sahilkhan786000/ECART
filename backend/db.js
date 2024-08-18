const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();

const mongoDB = async() => {

    const MONGO_URI = process.env.MONGO_URI ;
   try{

   await mongoose.connect(MONGO_URI);
    console.log("connencted successfully");
}
   catch(error){

    console.log('Error while connecting with the database', error.message);

   }
}
export default mongoDB;