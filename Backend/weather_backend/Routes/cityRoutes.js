const express = require("express");
const router = express.Router()

const cityController = require("../Controllers/cityController");


//router.post("/", cityController.createCity);
router.get("/", cityController.getCityList);
router.post("/newCity", cityController.createCity);
router.delete("/", cityController.deleteCity);
router.patch("/", cityController.updateCity);





module.exports = router;