import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import 'd2l-localize-behavior/d2l-localize-behavior.js';

/* @polymerMixin */
const ActivityListItemLocalizeImpl = (superClass) => {

	return class extends mixinBehaviors([D2L.PolymerBehaviors.LocalizeBehavior], superClass) {
		constructor() {
			super();
			this.resources = {
				'en': import('./lang/en.js'),
				'ar': import('./lang/ar.js'),
				'da-dk': import('./lang/da-dk.js'),
				'de': import('./lang/de.js'),
				'es': import('./lang/es.js'),
				'fi': import('./lang/fi.js'),
				'fr': import('./lang/fr.js'),
				'fr-fr': import('./lang/fr-fr.js'),
				'ja': import('./lang/ja.js'),
				'ko': import('./lang/ko.js'),
				'nl': import('./lang/nl.js'),
				'pt': import('./lang/pt.js'),
				'sv': import('./lang/sv.js'),
				'tr': import('./lang/tr.js'),
				'zh': import('./lang/zh.js'),
				'zh-tw': import('./lang/zh-tw.js')
			};
		}
		static get properties() {
			return {
				locale: {
					type: String,
					value: function() {
						return document.documentElement.lang
							|| document.documentElement.getAttribute('data-lang-default')
							|| 'en-us';
					}
				}
			};
		}
	};
};

export const ActivityListItemLocalize = ActivityListItemLocalizeImpl;

