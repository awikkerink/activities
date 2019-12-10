import { AssignmentEntity } from 'siren-sdk/src/activities/assignments/AssignmentEntity.js';
import { AssignmentActivityUsageEntity } from 'siren-sdk/src/activities/assignments/AssignmentActivityUsageEntity.js';
import { createSlice } from 'siren-sdk/src/redux-toolkit/createSlice.js';
export { default as storeName } from '../../state/store-name.js';
import fetchEntity from '../../state/fetch-entity.js';

export const fetchAssignment = (href, token) => (dispatch, getState) => {
	fetchEntity(dispatch, getState(), href, token, selectAssignmentSirenEntity, addAssignment);
};

const prepareAddAssignment = (payload) => {
	const entity = new AssignmentEntity(payload.sirenEntity, payload.token, { remove: () => { } });
	return {
		payload: {
			href: payload.href,
			_entity: entity,
			_sirenEntity: entity,
			name: entity.name(),
			instructions: entity.instructionsEditorHtml(),
		}
	}
};

export const saveAssignment = (href, token) => async (dispatch, getState) => {
	const assignment = selectAssignment(getState(), href, token);
	const entity = selectAssignmentEntity(getState(), href, token);
	await entity.save(assignment);

	dispatch(fetchAssignment(href, token));
};

export const fetchActivity = (href, token) => (dispatch, getState) => {
	fetchEntity(dispatch, getState(), href, token, selectActivitySirenEntity, addActivity);
};

const prepareAddActivity = (payload) => {
	const entity = new AssignmentActivityUsageEntity(payload.sirenEntity, payload.token, { remove: () => { } });
	return {
		payload: {
			href: payload.href,
			_entity: entity,
			_sirenEntity: payload.sirenEntity
		}
	}
};

const INITIAL_STATE = {
	assignments: {},
	activities: {}
};

const assignmentSlice = createSlice({
	name: 'assignmentEditor',
	initialState: INITIAL_STATE,
	reducers: {
		updateName: (state, action) => {
			state.assignments[action.payload.href].name = action.payload.name;
		},
		updateInstructions: (state, action) => {
			state.assignments[action.payload.href].instructions = action.payload.instructions;
		},
		addAssignment: {
			reducer: (state, action) => {
				state.assignments[action.payload.href] = action.payload;
			},
			prepare: prepareAddAssignment
		},
		addActivity: {
			reducer: (state, action) => {
				state.activities[action.payload.href] = action.payload;
			},
			prepare: prepareAddActivity
		}
	}
});

export const selectActivity = (state, href, token) => {
	return state.assignmentEditor.activities[href];
}

export const selectActivityEntity = (state, href, token) => {
	const activity = selectActivity(state, href, token);
	return activity ? activity._entity : null;
}

export const selectActivitySirenEntity = (state, href, token) => {
	const activity = selectActivity(state, href, token);
	return activity ? activity._sirenEntity : null;
}

export const selectAssignment = (state, href, token) => {
	return state.assignmentEditor.assignments[href];
}

export const selectAssignmentEntity = (state, href, token) => {
	const assignment = selectAssignment(state, href, token);
	return assignment ? assignment._entity : null;
}

const selectAssignmentSirenEntity = (state, href, token) => {
	const assignment = selectAssignment(state, href, token);
	return assignment ? assignment._sirenEntity : null;
}

const { addAssignment, addActivity } = assignmentSlice.actions;
export const { updateName, updateInstructions } = assignmentSlice.actions;

export default {
	assignmentEditor: assignmentSlice.reducer
}