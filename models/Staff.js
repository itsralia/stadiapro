const mongoose = require("mongoose");

const StaffSchema = new mongoose.Schema({
title: {
    type: String,
    enum:['Mr', 'Mrs', 'Miss', 'Prof'],
},
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  sex: {
    type: String,
    enum: ['Male', 'Female'],
    required: true
  },
  address: {
    type: String
  },
  mobilePhone: {
    type: Number
  },
  email: {
    type: String
  },
   user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  username: { type: String, required: true },
  password: { type: String, required: true },
  privileges: {
    file: { type: Boolean, default: false },
    setup: { type: Boolean, default: false },
    administration: { type: Boolean, default: false },
    sms: { type: Boolean, default: false },
    help: { type: Boolean, default: false },
  },
  staffreg:{
    type: String,
  },
  department:{
    type: String,

  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Staff", StaffSchema);
