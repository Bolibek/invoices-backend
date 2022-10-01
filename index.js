const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const { MONGO_URI } = require("./config/key");
const PORT = process.env.PORT || 8080;

mongoose.connect(MONGO_URI);

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions)); // Use this after the variable declaration

require("./models/invoice");

app.use(express.json());
app.use(require("./routes/invoice"));

app.listen(PORT, () => {
	console.log(`Server has been started on port ${PORT}`);
});












// const path = require("path");

// require("./models/post");

// app.use(express.static("public"));
// app.use(express.urlencoded({ extended: true }));
// app.use(require("./routes/post"));
// app.use(require("./routes/user"));

// if (process.env.NODE_ENV === "production") {
	// app.use(express.static("public"));
	// app.get("*", (req, res) => {
	// 	res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	// });
// }


