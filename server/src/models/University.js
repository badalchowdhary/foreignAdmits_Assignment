const mongoose = require('mongoose');

const UniversitySchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        unique: true 
    },
    country: { 
        type: String, 
        default: "" 
    },
});

module.exports = mongoose.model('University', UniversitySchema);
