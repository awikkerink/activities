import { resolveUrl } from '@polymer/polymer/lib/utils/resolve-url.js';

export async function getLocalizeResources(langs, importMetaUrl) {
	const imports = [];
	let supportedLanguage;
	for (const language of langs.reverse()) {
		if (['en', 'ar', 'de', 'es', 'fr', 'ja', 'ko', 'nl', 'pt', 'sv', 'tr', 'zh', 'zh-tw'].includes(language)) {
			supportedLanguage = language;
			imports.push(import(resolveUrl(`./lang/${language}.js`, importMetaUrl)));
		}
	}

	const translationFiles = await Promise.all(imports);
	const langterms = {};
	for (const translationFile of translationFiles) {
		for (const langterm in translationFile.default) {
			langterms[langterm] = translationFile.default[langterm];
		}
	}

	return {
		language: supportedLanguage,
		resources: langterms
	};
}
