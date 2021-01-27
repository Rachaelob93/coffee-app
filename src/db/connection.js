const mongoose = require("mongoose");
require("dotenv").config();




const connection = async () => {
try {
    
await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true});
console.log("connection made!");
} catch (error) {
    console.log(error)
}

};
connection();