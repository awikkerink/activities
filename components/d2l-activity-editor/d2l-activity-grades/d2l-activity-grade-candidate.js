import { css, html, LitElement } from 'lit-element/lit-element';
import { GradeCandidateEntity } from 'siren-sdk/src/activities/GradeCandidateEntity';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit';

class ActivityGradeCandidate extends EntityMixinLit(LitElement) {
	static get properties() {
		return {
			_name: { type: String },
			_maxPoints: { type: String }
		};
	}

	static get styles() {
		return css`
			:host {
				display: block;
			}
		`;
	}

	constructor() {
		super();
		this._setEntityType(GradeCandidateEntity);
	}

	set _entity(entity) {
		if (!this._entityHasChanged(entity)) {
			return;
		}

		if (entity) {
			this._name = entity.name();
			this._maxPoints = entity.maxPoints();
		}

		super._entity = entity;
	}

	render() {
		return html`
			<option value="${this._maxPoints}">${this._name}</option>
		`;
	}
}

customElements.define('d2l-activity-grade-candidate', ActivityGradeCandidate);
