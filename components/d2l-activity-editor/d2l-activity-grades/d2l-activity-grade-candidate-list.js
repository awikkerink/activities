import './d2l-activity-grade-candidate'
import { css, html, LitElement } from 'lit-element/lit-element';
import { GradeCandidateCollectionEntity } from 'siren-sdk/src/activities/GradeCandidateCollectionEntity';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit';
import { repeat } from 'lit-html/directives/repeat';
import { selectStyles } from '@brightspace-ui/core/components/inputs/input-select-styles.js';

class ActivityGradeCandidateList extends EntityMixinLit(LitElement) {
	static get properties() {
		return {
			_gradeCandidateEntities: { type: Array },
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
		super();
		this._setEntityType(GradeCandidateCollectionEntity);
	}

	set _entity(entity) {
		if (!this._entityHasChanged(entity)) {
			return;
		}

		if (entity) {
			this._gradeCandidateEntities = entity.getGradeCandidateEntities();
		}

		super._entity = entity;
	}

	render() {
		return html`
			<select
				id="grade-candidates"
				class="d2l-input-select"
			>
				${repeat(this._gradeCandidateEntities, entity => entity, entity => html`
					<d2l-activity-grade-candidate
						href=${entity.getLinkByRel('self').href}
						.token="${this.token}"
					>
					</d2l-activity-grade-candidate>
				`)}
			</select>
		`;
	}
}

customElements.define('d2l-activity-grade-candidate-list', ActivityGradeCandidateList);
