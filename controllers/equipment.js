const Equipment = require("../models/Equipment");


module.exports = {
    getEquipment: async (req, res) => {
        try {
          const equipments = await Equipment.find({ user: req.user.id });
          res.render("equipment.ejs", { equipments: equipments, user: req.user });
        } catch (err) {
          console.log(equipments);
        }
      }
      ,
      addEquipment: async (req, res) => {
        try {
          await Equipment.create({
            category_id: req.body.equipment_id,
            category: req.body.equipment,
            user: req.user.id // set the user property to the current user's ID
          });
          console.log("Equipment has been added!");
      
          const equipments = await Equipment.find({ user: req.user.id }); // retrieve all the locations for the current user
          res.render("equipment.ejs", { equipments: equipments, user: req.user }); // render the updated list of locations
        } catch (err) {
          console.log(err);
        }
      }
    ,
    deleteEquipment: async (req, res) => {
        try {
            // Find post by id
            let Equipments = await Equipment.findById({ _id: req.params.id });
            // Delete post from db
            await Equipment.remove({ _id: req.params.id });
            console.log("Deleted Equipment");
            res.redirect("/equipment");
          } catch (err) {
            res.redirect("/equipment");
          }
        },
        geteditEquipment: async (req, res) => {
            try {
              const equipment = await Equipment.findById({_id: req.params.id});
              res.render("editEquipment.ejs", { equipment: equipment});
            } catch (err) {
              console.log(err);
            }
          },
          editEquipment: async (req, res) => {
            try {
              const equipment = await Equipment.findById(req.params.id);
              equipment.category_id = req.body.equipment_id,
            equipment.category = req.body.equipment,
              


              await equipment.save();
              console.log("Equipment has been updated!");
          
              const staffs = await Equipment.find({ user: req.user.id }); // retrieve all the locations for the current user
              res.redirect("/equipment");

    }catch(err){
        console.log(err);
    }
}
}