import { css, html, LitElement } from 'lit-element/lit-element.js';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit.js';
import { ActivityUsageEntity } from 'siren-sdk/src/activities/ActivityUsageEntity.js';
import '@brightspace-ui/core/components/list/list-item.js';
import 'd2l-organizations/components/d2l-organization-image/d2l-organization-image.js';

class ActivityUsageListItem extends EntityMixinLit(LitElement) {

	constructor() {
		super();
		this._setEntityType(ActivityUsageEntity);
	}

	set _entity(entity) {
		if (this._entityHasChanged(entity)) {
			this._onActivityUsageChange(entity);
			super._entity = entity;
			this.requestUpdate();
		}
	}

	_onActivityUsageChange(usage) {
		usage.onOrganizationChange((organization) => {
			this._organization = organization;
		});
	}

	static get properties() {
		return {
			_activityUsage: {
				type: Object
			},
			_organization: {
				type: Object
			},
			_organizationImage: {
				type: Object
			}
		};
	}

	static get styles() {
		return css`
			:host {
				display: block;
			}
			:host([hidden]) {
				display: none;
			}
		`;
	}

	render() {
		return html`
			<d2l-list-item>
				<d2l-organization-image href=${this._organization.self()} slot="illustration"></d2l-organization-image>
				${this._organization.name()}
			</d2l-list-item>
		`;
	}
}
customElements.define('d2l-activity-usage-list-item', ActivityUsageListItem);
