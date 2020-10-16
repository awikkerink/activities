import { getLocalizeOverrideResources } from '@brightspace-ui/core/helpers/getLocalizeResources.js';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';

export const LocalizeActivityQuizEditorMixin = superclass => class extends LocalizeMixin(superclass) {

	static async getLocalizeResources(langs) {

		function resolveOverridesFunc() {
			return 'd2l-activities\\quizActivityEditor';
		}

		let translations;
		for await (const lang of langs) {
			switch (lang) {
				case 'en':
					translations = await import('../lang/en.js');
					break;
			}
			if (translations && translations.default) {
				return await getLocalizeOverrideResources(
					lang,
					translations.default,
					resolveOverridesFunc
				);
			}
		}
		translations = await import('../lang/en.js');

		return await getLocalizeOverrideResources(
			'en',
			translations.default,
			resolveOverridesFunc
		);
	}
};
