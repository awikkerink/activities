export const SAVE_PAGE = 'SAVE';
export const GET_ENTITY = 'GET_ENTITY';
export const ADD_ENTITY = 'ADD_ENTITY';

export const savePage = () => {
	return {
		type: SAVE_PAGE
	};
};

const entityChanged = () => {

}

const addEntity = (href, token, entity) => {
	return {
		type: ADD_ENTITY,
		href,
		token,
		entity,
		unsubscribe
	};
}

export const fetchEntity = (href, token) => async (dispatch) => {
	const entity = await window.D2L.Siren.EntityStore.fetch(href, token);
	const action = addEntity(href, token, entity);
	dispatch(action);
};
