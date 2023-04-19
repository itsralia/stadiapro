const Department = require("../models/Department");


module.exports = {
    getDepartment: async (req, res) => {
        try {
          const departments = await Department.find({ user: req.user.id });
          res.render("department.ejs", { departments: departments, user: req.user });
        } catch (err) {
          console.log(departments);
        }
      }
      ,
      addDepartment: async (req, res) => {
        try {
          await Department.create({
            departmentName: req.body.department,
            department_id: req.body.department_id,
            user: req.user.id // set the user property to the current user's ID
          });
          console.log("Department has been added!");
      
          const departments = await Department.find({ user: req.user.id }); // retrieve all the locations for the current user
          res.render("department.ejs", { departments: departments, user: req.user }); // render the updated list of locations
        } catch (err) {
          console.log(err);
        }
      }
    ,
    deleteDepartment: async (req, res) => {
        try {
            // Find post by id
            let departments = await Department.findById({ _id: req.params.id });
            // Delete post from db
            await Department.remove({ _id: req.params.id });
            console.log("Deleted Departmenr");
            res.redirect("/departments");
          } catch (err) {
            res.redirect("/departments");
          }
        },
        getEditDepartment: async (req, res) => {
            try {
              const departments = await Department.findById({_id: req.params.id});
              res.render("editDepartment.ejs", { departments: departments });
            } catch (err) {
              console.log(err);
            }
          },
          editDepartment: async (req, res) => {
            try {
              const department = await Department.findById(req.params.id);
              department.departmentName = req.body.departmentName;
              department.department_id = req.body.department_id;
              await department.save();
              console.log("Department has been updated!");
          
              const departments = await Department.find({ user: req.user.id }); // retrieve all the locations for the current user
              res.redirect("/departments");

    }catch(err){
        console.log(err);
    }
}
}