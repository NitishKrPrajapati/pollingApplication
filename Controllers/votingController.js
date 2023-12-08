const { Votes, Users, Polls, Questions } = require("../models/index");

//function for submitting votes
const submitVote = async (req, res) => {
	try {
		const { pollId } = req.params;
		const { userId, selectedOption } = req.body;

		// Validate the request
		if (!userId || !selectedOption) {
			return res.status(400).json({
				success: false,
				message: "Invalid request. Please provide userId and selectedOption.",
			});
		}

		// Check if the user has already voted on this poll
		const existingVote = await Votes.findOne({
			where: { userId, pollId },
		});

		if (existingVote) {
			return res.status(400).json({
				success: false,
				message: "User has already voted on this poll.",
			});
		}

		// Retrieve the question associated with the poll
		const question = await Questions.findOne({
			where: { pollId },
		});

		if (!question) {
			return res
				.status(404)
				.json({ success: false, message: "No question found for this poll." });
		}

		// Calculate reward amount (adjust this based on your reward mechanism)
		const minReward = Polls.min_reward; // Get min_reward from the Polls model
		const maxReward = Polls.max_reward; // Get max_reward from the Polls model
		const rewardAmount =
			Math.floor(Math.random() * (maxReward - minReward + 1)) + minReward;

		// Update user data to indicate that they have completed the question
		await Users.update(
			{ completedQuestions: [...Users.completedQuestions, question.id] },
			{ where: { id: userId } }
		);

		// Store the vote in the database
		const vote = await Votes.create({
			selected_option: selectedOption,
			userId,
			pollId,
			questionId: question.id,
			optionId: selectedOption, // Modify this based on your database structure
		});

		// Update poll analytics
		await Polls.update(
			{ total_votes: Polls.total_votes + 1 },
			{ where: { id: pollId } }
		);

		// Return the reward amount in the response
		res.json({ success: true, rewardAmount });
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
};

module.exports = {
	submitVote,
};
