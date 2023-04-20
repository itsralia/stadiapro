const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  userName: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
  lastLogin: {
    type: Date,
    default: Date.now
  }
});

// Password hash middleware.

AdminSchema.pre("save", function save(next) {
  const admin = this;
  if (!admin.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(admin.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      admin.password = hash;
      next();
    });
  });
});

// Helper method for validating user's password.

AdminSchema.methods.comparePassword = function comparePassword(
  candidatePassword,
  cb
) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

// // Create a default admin user
// AdminSchema.statics.createDefaultAdminUser = async function() {
//   const Admin = this;
//   const defaultAdmin = {
//     userName: "admin800!",
//     email: "sfmproadmin@gmail.com",
//     password: "@dm1nP@s$WOrd"
//   };
//   const adminUser = new Admin(defaultAdmin);
//   try {
//     const savedAdminUser = await adminUser.save();
//     console.log("Default admin user created:", savedAdminUser);
//   } catch (error) {
//     console.error("Error creating default admin user:", error);
//   }
// };

module.exports = mongoose.model("Admin", AdminSchema);
