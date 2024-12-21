const mongoose = require('mongoose');
const Bank = require('../models/Bank');
const validator = require('../utils/validator')

const addBank = async (bankData) => {
    try {
        const { name } = bankData;
        if(!name) throw new Error('Bank name missing!')
        const savedBank = await Bank.create(bankData);
        return savedBank;
    } catch (error) {
        console.error(`Error in addBank service: ${error.message}`);
        throw new Error(`Failed to add bank: ${error.message}`);
    }
}

const getBankById = async (bankId) => {
    try {
        const bank = await validator.validateBankExists(bankId)
        return bank;
    } catch (error) {
        console.error(`Error in getBankById service: ${error.message}`);
        throw new Error(`Failed to get bank by id: ${error.message}`);
    }
}

const getAllBanks = async () => {
    try {
        const banks = await Bank.find();
        return banks;
    } catch (error) {
        console.error(`Error in getAllBanks service: ${error.message}`);
        throw new Error(`Failed to get all add bank: ${error.message}`);
    }
}

const updateBank = async (bankId, updateData) => {
    try {
        validator.validateObjectId(bankId, 'Bank');

        const updatedBank = await Bank.findByIdAndUpdate(
            bankId, 
            updateData, 
            { new: true }
        );
        if (!updatedBank) {
            throw new Error('Bank not found or failed to update');
        }
        return updatedBank;
    } catch (error) {
        console.error(`Error in updateBank service: ${error.message}`);
        throw new Error(`Failed to update bank: ${error.message}`);
    }
}

const deleteBank = async (bankId) => {
    try {
        validator.validateObjectId(bankId, 'Bank');

        const deletedBank = await Bank.findByIdAndDelete(bankId);
        if (!deletedBank) {
            throw new Error('Bank not found or already deleted');
        }
        return { message: 'Bank deleted successfully'};
    } catch (error) {
        console.error(`Error in deleteBank service: ${error.message}`);
        throw new Error(`Failed to delete bank:  ${error.message}`);
    }
}

module.exports = {
    addBank,
    getBankById,
    getAllBanks,
    updateBank,
    deleteBank
}