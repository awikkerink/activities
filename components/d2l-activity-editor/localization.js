import { resolveUrl } from '@polymer/polymer/lib/utils/resolve-url.js';
import { getLocalizeResources as getLocalizeResourcesHelper } from '@brightspace-ui/core/helpers/getLocalizeResources.js';

const SupportedLanguages = new Set([
	'en', 'ar', 'de', 'es', 'fr', 'ja', 'ko', 'nl', 'pt', 'sv', 'tr', 'zh',
	'zh-tw'
]);

export function getLocalizeResources(possibleLanguages, importMetaUrl) {

	function filterFunc(language) {
		return SupportedLanguages.has(language);
	}

	function resolveFunc(language) {
		return resolveUrl(`./lang/${language}.js`, importMetaUrl);
	}

	async function importFunc(url) {
		try {
			const module = await import(url);
			return module.default;
		} catch (err) {
			return null;
		};
	}

	return getLocalizeResourcesHelper(
		possibleLanguages,
		filterFunc,
		resolveFunc,
		importFunc
	);
}
