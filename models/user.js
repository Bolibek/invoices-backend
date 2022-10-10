const { Schema, model } = require("mongoose");

const userSchema = new Schema({
	firstName: {
		type: String,
	},
	lastName: {
		type: String,
	},
	email: {
		type: String,
	},
	password: {
		type: String,
	},
	// token: String,
	// invoices: [
	// 	{
	// 		type: Schema.Types.ObjectId,
	// 		ref: "Invoice",
	// 	},
	// ],
	// pic: {
	//   type: String,
	//   default:
	//     "https://res.cloudinary.com/dtabxocmw/image/upload/v1635099407/78-785827_user-profile-avatar-login-account-male-user-icon_kmmxgw.jpg",
	// },
});

model("User", userSchema);
