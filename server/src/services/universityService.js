const mongoose = require('mongoose');
const University = require('../models/University');
const validator = require('../utils/validator')

const addUniversity = async (universityData) => {
    try {
        const { name } = universityData;
        if(!name) throw new Error('University name missing!')
        const savedUniversity = await University.create(universityData);
        return savedUniversity;
    } catch (error) {
        console.error(`Error in addUniversity service: ${error.message}`);
        throw new Error(`Failed to add university: ${error.message}`);
    }
};

const getUniversityById = async (universityId) => {
    try {
        const university = validator.validateUniversityExists(universityId)
        return university;
    } catch (error) {
        console.error(`Error in getUniversityById service: ${error.message}`);
        throw new Error(`Failed to get university by id: ${error.message}`);
    }
};

const getAllUniversities = async () => {
    try {
        const universities = await University.find();
        return universities;
    } catch (error) {
        console.error(`Error in getAllUniversities service: ${error.message}`);
        throw new Error(`Failed to get all universities: ${error.message}`);
    }
};

const updateUniversity = async (universityId, updateData) => {
    try {
        validator.validateObjectId(universityId, 'University');

        const updatedUniversity = await University.findByIdAndUpdate(
            universityId,
            updateData,
            { new: true }
        );
        if (!updatedUniversity) {
            throw new Error('University not found or failed to update');
        }
        return updatedUniversity;
    } catch (error) {
        console.error(`Error in updateUniversity service: ${error.message}`);
        throw new Error(`Failed to update university: ${error.message}`);
    }
};

const deleteUniversity = async (universityId) => {
    try {
        validator.validateObjectId(universityId, 'University')

        const deletedUniversity = await University.findByIdAndDelete(universityId);
        if (!deletedUniversity) {
            throw new Error('University not found or already deleted');
        }
        return { message: 'University deleted successfully', university: deletedUniversity };
    } catch (error) {
        console.error(`Error in deleteUniversity service: ${error.message}`);
        throw new Error(`Failed to delete university: ${error.message}`);
    }
};

module.exports = {
    addUniversity,
    getUniversityById,
    getAllUniversities,
    updateUniversity,
    deleteUniversity
};
