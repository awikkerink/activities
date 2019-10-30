import { css, html, LitElement } from 'lit-element/lit-element.js';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';
import 'd2l-dropdown/d2l-dropdown-more.js';
import 'd2l-dropdown/d2l-dropdown-menu.js';
import 'd2l-menu/d2l-menu.js';
import 'd2l-menu/d2l-menu-item.js';

class D2LQuickEvalEllipsisMenu extends LocalizeMixin(LitElement) {

	static get styles() {
		return css`
			:host([hidden]) {
				display: none;
			}
		`;
	}
	render() {
		return html`
			<d2l-dropdown-more text="Open!">
					<d2l-dropdown-menu id="dropdown">
						<d2l-menu label="activities menu">
							<d2l-menu-item text="Dismissed-activities"></d2l-menu-item>
						</d2l-menu>
					</d2l-dropdown-menu>
				</d2l-dropdown-more>
		`;
	}
}

window.customElements.define('d2l-quick-eval-ellipsis-menu', D2LQuickEvalEllipsisMenu);
