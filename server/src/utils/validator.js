const mongoose = require('mongoose');
const Student = require('../models/Student');
const University = require('../models/University');
const Bank = require('../models/Bank');

const validateObjectId = (id, type) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error(`Invalid ${type} ID format`);
        }
    } catch (error) {
        throw new Error(`Error in validateObjectId: ${error.message}`);
    }
};

const validateStudentExists = async (studentId) => {
    try {
        validateObjectId(studentId, 'Student');
        const student = await Student.findOne({studentId});
        if (!student) {
            throw new Error(`Student not found: ${studentId}`);
        }
        return student;
    } catch (error) {
        throw new Error(`Error in validateStudentExists: ${error.message}`);
    }
};

const validateUniversityExists = async (universityId) => {
    try {
        validateObjectId(universityId, 'University');
        const university = await University.findById(universityId);
        if (!university) {
            throw new Error(`University not found: ${universityId}`);
        }
        return university;
    } catch (error) {
        throw new Error(`Error in validateUniversityExists: ${error.message}`);
    }
};

const validateBankExists = async (bankId) => {
    try {
        validateObjectId(bankId, 'Bank');
        const bank = await Bank.findById(bankId);
        if (!bank) {
            throw new Error(`Bank not found: ${bankId}`);
        }
        return bank;
    } catch (error) {
        throw new Error(`Error in validateBankExists: ${error.message}`);
    }
};

module.exports = {
    validateObjectId,
    validateStudentExists,
    validateUniversityExists,
    validateBankExists,
};
