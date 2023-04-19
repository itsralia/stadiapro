const mongoose = require("mongoose");

const EquipmentSchema = new mongoose.Schema({
  category_id: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
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

module.exports = mongoose.model("Equipment", EquipmentSchema);
