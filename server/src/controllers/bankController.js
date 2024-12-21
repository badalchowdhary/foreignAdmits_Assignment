const bankService = require('../services/bankService')

const addBank = async (req, res) => {
    try {
        const result = await bankService.addBank(req.body);
        res.status(201).json(result);
    } catch (error) {
        console.log(`Error in addBank controller: ${error.message}`);
        if (error.message) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

const getBankById = async (req, res) => {
    try {
        const { id: bankId } = req.params;
        const result = await bankService.getBankById(bankId);
        res.status(200).json(result);
    } catch (error) {
        console.log(`Error in getBankById controller: ${error.message}`);
        if (error.message) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

const getAllBanks = async (req, res) => {
    try {
        const result = await bankService.getAllBanks();
        res.status(200).json(result);
    } catch (error) {
        console.log(`Error in getAllBanks controller: ${error.message}`);
        if (error.message) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

const updateBank = async (req, res) => {
    try {
        const { id: bankId } = req.params;
        const updateData = req.body;
        const result = await bankService.updateBank(bankId, updateData);
        res.status(200).json(result);
    } catch (error) {
        console.log(`Error in updateBank controller: ${error.message}`);
        if (error.message) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

const deleteBank = async (req, res) => {
    try {
        const { id: bankId } = req.params;
        const result = await bankService.deleteBank(bankId);
        res.status(200).json(result);
    } catch (error) {
        console.log(`Error in deleteBank controller: ${error.message}`);
        if (error.message) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

module.exports = {
    addBank,
    getBankById,
    getAllBanks,
    updateBank,
    deleteBank
}