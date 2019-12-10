import { AssignmentEntity } from 'siren-sdk/src/activities/assignments/AssignmentEntity.js';
import { AssignmentActivityUsageEntity } from 'siren-sdk/src/activities/assignments/AssignmentActivityUsageEntity.js';
import { createSlice } from 'siren-sdk/src/redux-toolkit/createSlice.js';
export { default as storeName } from '../../state/store-name.js';

const prepareAddAssignment = (payload) => {
	const entity = new AssignmentEntity(payload.entity, payload.token, { remove: () => { } });
	return {
		payload: {
			href: payload.href,
			token: payload.token,
			entity,
			name: entity.name(),
			instructions: entity.instructionsEditorHtml(),
		}
	}
};

export const fetchAssignment = (href, token) => async (dispatch) => {
	const entity = await window.D2L.Siren.EntityStore.fetch(href, token);
	const action = addAssignment({
		href,
		token,
		entity: entity.entity
	});
	dispatch(action);
};

const prepareAddActivity = (payload) => {
	const entity = new AssignmentActivityUsageEntity(payload.entity, payload.token, { remove: () => { } });
	return {
		payload: {
			href: payload.href,
			token: payload.token,
			entity
		}
	}
};

export const fetchActivity = (href, token) => async (dispatch) => {
	const entity = await window.D2L.Siren.EntityStore.fetch(href, token);
	const action = addActivity({
		href,
		token,
		entity: entity.entity
	});
	dispatch(action);
};

export const saveAssignment = (href, token) => async (dispatch, getState) => {
	const assignment = selectAssignment(getState(), href, token);
	const entity = selectAssignmentEntity(getState(), href, token);
	await entity.save(assignment.name, assignment.instructions);

	// dispatch(action);
};

export const saveActivity = (href, token) => async (dispatch, getState) => {
	const activity = selectAssignment(getState(), href, token);
	const entity = selectActivityEntity(getState(), href, token);
	await entity.save(activity.name, activity.instructions);

	// dispatch(action);
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

const selectActivities = (state) => {
	return state.assignmentEditor.activities;
}

export const selectActivity = (state, href, token) => {
	return selectActivities(state)[href];
}

export const selectActivityEntity = (state, href, token) => {
	return selectActivities(state)[href].entity;
}

const selectAssignments = (state) => {
	return state.assignmentEditor.assignments;
}

export const selectAssignment = (state, href, token) => {
	return selectAssignments(state)[href];
}

export const selectAssignmentEntity = (state, href, token) => {
	return selectAssignments(state)[href].entity;
}

const { addAssignment, addActivity } = assignmentSlice.actions;
export const { updateName, updateInstructions } = assignmentSlice.actions;

export default {
	assignmentEditor: assignmentSlice.reducer
}