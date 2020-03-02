import './d2l-activity-grade-candidate';
import { css, html } from 'lit-element/lit-element';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { selectStyles } from '@brightspace-ui/core/components/inputs/input-select-styles';
import { shared as store } from './state/grade-candidate-collection-store.js';

class ActivityGradeCandidateSelector extends (ActivityEditorMixin(MobxLitElement)) {
	static get properties() {
		return {
			selected: { type: Object }
		};
	}

	static get styles() {
		return [
			selectStyles,
			css`
			:host {
				display: block;
			}
			`
		];
	}

	constructor() {
		super(store);
	}

	_setSelected(e) {
		//this.selected = this._gradeCandidateHrefs[e.target.selectedIndex];
	}

	_renderGradeCandidateTemplates(gradeCandidates) {
		return gradeCandidates.map(gc => {
			if (gc.isCategory) {
				return this._renderGradeCategory(gc);
			} else {
				return this._renderGradeCandidate(gc);
			}
		});
	}

	_renderGradeCandidate(gc) {
		return html`<option>${gc.name}</option>`;
	}

	_renderGradeCategory(gradeCategory) {
		return html`
			<optgroup label="${gradeCategory.name}">
				${gradeCategory.gradeCandidates.map(gc => this._renderGradeCandidate(gc))}
			</optgroup>
		`;
	}

	render() {
		const collection = store.get(this.href);

		if (!collection) {
			return html``;
		}

		const {
			gradeCandidates
		} = collection;

		return html`
			<select
				id="grade-candidates"
				class="d2l-input-select"
				@change="${this._setSelected}"
			>
				${this._renderGradeCandidateTemplates(gradeCandidates)}
			</select>
		`;
	}
}

customElements.define('d2l-activity-grade-candidate-selector', ActivityGradeCandidateSelector);
