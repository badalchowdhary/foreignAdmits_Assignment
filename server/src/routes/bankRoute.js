const express = require("express");
const router = express.Router();

const bankController = require('../controllers/bankController');
const jwtService = require('../utils/jwtService');

//Add a bank (Only for admin)
router.post("/", jwtService.verifyTokenAndAdmin, bankController.addBank);

//Get a bank 
router.get("/:id", jwtService.verifyToken, bankController.getBankById);

//Get all banks
router.get("/", jwtService.verifyToken, bankController.getAllBanks);

//Update a bank (Only for admin)
router.put("/:id", jwtService.verifyTokenAndAdmin, bankController.updateBank);

//Delete a bank (Only for admin)
router.delete("/:id", jwtService.verifyTokenAndAdmin, bankController.deleteBank);

module.exports = router;