import { css, html } from 'lit-element/lit-element.js';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { LocalizeActivityQuizEditorMixin } from './mixins/d2l-activity-quiz-lang-mixin';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { shared as store } from './state/quiz-store';

class ActivityQuizHintsEditor
	extends ActivityEditorMixin(RtlMixin(LocalizeActivityQuizEditorMixin(MobxLitElement))) {

	static get styles() {

		return [
			labelStyles,
			css`
			:host {
				display: block;
			}

			:host([hidden]) {
				display: none;
			}

			d2l-input-checkbox {
				margin-top: 0.5rem;
				padding-right: 1rem;
			}

			:host([dir="rtl"]) d2l-input-checkbox {
				padding-left: 1rem;
				padding-right: 0;
			}
			`
		];
	}

	constructor() {

		super(store);
	}

	render() {

		const entity = store.get(this.href);
		if (!entity) {
			return html``;
		}

		entity.allowHints = true; // TODO: add this to store

		return html`
			<label class="d2l-label-text">
				${this.localize('displayTools')}
			</label>
			<d2l-input-checkbox
				@change="${this._toggleAnnotationToolsAvailability}"
				?checked="${entity.annotationToolsAvailable}"
				ariaLabel="${this.localize('hintsToolDescription')}"
				?disabled="${!entity.allowHints}">
				${this.localize('hintsToolDescription')}
			</d2l-input-checkbox>
		`;
	}
	_toggleAnnotationToolsAvailability(event) {

		const entity = store.get(this.href);
		entity.setAnnotationToolsAvailable(event.target.checked);
	}

}

customElements.define(
	'd2l-activity-quiz-hints-editor',
	ActivityQuizHintsEditor
);
