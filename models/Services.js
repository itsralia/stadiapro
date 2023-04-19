const mongoose = require("mongoose");

const ServicesSchema = new mongoose.Schema({
  service_id: {
    type: Number,
    required: true,
  },
  service: {
    type: String,
    required: true,
  },
   user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  outsourced: {
    type: String,
    enum:['Yes', 'No'],
},
managed_by: {
    type: String,
    required: true,
},
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Services", ServicesSchema);
