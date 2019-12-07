import { ActivityUsageEntity } from 'siren-sdk/src/activities/ActivityUsageEntity';
// import { createSelector } from 'reselect';
import { createSlice } from 'siren-sdk/src/redux-toolkit/createSlice.js';

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

// const selectActivities = state => {
// 	return state.activityEditor.activities;
// }
// const selectHref = (state, href) => {
// 	return href;
// }

// const selectToken = (state, href, token) => {
// 	return token;
// }

// export const selectActivityEntity = createSelector(
// 	[selectActivities, selectHref, selectToken],
// 	(activities, href, token) => {
// 		return new ActivityUsageEntity(activities[href].entity, token, { remove: () => { } });
// 	}
// );

// export const selectActivity = createSelector(
// 	[selectActivities, selectHref, selectToken],
// 	(activities, href, token) => {
// 		return activities[href];
// 	}
// )

export const selectActivity = (state, href, token) => {
	return state.activityEditor.activities[href];
}

export const selectActivityEntity = (state, href, token) => {
	return state.activityEditor.activities[href].entity;
}

// export const selectActivity = createSelector(
// 	[selectActivities, selectHref, selectToken],
// 	(activities, href, token) => {
// 		return activities[href];
// 	}
// )

const { addActivity } = activitySlice.actions;
export const { updateDueDate, updateVisibility } = activitySlice.actions;

export default {
	activityEditor: activitySlice.reducer
}
