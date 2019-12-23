import '@brightspace-ui/core/components/button/button.js';
import '@brightspace-ui/core/components/icons/icon.js';
import '@brightspace-ui/core/components/inputs/input-text.js';
import 'd2l-dropdown/d2l-dropdown.js';
import 'd2l-dropdown/d2l-dropdown-menu.js';
import { bodySmallStyles  } from '@brightspace-ui/core/components/typography/styles.js';
import { css, html, LitElement } from 'lit-element/lit-element';
import { ActivityUsageEntity } from 'siren-sdk/src/activities/ActivityUsageEntity';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit';
import { getLocalizeResources } from './localization';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';
import { SaveStatusMixin } from './save-status-mixin';

class ActivityScoreEditor extends SaveStatusMixin(EntityMixinLit(LocalizeMixin(LitElement))) {

	static get properties() {
		return {
			_scoreOutOf: { type: String },
			_inGrades: { type: Boolean },
			_gradeType: { type: String },
			_preventNewGrade: { type: Boolean }
		};
	}

	static get styles() {
		return [
			bodySmallStyles,
			css`
			:host {
				display: block;
			}
			:host([hidden]) {
				display: none;
			}
			d2l-input-text {
				width: auto;
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
		this._preventNewGrade = false;
	}

	set _entity(entity) {
		if (!this._entityHasChanged(entity)) {
			return;
		}

		if (entity) {
			this._scoreOutOf = entity.scoreOutOf();
			this._inGrades = entity.inGrades();
			this._gradeType = entity.gradeType();
		}

		super._entity = entity;
	}

	_toggleScoreState(isUngraded) {
		const ungradedButton = this.shadowRoot.querySelector('#ungraded-button-container');
		const scoreInfo = this.shadowRoot.querySelector('#score-info-container');

		const toHide = isUngraded ? scoreInfo : ungradedButton;
		const toShow = isUngraded ? ungradedButton : scoreInfo;

		toHide.setAttribute('hidden', 'hidden');
		toShow.removeAttribute('hidden', 'hidden');
	}

	_isUngraded() {
		return !this._inGrades && this._scoreOutOf.length == 0;
	}

	_showInGrades() {
		return this._inGrades || (!this._preventNewGrade && this._scoreOutOf.length == 0);
	}

	_onScoreOutOfChanged() {
		const scoreOutOf = this.shadowRoot.querySelector('#score-out-of').value;
		if (scoreOutOf == this._scoreOutOf) {
			return;
		}
		this.wrapSaveAction(super._entity.setScoreOutOf(scoreOutOf, this._isUngraded() && !this._preventNewGrade));
	}

	_addToGrades() {
		this._preventNewGrade = false;
		this.wrapSaveAction(super._entity.addToGrades());
	}

	_removeFromGrades() {
		if (this._scoreOutOf.length == 0) {
			this._preventNewGrade = true;
		} else {
			this._preventNewGrade = false;
			this.wrapSaveAction(super._entity.removeFromGrades());
		}
	}

	_setUngraded() {
		this._preventNewGrade = false;
		this.wrapSaveAction(super._entity.setUngraded());
		this._toggleScoreState(true);
	}

	render() {
		return html`
            <div id="ungraded-button-container" ?hidden="${!this._isUngraded()}">
				<d2l-button
					@click="${() => this._toggleScoreState(false)}"
				>
					${this.localize('ungraded')}
				</d2l-button>
			</div>

			<div id="score-info-container" ?hidden="${this._isUngraded()}">
				<d2l-input-text
					id="score-out-of"
					size=4
					label="${this.localize('scoreOutOf')}"
					label-hidden
					value="${this._scoreOutOf}",
					@change="${this._onScoreOutOfChanged}"
				></d2l-input-text>
				<span class="d2l-body-small">${this._gradeType}</span>
				<d2l-icon icon="tier1:divider-solid"></d2l-icon>
				<d2l-dropdown>
					<d2l-button class="d2l-dropdown-opener">
						<d2l-icon icon="tier1:grade" ?hidden="${!this._showInGrades()}"></d2l-icon>
						${this._showInGrades() ? this.localize('inGrades') : this.localize('notInGrades')}
						<d2l-icon icon="tier1:chevron-down"></d2l-icon>
					</d2l-button>
					<d2l-dropdown-menu id="grade-dropdown">
						<d2l-menu label="${this._showInGrades() ? this.localize('inGrades') : this.localize('notInGrades')}">
							<d2l-menu-item
								text="${this.localize('addToGrades')}"
								?hidden="${this._showInGrades()}"
								@d2l-menu-item-select="${this._addToGrades}"
							></d2l-menu-item>
							<d2l-menu-item
								text="${this.localize('removeFromGrades')}"
								?hidden="${!this._showInGrades()}"
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
