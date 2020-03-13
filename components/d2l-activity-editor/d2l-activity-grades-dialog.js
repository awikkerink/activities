import './d2l-activity-grades/d2l-activity-grade-candidate-selector';
import '@brightspace-ui/core/components/button/button.js';
import '@brightspace-ui/core/components/dialog/dialog.js';
import '@brightspace-ui/core/components/icons/icon.js';
import '@brightspace-ui/core/components/inputs/input-radio-spacer.js';
import { css, html } from 'lit-element/lit-element';
import { ActivityEditorMixin } from './mixins/d2l-activity-editor-mixin.js';
import { bodySmallStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { formatNumber } from '@brightspace-ui/intl/lib/number.js';
import { getLocalizeResources } from './localization';
import { shared as gradeCandidateCollectionStore } from './d2l-activity-grades/state/grade-candidate-collection-store.js';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { radioStyles } from '@brightspace-ui/core/components/inputs/input-radio-styles.js';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { shared as store } from './state/activity-store.js';

class ActivityGradesDialog extends ActivityEditorMixin(LocalizeMixin(RtlMixin(MobxLitElement))) {

	static get properties() {
		return {
			activityName: { type: String }
		};
	}

	static get styles() {
		return [
			bodySmallStyles,
			radioStyles,
			css`
			:host {
				display: block;
			}
			:host([hidden]),
			[hidden] {
				display: none !important;
			}
			.d2l-activity-grades-dialog-create-new-container {
				display: flex;
			}
			.d2l-activity-grades-dialog-create-new-activity-name {
				word-break: break-word;
				overflow-wrap: anywhere; /* not supported by safari */
			}
			.d2l-activity-grades-dialog-create-new-icon {
				padding-right: 10px;
			}
			:host([dir="rtl"]) .d2l-activity-grades-dialog-create-new-icon {
				padding-right: 0;
				padding-left: 10px;
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

	async open() {
		const scoreAndGrade = store.get(this.href).scoreAndGrade;
		const existingAssociatedGradeHref = scoreAndGrade.gradeHref;
		const dialog = this.shadowRoot.querySelector('d2l-dialog');

		const action = await dialog.open();
		if (action !== 'done') {
			return;
		}

		this._associateToExistingGrade(scoreAndGrade, existingAssociatedGradeHref);
	}

	_associateToExistingGrade(scoreAndGrade, existingAssociatedGradeHref) {
		const gradeCandidateCollection = gradeCandidateCollectionStore.get(scoreAndGrade.gradeCandidatesHref);
		const newGradeCandidateSelected = gradeCandidateCollection.selected;
		if (existingAssociatedGradeHref && existingAssociatedGradeHref === newGradeCandidateSelected.href) {
			return;
		}

		scoreAndGrade.setAssociatedGrade(newGradeCandidateSelected);
	}

	render() {
		const activity = store.get(this.href);
		if (!activity) {
			return html``;
		}

		const {
			scoreOutOf,
			scoreOutOfError,
			gradeCandidatesHref
		} = activity.scoreAndGrade;

		return html`
			<d2l-dialog title-text="${this.localize('chooseFromGrades')}">
				<label class="d2l-input-radio-label">
					<input
						type="radio"
						name="chooseFromGrades">
					${this.localize('createAndLinkToNewGradeItem')}
				</label>
				<d2l-input-radio-spacer>
					<div class="d2l-activity-grades-dialog-create-new-container">
						<div class="d2l-activity-grades-dialog-create-new-icon"><d2l-icon icon="tier1:grade"></d2l-icon></div>
						<div>
							<div class="d2l-activity-grades-dialog-create-new-activity-name">${this.activityName}</div>
							<div class="d2l-body-small">${scoreOutOf && !scoreOutOfError ? html`
								${this.localize('points', { points: formatNumber(scoreOutOf, { maximumFractionDigits: 2 })})}
							` : null }
							</div>
						</div>
					</div>
				</d2l-input-radio-spacer>
				<label class="d2l-input-radio-label">
					<input
						type="radio"
						name="chooseFromGrades">
					${this.localize('linkToExistingGradeItem')}
				</label>
				<d2l-input-radio-spacer>
					<d2l-activity-grade-candidate-selector
						href="${gradeCandidatesHref}"
						.token="${this.token}">
					</d2l-activity-grade-candidate-selector>
				</d2l-input-radio-spacer>
				<d2l-button slot="footer" primary dialog-action="done">${this.localize('ok')}</d2l-button>
				<d2l-button slot="footer" dialog-action="cancel">${this.localize('cancel')}</d2l-button>
			</d2l-dialog>
		`;
	}
}
customElements.define('d2l-activity-grades-dialog', ActivityGradesDialog);
