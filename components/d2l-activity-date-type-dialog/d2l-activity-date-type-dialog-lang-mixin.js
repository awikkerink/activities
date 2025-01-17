import { LocalizeDynamicMixin } from '@brightspace-ui/core/mixins/localize-dynamic-mixin.js';

export const LocalizeActivityDateTypeDialogMixin = superclass => class extends LocalizeDynamicMixin(superclass) {

	static get localizeConfig() {
		return {
			importFunc: async lang => (await import(`./lang/${lang}.js`)).default,
			osloCollection: 'd2l-activities\\d2l-activity-date-type-dialog',
		};
	}
};
