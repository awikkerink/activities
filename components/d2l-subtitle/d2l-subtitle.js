import { css, html, LitElement } from 'lit-element/lit-element.js';

class D2LSubtitle extends LitElement {
	static get styles() {
		return css`
			span {
				font-size: .6rem;
			}
			span::before {
				content: "\u2022";
				margin: .2rem;
			}
			:host span:first-of-type::before {
				content: "";
				margin: 0;
			}
			@media (min-width: 900px) {
				span {
					font-size: .7rem;
					line-height: .9rem;
				}
				:host {
					line-height: .9rem;
				}
			}
		`;
	}
	render() {
		this._displayText = this._computeDisplayText(this.text);

		return html`${this._displayText && this._displayText.length ?
			this._displayText.map(dt => html`<span>${dt}</span>`) :
			''}`;
	}

	static get properties() {
		return {
			text: {
				type: Array
			},
			_displayText: {
				type: Array
			}
		};
	}

	_computeDisplayText(text) {
		return text.filter(t => t !== null && t !== undefined && t !== '');
	}
}

window.customElements.define('d2l-subtitle', D2LSubtitle);
