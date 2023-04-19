const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema({
  locationName: {
    type: String,
    required: true,
  },
  location_id: {
    type: Number,
    required: true,
  },
   user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Location", LocationSchema);
