import '@brightspace-ui/core/components/colors/colors.js';
import { css } from 'lit-element/lit-element.js';

export const SkeltizeMixin = superclass => class extends superclass {
	static get properties() {
		return {
			skeleton: { attribute: 'skeleton', reflect: true, type: Boolean }
		};
	}

	static get styles() {
		return css`
		@keyframes loadingPulse {
			0% { background-color: var(--d2l-color-sylvite); }
			50% { background-color: var(--d2l-color-regolith); }
			75% { background-color: var(--d2l-color-sylvite); }
			100% { background-color: var(--d2l-color-sylvite); }
		}
		:host([skeleton]) .skeletize::before {
			animation: loadingPulse 1.8s linear infinite;
			background-color: var(--d2l-color-sylvite);
			border-radius: 0.2rem;
			bottom: 0;
			content: "";
			left: 0;
			position: absolute;
			right: 0;
			top: 0;
			z-index: 2000;
		}
		:host([skeleton]) .skeletize {
			border: none;
			box-shadow: none;
			color: transparent;
			position: relative;
		}

		@keyframes loadingPulse {
			0% { background-color: var(--d2l-color-sylvite); }
			50% { background: var(--d2l-color-regolith); }
			75% { background: var(--d2l-color-sylvite); }
			100% { background: var(--d2l-color-sylvite); }
		}

		.skeletize::before {
			animation: loadingPulse 1.8s linear infinite;
			background-color: var(--d2l-color-sylvite);
			border-radius: 0.2rem;
			bottom: 0;
			content: "";
			left: 0;
			position: absolute;
			right: 0;
			top: 0;
			z-index: 2000;
		}

		.skeletize {
			border: none;
			box-shadow: none;
			color: transparent;
			position: relative;
		}
		`;
	}

	constructor() {
		super();
		this.skeleton = false;
	}
};
