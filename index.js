const express = require("express");
const db = require("./models");
const { UserRouter } = require("./Routes/User.Routes");
const { PollsRouter } = require("./Routes/Polls.Routes");
const {
	Polls,
	Questions,
	Options,
	Users,
	PollAnalytics,
	Votes,
} = require("./models/index");

require("dotenv").config();

const port = process.env.PORT || 8000;

const app = express();

app.use(express.json());

// Establishing the relationships between all the models
Polls.hasMany(Questions);
Questions.belongsTo(Polls);

Questions.hasMany(Options);
Options.belongsTo(Questions);

Questions.hasMany(Votes);
Votes.belongsTo(Questions);

Users.hasMany(Votes);
Votes.belongsTo(Users);

Polls.hasMany(Votes);
Votes.belongsTo(Polls);

Polls.hasMany(PollAnalytics);
PollAnalytics.belongsTo(Polls);

Users.hasMany(PollAnalytics);
PollAnalytics.belongsTo(Users);

Questions.hasMany(PollAnalytics);
PollAnalytics.belongsTo(Questions);

Options.hasMany(PollAnalytics);
PollAnalytics.belongsTo(Options);
// <------------------------------->

// <---------App Routes Starts----------->
app.get("", (req, res) => {
	res.send("Welcome to Your own Polling App.");
});

app.use("/api/users", UserRouter);
app.use("/api/polls", PollsRouter);

// <---------App Routes Ends----------->
db.sequelize.sync().then(() => {
	app.listen(port, () => {
		console.log(`Listening @ ${port}`);
	});
});
