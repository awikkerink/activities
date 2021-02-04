import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';

export const LitQuickEvalLocalize = superclass => class extends LocalizeMixin(superclass) {
	static async getLocalizeResources(langs) {
		let translations;
		for (const lang of langs) {
			switch (lang) {
				case 'ar':
					translations = (await import('./lang/ar.js')).LangAr;
					break;
				case 'da-dk':
					translations = (await import('./lang/da-dk.js')).LangDadk;
					break;
				case 'de':
					translations = (await import('./lang/de.js')).LangDe;
					break;
				case 'en':
					translations = (await import('./lang/en.js')).LangEn;
					break;
				case 'es':
					translations = (await import('./lang/es.js')).LangEs;
					break;
				case 'fi':
					translations = (await import('./lang/fi.js')).LangFi;
					break;
				case 'fr':
					translations = (await import('./lang/fr.js')).LangFr;
					break;
				case 'fr-fr':
					translations = (await import('./lang/fr-fr.js')).LangFrfr;
					break;
				case 'ja':
					translations = (await import('./lang/ja.js')).LangJa;
					break;
				case 'ko':
					translations = (await import('./lang/ko.js')).LangKo;
					break;
				case 'nl':
					translations = (await import('./lang/nl.js')).LangNl;
					break;
				case 'pt':
					translations = (await import('./lang/pt.js')).LangPt;
					break;
				case 'sv':
					translations = (await import('./lang/sv.js')).LangSv;
					break;
				case 'tr':
					translations = (await import('./lang/tr.js')).LangTr;
					break;
				case 'zh-tw':
					translations = (await import('./lang/zh-tw.js')).LangZhtw;
					break;
				case 'zh':
					translations = (await import('./lang/zh.js')).LangZh;
					break;
			}
			if (translations) {
				return {
					language: lang,
					resources: translations
				};
			}
		}
		return {
			language: 'en',
			resources: await import('./lang/en.js').LangEn
		};
	}
};
