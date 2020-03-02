import './d2l-activity-grade-candidate';
import { css, html, LitElement } from 'lit-element/lit-element';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit';
import { GradeCandidateEntity } from 'siren-sdk/src/activities/GradeCandidateEntity';

class ActivityGradeCandidate extends EntityMixinLit(LitElement) {
	static get properties() {
		return {
            _name: { type: String },
            _weight: { type: String },
            _isCategory: { type: Boolean },
            _gradeCandidateHrefs: { type: Array }
		};
	}

	static get styles() {
		return [
			css`
			:host {
				display: block;
			}
			`
		];
	}

	constructor() {
		super();
        this._setEntityType(GradeCandidateEntity);
        this._name = '';
        this._weight = '';
        this._isCategory = false;
        this._gradeCandidateHrefs = [];
	}

	set _entity(entity) {
		if (!this._entityHasChanged(entity)) {
			return;
		}

		if (entity) {
            this._name = entity.name();
            this._isCategory = entity.isCategory();
            this._weight = entity.weight();
            this._gradeCandidateHrefs = entity.getGradeCandidateHrefs();
		}

		super._entity = entity;
	}

	_setSelected(e) {
        //this.selected = this._gradeCandidateEntities[e.target.selectedIndex];
    }


    
	_renderGradeCandidate() {
        console.log('name', this._name);
        console.log('category', this._isCategory);
        console.log('weight', this._weight);
        console.log('children', this._gradeCandidateHrefs);
        console.log('-----------------------------');
        return this._isCategory ? /*html`
            <optgroup label="${this._name()}">
                ${this._gradeCandidateHrefs.map(href => {
                    return html`
                        d2l-activity-grade-candidate
                            href="${href}"
                            .token="${this.token}">
                        </d2l-activity-grade-candidate>
                    `;
                })}
            </optgroup>
        `*/ html `` :
        html`<option value="${this._weight}">${this._name}</option>`;
	}

	render() {
		return html`
			${this._renderGradeCandidate()}
		`;
    }
}

customElements.define('d2l-activity-grade-candidate', ActivityGradeCandidate);
