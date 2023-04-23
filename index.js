const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const methodOverride = require("method-override");
const flash = require("express-flash");
const logger = require("morgan");
const connectDB = require("./config/database");
const path = require("path");

const Admin = require("./models/Admin");
const twilio = require("./config/twilio");
const mainRoutes = require("./routes/main");
const postRoutes = require("./routes/posts");
const commentRoutes = require("./routes/comments")
const departmentRoutes = require("./routes/department")
const staffRoutes = require("./routes/staff")
const frequencyRoutes = require("./routes/frequency") 
const equipmentRoutes = require("./routes/equipment")
const serviceRoutes = require("./routes/services")
const facilityRoutes = require("./routes/facility")
const maintainanceRoutes = require("./routes/maintainance")
const inspectRoutes = require("./routes/inspect")
const maintenanceDueRoutes = require("./routes/maintenancedue")
const complaintRoutes = require("./routes/complaint")
const viewComplaintRoutes = require("./routes/viewcomplaint")
const lifespanRoutes = require("./routes/lifespan")
const smsRoutes = require("./routes/sms")
const regressionRoutes = require("./routes/regression")
const helpRoutes = require("./routes/help")
const adminRoutes = require("./routes/admin")

//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

// Passport config
require("./config/passport")(passport);

//Connect To Database
connectDB();
if(connectDB()){
  console.log("Database connected")
}else{
  return console.error();
}




// twilio connection
// twilio()
//Using EJS for views
app.set("view engine", "ejs");

//Static Folder
app.use(express.static("public"));
app.use('/admin', express.static(path.join(__dirname, 'public')));
app.use('/maintainance', express.static(path.join(__dirname, 'public')));



//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Logging
app.use(logger("dev"));

//Use forms for put / delete
app.use(methodOverride("_method"));




// Setup Sessions - stored in MongoDB
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);


// // Create a default admin user
// Admin.createDefaultAdminUser()
//   .then(() => {
//     console.log("Default admin user created successfully!");
//   })
//   .catch((error) => {
//     console.error("Failed to create default admin user:", error);
//   });


// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Use flash messages for errors, info, ect...
app.use(flash());



//Setup Routes For Which The Server Is Listening
app.use("/", mainRoutes);
app.use("/post", postRoutes);
app.use("/comment", commentRoutes);
app.use("/departments", departmentRoutes)
app.use("/staff", staffRoutes)
app.use("/frequency", frequencyRoutes)
app.use("/equipment", equipmentRoutes)
app.use("/service", serviceRoutes)
app.use("/facility", facilityRoutes)
app.use("/maintainance", maintainanceRoutes)
app.use("/inspect", inspectRoutes)
app.use("/due", maintenanceDueRoutes)
app.use("/complaints", complaintRoutes)
app.use("/viewcomplaints", viewComplaintRoutes)
app.use("/lifespan", lifespanRoutes)
app.use("/sms", smsRoutes)
app.use("/regression", regressionRoutes)
app.use("/help", helpRoutes)
app.use("/admin", adminRoutes)


// error handdling
app.use(function(req,res){
  res.status(404 || 302).render('errorpage.ejs');
});



//Server Running
app.listen(process.env.PORT, () => {
  console.log("Server is running, you better catch it!");
});
