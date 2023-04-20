const Admin = require("../models/Admin");
const User = require("../models/User")
module.exports = {
    createDefaultAdminUser: async (req, res) => {
        try {
            const adminUser = new Admin({
                userName: "admin800!",
                email: "sfmproadmin@gmail.com",
                password: "@dm1nP@s$WOrd"
            });
            await adminUser.save();
            console.log("Default admin user created.");
            res.json({ message: "Default admin user created successfully!" });
        } catch (err) {
            console.error("Error creating default admin user:", err);
            res.status(500).json({ error: "Failed to create default admin user" });
        }
    },
    addUser: async (req, res) => {
        try {
          // Check if the current user is an admin
        //   if (!req.user.isAdmin) {
        //     return res.status(403).json({ message: "You do not have permission to perform this action" });
        //   }
      
          const { username, email, password } = req.body;
      
          // Check if the user already exists
          const userExists = await User.findOne({ email: email });
          if (userExists) {
            return res.status(400).json({ message: "User already exists" });
          }
      
          // Create a new user object
          const newUser = new User({
            userName: username,
            email: email,
            password: password
          });
      
          // Save the new user to the database
          await newUser.save();
      
          // Send a success response
          res.status(200).json({ message: "User added successfully" });
      
        } catch (err) {
          console.error("Error adding user:", err);
          res.status(500).json({ message: "Error adding user" });
        }
      },

      getAllUsers: async (req, res) => {
        try {
          const users = await User.find();
          res.render('allusers', { users: users });
        } catch (err) {
          console.error('Error fetching users:', err);
          res.status(500).json({ message: 'Error fetching users' });
        }
      },
      deleteUser: async (req, res) => {
        try {
          const userId = req.params.id;
          const deletedUser = await User.findByIdAndDelete(userId);
          if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
          }
          res.status(200).json({ message: 'User deleted successfully' });
        } catch (err) {
          console.error('Error deleting user:', err);
          res.status(500).json({ message: 'Error deleting user' });
        }
      },      
    
    getIndex: (req, res) => {
        res.render("adminlogin.ejs");
      },
    getDashboard: (req, res) => {
        res.render("admindash.ejs");
      },
    getUserForm: (req, res) =>{
        res.render("adduserform.ejs")
    }
    
    
}
