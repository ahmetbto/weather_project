const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser")
const db = require("./data/database")
const app = express();


//Routes page added
const indexRoutes = require("./Routes/indexRoutes");


var corsOptions = {
	origin: "*"
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(indexRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});