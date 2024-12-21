const mongoose = require('mongoose');
const Student = require('../models/Student');
const University = require('../models/University');
const Bank = require('../models/Bank');
const validator = require('../utils/validator')

const addStudent = async (studentData, studentId) => {
    try {
        const { universities } = studentData;

        const student = await Student.findOne({ studentId });
        if (student) {
            throw new Error('Student profile already exists. Add universities to proceed.');
        }
        // validation
        if (universities) {
            for (const uni of universities) {
                await validator.validateUniversityExists(uni.universityId);

                if (uni.banks) {
                    for (const bank of uni.banks) {
                        await validator.validateBankExists(bank.bankId);
                    }
                }
            }
        }

        const savedStudent = await Student.create({ studentId, universities });
        return savedStudent;
    } catch (error) {
        console.error(`Error in addStudent service: ${error.message}`);
        throw new Error(`Failed to add student: ${error.message}`);
    }
}

const getStudentById = async (studentId) => {
    try {
        const student = await validator.validateStudentExists(studentId);
        return student;
    } catch (error) {
        console.error(`Error in getStudentById service: ${error.message}`);
        throw new Error(`Failed to get student by id: ${error.message}`);
    }
}

const getAllStudents = async () => {
    try {
        const students = await Student.find();
        return students;
    } catch (error) {
        console.error(`Error in getAllStudents service: ${error.message}`);
        throw new Error(`Failed to get all student: ${error.message}`);
    }
}

const addUniversity = async (studentId, universityId, banks) => {
    try {
        // Student validation
        const student = await validator.validateStudentExists(studentId);

        // University validation
        await validator.validateUniversityExists(universityId);

        const universityExistsInStudent = student.universities.some(
            (uni) => uni.universityId.toString() === universityId.toString()
        );
        if (universityExistsInStudent) throw new Error('University already exists for this student');

        // Banks Validation
        if (Array.isArray(banks) && banks.length > 0) {
            for (const bank of banks) {
                await validator.validateBankExists(bank.bankId);
            }
        }

        // update the student document
        const newUniversity = {
            universityId,
            banks: banks || [],
        };
        student.universities.push(newUniversity);
        const updatedStudent = await student.save();
        return updatedStudent;
    } catch (error) {
        console.error(`Error in addUniversity service: ${error.message}`);
        throw new Error(`Failed to addUniversity: ${error.message}`);
    }
}

const addBankToUniversity = async (studentId, universityId, bankId) => {
    try {
        // Student validation
        const student = await validator.validateStudentExists(studentId);

        // University validation 
        await validator.validateUniversityExists(universityId);
        const university = student.universities.find(
            (uni) => uni.universityId.toString() === universityId.toString()
        );
        if (!university) throw new Error('University does not exists for this student');

        // Bank validation
        await validator.validateBankExists(bankId);
        const bankExistsInUniversity = university.banks.some(
            (bank) => bank.bankId.toString() === bankId.toString()
        );
        if (bankExistsInUniversity) throw new Error('Bank already exists in this university for this student');


        // update
        university.banks.push({ bankId });
        const updatedStudent = await student.save();
        return updatedStudent;
    } catch (error) {
        console.error(`Error in addBankToUniversity service: ${error.message}`);
        throw new Error(`Failed to addBankToUniversity: ${error.message}`);
    }
}

const removeBankFromUniversity = async (studentId, universityId, bankId) => {
    try {
        // Student validation
        const student = await validator.validateStudentExists(studentId);

        // University validation 
        await validator.validateUniversityExists(universityId);
        const university = student.universities.find(
            (uni) => uni.universityId.toString() === universityId.toString()
        );
        if (!university) throw new Error('University does not exists for this student');

        // Bank validation
        await validator.validateBankExists(bankId);
        const bankExistsInUniversity = university.banks.some(
            (bank) => bank.bankId.toString() === bankId.toString()
        );
        if (!bankExistsInUniversity) throw new Error('Bank doest not exists for this university for this student');

        // update student
        university.banks = university.banks.filter(
            (bank) => bank.bankId.toString() !== bankId.toString()
        );
        const updatedStudent = await student.save();
        return updatedStudent;
    } catch (error) {
        console.error(`Error in removeBankFromUniversity service: ${error.message}`);
        throw new Error(`Failed to removeBankFromUniversity: ${error.message}`);
    }
}

const removeUniversity = async (studentId, universityId) => {
    try {
        // Student validation
        const student = await validator.validateStudentExists(studentId);

        // University validation 
        await validator.validateUniversityExists(universityId);
        const university = student.universities.find(
            (uni) => uni.universityId.toString() === universityId.toString()
        );
        if (!university) throw new Error('University does not exists for this student');

        // update student
        student.universities = student.universities.filter(
            (uni) => uni.universityId.toString() !== universityId.toString()
        );
        const updatedStudent = await student.save();
        return updatedStudent;
    } catch (error) {
        console.error(`Error in removeBankFromUniversity service: ${error.message}`);
        throw new Error(`Failed to removeBankFromUniversity: ${error.message}`);
    }
}


const deleteStudent = async (studentId) => {
    try {
        await validator.validateObjectId(studentId, 'Student');

        const deletedStudent = await Student.findOneAndDelete({studentId});
        if (!deletedStudent) {
            throw new Error('Student not found or already deleted');
        }
        return { message: 'Student deleted successfully'};
    } catch (error) {
        console.error(`Error in deleteBank service: ${error.message}`);
        throw new Error(`Failed to deleteStudent: ${error.message}`);
    }
}

module.exports = {
    addStudent,
    getStudentById,
    getAllStudents,
    addUniversity,
    addBankToUniversity,
    removeUniversity,
    removeBankFromUniversity,
    deleteStudent
}