// // const axios = require('axios');
// const express = require('express');
// const router = express.Router();
// const mailgunService = require("./mailgunservice");



// router.post("/", async(req, res) => {
//     try {
//         console.log("try")
//         const response = await mailgunService.sendMail(req, res);
//         res.status(200).json({
//             status: "success",
//             message: "Email sent successfully",
//             data: response,
//         });
//     } catch (error) {
//         console.log("catcherror")
//         res.status(400).json({
//             status: "error",
//             message: "Email not sent",
//         });
//     }
// });
// module.exports = router;