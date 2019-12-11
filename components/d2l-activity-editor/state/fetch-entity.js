
export default async (dispatch, state, href, token, prevEntitySelector, actionCreator) => {
	let entity = await window.D2L.Siren.EntityStore.get(href, token);
	if (!entity) {
		const fetched = await window.D2L.Siren.EntityStore.fetch(href, token);
		if (!fetched || !fetched.entity) {
			return;
		}
		entity = fetched.entity;
	}

	const oldValue = prevEntitySelector(state, href, token);
	if (entity === oldValue) {
		return;
	}

	const action = actionCreator({
		href,
		token,
		sirenEntity: entity
	});
	dispatch(action);
}
