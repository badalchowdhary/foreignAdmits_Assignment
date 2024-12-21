const mongoose = require('mongoose');

const BankSchema = new mongoose.Schema({
  name: {
    type: String, 
    required: true, 
    unique: true 
  },
});

module.exports = mongoose.model('Bank', BankSchema);
