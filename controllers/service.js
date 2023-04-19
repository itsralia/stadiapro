const Service = require("../models/Services");


module.exports = {
    getService: async (req, res) => {
        try {
          const services = await Service.find({ user: req.user.id });
          res.render("service.ejs", { services: services, user: req.user });
        } catch (err) {
          console.log(services);
        }
      }
      ,
      addService: async (req, res) => {
        try {
          await Service.create({
            service_id: req.body.service_id,
            service: req.body.service,
            outsourced: req.body.outsourced,
            managed_by: req.body.managed_by,
            user: req.user.id // set the user property to the current user's ID
          });
          console.log("Service has been added!");
      
          const services = await Service.find({ user: req.user.id }); // retrieve all the locations for the current user
          res.render("service.ejs", { services: services, user: req.user }); // render the updated list of locations
        } catch (err) {
          console.log(err);
        }
      }
    ,
    deleteService: async (req, res) => {
        try {
            // Find post by id
            let Equipments = await Service.findById({ _id: req.params.id });
            // Delete post from db
            await Service.remove({ _id: req.params.id });
            console.log("Deleted Service");
            res.redirect("/service");
          } catch (err) {
            res.redirect("/service");
          }
        },
        geteditService: async (req, res) => {
            try {
              const service = await Service.findById({_id: req.params.id});
              res.render("editService.ejs", { service: service});
            } catch (err) {
              console.log(err);
            }
          },
          editService: async (req, res) => {
            try {
              const service = await Service.findById(req.params.id);
              service.service_id = req.body.service_id,
            service.service = req.body.service,
            service.outsourced = req.body.outsourced,
            service.managed_by = req.body.managed_by,


              await service.save();
              console.log("Service has been updated!");
          
              const services = await Service.find({ user: req.user.id }); // retrieve all the locations for the current user
              res.redirect("/service");

    }catch(err){
        console.log(err);
    }
}
}