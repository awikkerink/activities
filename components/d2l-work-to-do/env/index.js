// TODO Integrate JOI/Validation of configurable options
import { Classes } from 'siren-sdk/src/hypermedia-constants';

export const Config = {
	OverdueWeekLimit: 6,
	UpcomingWeekLimit: 2,
};

export const Constants = {
	APINamespace: 'api.dev.brightspace.com',
	DaysPerWeek: 7,
	MaxDays: 365,
	MaxActivityCount: 99,
	MaxWidgetDisplay: 6,
};

export const ActivityAllowList = {
	userAssignmentActivity: {
		class: Classes.activities.userAssignmentActivity,
		icon: 'tier2:assignments',
		type: 'Assignment'
	},
	userChecklistActivity: {
		class: Classes.activities.userChecklistActivity,
		icon: 'tier2:checklist',
		type: 'Checklist'
	},
	userContentActivity: {
		class: Classes.activities.userContentActivity,
		icon: 'tier2:content',
		type: 'Content'
	},
	userCourseOfferingActivity: {
		class: Classes.activities.userCourseOfferingActivity,
		icon: 'tier2:syllabus',
		type: 'Course'
	},
	userDiscussionActivity: {
		class: Classes.activities.userDiscussionActivity,
		icon: 'tier2:discussions',
		type: 'Discussion'
	},
	userQuizActivity: {
		class: Classes.activities.userQuizActivity,
		icon: 'tier2:quizzing',
		type: 'Quiz'
	},
	userQuizAttemptActivity: {
		class: Classes.activities.userQuizAttemptActivity,
		icon: 'tier2:quizzing',
		type: 'Quiz'
	},
	userSurveyActivity: {
		class: Classes.activities.userSurveyActivity,
		icon: 'tier2:surveys',
		type: 'Survey'
	}
};
