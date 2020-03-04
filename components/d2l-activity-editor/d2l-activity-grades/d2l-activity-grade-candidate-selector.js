import { css, html } from 'lit-element/lit-element';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { bodySmallStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { formatPercent } from '@brightspace-ui/intl/lib/number.js';
import { getLocalizeResources } from '../localization.js';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { selectStyles } from '@brightspace-ui/core/components/inputs/input-select-styles';
import { shared as store } from './state/grade-candidate-collection-store.js';

class ActivityGradeCandidateSelector extends ActivityEditorMixin(LocalizeMixin(MobxLitElement)) {
	static get properties() {
		return {
			selected: { type: Object }
		};
	}

	static get styles() {
		return [
			bodySmallStyles,
			selectStyles,
			css`
			:host {
				display: block;
			}
			`
		];
	}

	static async getLocalizeResources(langs) {
		return getLocalizeResources(langs, import.meta.url);
	}

	constructor() {
		super(store);
	}

	_renderGradeCandidateTemplates(gradeCandidates, selected) {
		return gradeCandidates.map(gc => {
			if (gc.isCategory) {
				return this._renderGradeCategory(gc, selected);
			} else {
				return this._renderGradeCandidate(gc, selected);
			}
		});
	}

	_renderGradeCandidate(gc, selected) {
		return html`<option value="${gc.href}" ?selected="${gc.href === selected.href}">${gc.name}</option>`;
	}

	_renderGradeCategory(gradeCategory, selected) {
		return html`
			<optgroup label="${gradeCategory.name}">
				${gradeCategory.gradeCandidates.map(gc => this._renderGradeCandidate(gc, selected))}
			</optgroup>
		`;
	}

	_setSelected(event) {
		if (event && event.target && event.target.value) {
			const collection = store.get(this.href);
			if (collection) {
				collection.setSelected(event.target.value);
			}
		}
	}

	render() {
		const collection = store.get(this.href);

		if (!collection) {
			return html``;
		}

		const {
			gradeCandidates,
			selected
		} = collection;

		const percentWeight = selected.baseWeight !== undefined ? formatPercent(selected.baseWeight / 100, { maximumFractionDigits: 10 }) : '';

		return html`
			<select
				id="grade-candidates"
				class="d2l-input-select"
				@change="${this._setSelected}"
			>
				${this._renderGradeCandidateTemplates(gradeCandidates, selected)}
			</select>
			<div class="d2l-body-small">
				${this.localize('points', {points: selected.maxPoints})} ${selected.baseWeight !== undefined && html`• ${this.localize('weight', { weight: percentWeight })}`}
			</div>
		`;
	}
}

customElements.define('d2l-activity-grade-candidate-selector', ActivityGradeCandidateSelector);
