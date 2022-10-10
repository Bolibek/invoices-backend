const { Router } = require("express");
const router = Router();
const mongoose = require("mongoose");
const login = require("../middleware/login");
const User = mongoose.model("User");

router.get("/user/:userId", login, (req, res) => {
	User.findOne({ _id: req.params.userId })
	  .select("-password -_id -__v")
		.then((user) => {
			res.json(user);
		})
		.catch((err) => {
			return res.status(404).json({ error: "user Not Found" });
		});
});

// // router.put("/follow", login, (req, res) => {
// // 	User.findByIdAndUpdate(
// // 		req.body.followId,
// // 		{
// // 			$push: { followers: req.user._id },
// // 		},
// // 		{ new: true },
// // 		(err, result) => {
// // 			if (err) {
// // 				return res.status(422).json({ error: err });
// // 			}
// // 			User.findByIdAndUpdate(
// // 				req.user._id,
// // 				{
// // 					$push: { following: req.body.followId },
// // 				},
// // 				{ new: true }
// // 			)
// // 				.select("-password")
// // 				.then((result) => {
// // 					res.json(result);
// // 				})
// // 				.catch((err) => {
// // 					return res.status(422).json({ error: err });
// // 				});
// // 		}
// // 	);
// // });

// // router.put("/unfollow", login, (req, res) => {
// // 	User.findByIdAndUpdate(
// // 		req.body.unfollowId,
// // 		{
// // 			$pull: { followers: req.user._id },
// // 		},
// // 		{ new: true },
// // 		(err, result) => {
// // 			if (err) {
// // 				return res.status(422).json({ error: err });
// // 			}
// // 			User.findByIdAndUpdate(
// // 				req.user._id,
// // 				{
// // 					$pull: { following: req.body.unfollowId },
// // 				},
// // 				{ new: true }
// // 			)
// // 				.select("-password")
// // 				.then((result) => {
// // 					res.json(result);
// // 				})
// // 				.catch((err) => {
// // 					return res.status(422).json({ error: err });
// // 				});
// // 		}
// // 	);
// // });

// // router.put("/updatepic", login, (req, res) => {
// // 	User.findByIdAndUpdate(
// // 		req.user._id,
// // 		{ $set: { pic: req.body.pic } },
// // 		{ new: true },
// // 		(err, result) => {
// // 			if (err) {
// // 				return res.status(422).json({ err: "Picture can not posted" });
// // 			}
// // 			res.json(result);
// // 		}
// // 	);
// // });

module.exports = router;
