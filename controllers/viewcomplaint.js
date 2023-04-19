const Complaint = require("../models/Complaint");

module.exports = {
    viewComplaints: async (req, res) => {
      try {
        const complaints = await Complaint.find({ user: req.user.id })
    .populate("department", "departmentName")
    .populate("facilityDescription", "facility_desc")
    .select("complaintBy complaintDate complaint facilityDescription");



          console.log(req.user.id)
        res.render("viewcomplaints", { complaints });
      } catch (err) {
        console.log(err);
      }
    },
  };
  