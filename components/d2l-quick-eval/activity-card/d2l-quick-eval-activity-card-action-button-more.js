import { css, html, LitElement } from 'lit-element/lit-element.js';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';
import 'd2l-dropdown/d2l-dropdown.js';
import 'd2l-dropdown/d2l-dropdown-menu.js';
import 'd2l-menu/d2l-menu.js';
import './d2l-quick-eval-activity-card-action-button.js';

class D2LQuickEvalActivityCardActionButtonMore extends LocalizeMixin(LitElement) {

	static get styles() {
		return css`
			:host([hidden]) {
				display: none;
			}
			d2l-quick-eval-activity-card-action-button {
				height: 100%;
				width: 100%;
			}
			d2l-dropdown {
				height: 100%;
				width: 100%;
			}
		`;
	}
	render() {
		return html`
			<d2l-dropdown text="More Actions">
				<d2l-quick-eval-activity-card-action-button 
					icon-full-name="tier1:more"
					text="More Actions"
					class="d2l-dropdown-opener"></d2l-quick-eval-activity-card-action-button>
				<d2l-dropdown-menu>
					<d2l-menu label="More Actions">
						<slot></slot>
					</d2l-menu>
				</d2l-dropdown-menu>
			</d2l-dropdown>
		`;
	}
}

window.customElements.define('d2l-quick-eval-activity-card-action-button-more', D2LQuickEvalActivityCardActionButtonMore);
