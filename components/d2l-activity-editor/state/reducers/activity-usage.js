import produce from "immer";

import {
	ADD_ACTIVITY_USAGE_ENTITY,
	UPDATE_ACTIVITY_USAGE_DUE_DATE,
	UPDATE_ACTIVITY_USAGE_VISIBILITY
} from '../actions/activity-usage.js';

const INITIAL_STATE = {
	entities: {}
};

const activityUsage = produce((draft, action) => {
	switch (action.type) {
		case ADD_ACTIVITY_USAGE_ENTITY:
			draft.entities[action.payload.href] = action.payload;
			break;
		case UPDATE_ACTIVITY_USAGE_DUE_DATE:
			draft.entities[action.payload.href].dueDate = action.payload.dueDate;
			break;
		case UPDATE_ACTIVITY_USAGE_VISIBILITY:
			draft.entities[action.payload.href].isDraft = action.payload.isDraft;
			break;
	}
}, INITIAL_STATE);

export default activityUsage;
