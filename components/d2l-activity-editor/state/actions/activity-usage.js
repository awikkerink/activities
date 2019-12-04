import { ActivityUsageEntity } from 'siren-sdk/src/activities/ActivityUsageEntity';

export const ADD_ACTIVITY_USAGE_ENTITY = 'ADD_ACTIVITY_USAGE_ENTITY';
export const UPDATE_ACTIVITY_USAGE_DUE_DATE = 'UPDATE_ACTIVITY_USAGE_DUE_DATE';
export const UPDATE_ACTIVITY_USAGE_VISIBILITY = 'UPDATE_ACTIVITY_USAGE_VISIBILITY';


const addEntity = (href, token, entity) => {
	const activityUsageEntity = new ActivityUsageEntity(entity, token, { remove: () => {} });
	return {
		type: ADD_ACTIVITY_USAGE_ENTITY,
		payload: {
			href,
			token,
			entity: activityUsageEntity,
			dueDate: activityUsageEntity.dueDate(),
			canEditDueDate: activityUsageEntity.canEditDueDate(),
			isDraft: activityUsageEntity.isDraft(),
			canEditDraft: activityUsageEntity.canEditDueDate()
		}
	};
}

export const updateDueDate = (href, token, dueDate) => {
	return {
		type: UPDATE_ACTIVITY_USAGE_DUE_DATE,
		payload: {
			href,
			token,
			dueDate,
		}
	};
}

export const updateVisibility = (href, token, isDraft) => {
	return {
		type: UPDATE_ACTIVITY_USAGE_VISIBILITY,
		payload: {
			href,
			token,
			isDraft,
		}
	};
}

export const fetchEntity = (href, token) => async (dispatch) => {
	const entity = await window.D2L.Siren.EntityStore.fetch(href, token);
	const action = addEntity(href, token, entity.entity);
	dispatch(action);
};
