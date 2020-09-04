import '@brightspace-ui/core/components/colors/colors.js';
import { css } from 'lit-element/lit-element.js';

export const SkeltizeMixin = superclass => class extends superclass {
	static get styles() {
		return css`        
        @keyframes loadingPulse {
            0% { background-color: var(--d2l-color-sylvite); }
            50% { background-color: var(--d2l-color-regolith); }
            75% { background-color: var(--d2l-color-sylvite); }
            100% { background-color: var(--d2l-color-sylvite); }
        }
        :host([skeleton]) .skeletize::before {
            content: "";
            position: absolute;
            top: 0;
            bottom: 0;
            right: 0;
            left: 0;
            border-radius: 0.2rem;
            animation: loadingPulse 1.8s linear infinite;
            background-color: var(--d2l-color-sylvite);
            z-index: 2000;
        }
        :host([skeleton]) .skeletize {
            position: relative;
            color: transparent;
            border: none;
            box-shadow: none;
        }

        @keyframes loadingPulse {
			0% { background-color: var(--d2l-color-sylvite); }
			50% { background: var(--d2l-color-regolith); }
			75% { background: var(--d2l-color-sylvite); }
			100% { background: var(--d2l-color-sylvite); }
		}

		.skeletize::before {
			content: "";
			position: absolute;
			top: 0;
			bottom: 0;
			right: 0;
			left: 0;
			border-radius: 0.2rem;
			animation: loadingPulse 1.8s linear infinite;
			background-color: var(--d2l-color-sylvite);
			z-index: 2000;
		}

		.skeletize {
			position: relative;
			color: transparent;
			border: none;
			box-shadow: none;
		}

		.flex-container {
			display: flex;
			flex-wrap: wrap;
		}

		.item-container {
			margin-right: 40px;
		}

		.item-container[dir="rtl"] {
			margin-right: 0;
			margin-left: 40px;
		}

		d2l-input-text {
			display: block;
		}

        `;
	}
};
