const express = require("express");
const app = express();

// dot env
const dotenv = require('dotenv');
dotenv.config();

// connect database
const connectDB = require("./config/db");
connectDB();

// Body Parser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// cors
const cors = require("cors");
app.use(cors({ origin: true, credentials: true }));

// checking endpoint
app.use(express.json({ extended: false }));
app.get("/", (req, res) => res.send("WORKING"));

// routes
const userRoute = require("./routes/userRoute");
app.use("/user-form", userRoute);

// setting up port
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
});
