const studentService = require('../services/studentService')

const addStudent = async (req, res) => {
    try {
        const { studentId } = req.user;
        const data = req.body;
        const result = await studentService.addStudent(data, studentId);
        res.status(201).json(result);
    } catch (error) {
        console.log(`Error in addStudent controller: ${error.message}`);
        if (error.message) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

const getStudentById = async (req, res) => {
    try {
        const { id: studentId } = req.params;
        const result = await studentService.getStudentById(studentId);
        res.status(200).json(result);
    } catch (error) {
        console.log(`Error in getStudentById controller: ${error.message}`);
        if (error.message) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

const getAllStudents = async (req, res) => {
    try {
        const result = await studentService.getAllStudents();
        res.status(200).json(result);
    } catch (error) {
        console.log(`Error in getAllStudents controller: ${error.message}`);
        if (error.message) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

const addUniversity = async (req, res) => {
    try {
        const { studentId } = req.params;
        const { universityId, banks } = req.body;
        const result = await studentService.addUniversity(studentId, universityId, banks);
        res.status(200).json(result);
    } catch (error) {
        console.log(`Error in addUniversity controller: ${error.message}`);
        if (error.message) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

const addBankToUniversity = async (req, res) => {
    try {
        const { studentId, universityId } = req.params;
        const { bankId } = req.body;
        const result = await studentService.addBankToUniversity(studentId, universityId, bankId);
        res.status(200).json(result);
    } catch (error) {
        console.log(`Error in addBankToUniversity controller: ${error.message}`);
        if (error.message) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

const removeBankFromUniversity = async (req, res) => {
    try {
        const { studentId, universityId, bankId } = req.params;
        const result = await studentService.removeBankFromUniversity(studentId, universityId, bankId);
        res.status(200).json(result);
    } catch (error) {
        console.log(`Error in removeBankFromUniversity controller: ${error.message}`);
        if (error.message) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

const removeUniversity = async (req, res) => {
    try {
        const { studentId, universityId } = req.params;
        const result = await studentService.removeUniversity(studentId, universityId);
        res.status(200).json(result);
    } catch (error) {
        console.log(`Error in removeUniversity controller: ${error.message}`);
        if (error.message) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}


const deleteStudent = async (req, res) => {
    try {
        const { id: studentId } = req.params;
        const result = await studentService.deleteStudent(studentId);
        res.status(200).json(result);
    } catch (error) {
        console.log(`Error in deleteStudent controller: ${error.message}`);
        if (error.message) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
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