import { css, html, LitElement } from 'lit-element/lit-element.js';
import { LitQuickEvalLocalize } from '../LitQuickEvalLocalize.js';
import 'd2l-dropdown/d2l-dropdown-more.js';
import 'd2l-dropdown/d2l-dropdown-menu.js';
import 'd2l-menu/d2l-menu.js';
import 'd2l-menu/d2l-menu-item.js';

class D2LQuickEvalEllipsisMenu extends LitQuickEvalLocalize(LitElement) {
	static get styles() {
		return css`
			:host([hidden]) {
				display: none;
			}
		`;
	}
	render() {
		return html`
		<d2l-dropdown-more>
			<d2l-dropdown-menu>
				<d2l-menu>
					<d2l-menu-item text="${this.localize('dismissedActivities')}"></d2l-menu-item>
				</d2l-menu>
			</d2l-dropdown-menu>
		</d2l-dropdown-more>
		`;
	}
}

window.customElements.define('d2l-quick-eval-ellipsis-menu', D2LQuickEvalEllipsisMenu);
