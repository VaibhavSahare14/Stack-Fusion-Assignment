const express = require("express");
const router = express.Router();

const {
    addUser,
    getData
} = require("../controllers/userController");

router.post("/", addUser);
router.get("/", getData);

module.exports = router;
