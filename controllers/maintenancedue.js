const Facility = require("../models/Facility");
const Maintenance = require("../models/Maintenance");
const Staff = require("../models/Staff");

module.exports = {
  getMaintenanceDue: async (req, res) => {
    try {
      const today = new Date();
      const facilities = await Facility.find({ user: req.user.id }).populate('location').populate('category').exec();
      const staff = await Staff.find({ user: req.user.id }).exec();

      const maintenanceDue = [];

      for (const facility of facilities) {
        const lastMaintenance = await Maintenance.findOne({ facility: facility._id }).populate('staff').sort({ createdAt: -1 }).exec();

        if (lastMaintenance) {
          const dueDate = new Date(lastMaintenance.createdAt);
          dueDate.setMonth(dueDate.getMonth() + facility.interval);
          if (today > dueDate) {
            const staffForFacility = staff.find(s => s._id.toString() === facility.staff.toString());
            maintenanceDue.push({
              facilityId: facility._id,
              facilityIdent: facility.facility_id,
              facilityDescription: facility.facility_desc,
              lastMaintenanceId:lastMaintenance.maintainance_id,
              nextDueDate: dueDate,
              assignedStaff: staffForFacility ? `${staffForFacility.firstName} ${staffForFacility.lastName}` : null
            });
          }
        } else {
          const dueDate = new Date(facility.createdAt);
          dueDate.setMonth(dueDate.getMonth() + facility.interval);
          if (today > dueDate) {
            maintenanceDue.push({
              facilityId: facility._id,
              facilityIdent: facility.facility_id,
              facilityDescription: facility.facility_desc,
              lastMaintenanceId: null,
              nextDueDate: dueDate,
              assignedStaff: null
            });
          }
        }
      }

      if (maintenanceDue.length === 0) {
        res.render("maintenancedue.ejs", { message: "No facility is currently due for maintenance", maintenanceDue: maintenanceDue, facilities: facilities, user: req.user });
      } else {
        res.render("maintenancedue.ejs", { maintenanceDue: maintenanceDue, facilities: facilities, user: req.user });
      }
    } catch (err) {
      console.log(err);
    }
  }
};
