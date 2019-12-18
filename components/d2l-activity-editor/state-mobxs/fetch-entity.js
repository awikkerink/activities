export default async (href, token) => {
	let entity = await window.D2L.Siren.EntityStore.get(href, token);
	if (!entity) {
		const fetched = await window.D2L.Siren.EntityStore.fetch(href, token);
		if (!fetched || !fetched.entity) {
			throw new Error('Cannot load entity');
		}
		entity = fetched.entity;
	}
	return entity;
}
