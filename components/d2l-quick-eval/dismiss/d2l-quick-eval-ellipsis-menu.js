import { css, html, LitElement } from 'lit-element/lit-element.js';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';
import 'd2l-dropdown/d2l-dropdown-more.js';
import 'd2l-dropdown/d2l-dropdown-menu.js';
import 'd2l-menu/d2l-menu.js';
import 'd2l-menu/d2l-menu-item.js';
import './d2l-quick-eval-ellipsis-dismiss-dialog.js';

class D2LQuickEvalEllipsisMenu extends LocalizeMixin(LitElement) {

	static get properties() {
		return {
			opened: {
				type: Boolean,
			},
		};
	}

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
					<d2l-menu-item @click="${() => this.opened = true}" text="Dismissed-activities"></d2l-menu-item>
				</d2l-menu>
			</d2l-dropdown-menu>
		</d2l-dropdown-more>
		<d2l-quick-eval-ellipsis-dialog .opened="${this.opened}" @on-close="${() => this.opened = false}"></d2l-quick-eval-ellipsis-dialog>
		`;
	}

	constructor() {
		super();
		this.opened = false;
	}

}

window.customElements.define('d2l-quick-eval-ellipsis-menu', D2LQuickEvalEllipsisMenu);
