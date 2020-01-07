import '@brightspace-ui/core/components/button/button.js';
import '@brightspace-ui/core/components/colors/colors.js';
import '@brightspace-ui/core/components/icons/icon.js';
import '@brightspace-ui/core/components/inputs/input-text.js';
import 'd2l-dropdown/d2l-dropdown.js';
import 'd2l-dropdown/d2l-dropdown-menu.js';
import 'd2l-tooltip/d2l-tooltip';
import { css, html, LitElement } from 'lit-element/lit-element';
import { ActivityUsageEntity } from 'siren-sdk/src/activities/ActivityUsageEntity';
import { bodySmallStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit';
import { ErrorHandlingMixin } from './error-handling-mixin.js';
import { getLocalizeResources } from './localization';
import { inputStyles } from '@brightspace-ui/core/components/inputs/input-styles.js';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { SaveStatusMixin } from './save-status-mixin';

class ActivityScoreEditor extends ErrorHandlingMixin(SaveStatusMixin(EntityMixinLit(LocalizeMixin(RtlMixin(LitElement))))) {

	static get properties() {
		return {
			_scoreOutOf: { type: String },
			_emptyScoreOutOfError: { type: String },
			_invalidScoreOutOfError: { type: String },
			_inGrades: { type: Boolean },
			_gradeType: { type: String },
			_isUngraded: { type: Boolean }
		};
	}

	static get styles() {
		return [
			bodySmallStyles,
			inputStyles,
			css`
			:host {
				display: block;
			}
			:host([hidden]) {
				display: none;
			}
			d2l-input-text {
				width: 4rem;
			}
			.ungraded {
				width: auto;
			}
			.ungraded {
				cursor: pointer;
			}
			.grade-info {
				border: 1px solid transparent;
				background: none;
				outline: none;
				border-radius: 0.3rem;
				padding: .5rem .75rem .4rem;
				cursor: pointer;
			}
			.grade-info:hover,
			.grade-info:focus {
				border-color: var(--d2l-color-mica);
			}
			.grade-info:hover span,
			.grade-info:focus span {
				color: var(--d2l-color-celestine);
			}
			.grade-info > * {
				margin-right: 0.5rem;
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
				this._scoreOutOf = entity.scoreOutOf();
			}
			this._inGrades = entity.inGrades();
			this._gradeType = entity.gradeType() || 'Points';
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
		this.clearError('_emptyScoreOutOfError');
		this.clearError('_invalidScoreOutOfError');
		const scoreOutOf = this.shadowRoot.querySelector('#score-out-of').value;
		if (scoreOutOf === this._scoreOutOf) {
			return;
		}
		const isScoreEmpty = (scoreOutOf || '').trim().length === 0;
		const isScoreInvalid = scoreOutOf && scoreOutOf.length !== 0 &&
			(isNaN(scoreOutOf) || scoreOutOf < 0.01 || scoreOutOf > 9999999999);

		const scoreErrorLangterm = isScoreEmpty ? 'emptyScoreOutOfError' : 'invalidScoreOutOfError';
		const errorProperty = isScoreEmpty ? '_emptyScoreOutOfError' : '_invalidScoreOutOfError';
		const tooltipId = 'score-tooltip';

		if ((this._inGrades && isScoreEmpty) || isScoreInvalid) {
			this._scoreOutOf = scoreOutOf;
			this.setError(errorProperty, scoreErrorLangterm, tooltipId);
		} else {
			this.clearError(errorProperty);
			this.wrapSaveAction(super._entity.setScoreOutOf(scoreOutOf, this._inGrades));
		}
	}

	_addToGrades() {
		if (!this._isError()) {
			this.wrapSaveAction(super._entity.addToGrades());
		}
	}

	_removeFromGrades() {
		this.clearError('_emptyScoreOutOfError');
		if (this._scoreOutOf.length === 0) {
			this._setUngraded();
		} else {
			this.wrapSaveAction(super._entity.removeFromGrades());
		}
	}

	_setGraded() {
		this._isUngraded = false;
		this._inGrades = true;
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
		const minScore = 0.01;
		const maxScore = 9999999999;
		return html`
      		<div id="ungraded-button-container" ?hidden="${!this._isUngraded}">
				<button id="ungraded" class="ungraded d2l-input"
					@click="${this._setGraded}"
				>
					${this.localize('ungraded')}
				</button>
			</div>

			<div id="score-info-container" ?hidden="${this._isUngraded}">
				<d2l-input-text
					id="score-out-of"
					type="number"
					label="${this.localize('scoreOutOf')}"
					label-hidden
					value="${this._scoreOutOf}"
					min="${minScore}"
					max="${maxScore}"
					step="any"
					@change="${this._onScoreOutOfChanged}"
					aria-invalid="${this._isError() ? 'true' : ''}"
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
				<span class="d2l-body-small">${this._gradeType}</span>
				<d2l-icon icon="tier1:divider-solid"></d2l-icon>
				<d2l-dropdown>
					<button class="grade-info d2l-dropdown-opener">
						<d2l-icon icon="tier1:grade" ?hidden="${!this._inGrades}"></d2l-icon>
						<span>${this._inGrades ? this.localize('inGrades') : this.localize('notInGrades')}</span>
						<d2l-icon icon="tier1:chevron-down"></d2l-icon>
					</button>
					<d2l-dropdown-menu id="grade-dropdown">
						<d2l-menu label="${this._inGrades ? this.localize('inGrades') : this.localize('notInGrades')}">
							<d2l-menu-item
								text="${this.localize('addToGrades')}"
								?hidden="${this._inGrades}"
								@d2l-menu-item-select="${this._addToGrades}"
							></d2l-menu-item>
							<d2l-menu-item
								text="${this.localize('removeFromGrades')}"
								?hidden="${!this._inGrades}"
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
		`;
	}
}
customElements.define('d2l-activity-score-editor', ActivityScoreEditor);
