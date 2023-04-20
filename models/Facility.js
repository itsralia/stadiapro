const mongoose = require("mongoose");

const FacilitySchema = new mongoose.Schema({
  facility_id: {
    type: Number,
    required: true,
  },
  facility_desc: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Location",
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Equipment",
  },
  interval: {
    type: Number,
    required: true,
    default: 1,
  },
  staff: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Staff",
    default: null,
  },
  maintainances: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Maintenance',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Facility", FacilitySchema);
