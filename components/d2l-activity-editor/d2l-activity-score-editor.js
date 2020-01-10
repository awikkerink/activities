import '@brightspace-ui/core/components/button/button.js';
import '@brightspace-ui/core/components/colors/colors.js';
import '@brightspace-ui/core/components/icons/icon.js';
import '@brightspace-ui/core/components/inputs/input-text.js';
import 'd2l-dropdown/d2l-dropdown.js';
import 'd2l-dropdown/d2l-dropdown-menu.js';
import 'd2l-tooltip/d2l-tooltip';
import { bodyCompactStyles, labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { css, html, LitElement } from 'lit-element/lit-element';
import { ActivityUsageEntity } from 'siren-sdk/src/activities/ActivityUsageEntity';
import { Debouncer } from '@polymer/polymer/lib/utils/debounce.js';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit';
import { ErrorHandlingMixin } from './error-handling-mixin.js';
import { getLocalizeResources } from './localization';
import { inputStyles } from '@brightspace-ui/core/components/inputs/input-styles.js';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { SaveStatusMixin } from './save-status-mixin';
import { timeOut } from '@polymer/polymer/lib/utils/async.js';

class ActivityScoreEditor extends ErrorHandlingMixin(SaveStatusMixin(EntityMixinLit(LocalizeMixin(RtlMixin(LitElement))))) {

	static get properties() {
		return {
			_scoreOutOf: { type: String },
			_canEditScoreOutOf: { type: Boolean },
			_emptyScoreOutOfError: { type: String },
			_invalidScoreOutOfError: { type: String },
			_inGrades: { type: Boolean },
			_gradeType: { type: String },
			_isUngraded: { type: Boolean },
			_canSeeGrades: { type: Boolean },
			_canEditGrades: { type: Boolean }
		};
	}

	static get styles() {
		return [
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
				cursor: pointer;
				--d2l-input-padding: 0.4rem 1.65rem 0.4rem 0.75rem;
				--d2l-input-padding-focus: calc(0.4rem - 1px) calc(1.65rem - 1px) calc(0.4rem - 1px) calc(0.75rem - 1px);
			}
			:host([dir="rtl"]) #ungraded {
				--d2l-input-padding: 0.4rem 0.75rem 0.4rem 1.65rem;
				--d2l-input-padding-focus: calc(0.4rem - 1px) calc(0.75rem - 1px) calc(0.4rem - 1px) calc(1.65rem - 1px);
			}
			#score-info-container,
			#score-out-of-container,
			#grade-info-container {
				display: flex;
			}
			#score-info-container {
				flex-wrap: wrap;
				-webkit-box-align: center;
				-moz-box-align: center;
				-ms-flex-align: center;
				-webkit-align-items: center;
				align-items: center;
			}
			#score-out-of-container {
				-webkit-box-align: baseline;
				-moz-box-align: baseline;
				-ms-flex-align: baseline;
				-webkit-align-items: baseline;
				align-items: baseline;
			}
			#grade-info-container {
				-webkit-box-align: center;
				-moz-box-align: center;
				-ms-flex-align: center;
				-webkit-align-items: center;
				align-items: center;
			}
			.grade-type-text {
				margin: 0 0.75rem 0 0.6rem;
			}
			:host([dir="rtl"]) .grade-type-text {
				margin: 0 0.6rem 0 0.75rem;
			}
			#divider {
				height: 30px;
				border-left: solid 1px var(--d2l-color-galena);
				margin-right: 0.3rem;
			}
			:host([dir="rtl"]) #divider {
				margin-right: 0;
				margin-left: 0.3rem;
			}
			.grade-info {
				height: 42px;
				border: 2px solid transparent;
				background: none;
				outline: none;
				border-radius: 0.3rem;
				padding: .5rem .6rem .4rem;
				cursor: pointer;
				display: flex;
				flex-wrap: nowrap;
			}
			.grade-info div {
				flex-shrink: 1;
			}
			.grade-info d2l-icon {
				flex-shrink: 0;
			}
			.grade-info > * {
				margin-right: 0.3rem;
			}
			.grade-info > *:last-child {
				margin-right: 0;
			}
			:host([dir="rtl"]) .grade-info > * {
				margin-right: 0;
				margin-left: 0.5rem;
			}
			:host([dir="rtl"]) .grade-info > *:last-child {
				margin-left: 0;
			}
			.grade-info:hover,
			.grade-info[active] {
				border-color: var(--d2l-color-mica);
				border-width: 1px;
				padding: calc(.5rem + 1px) calc(.6rem + 1px);
			}
			.grade-info:focus {
				border-color: var(--d2l-color-celestine);
				border-width: 2px;
				padding: .5rem .6rem .4rem;
			}
			.grade-info:hover > *,
			.grade-info:focus > * {
				color: var(--d2l-color-celestine-minus-1);
			}
			button {
				/* needed otherwise user agent style overrides this */
				font-family: inherit;
				color: inherit;
			}
			`
		];
	}

	static async getLocalizeResources(langs) {
		return getLocalizeResources(langs, import.meta.url);
	}

	constructor() {
		super();
		this._setEntityType(ActivityUsageEntity);
		this._scoreOutOf = '';
		this._inGrades = false;
		this._gradeType = '';
		this._isUngraded = true;
		this._canEditScoreOutOf = false;
		this._canSeeGrades = false;
		this._canEditGrades = false;
		this._debounceJobs = {};

		this._tooltipBoundary = {
			left: 5,
			right: 400
		};
	}

	set _entity(entity) {
		if (!this._entityHasChanged(entity)) {
			return;
		}

		if (entity) {
			if (!this._isError()) {
				this._scoreOutOf = entity.scoreOutOf().toString();
			}
			this._inGrades = entity.inGrades();
			this._gradeType = (entity.gradeType() || 'Points').toLowerCase();
			this._isUngraded = !this._inGrades && !this._scoreOutOf;
			this._canEditScoreOutOf = entity.canEditScoreOutOf();
			this._canSeeGrades = entity.canSeeGrades();
			this._canEditGrades = entity.canEditGrades();
		}

		super._entity = entity;
	}

	updated(changedProperties) {
		super.updated(changedProperties);

		changedProperties.forEach((oldValue, propName) => {
			if (propName === '_isUngraded') {
				const toFocus = this._isUngraded ?
					this.shadowRoot.querySelector('#ungraded') :
					this.shadowRoot.querySelector('#score-out-of');
				toFocus.focus();
			}
		});
	}

	_onScoreOutOfChanged() {
		const scoreOutOf = this.shadowRoot.querySelector('#score-out-of').value;
		if (scoreOutOf === this._scoreOutOf) {
			return;
		}
		const isScoreEmpty = (scoreOutOf || '').trim().length === 0;
		const isScoreInvalid = scoreOutOf && scoreOutOf.length !== 0 &&
			(isNaN(scoreOutOf) || scoreOutOf < 0.01 || scoreOutOf > 9999999999);

		const scoreErrorLangterm = isScoreEmpty ? 'emptyScoreOutOfError' : 'invalidScoreOutOfError';
		const setErrorProperty = isScoreEmpty ? '_emptyScoreOutOfError' : '_invalidScoreOutOfError';
		const clearErrorProperty = isScoreEmpty ? '_invalidScoreOutOfError' : '_emptyScoreOutOfError';
		const tooltipId = 'score-tooltip';

		if ((this._inGrades && isScoreEmpty) || isScoreInvalid) {
			this._scoreOutOf = scoreOutOf;
			this.clearError(clearErrorProperty);
			this.setError(setErrorProperty, scoreErrorLangterm, tooltipId);
		} else if (!this.inGrades && isScoreEmpty) {
			this._scoreOutOf = scoreOutOf;
		} else {
			this.clearError('_emptyScoreOutOfError');
			this.clearError('_invalidScoreOutOfError');
			this._debounceJobs.scoreOutOf = Debouncer.debounce(
				this._debounceJobs.scoreOutOf,
				timeOut.after(500),
				() => this.wrapSaveAction(super._entity.setScoreOutOf(scoreOutOf, this._inGrades))
			);

		}
	}

	_addToGrades() {
		if (!this._isError()) {
			if (!this._scoreOutOf) {
				this._inGrades = true;
			} else {
				this.wrapSaveAction(super._entity.addToGrades());
			}
		}
	}

	_removeFromGrades() {
		this.clearError('_emptyScoreOutOfError');
		if (!this._isError()) {
			if (!this._scoreOutOf) {
				this._inGrades = false;
			} else {
				this.wrapSaveAction(super._entity.removeFromGrades());
			}
		}
	}

	_setGraded() {
		this._isUngraded = false;
		this._inGrades = this._canEditGrades;
	}

	_setUngraded() {
		this.clearError('_emptyScoreOutOfError');
		this.clearError('_invalidScoreOutOfError');
		this._isUngraded = true;
		this.wrapSaveAction(super._entity.setUngraded());
	}

	_isError() {
		return this._emptyScoreOutOfError || this._invalidScoreOutOfError;
	}

	render() {
		return html`
			<div id="ungraded-button-container" ?hidden="${!this._isUngraded}">
				<button id="ungraded" class="d2l-input"
					@click="${this._setGraded}"
				>
					${this.localize('ungraded')}
				</button>
			</div>

			<div id="score-info-container" ?hidden="${this._isUngraded}">
				<div id="score-out-of-container">
					<d2l-input-text
						id="score-out-of"
						label="${this.localize('scoreOutOf')}"
						label-hidden
						value="${this._scoreOutOf}"
						size=4
						@change="${this._onScoreOutOfChanged}"
						@blur="${this._onScoreOutOfChanged}"
						aria-invalid="${this._isError() ? 'true' : ''}"
						?disabled="${!this._canEditScoreOutOf}"
					></d2l-input-text>
					<d2l-tooltip
						?hidden="${!this._isError()}"
						id="score-tooltip"
						for="score-out-of"
						position="bottom"
						?showing="${this._isError()}"
						.boundary="${this._tooltipBoundary}"
					>
						<span ?hidden="${!this._emptyScoreOutOfError}">${this._emptyScoreOutOfError}</span>
						<span ?hidden="${!this._invalidScoreOutOfError}">${this._invalidScoreOutOfError}</span>
					</d2l-tooltip>
					<div class="d2l-body-compact grade-type-text">${this._gradeType}</div>
				</div>
				<div id="grade-info-container" ?hidden="${!this._canSeeGrades}">
					<div id="divider"></div>
					<d2l-dropdown>
						<button class="d2l-label-text grade-info d2l-dropdown-opener">
							<d2l-icon icon="tier1:grade" ?hidden="${!this._inGrades}"></d2l-icon>
							<div>${this._inGrades ? this.localize('inGrades') : this.localize('notInGrades')}</div>
							<d2l-icon icon="tier1:chevron-down"></d2l-icon>
						</button>
						<d2l-dropdown-menu id="grade-dropdown" align="start" no-pointer vertical-offset="3px">
							<d2l-menu label="${this._inGrades ? this.localize('inGrades') : this.localize('notInGrades')}">
								<d2l-menu-item
									text="${this.localize('addToGrades')}"
									?hidden="${this._inGrades || !this._canEditGrades}"
									@d2l-menu-item-select="${this._addToGrades}"
								></d2l-menu-item>
								<d2l-menu-item
									text="${this.localize('removeFromGrades')}"
									?hidden="${!this._inGrades || !this._canEditGrades}"
									@d2l-menu-item-select="${this._removeFromGrades}"
								></d2l-menu-item>
								<d2l-menu-item
									text="${this.localize('setUngraded')}"
									@d2l-menu-item-select="${this._setUngraded}"
								></d2l-menu-item>
							</d2l-menu>
						</d2l-dropdown-menu>
					</d2l-dropdown>
				</div>
			</div>
		`;
	}
}
customElements.define('d2l-activity-score-editor', ActivityScoreEditor);
