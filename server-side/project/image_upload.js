const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log("ffffffffffffffffffffffiletttttttttttt" + String(file))
        cb(null, 'images/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
        console.log("ffffffffffffffffffffffile" + String(file))
    },
});

const upload = multer({ storage: storage });

console.log("__filename");

router.post('/', upload.single('file'), function(req, res) {
    console.log("__filename");
    res.json({});

})
module.exports = router;