const Facility = require("../models/Facility")
const Category = require("../models/Equipment")
const Location = require("../models/Location")
const Maintainance = require("../models/Maintenance")

module.exports = {
  getInspect: async (req, res) => {
    try {
      const categories = await Category.find({}).exec();
      const locations = await Location.find({}).exec();
      const maintainance = await Maintainance.find({}).exec();
      const facilities = await Facility.find({ user: req.user.id })
        .populate('location')
        .populate('category')
        .populate({ path: 'maintainance', populate: { path: 'assigned_staff operator frequency price' } })
        .exec();
        console.log(maintainance)
      // Calculate the last maintenance date for each facility
      facilities.forEach((facility) => {
        const today = new Date();
        const createdAtDate = new Date(facility.createdAt);
        const daysSinceLastMaintenance = Math.floor((today - createdAtDate) / (1000 * 60 * 60 * 24));
        facility.lastMaintenanceDate = daysSinceLastMaintenance;
      });

     
      res.render("inspect.ejs", {
        categories: categories,
        facilities: facilities,
        locations: locations,
        maintainance: maintainance,
        user: req.user
      });
    } catch (err) {
      console.log(err);
    }
  }
}
