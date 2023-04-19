const Location = require("../models/Location")


module.exports = {
    getLocation: async (req, res) => {
        try {
          const locations = await Location.find({ user: req.user.id });
          res.render("location.ejs", { locations: locations, user: req.user });
        } catch (err) {
          console.log(locations);
        }
      }
      ,
      addLocation: async (req, res) => {
        try {
          await Location.create({
            locationName: req.body.location,
            location_id: req.body.location_id,
            user: req.user.id // set the user property to the current user's ID
          });
          console.log("Location has been added!");
      
          const locations = await Location.find({ user: req.user.id }); // retrieve all the locations for the current user
          res.render("location.ejs", { locations: locations, user: req.user }); // render the updated list of locations
        } catch (err) {
          console.log(err);
        }
      }
    ,
    deleteLocation: async (req, res) => {
        try {
            // Find post by id
            let locations = await Location.findById({ _id: req.params.id });
            // Delete post from db
            await Location.remove({ _id: req.params.id });
            console.log("Deleted Post");
            res.redirect("/location");
          } catch (err) {
            res.redirect("/location");
          }
        },
        getEditLocation: async (req, res) => {
            try {
              const location = await Location.findById({_id: req.params.id});
              res.render("editLocation.ejs", { location: location });
            } catch (err) {
              console.log(err);
            }
          },
          editLocation: async (req, res) => {
            try {
              const location = await Location.findById(req.params.id);
              location.locationName = req.body.locationName;
              location.location_id = req.body.location_id;
              await location.save();
              console.log("Location has been updated!");
          
              const locations = await Location.find({ user: req.user.id }); // retrieve all the locations for the current user
              res.redirect("/location");

    }catch(err){
        console.log(err);
    }
}
}