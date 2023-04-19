const Frequency = require("../models/Frequency");


module.exports = {
    getFrequency: async (req, res) => {
        try {
          const frequency = await Frequency.find({ user: req.user.id });
          res.render("frequency.ejs", { frequency: frequency, user: req.user });
        } catch (err) {
          console.log(frequency);
        }
      }
      ,
      addFrequency: async (req, res) => {
        try {
          await Frequency.create({
            frequency_id: req.body.frequency_id,
            frequencyName: req.body.frequencyName,
            frequencyType: req.body.frequencyType,
            user: req.user.id // set the user property to the current user's ID
          });
          console.log("Frequency has been added!");
      
          const frequency = await Frequency.find({ user: req.user.id }); // retrieve all the locations for the current user
          res.render("frequency.ejs", { frequency: frequency, user: req.user }); // render the updated list of locations
        } catch (err) {
          console.log(err);
        }
      }
    ,
    deleteFrequency: async (req, res) => {
        try {
            // Find post by id
            let frequency = await Frequency.findById({ _id: req.params.id });
            // Delete post from db
            await Frequency.remove({ _id: req.params.id });
            console.log("Deleted Frequency");
            res.redirect("/frequency");
          } catch (err) {
            console.log(err)
            res.redirect("/frequency");
          }
        },
        geteditFrequency: async (req, res) => {
            try {
              const frequency = await Frequency.findById({_id: req.params.id});
              res.render("editFrequency.ejs", { frequency: frequency });
            } catch (err) {
              console.log(err);
            }
          },
          editFrequency: async (req, res) => {
            try {
              const frequency = await Frequency.findById(req.params.id);
              frequency.frequency_id = req.body.frequency_id,
              frequency.frequencyName = req.body.frequencyName,
              frequency.frequencyType = req.body.frequencyType,
            


              await frequency.save();
              console.log("Frequency has been updated!");
          
              const frequencys = await Frequency.find({ user: req.user.id }); // retrieve all the locations for the current user
              res.redirect("/frequency");

    }catch(err){
        console.log(err);
    }
}
}