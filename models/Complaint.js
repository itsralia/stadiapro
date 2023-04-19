const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    required: true,
  },
  facilityDescription: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Facility",
    required: true,
  },
  complaintBy: {
    type: String,
    required: true,
  },
  complaintDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  complaint: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Complaint", complaintSchema);
