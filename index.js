const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const { initializeApp, applicationDefault } = require("firebase-admin/app");
const bodyParser = require("body-parser");
const PORT = 8080;
const { MONGO_URI } = require("./config/key");

require("./models/user");
require("./models/invoice");

initializeApp({
	credential: applicationDefault(),
	databaseURL: "https://invoice-96ad3.firebaseio.com",
});

const corsOptions = {
	origin: "*",
	credentials: true, //access-control-allow-credentials:true
	optionSuccessStatus: 200,
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors(corsOptions)); // Use this after the variable declaration

mongoose.connect(MONGO_URI);

app.use(express.json());
app.use(require("./routes/auth"));
app.use(require("./routes/invoice"));
app.use(require("./routes/user"));

app.listen(PORT, () => {
	console.log(`Server has been started on port ${PORT}`);
});
