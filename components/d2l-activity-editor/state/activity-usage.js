import { ActivityUsageEntity } from 'siren-sdk/src/activities/ActivityUsageEntity';
import { createSlice } from 'siren-sdk/src/redux-toolkit/createSlice.js';
export { default as storeName } from './store-name.js';
import fetchEntity from './fetch-entity.js';

export const fetchActivity = (href, token) => (dispatch, getState) => {
	fetchEntity(dispatch, getState(), href, token, selectActivitySirenEntity, addActivity);
}

const prepareAddActivity = (payload) => {
	const entity = new ActivityUsageEntity(payload.sirenEntity, payload.token, { remove: () => { } });
	return {
		payload: {
			href: payload.href,
			_entity: entity,
			_sirenEntity: payload.sirenEntity,
			dueDate: entity.dueDate(),
			isDraft: entity.isDraft()
		}
	}
};

export const saveActivity = (href, token) => async (dispatch, getState) => {
	const activity = selectActivity(getState(), href, token);
	const entity = selectActivityEntity(getState(), href, token);
	await entity.save(activity);

	dispatch(fetchActivity(href, token));
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
	const activity = selectActivity(state, href, token);
	return activity ? activity._entity : null;
}

const selectActivitySirenEntity = (state, href, token) => {
	const activity = selectActivity(state, href, token);
	return activity ? activity._sirenEntity : null;
}


const { addActivity } = activitySlice.actions;
export const { updateDueDate, updateVisibility } = activitySlice.actions;

export default {
	activityEditor: activitySlice.reducer
}
