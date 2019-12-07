import { AssignmentEntity } from 'siren-sdk/src/activities/assignments/AssignmentEntity.js';
import { createSlice } from 'siren-sdk/src/redux-toolkit/createSlice.js';

const prepareAddEntity = (payload) => {
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

export const fetchEntity = (href, token) => async (dispatch) => {
	const entity = await window.D2L.Siren.EntityStore.fetch(href, token);
	const action = addActivity({
		href,
		token,
		entity: entity.entity
	});
	dispatch(action);
};

const INITIAL_STATE = {
	activities: {}
};

const activitySlice = createSlice({
	name: 'assignmentEditor',
	initialState: INITIAL_STATE,
	reducers: {
		updateName: (state, action) => {
			state.activities[action.payload.href].name = action.payload.name;
		},
		updateInstructions: (state, action) => {
			state.activities[action.payload.href].instructions = action.payload.instructions;
		},
		addActivity: {
			reducer: (state, action) => {
				state.activities[action.payload.href] = action.payload;
			},
			prepare: prepareAddEntity
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

const { addActivity} = activitySlice.actions;
export const { updateName, updateInstructions } = activitySlice.actions;

export default {
	assignmentEditor: activitySlice.reducer
}