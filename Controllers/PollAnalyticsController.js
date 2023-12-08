const getPollAnalytics = async (req, res) => {
	try {
		const { pollId } = req.params;

		// Retrieve poll analytics (modify this based on your database structure)
		const pollAnalytics = await Polls.findOne({
			where: { id: pollId },
			include: [
				{
					model: Votes,
					attributes: ["selected_option"],
					include: [
						{
							model: Options,
							attributes: ["option_text"],
						},
					],
				},
			],
		});

		// Return the poll analytics in the response
		res.json({ success: true, data: pollAnalytics });
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
};

const getOverallPollAnalytics = async (req, res) => {
	try {
		// Retrieve overall poll analytics (modify this based on your database structure)
		const overallAnalytics = await Votes.findAll({
			attributes: ["selected_option"],
			include: [
				{
					model: Options,
					attributes: ["option_text"],
					include: [
						{
							model: Polls,
							attributes: ["id", "title"],
						},
					],
				},
			],
		});

		// Return the overall analytics in the response
		res.json({ success: true, data: overallAnalytics });
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
};

module.exports = { getPollAnalytics, getOverallPollAnalytics };
