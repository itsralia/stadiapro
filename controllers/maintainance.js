const mongoose = require("mongoose");

const Maintainance = require("../models/Maintenance")
const Staff = require("../models/Staff")
const Department = require("../models/Department")
const Frequency = require("../models/Frequency");
const Facility = require("../models/Facility")



module.exports = {
  getMaintainance: async (req, res) => {
    try {
      const staffs = await Staff.find({user:req.user.id}).exec();
      const departments = await Department.find({user:req.user.id}).exec();
      const frequency = await Frequency.find({user: req.user.id}).exec();
     const  facilities = await Facility.find({user: req.params.id}).exec();

      // const maintainance = await Maintainance.find({ facility_id: mongoose.Types.ObjectId(req.params.id), assigned_staff: mongoose.Types.ObjectId(req.user.id) })
      const maintainance = await Maintainance.find({ user: req.user.id})
        .populate('assigned_staff')
        .populate('operator')
        .populate('frequency')
        .exec();

      console.log(req.user.id);
      console.log(req.params.id);
      console.log("this is " + maintainance);

      res.render("maintainance.ejs", { staffs, departments, maintainance, frequency, user: req.user.id , _id: req.params.id});
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },
  addMaintainance: async (req, res) => {
    try {
      const staffs = await Staff.find({user:req.user.id}).exec();
      const departments = await Department.find({user:req.user.id}).exec();
      const frequency = await Frequency.find({user: req.user.id}).exec();

        facilityId = req.params.id
        await Maintainance.create({
          facility: mongoose.Types.ObjectId(facilityId),
          check: req.body.check,
          maintainance_id: req.body.maintainance_id,
          cause: req.body.cause,
          percentage: req.body.percentage,
          frequency: req.body.frequency,
          operator: req.body.operator,
          assigned_staff: req.body.staff,
          instruction: req.body.instruction,
          price: req.body.price,
          mainrepair: req.body.mainrepair,
          user: req.user.id
        });
      
        console.log(req.body);
        console.log(req.user.id)
        console.log(req.params.id)
        console.log("Maintainance has been added!");
      
        Maintainance.find({ user: req.user })
          .populate('assigned_staff')
          .populate('operator')
          .populate('frequency')
          .exec((err, result) => {
            if (err) {
              console.log(err);
              return res.status(500).send(err);
            }
      
            res.render("maintainance.ejs", {
              staffs,
              departments,
              frequency,
              maintainance: result,
              user: req.user.id
            });
          });
      } catch (err) {
        console.log(err);
        res.status(500).send(err);
      }
      
  },
    deleteMaintainance: async (req, res) => {
      try {
        // Find post by id
        let maintainance = await Maintainance.findOne({ _id: req.params.id });
        
        if (!maintainance) {
          return res.status(404).send("Maintainance not found");
        }
    
        // Delete post from db
        await Maintainance.deleteOne({ _id: req.params.id });
        console.log("Deleted Maintainancce");
        res.redirect(`/maintainance/${req.params.id}`);
      } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
      }
        },
        geteditMaintainance: async (req, res) => {
            try {
              const maintainance = await Maintenance.findById({_id: req.params.id});
              res.render("editMaintainance.ejs", { staffs: staffs, departments: departments, maintainance:maintainance, frequency: frequency , user: req.user });
            } catch (err) {
              console.log(err);
            }
          },
          editMaintainance: async (req, res) => {
            try {
              const maintainance = await Maintainance.findById(req.params.id);
              maintainance.facility_id =  req.body.facility_id,
              maintainance.maintainance_id =  req.body.maintainance_id,
              maintainance.cause =  req.body.cause,
              maintainance.check = req.body.check,
              maintainance.percentage =  req.body.percentage,
              maintainance.frequency =  req.body.frequency,
              maintainance.operator = req.body.operator,
              maintainance.assigned_staff =  req.body.staff,
              maintainance.instruction =  req.body.instruction,
              maintainance.price =  req.body.price,
              maintainance.mainrepair =  req.body.mainrepair,

              await maintainance.save();
              console.log("Maintainance has been updated!");
          
              const maintainances = await Maintainance.find({ user: req.user.id }); // retrieve all the locations for the current user
              res.redirect("/maintainance");

    }catch(err){
        console.log(err);
    }
}
}