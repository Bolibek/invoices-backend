const { Router } = require("express");
const router = Router();
const mongoose = require("mongoose");
const Invoice = mongoose.model("Invoice");

router.get("/invoice", (req, res) => {
	Invoice.find()
		.then((invoice) => {
			res.json(invoice);
		})
		.catch((err) => {
			console.log(err);
		});
});
router.get("/invoice/:invoiceId", (req, res) => {
	Invoice.findOne({ id: req.params.invoiceId })
		.then((invoice) => {
			res.json(invoice);
		})
		.catch((err) => {
			console.log(err);
		});
});

router.post("/createinvoice", (req, res) => {
	const {
		id,
		status,
		clientName,
		clientEmail,
		paymentDue,
		createdAt,
		paymentTerms,
		description,
		senderAddress,
		clientAddress,
		items,
	} = req.body;
	let total = null;

	items.forEach((item) => {
		total = total + item.total;
	});

	if (
		!paymentDue ||
		!paymentTerms ||
		!description ||
		!clientName ||
		!clientEmail
	) {
		return res
			.status(422)
			.json({ error: "Iltimos hamma inputlarni to'ldiring" });
	}
	const invoice = new Invoice({
		id,
		status,
		clientName,
		clientEmail,
		paymentDue,
		createdAt,
		paymentTerms,
		description,
		senderAddress: {
			street: senderAddress.street,
			city: senderAddress.city,
			postCode: senderAddress.postCode,
			country: senderAddress.country,
		},
		clientAddress: {
			street: clientAddress.street,
			city: clientAddress.city,
			postCode: clientAddress.postCode,
			country: clientAddress.country,
		},
		items,
		total,
	});

	invoice
		.save()
		.then((result) => {
			res.json({ invoice: result });
		})
		.catch((err) => {
			console.log(err);
		});
});

router.put("/invoice/:invoiceId", (req, res) => {
	const {
		status,
		paymentDue,
		paymentTerms,
		clientAddress,
		clientEmail,
		clientName,
		senderAddress,
		description,
		items,
	} = req.body;
	let total = null;

	items.forEach((item) => {
		total = total + item.total;
	});
	Invoice.findByIdAndUpdate(
		req.body._id,
		{
			status,
			paymentDue,
			paymentTerms,
			clientAddress,
			clientEmail,
			clientName,
			senderAddress,
			description,
			items,
		},
		{
			new: true,
		}
	).exec((err, result) => {
		if (err) {
			return res.status(422).json({ error: err });
		} else {
			res.json(result);
		}
	});
});

router.delete("/invoice/:invoiceId", (req, res) => {
	Invoice.findOne({ id: req.params.invoiceId }).exec((err, invoice) => {
		if (err || !invoice) {
			return res.status(422).json({ error: err });
		}
		if (invoice.id.toString() === req.params.invoiceId) {
			invoice
				.remove()
				.then((result) => {
					res.json(result);
				})
				.catch((err) => console.log(err));
		}
	});
});

module.exports = router;
