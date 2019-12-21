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

	render() {
		return html`
            <div id="button-container">
                <d2l-button>${this.localize('ungraded')}</d2l-button>
			</div>

			<div id="score-info-container">
				<d2l-input-text
					size=4
					label="${this.localize('scoreOutOf')}"
					label-hidden
				></d2l-input-text>
				<span class="d2l-body-small">points</span> <!-- this will be replaced with gradeType property -->
				<d2l-icon icon="tier1:divider-solid"></d2l-icon>
				<d2l-dropdown>
					<d2l-button>
						<d2l-icon icon="tier1:grade"></d2l-icon>
						${this.localize('inGrades')}
						<d2l-icon icon="tier1:chevron-down"></d2l-icon>
					</d2l-button>
				</d2l-dropdown>
			</div>
		`;
	}
}
customElements.define('d2l-activity-score-editor', ActivityScoreEditor);
