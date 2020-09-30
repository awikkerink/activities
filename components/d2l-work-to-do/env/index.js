// TODO Integrate JOI/Validation of configurable options

export const config = {
	PAST_WEEK_LIMIT: 6,
	FUTURE_DAY_LIMIT: 14,
};

export const constants = {
	APINamespace: 'api.dev.brightspace.com',
	DaysPerWeek: 7,
	MaxActivityCount: 99,
	MaxWidgetDisplay: 6,
	iconMapping: {
		assignment: 'tier2:assignments',
		checklist: 'tier2:checklist',
		content: 'tier2:content',
		discussion: 'tier2:discussions',
		fallback: 'tier2:preview',
		folio: 'tier2:eportfolio',
		survey: 'tier2:surveys',
		trackedCourse: 'tier2:course-tile-sort',
		quizAttempt: 'tier2:quizzing',
	}
};
