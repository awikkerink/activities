import { css } from 'lit-element';

export const checkboxStyles = css`
	:host {
		display: block;
	}

	:host([hidden]) {
		display: none;
	}

	d2l-input-checkbox {
		margin: 0;
		padding-right: 1rem;
	}

	:host([dir="rtl"]) d2l-input-checkbox {
		padding-left: 1rem;
		padding-right: 0;
	}
`;
