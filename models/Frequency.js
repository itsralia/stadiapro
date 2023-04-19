const mongoose = require("mongoose");

const FrequencySchema = new mongoose.Schema({
  frequency_id: {
    type: [Number],
  },
  frequencyName: {
    type: [String],
  },
  frequencyType:{
    type: [String],
    
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

module.exports = mongoose.model("Frequency", FrequencySchema);
