import { AssignmentEntity } from 'siren-sdk/src/activities/assignments/AssignmentEntity.js';
import { createAction } from 'siren-sdk/src/redux-toolkit/createAction.js';
import { createReducer } from 'siren-sdk/src/redux-toolkit/createReducer.js';

const addEntity = createAction('ADD_ASSIGNMENT_ENTITY', (payload) => {
	const assignment = new AssignmentEntity(payload.entity, payload.token, { remove: () => { } });
	return {
		payload: {
			href: payload.href,
			token: payload.token,
			name: assignment.name(),
			instructions: assignment.instructionsEditorHtml(),
			entity: assignment
		}
	}
});

export const fetchEntity = (href, token) => async (dispatch) => {
	const entity = await window.D2L.Siren.EntityStore.fetch(href, token);
	const action = addEntity({
		href,
		token,
		entity: entity.entity
	});
	dispatch(action);
};

const INITIAL_STATE = {
	entities: {}
};

export default createReducer(INITIAL_STATE, {
	[addEntity]: (state, action) => {
		state.entities[action.payload.href] = action.payload;
	}
});
