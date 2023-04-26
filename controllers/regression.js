const regression = require('regression');

const Facility = require("../models/Facility");
const Maintainance = require("../models/Maintenance");

module.exports = {

  getRegression: async (req, res) => {
    try {
      const facilities = await Facility.find({ user: req.user.id }).exec();
      const numFacilities = facilities.length;
      const numMaintainedFacilities = await Maintainance.countDocuments({ user: req.user.id, mainrepair: 'Maintenance'}).exec();
      const numRepairedFacilities = await Maintainance.countDocuments({ user: req.user.id, mainrepair: 'Repair'}).exec();
      const numReplacedFacilities = await Maintainance.countDocuments({ user: req.user.id, mainrepair: 'Replacement'}).exec();
  
  
      const x1 = numFacilities;
      const x2 = numMaintainedFacilities;
      const x3 = numRepairedFacilities;
      const x4 = numReplacedFacilities;
  
  
      const y1 = numFacilities;
      const y2 = numMaintainedFacilities;
      const y3 = numRepairedFacilities;
      const y4 = numReplacedFacilities;
  
  
      // calculate predicted value of Y
      const predictedY = 85.716 + (0.095 * x1) - (0.504 * x2) + (0.179 * x3) - (0.159 * x4);
      const availability = 60.361 - (0.221 * y1) + (0.315 * y2) - (0.006 * y3) + (0.034 * y4)
  
      res.render("regression.ejs", { 
        totalFacilities: numFacilities,
        maintainedFacilities: numMaintainedFacilities,
        repairedFacilities: numRepairedFacilities,
        replacedFacilities: numReplacedFacilities,
        predictedY: predictedY,
        availability: availability
      });
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },
  
  
  
  
}