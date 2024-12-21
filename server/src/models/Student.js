const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true
  },
  universities: {
    type: [
      {
        _id: false,
        universityId: {
          // type: mongoose.Schema.Types.ObjectId, 
          // ref: 'University' 
        },
        banks: {
          type: [
            {
              _id: false,
              bankId: {
                // type: mongoose.Schema.Types.ObjectId, 
                // ref: 'Bank' 
              }
            }
          ],
          default: []
        },
      }
    ],
    default: []
  },
}, { timestamps: true });

module.exports = mongoose.model('Student', StudentSchema);
