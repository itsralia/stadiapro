const Facility = require("../models/Facility");
const Category = require("../models/Equipment")
const Location = require("../models/Location")
const Staff = require('../models/Staff')

module.exports = {
    getFacility: async (req, res) => {
        // try {
        //   const facilities = await Facility.find({ user: req.user.id });
        //   res.render("facility.ejs", { facilities: facilities, user: req.user });
        // } catch (err) {
        //   console.log(facilities);
        // }
            try {
              const categories = await Category.find({user: req.user.id}).exec();
              const locations = await Location.find({ user: req.user.id }).exec();
              const staffs = await Staff.find({user: req.user.id}).exec();
              const facilities = await Facility.find({ user: req.user.id }).populate('location').populate('category').populate('staff').exec();
              res.render("facility.ejs", { categories: categories, facilities: facilities, locations:locations, staffs: staffs, user: req.user });
            } catch (err) {
              console.log(err);
            }
      }
      ,
      addFacility: async (req, res) => {
        try {
          const categories = await Category.find({user: req.user.id}).exec();
              const locations = await Location.find({ user: req.user.id }).exec();
              const staffs = await Staff.find({user: req.user.id}).exec();
          await Facility.create({
            facility_id: req.body.facility_id,
            facility_desc: req.body.facility_desc,
            location: req.body.location,
            category: req.body.equipment,
            interval: req.body.interval,
            staff: req.body.staff,
            user: req.user.id // set the user property to the current user's ID
          });
          console.log(req.body.category)
          console.log("Facility has been added!");
      
          const facilities = await Facility.find({ user: req.user.id }).populate('category').populate('location').exec();
          res.render("facility.ejs", { categories: categories, facilities: facilities, locations:locations, staffs: staffs, user: req.user }); // render the updated list of locations
        } catch (err) {
          console.log(err);
        }
      }
    ,
    deleteFacility: async (req, res) => {
      try {
        // Find post by id
        let facility = await Facility.findOne({ _id: req.params.id });
        if (!Facility) {
          return res.status(404).send("Facility not found");
        }
    
        // Delete post from db
        await Facility.deleteOne({ _id: req.params.id });
        console.log("Deleted Facility");
        res.redirect("/facility");
      } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
      }
    },
    
        geteditFacility: async (req, res) => {
            try {
              const facility = await Facility.findById({_id: req.params.id});
              const categories = await Category.find({user: req.user.id}).exec();
              const locations = await Location.find({ user: req.user.id }).exec();
              const staffs = await Staff.find({user: req.user.id}).exec();
              res.render("editFacility.ejs", { categories: categories, facility: facility, locations:locations, staffs: staffs, user: req.user });
            } catch (err) {
              console.log(err);
            }
          },
          editFacility: async (req, res) => {
            try {
              const facility = await Facility.findById(req.params.id);
              facility.facility_id = req.body.facility_id,
              facility.facility_desc = req.body.facility_desc,
              facility.location = req.body.location,
              facility.category = req.body.equipment,
              facility.interval = req.body.interval,
              facility.staff = req.body.staff,


              await facility.save();
              console.log("Facility has now been updated!");
          
              const facilities = await Facility.find({ user: req.user.id }); // retrieve all the locations for the current user
              res.redirect("/facility");

    }catch(err){
        console.log(err);
    }
}
}