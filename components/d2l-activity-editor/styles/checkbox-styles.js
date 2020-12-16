import { css } from 'lit-element';

export const checkboxStyles = css`
	:host {
		display: block;
	}

	:host([hidden]) {
		display: none;
	}

	d2l-input-checkbox {
		padding-right: 1rem;
	}

	:host([dir="rtl"]) d2l-input-checkbox {
		padding-left: 1rem;
		padding-right: 0;
	}

	.d2l-input-checkbox-text {
		display: inline-block;
		font-size: 0.8rem;
		font-weight: 400;
		vertical-align: top;
		white-space: normal;
	}
`;
