const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Users } = require("../models/index");
require("dotenv").config();

const registerUser = async (req, res) => {
	try {
		// Hash the user's password before saving it
		const hashedPassword = await bcrypt.hash(req.body.password, 10);
		req.body.password = hashedPassword;

		const newUser = await Users.create(req.body);
		res
			.status(201)
			.json({ message: "User registered successfully", user: newUser });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

const loginUser = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await Users.findOne({ where: { email } });

		if (user) {
			// Compare hashed password
			const isPasswordValid = await bcrypt.compare(password, user.password);

			if (isPasswordValid) {
				// Generate a token for user authentication
				const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY);
				res.json({ message: "Login successful", token });
			} else {
				res.status(401).json({ error: "Invalid password" });
			}
		} else {
			res.status(404).json({ error: "User not found" });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

module.exports = {
	registerUser,
	loginUser,
};
