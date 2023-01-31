const mongoose = require("mongoose");

// const db = "mongodb://TodoAPI:TodoAPI@ac-kffcgut-shard-00-00.bhuy98p.mongodb.net:27017,ac-kffcgut-shard-00-01.bhuy98p.mongodb.net:27017,ac-kffcgut-shard-00-02.bhuy98p.mongodb.net:27017/?ssl=true&replicaSet=atlas-13ahi6-shard-0&authSource=admin&retryWrites=true&w=majority";

const db = "mongodb://localhost:27017/assignmentSF"

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB is connected");
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;