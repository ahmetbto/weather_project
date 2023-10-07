const express = require("express");

const app = express();

const userRoutes = require("./userRoutes")
const cityRoutes = require("./cityRoutes")




console.log("********index routes********")
app.use("/users", userRoutes);
app.use("/city", cityRoutes);


module.exports = app;