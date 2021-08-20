import { bodySmallStyles, labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { css, html } from 'lit-element/lit-element.js';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { LocalizeActivityEditorMixin } from '../mixins/d2l-activity-editor-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import store from './state/activity-evaluators-store.js';


class ActivityEvaluatorDelegationSummary
	extends ActivityEditorMixin(RtlMixin(LocalizeActivityEditorMixin(MobxLitElement))) {

	static get styles() {

		return [
			bodySmallStyles,
			labelStyles,
			css`
			.d2l-body-small {
				margin: 0 0 0.3rem 0;
			}

			d2l-input-checkbox-spacer {
				margin-top: -0.9rem;
			}

			d2l-input-checkbox-spacer[hidden] {
				display: none;
			}
			`
		];
	}

	constructor() {
		super(store);
	}

	_renderEvaluators(evaluators) {





	}

	render() {

		const entity = store.get(this.href);
		if (!entity) {
			return html``;
		}

		let students = entity.getStudents();
		let evaluators = entity.getEvaluators();

		const itemTemplate = [];

		return html`${itemTemplate}`;
	}

}
customElements.define(
	'd2l-activity-evaluator-delegation-summary',
	ActivityEvaluatorDelegationSummary
);
