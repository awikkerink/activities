
export default async (state, dispatch, href, token, prevEntitySelector, actionCreator) => {
	const fetched = await window.D2L.Siren.EntityStore.fetch(href, token);
	if (!fetched) {
		return;
	}

	const oldValue = prevEntitySelector(state, href, token);
	if (fetched.entity === oldValue) {
		return;
	}

	const action = actionCreator({
		href,
		token,
		sirenEntity: fetched.entity
	});
	dispatch(action);
}
