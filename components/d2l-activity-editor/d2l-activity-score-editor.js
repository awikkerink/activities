import './d2l-activity-grades/d2l-activity-grades-dialog.js';
import '@brightspace-ui/core/components/button/button.js';
import '@brightspace-ui/core/components/colors/colors.js';
import '@brightspace-ui/core/components/dialog/dialog.js';
import '@brightspace-ui/core/components/icons/icon.js';
import '@brightspace-ui/core/components/inputs/input-radio-spacer.js';
import '@brightspace-ui/core/components/inputs/input-number';
import '@brightspace-ui/core/components/dropdown/dropdown.js';
import '@brightspace-ui/core/components/dropdown/dropdown-menu.js';
import '@brightspace-ui/core/components/menu/menu.js';
import '@brightspace-ui/core/components/menu/menu-item.js';
import 'd2l-tooltip/d2l-tooltip';
import { sharedAssociateGrade as associateGradeStore, sharedScoring as scoringStore, shared as store } from './state/activity-store.js';
import { bodyCompactStyles, labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { css, html } from 'lit-element/lit-element';
import { ActivityEditorMixin } from './mixins/d2l-activity-editor-mixin.js';
import { GradebookStatus } from 'siren-sdk/src/activities/associateGrade/AssociateGradeEntity.js';
import { inputStyles } from '@brightspace-ui/core/components/inputs/input-styles.js';
import { LocalizeActivityEditorMixin } from './mixins/d2l-activity-editor-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin.js';

class ActivityScoreEditor extends ActivityEditorMixin(SkeletonMixin(LocalizeActivityEditorMixin(RtlMixin(MobxLitElement)))) {

	static get properties() {
		return {
			activityName: { type: String },
			allowUngraded: { type: Boolean },
			disableNotInGradebook: { type: Boolean },
			disableResetToUngraded: { type: Boolean },
			hasActivityScore: { type: Boolean },
			_associateGradeHref: { type: String },
			_createSelectboxGradeItemEnabled: { type: Boolean },
			_focusUngraded: { type: Boolean },
			_scoringHref: { type: String }
		};
	}

	static get styles() {
		return [
			super.styles,
			bodyCompactStyles,
			labelStyles,
			inputStyles,
			css`
			:host {
				display: block;
			}
			:host([hidden]),
			[hidden] {
				display: none !important;
			}
			d2l-input-text,
			#ungraded {
				width: auto;
			}
			#ungraded {
				--d2l-input-padding: 0.4rem 1.65rem 0.4rem 0.75rem;
				--d2l-input-padding-focus: calc(0.4rem - 1px) calc(1.65rem - 1px) calc(0.4rem - 1px) calc(0.75rem - 1px);
				cursor: pointer;
			}
			:host([dir="rtl"]) #ungraded {
				--d2l-input-padding: 0.4rem 0.75rem 0.4rem 1.65rem;
				--d2l-input-padding-focus: calc(0.4rem - 1px) calc(0.75rem - 1px) calc(0.4rem - 1px) calc(1.65rem - 1px);
			}
			#ungraded:disabled,
			.d2l-grade-info:disabled {
				cursor: default;
				opacity: 0.5;
			}
			#score-info-container,
			#score-out-of-container,
			#grade-info-container {
				display: flex;
			}
			#score-info-container {
				-webkit-align-items: center;
				align-items: center;
				flex-wrap: wrap;
			}
			#score-out-of-container {
				-webkit-align-items: baseline;
				align-items: baseline;
			}
			#grade-info-container {
				-webkit-align-items: center;
				align-items: center;
			}
			.d2l-grade-type-text {
				margin: 0 0.75rem 0 0.6rem;
			}
			:host([dir="rtl"]) .d2l-grade-type-text {
				margin: 0 0.6rem 0 0.75rem;
			}
			#divider {
				border-left: solid 1px var(--d2l-color-galena);
				height: 30px;
				margin-right: 0.3rem;
			}
			:host([dir="rtl"]) #divider {
				margin-left: 0.3rem;
				margin-right: 0;
			}
			.d2l-grade-info,
			.d2l-grade-info:disabled:hover,
			.d2l-grade-info:disabled:focus {
				background: none;
				border: 2px solid transparent;
				border-radius: 0.3rem;
				display: flex;
				flex-wrap: nowrap;
				height: 42px;
				outline: none;
				padding: 0.5rem 0.6rem 0.4rem;
			}
			.d2l-grade-info {
				cursor: pointer;
			}
			.d2l-grade-info div {
				flex-shrink: 1;
			}
			.d2l-grade-info d2l-icon {
				flex-shrink: 0;
			}
			.d2l-grade-info > * {
				margin-right: 0.3rem;
			}
			.d2l-grade-info > *:last-child {
				margin-right: 0;
			}
			:host([dir="rtl"]) .d2l-grade-info > * {
				margin-left: 0.5rem;
				margin-right: 0;
			}
			:host([dir="rtl"]) .d2l-grade-info > *:last-child {
				margin-left: 0;
			}
			.d2l-grade-info:hover,
			.d2l-grade-info[active] {
				border-color: var(--d2l-color-mica);
				border-width: 1px;
				padding: calc(0.5rem + 1px) calc(0.6rem + 1px); /* 1px is difference in border width */
			}
			.d2l-grade-info:focus {
				border-color: var(--d2l-color-celestine);
				border-width: 2px;
				padding: 0.5rem 0.6rem 0.4rem;
			}
			.d2l-grade-info:hover > *,
			.d2l-grade-info:focus > * {
				color: var(--d2l-color-celestine-minus-1);
			}
			.d2l-grade-info:disabled:hover,
			.d2l-grade-info:disabled:focus,
			.d2l-grade-info:disabled:hover > *,
			.d2l-grade-info:disabled:focus > * {
				color: var(--d2l-color-ferrite);
			}
			button {
				/* needed otherwise user agent style overrides this */
				color: inherit;
				font-family: inherit;
			}
			.d2l-blur {
				filter: opacity(50%);
				transition: filter 1s ease-out;
			}
			`
		];
	}

	constructor() {
		super(store);
		this.saveOrder = 500;
		this.disableNotInGradebook = false;
		this.disableResetToUngraded = false;
		this.allowUngraded = true;
		this.hasActivityScore = true;
	}

	connectedCallback() {
		super.connectedCallback();

		const event = new CustomEvent('d2l-request-provider', {
			detail: { key: 'd2l-provider-create-selectbox-grade-item-enabled' },
			bubbles: true,
			composed: true,
			cancelable: true
		});
		this.dispatchEvent(event);

		this._createSelectboxGradeItemEnabled = typeof this._createSelectboxGradeItemEnabled === 'undefined' || event.detail.provider;
		this.checkoutOnLoad = this._createSelectboxGradeItemEnabled;
	}

	render() {
		const activity = store.get(this.href);

		let gradeUnits;
		let inGrades;
		let canSeeGrades;
		let isUngraded;
		let scoreOutOf;
		let scoreOutOfError;
		let canEditScoreOutOf;
		let canEditGradebookStatus;
		let isGradebookStatusChanging;

		if (this._createSelectboxGradeItemEnabled) {
			const associateGradeEntity = associateGradeStore.get(this._associateGradeHref);
			const scoringEntity = scoringStore.get(this._scoringHref);
			gradeUnits = this.localize('grades.gradeUnits');
			inGrades = associateGradeEntity && associateGradeEntity.gradebookStatus !== GradebookStatus.NotInGradebook;
			canSeeGrades = !!associateGradeEntity;
			canEditGradebookStatus = associateGradeEntity && associateGradeEntity.canCreateNewGrade;
			isGradebookStatusChanging = associateGradeEntity && associateGradeEntity.gradebookStatusChanging;
			if (this.hasActivityScore) {
				scoreOutOf = scoringEntity && scoringEntity.gradeMaxPoints;
				canEditScoreOutOf = scoringEntity && scoringEntity.canUpdateScoring;
			} else {
				scoreOutOf = scoringEntity && (inGrades ? scoringEntity.gradeMaxPoints : scoringEntity.scoreOutOf);
				canEditScoreOutOf = inGrades || this.disableNotInGradebook;
			}
			isUngraded = associateGradeEntity && associateGradeEntity.gradebookStatus === GradebookStatus.NotInGradebook && !scoreOutOf;
		} else {
			gradeUnits = activity && activity.scoreAndGrade && activity.scoreAndGrade.gradeType;
			inGrades = activity && activity.scoreAndGrade && activity.scoreAndGrade.inGrades;
			canSeeGrades = activity && activity.scoreAndGrade && activity.scoreAndGrade.canSeeGrades;
			isUngraded = activity && activity.scoreAndGrade && activity.scoreAndGrade.isUngraded;
			scoreOutOf = activity && activity.scoreAndGrade && activity.scoreAndGrade.scoreOutOf;
			scoreOutOfError =  activity && activity.scoreAndGrade && activity.scoreAndGrade.scoreOutOfError;
			canEditScoreOutOf = activity && activity.scoreAndGrade && activity.scoreAndGrade.canEditScoreOutOf;
			canEditGradebookStatus = canEditScoreOutOf;
		}

		this._focusUngraded = isUngraded;

		const inGradesTerm = this._createSelectboxGradeItemEnabled ? this.localize('editor.inGradebook') : this.localize('editor.inGrades');
		const notInGradesTerm = this._createSelectboxGradeItemEnabled ? this.localize('editor.notInGradebook') : this.localize('editor.notInGrades');

		return (this.allowUngraded && isUngraded) || this.skeleton ? html`
			<div id="ungraded-button-container" class="d2l-skeletize">
				<button id="ungraded" class="d2l-input"
					@click="${this._setGraded}"
					aria-label="${this.localize('editor.addAGrade')}"
					?disabled="${!canEditScoreOutOf}"
				>
					${this.localize('editor.ungraded')}
				</button>
			</div>
		` : html`
			<div id="score-info-container">
				<div id="score-out-of-container">
					${canEditScoreOutOf ? html`
						<d2l-input-number
							id="score-out-of"
							label="${this._createSelectboxGradeItemEnabled ? this.localize('editor.gradeOutOf') : this.localize('editor.scoreOutOf')}"
							label-hidden
							input-width="4rem"
							min=0.01
							max=9999999999
							required
							value="${scoreOutOf}"
							@change="${this._onScoreOutOfChanged}"
							@blur="${this._onScoreOutOfChanged}"
						></d2l-input-number>
						${scoreOutOfError ? html`
							<d2l-tooltip
								id="score-tooltip"
								for="score-out-of"
								position="bottom"
								showing
								align="start"
							>
								${scoreOutOfError ? html`<span>${this.localize(`editor.${scoreOutOfError}`)}</span>` : null}
							</d2l-tooltip>
						` : null}
					` : html`<div>${scoreOutOf}</div>`}
					<div class="d2l-body-compact d2l-grade-type-text">${gradeUnits}</div>
				</div>
				${canSeeGrades ? html`
					<div id="grade-info-container">
						<div id="divider"></div>
						<d2l-dropdown ?disabled="${!canEditGradebookStatus}">
							<button class="d2l-label-text d2l-grade-info d2l-dropdown-opener ${isGradebookStatusChanging ? 'd2l-blur' : ''}"
								?disabled="${!canEditGradebookStatus || isGradebookStatusChanging}" }>
								${inGrades ? html`<d2l-icon icon="tier1:grade"></d2l-icon>` : null}
								<div>${inGrades ? inGradesTerm : notInGradesTerm}</div>
								<d2l-icon icon="tier1:chevron-down"></d2l-icon>
							</button>
							<d2l-dropdown-menu id="grade-dropdown" align="start" no-pointer vertical-offset="3px">
								<d2l-menu label="${inGrades ? inGradesTerm : notInGradesTerm}">
									<d2l-menu-item
										text="${this._createSelectboxGradeItemEnabled ? this.localize('editor.editLinkExisting') : this.localize('editor.chooseFromGrades')}"
										@d2l-menu-item-select="${this._chooseFromGrades}"
									></d2l-menu-item>
									${this._addOrRemoveMenuItem()}
									${this.allowUngraded ? html`<d2l-menu-item
										text="${this.localize('editor.setUngraded')}"
										?disabled="${this.disableResetToUngraded}"
										@d2l-menu-item-select="${this._setUngraded}"
									></d2l-menu-item>` : null}
								</d2l-menu>
							</d2l-dropdown-menu>
						</d2l-dropdown>
						<d2l-activity-grades-dialog
							href="${this.href}"
							.token="${this.token}"
							@d2l-activity-grades-dialog-save-complete="${this._onDialogSave}">
						</d2l-activity-grades-dialog>
					</div>
				` : null}
			</div>
		`;
	}

	updated(changedProperties) {
		super.updated(changedProperties);

		if ((changedProperties.has('href') || changedProperties.has('token')) &&
			this.href && this.token) {

			store && this._fetch(() => {
				const fetch = store.fetch(this.href, this.token);
				fetch.then((activity) => {
					this._setNewGradeName(this.activityName);
					this._scoringHref = activity.scoringHref;
					scoringStore && this._fetch(() => {
						scoringStore.fetch(this._scoringHref, this.token);
					});
				});
			});
		}

		if (changedProperties.has('checkedOutHref') && associateGradeStore) {
			const checkedOutEntity = store.get(this.checkedOutHref);
			if (checkedOutEntity && checkedOutEntity.associateGradeHref) {
				this._associateGradeHref = checkedOutEntity.associateGradeHref;
				this._fetch(() => {
					return associateGradeStore.fetch(this._associateGradeHref, this.token);
				});
			}
		}

		changedProperties.forEach((oldValue, propName) => {
			if (propName === '_focusUngraded' && typeof oldValue !== 'undefined') {
				const toFocus = this._focusUngraded && this.allowUngraded ?
					this.shadowRoot.querySelector('#ungraded') :
					this.shadowRoot.querySelector('#score-out-of');
				toFocus.focus();
			} else if (propName === 'activityName') {
				this._setNewGradeName(this.activityName);
			}
		});

		if (changedProperties.size === 0) {
			this._setNewGradeName(this.activityName);
		}
	}

	hasPendingChanges() {
		const scoring = scoringStore.get(this._scoringHref);
		if (!scoring) {
			return false;
		}
		return scoring.dirty();
	}

	async save() {
		let isNewGrade = false;
		if (this._createSelectboxGradeItemEnabled) {
			const associateGradeEntity = associateGradeStore.get(this._associateGradeHref);
			isNewGrade = associateGradeEntity && associateGradeEntity.gradebookStatus === GradebookStatus.NewGrade;
			if (isNewGrade) {
				const scoring = scoringStore.get(this._scoringHref);
				const gradeMaxPoints = scoring && scoring.gradeMaxPoints;
				this._associateGradeSetMaxPoints(gradeMaxPoints);
				this._associateGradeSetGradeName(this.activityName);
			}
		}

		await super.save(this._createSelectboxGradeItemEnabled);

		if (this._createSelectboxGradeItemEnabled) {
			await associateGradeStore.get(this._associateGradeHref).fetch(true);
			let scoring = scoringStore.get(this._scoringHref);
			if (isNewGrade) {
				scoring = await scoring.fetch(true);
			}
			await scoring.save();
		}
	}

	updateSelectedGrade() {
		if (this._createSelectboxGradeItemEnabled) {
			const associateGradeEntity = associateGradeStore.get(this._associateGradeHref);
			const gradeCandidateCollection = associateGradeEntity && associateGradeEntity.gradeCandidateCollection;
			if (gradeCandidateCollection) {
				gradeCandidateCollection.fetch(true);
			}
		}
	}

	_addOrRemoveMenuItem() {
		let inGrades;
		let canEditGrades;
		if (this._createSelectboxGradeItemEnabled) {
			const associateGradeEntity = associateGradeStore.get(this._associateGradeHref);
			inGrades = associateGradeEntity && associateGradeEntity.gradebookStatus !== GradebookStatus.NotInGradebook;
			canEditGrades = associateGradeEntity && associateGradeEntity.canCreateNewGrade;
		} else {
			const scoreAndGrade = store.get(this.href).scoreAndGrade;
			inGrades = scoreAndGrade && scoreAndGrade.inGrades;
			canEditGrades = scoreAndGrade && scoreAndGrade.canEditGrades;
		}

		if (inGrades) {
			return !this.disableNotInGradebook ? html`
				<d2l-menu-item
					text="${this._createSelectboxGradeItemEnabled ? this.localize('editor.notInGradebook') : this.localize('editor.removeFromGrades')}"
					@d2l-menu-item-select="${this._removeFromGrades}"
				></d2l-menu-item>
			` : null;
		} else if (canEditGrades) {
			return html`
				<d2l-menu-item
					text="${this._createSelectboxGradeItemEnabled ? this.localize('editor.addToGradebook') : this.localize('editor.addToGrades')}"
					@d2l-menu-item-select="${this._addToGrades}"
				></d2l-menu-item>
			`;
		}
		return null;
	}
	_addToGrades() {
		this._prefetchGradeCandidates();
		this._prefetchGradeSchemes();
		store.get(this.href).scoreAndGrade.addToGrades();
		this._associateGradeSetGradebookStatus(GradebookStatus.NewGrade);
	}
	_associateGradeSetGradebookStatus(gradebookStatus) {
		if (!this._createSelectboxGradeItemEnabled) return;
		const associateGradeEntity = associateGradeStore.get(this._associateGradeHref);
		const promise = associateGradeEntity && associateGradeEntity.setGradebookStatus(gradebookStatus);
		this.pendingUpdates.push(promise);
	}
	_associateGradeSetGradeName(name) {
		if (!this._createSelectboxGradeItemEnabled) return;
		const associateGradeEntity = associateGradeStore.get(this._associateGradeHref);
		const promise = associateGradeEntity && associateGradeEntity.setGradeName(name);
		this.pendingUpdates.push(promise);
	}
	_associateGradeSetMaxPoints(maxPoints) {
		if (!this._createSelectboxGradeItemEnabled) return;
		const associateGradeEntity = associateGradeStore.get(this._associateGradeHref);
		const promise = associateGradeEntity && associateGradeEntity.setGradeMaxPoints(maxPoints);
		this.pendingUpdates.push(promise);
	}
	_chooseFromGrades() {
		this._prefetchGradeCandidates();
		this._prefetchGradeSchemes();
		const activityGradesElement = this.shadowRoot.querySelector('d2l-activity-grades-dialog');
		if (activityGradesElement) {
			activityGradesElement.openGradesDialog();
		}
	}
	_onDialogSave() {
		const entity = associateGradeStore.get(this._associateGradeHref);
		entity.fetch(true);
	}
	_onScoreOutOfChanged(e) {
		const activity = store.get(this.href);
		if (activity === undefined) {
			return;
		}

		const scoreOutOf = e.target.value;

		if (!this._createSelectboxGradeItemEnabled) {
			const scoreAndGrade = activity.scoreAndGrade;
			if (scoreOutOf === scoreAndGrade.scoreOutOf) {
				return;
			}
			scoreAndGrade.setScoreOutOf(scoreOutOf);
		} else {
			const scoring = scoringStore.get(this._scoringHref);
			if (scoreOutOf === scoring.gradeMaxPoints) {
				return;
			}
			scoring.setGradeMaxPoints(scoreOutOf);
		}

	}
	_prefetchGradeCandidates() {
		const entity = associateGradeStore.get(this._associateGradeHref);
		entity && entity.getGradeCandidates();
	}
	_prefetchGradeSchemes() {
		const entity = associateGradeStore.get(this._associateGradeHref);
		entity && entity.getGradeSchemes();
	}
	_removeFromGrades() {
		store.get(this.href).scoreAndGrade.removeFromGrades();
		this._associateGradeSetGradebookStatus(GradebookStatus.NotInGradebook);
	}

	_setGraded() {
		this._prefetchGradeCandidates();
		this._prefetchGradeSchemes();
		if (!this._createSelectboxGradeItemEnabled) {
			const scoreAndGrade = store.get(this.href).scoreAndGrade;
			scoreAndGrade.setGraded(scoreAndGrade.canEditGrades);
			scoreAndGrade.setScoreOutOf(null); // let's us have an empty score input as undefined is converted to 0.
		} else {
			const scoring = scoringStore.get(this._scoringHref);
			scoring.setGradeMaxPoints(null);
		}
		this._associateGradeSetGradebookStatus(GradebookStatus.NewGrade);
	}
	_setNewGradeName(name) {
		const activity = store.get(this.href);
		if (activity) {
			activity.scoreAndGrade.setNewGradeName(name);
			if (this._createSelectboxGradeItemEnabled) {
				const scoring = scoringStore.get(this._scoringHref);
				scoring && scoring.setNewGradeName(name);
			}
		}
	}

	_setUngraded() {
		if (!this._createSelectboxGradeItemEnabled) {
			store.get(this.href).scoreAndGrade.setUngraded();
		} else {
			const scoring = scoringStore.get(this._scoringHref);
			scoring.setGradeMaxPoints('');
		}
		this._associateGradeSetGradebookStatus(GradebookStatus.NotInGradebook);
	}
}
customElements.define('d2l-activity-score-editor', ActivityScoreEditor);
