const Department = require("../models/Department");
const Facility = require("../models/Facility");
const Complaint = require("../models/Complaint");

module.exports = {
  getComplaintForm: async (req, res) => {
    try {
      const departments = await Department.find({ user: req.user.id }).exec();
      const facilities = await Facility.find({ user: req.user.id }).exec();
      const currentDate = new Date().toISOString().substr(0, 10); // format date as YYYY-MM-DD

      res.render("complaintform.ejs", {
        departments: departments,
        facilities: facilities,
        currentDate: currentDate,
        complaintBy: req.user
      });
    } catch (err) {
      console.log(err);
    }
  },

  addComplaint: async (req, res) => {
    try {
      const department = req.body.department;
      const complaintBy = req.body.complaintBy;
      const complaintDate = req.body.complaintDate;
      const facilityDescription = req.body.facilityDescription;
      const complaint = req.body.complaint;

      const newComplaint = new Complaint({
        department: department,
        complaintBy: complaintBy,
        complaintDate: complaintDate,
        facilityDescription: facilityDescription,
        complaint: complaint,
        user: req.user.id
      });

      await newComplaint.save();
      
      console.log("Complaint has been added")
      res.redirect("/complaints");
    } catch (err) {
      console.log(err);
    }
  }
,

  getComplaints: async (req, res) => {
    try {
      const complaints = await Complaint.find({}).populate("department").populate("facility").exec();

      res.render("complaints.ejs", { complaints: complaints, user: req.user });
    } catch (err) {
      console.log(err);
    }
  }
};
