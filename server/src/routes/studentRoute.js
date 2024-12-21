const express = require("express");
const router = express.Router();

const studentController = require('../controllers/studentController');
const jwtService = require('../utils/jwtService');

//Add a new student profile
router.post("/", jwtService.verifyToken, studentController.addStudent);

//Get a student 
router.get("/:id", jwtService.verifyToken, studentController.getStudentById);

//Get all students (only for admin)
router.get("/", jwtService.verifyTokenAndAdmin, studentController.getAllStudents);

//Add new uni to student
router.put("/:studentId/universities", jwtService.verifyToken, studentController.addUniversity);

//Add new bank to existing uni
router.put("/:studentId/universities/:universityId/banks", jwtService.verifyToken, studentController.addBankToUniversity);

//Remove a bank from university
router.put("/:studentId/universities/:universityId/banks/:bankId", jwtService.verifyToken, studentController.removeBankFromUniversity);

//Remove a university from student
router.put("/:studentId/universities/:universityId", jwtService.verifyToken, studentController.removeUniversity);

//Delete a student profile
router.delete("/:id", jwtService.verifyToken, studentController.deleteStudent);

module.exports = router;