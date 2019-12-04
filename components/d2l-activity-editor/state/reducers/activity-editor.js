import produce from "immer";

import {
	SAVE_PAGE,
	ADD_ENTITY
} from '../actions/app.js';

const INITIAL_STATE = {
	entities: {}
};

const activityEditor = produce((draft = INITIAL_STATE, action) => {
	switch (action.type) {
		// case SAVE_PAGE:

		case ADD_ENTITY:
			draft.entities[action.href] = {
				entity: action.entity,
				unsubscribe: action.unsubscribe
			}
	}
}, INITIAL_STATE);

export default activityEditor;
