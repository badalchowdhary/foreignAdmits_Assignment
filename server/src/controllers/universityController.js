const universityService = require('../services/universityService');

const addUniversity = async (req, res) => {
    try {
        const result = await universityService.addUniversity(req.body);
        res.status(201).json(result);
    } catch (error) {
        console.log(`Error in addUniversity controller: ${error.message}`);
        if (error.message) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

const getUniversityById = async (req, res) => {
    try {
        const { id: universityId } = req.params;
        const result = await universityService.getUniversityById(universityId);
        res.status(200).json(result);
    } catch (error) {
        console.log(`Error in getUniversityById controller: ${error.message}`);
        if (error.message) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

const getAllUniversities = async (req, res) => {
    try {
        const result = await universityService.getAllUniversities();
        res.status(200).json(result);
    } catch (error) {
        console.log(`Error in getAllUniversities controller: ${error.message}`);
        if (error.message) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

const updateUniversity = async (req, res) => {
    try {
        const { id: universityId } = req.params;
        const updateData = req.body;
        const result = await universityService.updateUniversity(universityId, updateData);
        res.status(200).json(result);
    } catch (error) {
        console.log(`Error in updateUniversity controller: ${error.message}`);
        if (error.message) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

const deleteUniversity = async (req, res) => {
    try {
        const { id: universityId } = req.params;
        const result = await universityService.deleteUniversity(universityId);
        res.status(200).json(result);
    } catch (error) {
        console.log(`Error in deleteUniversity controller: ${error.message}`);
        if (error.message) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

module.exports = {
    addUniversity,
    getUniversityById,
    getAllUniversities,
    updateUniversity,
    deleteUniversity
};
