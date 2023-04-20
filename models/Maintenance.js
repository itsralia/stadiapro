const mongoose = require('mongoose');

const MaintainanceSchema = new mongoose.Schema({
  facility: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Facility',
    required: true,
  },
  check:{
    type: Number,
    required: true,
  },
  maintainance_id:{
    type: Number,
    required: true,
  },
  cause: {
    type: String,
    required: true
  },
  percentage: {
    type: Number,
    required: true
  },
  frequency: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Frequency',
    required: true
  },
  operator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: true
  },
  assigned_staff: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Staff',
    required: true
  },
  instruction: {
    type: String,
    required: true
  },
  price:{
    type: Number,
    required: true,
  },
  mainrepair:{
    type: String,
    enum:['Maintenance', 'Replacement'],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Maintainance', MaintainanceSchema);
