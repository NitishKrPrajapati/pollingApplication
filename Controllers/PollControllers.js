const { Polls, Questions, Options } = require("../models/index");

// Controller functions for polls
const createPoll = async (req, res) => {
	try {
		const {
			title,
			category,
			startDate,
			endDate,
			minReward,
			maxReward,
			questions,
		} = req.body;

		// Create the poll
		const newPoll = await Polls.create({
			title,
			category,
			start_date: startDate,
			end_date: endDate,
			min_reward: minReward,
			max_reward: maxReward,
		});

		// Create questions associated with the poll
		if (questions && questions.length > 0) {
			const createdQuestions = await Questions.bulkCreate(
				questions.map((question) => ({
					pollId: newPoll.id,
					type: question.type,
					text: question.text,
				}))
			);
			newPoll.setQuestions(createdQuestions);

			for (const i in createdQuestions) {
				const question = createdQuestions[i];
				const optionsData = questions[i].options.map((option) => ({
					QuestionId: question.id,
					text: option,
				}));

				await Options.bulkCreate(optionsData);
			}
		}

		res
			.status(201)
			.json({ message: "Poll created successfully", poll: newPoll });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

const getAllPolls = async (req, res) => {
	try {
		const allPolls = await Polls.findAll();
		res.json(allPolls);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

const getPollById = async (req, res) => {
	const pollId = req.params.pollId;

	try {
		const poll = await Polls.findByPk(pollId);
		if (poll) {
			res.json(poll);
		} else {
			res.status(404).json({ error: "Poll not found" });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

const updatePoll = async (req, res) => {
	const pollId = req.params.pollId;

	try {
		const [updatedRows] = await Polls.update(req.body, {
			where: { id: pollId },
		});

		if (updatedRows > 0) {
			res.json({ message: "Poll updated successfully" });
		} else {
			res.status(404).json({ error: "Poll not found" });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

const deletePoll = async (req, res) => {
	const pollId = req.params.pollId;

	try {
		const deletedRows = await Polls.destroy({
			where: { id: pollId },
		});

		if (deletedRows > 0) {
			res.json({ message: "Poll deleted successfully" });
		} else {
			res.status(404).json({ error: "Poll not found" });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

module.exports = {
	createPoll,
	getAllPolls,
	getPollById,
	updatePoll,
	deletePoll,
};
