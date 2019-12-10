import { ActivityUsageEntity } from 'siren-sdk/src/activities/ActivityUsageEntity';
import { createSlice } from 'siren-sdk/src/redux-toolkit/createSlice.js';
export { default as storeName } from './store-name.js';

const prepareAddActivity = (payload) => {
	const entity = new ActivityUsageEntity(payload.entity, payload.token, { remove: () => { } });
	return {
		payload: {
			href: payload.href,
			token: payload.token,
			entity,
			dueDate: entity.dueDate(),
			isDraft: entity.isDraft()
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

export const saveActivity = (href, token) => async (dispatch, getState) => {
	const activity = selectActivity(getState(), href, token);
	const entity = selectActivityEntity(getState(), href, token);
	await entity.save(activity);

	// dispatch(action);
};

const INITIAL_STATE = {
	activities: {}
};

const activitySlice = createSlice({
	name: 'activityEditor',
	initialState: INITIAL_STATE,
	reducers: {
		updateDueDate: (state, action) => {
			state.activities[action.payload.href].dueDate = action.payload.date;
		},
		updateVisibility: (state, action) => {
			state.activities[action.payload.href].isDraft = action.payload.isDraft;
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
	return state.activityEditor.activities[href];
}

export const selectActivityEntity = (state, href, token) => {
	return state.activityEditor.activities[href].entity;
}

const { addActivity } = activitySlice.actions;
export const { updateDueDate, updateVisibility } = activitySlice.actions;

export default {
	activityEditor: activitySlice.reducer
}
