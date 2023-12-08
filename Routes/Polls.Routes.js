const {
	getPollAnalytics,
	getOverallPollAnalytics,
} = require("../Controllers/PollAnalyticsController");
const {
	createPoll,
	getAllPolls,
	getPollById,
	updatePoll,
	deletePoll,
} = require("../Controllers/PollControllers");
const {
	createQuestion,
	getAllQuestions,
	getQuestionById,
	updateQuestion,
	deleteQuestion,
} = require("../Controllers/QuestionsControllers");
const { submitVote } = require("../Controllers/votingController");
const authenticateToken = require("../Middlewares/authMiddleware");

const PollsRouter = require("express").Router();

PollsRouter.post("/", authenticateToken, createPoll);
PollsRouter.get("/", getAllPolls);
PollsRouter.get("/:pollId", getPollById);
PollsRouter.put("/:pollId", authenticateToken, updatePoll);
PollsRouter.delete("/:pollId", authenticateToken, deletePoll);

// CRUD operations for questions within a poll
PollsRouter.post("/:pollId/questions", createQuestion);
PollsRouter.get("/:pollId/questions", getAllQuestions);
PollsRouter.get("/:pollId/questions/:questionId", getQuestionById);
PollsRouter.put("/:pollId/questions/:questionId", updateQuestion);
PollsRouter.delete("/:pollId/questions/:questionId", deleteQuestion);

// Analytics---------------->
PollsRouter.get("/polls/:pollId/analytics", getPollAnalytics);
PollsRouter.get("/polls/analytics/overall", getOverallPollAnalytics);

// <---------Voting Routes------------------->
PollsRouter.post("/polls/:pollId/vote", submitVote);
// <------------------------------------------------------>

module.exports = { PollsRouter };
