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
      const facilities = await Facility.findOne({_id: req.params.id}).exec();
  
      const maintainance = await Maintainance.find({ facility: facilities['_id'], user: req.user.id})
        .populate('assigned_staff')
        .populate('operator')
        .populate('frequency')
        .exec();
  
      const totalFacilitiesMaintained = await Maintainance.countDocuments({ facility: facilities['_id'], user: req.user.id, mainrepair: 'Maintenance'}).exec();
      const facilitiesRepaired = await Maintainance.countDocuments({ facility: facilities['_id'], user: req.user.id, mainrepair: 'Repair'}).exec();
      const totalFacilitiesReplaced = await Maintainance.countDocuments({ facility: facilities['_id'], user: req.user.id, mainrepair: 'Replacement'}).exec();
  
      res.render("maintainance.ejs", {
        staffs,
        facilities,
        departments,
        maintainance,
        frequency,
        user: req.user.id,
        _id: req.params.id,
        totalFacilitiesMaintained,
        facilitiesRepaired,
        totalFacilitiesReplaced
      });
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
        const facilities = await Facility.findOne({_id: req.params.id}).exec();


        
        const newMaintainance = await Maintainance.create({
            facility: mongoose.Types.ObjectId(req.params.id),
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

        facilities.maintainances.push(newMaintainance);
        await facilities.save();

        console.log(req.body);
        console.log(req.user.id)
        console.log(req.params.id)
        console.log("Maintainance has been added!");

        const result = await Maintainance.find({ user: req.user, facility: req.params.id })
            .populate('assigned_staff')
            .populate('operator')
            .populate('frequency')
            .exec();


            const totalFacilitiesMaintained = await Maintainance.countDocuments({ facility: facilities['_id'], user: req.user.id, mainrepair: 'Maintenance'}).exec();
            const facilitiesRepaired = await Maintainance.countDocuments({ facility: facilities['_id'], user: req.user.id, mainrepair: 'Repair'}).exec();
            const totalFacilitiesReplaced = await Maintainance.countDocuments({ facility: facilities['_id'], user: req.user.id, mainrepair: 'Replacement'}).exec();
        
        console.log("MY RESULT")
        res.render("maintainance.ejs", {
            staffs,
            departments,
            facilities,
            frequency,
            maintainance: result,
            user: req.user.id,
            totalFacilitiesMaintained,
            facilitiesRepaired,
            totalFacilitiesReplaced
        });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
},
deleteMaintainance: async (req, res) => {
  try {
    // Find maintenance by id
    const maintainance = await Maintainance.findOne({ _id: req.params.id });
    console.log(req.params.id)

    if (!maintainance) {
      return res.status(404).send("Maintenance not found");
    }
    
    // Delete maintenance from db
    await Maintainance.deleteOne({ _id: req.params.id });
    console.log("Deleted Maintenance");
    console.log(maintainance.facility)
    console.log(req.params.id)
    res.redirect(`/maintainance/${maintainance.facility}`);    // Redirect to maintenance index page
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
},

        geteditMaintainance: async (req, res) => {
            try {
              const maintainance = await Maintainance.findById({_id: req.params.id});
              const staffs = await Staff.find({user:req.user.id}).exec();
              const departments = await Department.find({user:req.user.id}).exec();
              const frequency = await Frequency.find({user: req.user.id}).exec();
              const facilities = await Facility.findOne({_id: req.params.id}).exec();

              res.render("editMaintainance.ejs", { staffs: staffs, departments: departments, facilities:facilities, maintainance:maintainance, frequency: frequency , user: req.user });
            } catch (err) {
              console.log(err);
            }
          },
          editMaintainance: async (req, res) => {
            try {
              const maintainance = await Maintainance.findById(req.params.id);
              const staffs = await Staff.find({user:req.user.id}).exec();
              const departments = await Department.find({user:req.user.id}).exec();
              const frequency = await Frequency.find({user: req.user.id}).exec();
              const facility = await Facility.findById(maintainance.facility).exec();
          
              await Maintainance.findByIdAndUpdate(req.params.id, {
                facility: facility['_id'],
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
              });
          
              console.log("Maintainance has been updated!");
          
              const maintainances = await Maintainance.find({ facility: facility['_id'], user: req.user.id})
                .populate('assigned_staff')
                .populate('operator')
                .populate('frequency')
                .exec();
          
              res.render("maintainance.ejs", {
                staffs,
                facilities: facility,
                departments,
                maintainance: maintainances,
                frequency,
                user: req.user.id,
              });
            } catch (err) {
              console.log(err);
              res.status(500).send(err);
            }
          },
          
}