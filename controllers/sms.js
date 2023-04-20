const Staff = require('../models/Staff');
const Facility = require('../models/Facility');
const twilio = require('twilio');
require('dotenv').config({ path: './config/.env' });

// POST /sms/send
module.exports = {
    sendSMS: async (req, res) => {
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const client = require("twilio")(accountSid, authToken);
    
        const phoneNumber = req.body.phoneNumber;
        const facility = req.body.facility;
        const message = req.body.message;
    
        try {
          const sentMessage = await client.messages.create({
            body: `${facility} maintenance is due. ${message}`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: "+" + phoneNumber
          });
          console.log(sentMessage.sid);
          console.log(phoneNumber)
          res.send("Message sent successfully.");
        } catch (err) {
          console.error(err);
          console.log(phoneNumber)
          console.log(req.body)

          res.status(500).send("Something went wrong. Please try again later.");
        }
      },

    getSms: async (req, res) => {
        try {
          const staffList = await Staff.find({user: req.user.id});
          const facilityList = await Facility.find({user: req.user.id});
          res.render("sms.ejs", { staffList: staffList, facilityList: facilityList });
        } catch (err) {
          console.log(err);
        }
      },
    
    
  };
  