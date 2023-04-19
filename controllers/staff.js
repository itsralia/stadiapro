const Staff = require("../models/Staff");


module.exports = {
    getStaff: async (req, res) => {
        try {
          const staffs = await Staff.find({ user: req.user.id });
          res.render("staff.ejs", { staffs: staffs, user: req.user });
        } catch (err) {
          console.log(staffs);
        }
      }
      ,
      addStaff: async (req, res) => {
        try {
          await Staff.create({
            staffName: req.body.staff,
            title: req.body.title,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            sex: req.body.sex,
            address: req.body.address,
            email: req.body.email,
            username:  req.body.username,
            department: req.body.department,
            password: req.body.password,
            mobilePhone: req.body.mobilePhone,
            staffreg: req.body.staffreg,
            user: req.user.id // set the user property to the current user's ID
          });
          console.log("Staff has been added!");
      
          const staffs = await Staff.find({ user: req.user.id }); // retrieve all the locations for the current user
          res.render("staff.ejs", { staffs: staffs, user: req.user }); // render the updated list of locations
        } catch (err) {
          console.log(err);
        }
      }
    ,
    deleteStaff: async (req, res) => {
        try {
            // Find post by id
            let Staffs = await Staff.findById({ _id: req.params.id });
            // Delete post from db
            await Staff.remove({ _id: req.params.id });
            console.log("Deleted Department");
            res.redirect("/staff");
          } catch (err) {
            res.redirect("/staff");
          }
        },
        geteditStaff: async (req, res) => {
            try {
              const staff = await Staff.findById({_id: req.params.id});
              res.render("editStaff.ejs", { staff: staff });
            } catch (err) {
              console.log(err);
            }
          },
          editStaff: async (req, res) => {
            try {
              const staff = await Staff.findById(req.params.id);
              staff.staffName = req.body.staff;
              staff.title= req.body.title;
              staff.firstName =req.body.firstName;
              staff.lastName= req.body.lastName;
              staff.sex= req.body.sex;
              staff.address= req.body.email;
              staff.username= req.body.username;
              staff.department=req.body.department;
              staff.password= req.body.password;
              staff.mobilePhone= req.body.mobilePhone;
              staff.staffreg = req.body.staffreg;


              await staff.save();
              console.log("Staff has been updated!");
          
              const staffs = await Staff.find({ user: req.user.id }); // retrieve all the locations for the current user
              res.redirect("/staff");

    }catch(err){
        console.log(err);
    }
}
}