import { resolveUrl } from '@polymer/polymer/lib/utils/resolve-url.js';

const SUPPORTED_LANGUAGES = ['en', 'fr'];
const cache = {};
const baseUrl = import.meta.url;

export async function getLocalizeResources(langs) {
	const supportedLanguages = langs.reverse().filter(language => {
		return SUPPORTED_LANGUAGES.indexOf(language) > -1;
	});

	const requests = supportedLanguages.map(language => {
		const url = resolveUrl(`./lang/${language}.json`, baseUrl);
		if (cache[url]) {
			return cache[url];
		}

		const request = fetch(url).then(res => res.json());
		cache[url] = request;
		return request;
	});

	const responses = await Promise.all(requests);

	const langterms = {};
	responses.forEach(language => {
		for (const langterm in language) {
			langterms[langterm] = language[langterm].translation;
		}
	});

	return {
		language: supportedLanguages[supportedLanguages.length - 1],
		resources: langterms
	};
}
