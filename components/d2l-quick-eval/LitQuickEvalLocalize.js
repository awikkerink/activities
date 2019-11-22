import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';

export const LitQuickEvalLocalize = superclass => class extends LocalizeMixin(superclass) {
	static async getLocalizeResources(langs) {
		let translations;
		for (const lang of langs) {
			switch (lang) {
				case 'ar':
					translations = (await import('./build/lang/ar.js')).LangAr;
					break;
				case 'da-dk':
					translations = (await import('./build/lang/da-dk.js')).LangDadk;
					break;
				case 'de':
					translations = (await import('./build/lang/de.js')).LangDe;
					break;
				case 'en':
					translations = (await import('./build/lang/en.js')).LangEn;
					break;
				case 'es':
					translations = (await import('./build/lang/es.js')).LangEs;
					break;
				case 'fi':
					translations = (await import('./build/lang/fi.js')).LangFi;
					break;
				case 'fr':
					translations = (await import('./build/lang/fr.js')).LangFr;
					break;
				case 'fr-fr':
					translations = (await import('./build/lang/fr-fr.js')).LangFrfr;
					break;
				case 'ja':
					translations = (await import('./build/lang/ja.js')).LangJa;
					break;
				case 'ko':
					translations = (await import('./build/lang/ko.js')).LangKo;
					break;
				case 'nl':
					translations = (await import('./build/lang/nl.js')).LangNl;
					break;
				case 'pt':
					translations = (await import('./build/lang/pt.js')).LangPt;
					break;
				case 'sv':
					translations = (await import('./build/lang/sv.js')).LangSv;
					break;
				case 'tr':
					translations = (await import('./build/lang/tr.js')).LangTr;
					break;
				case 'zh-tw':
					translations = (await import('./build/lang/zh-tw.js')).LangZhtw;
					break;
				case 'zh':
					translations = (await import('./build/lang/zh.js')).LangZh;
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
			resources: await import('./build/lang/en.js').LangEn
		};
	}
};
