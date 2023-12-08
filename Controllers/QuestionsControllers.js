// controllers/QuestionController.js

const { Questions } = require("../models/index");

// Controller functions for questions within a poll
const createQuestion = async (req, res) => {
	try {
		const { pollId } = req.params;
		const { type, text } = req.body;

		const newQuestion = await Questions.create({
			pollId,
			type,
			text,
		});

		res.status(201).json({
			message: "Question created successfully",
			question: newQuestion,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

const getAllQuestions = async (req, res) => {
	try {
		const { pollId } = req.params;

		const questions = await Questions.findAll({
			where: { pollId },
		});

		res.json(questions);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

const getQuestionById = async (req, res) => {
	const { pollId, questionId } = req.params;

	try {
		const question = await Questions.findOne({
			where: { id: questionId, pollId },
		});

		if (question) {
			res.json(question);
		} else {
			res.status(404).json({ error: "Question not found" });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

const updateQuestion = async (req, res) => {
	const { pollId, questionId } = req.params;

	try {
		const [updatedRows] = await Questions.update(req.body, {
			where: { id: questionId, pollId },
		});

		if (updatedRows > 0) {
			res.json({ message: "Question updated successfully" });
		} else {
			res.status(404).json({ error: "Question not found" });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

const deleteQuestion = async (req, res) => {
	const { pollId, questionId } = req.params;

	try {
		const deletedRows = await Questions.destroy({
			where: { id: questionId, pollId },
		});

		if (deletedRows > 0) {
			res.json({ message: "Question deleted successfully" });
		} else {
			res.status(404).json({ error: "Question not found" });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

module.exports = {
	createQuestion,
	getAllQuestions,
	getQuestionById,
	updateQuestion,
	deleteQuestion,
};
