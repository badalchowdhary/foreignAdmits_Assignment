const express = require("express");
const router = express.Router();

const universityController = require('../controllers/universityController');
const jwtService = require('../utils/jwtService');

// Add a university (Only for admin)
router.post("/", jwtService.verifyTokenAndAdmin, universityController.addUniversity);

// Get a university by ID
router.get("/:id", jwtService.verifyToken, universityController.getUniversityById);

// Get all universities
router.get("/", jwtService.verifyToken, universityController.getAllUniversities);

// Update a university (Only for admin)
router.put("/:id", jwtService.verifyTokenAndAdmin, universityController.updateUniversity);

// Delete a university (Only for admin)
router.delete("/:id", jwtService.verifyTokenAndAdmin, universityController.deleteUniversity);

module.exports = router;