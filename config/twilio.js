// const twilio = require("twilio");
// require("dotenv").config({ path: "./config/.env" });

// function sendSMS() {
//   const client = new twilio(
//     process.env.TWILIO_ACCOUNT_SID,
//     process.env.TWILIO_AUTH_TOKEN
//   );

//   return client.messages
//     .create({
//       body: "Hey this is the message for sfmpro",
//       from: '+15077086358',
//       to: process.env.PHONE_NUMBER,
//     })
//     .then((message) => console.log(message, "Message sent"))
//     .catch((err) => console.log(err));
// }

// // sendSMS();

// module.exports = sendSMS;
