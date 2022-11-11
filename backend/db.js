const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/msrb?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";

const connectToDB = ()=> {
    mongoose.connect(mongoURI, ()=>{
        console.log("Connected to database");
    })
}

module.exports = connectToDB;