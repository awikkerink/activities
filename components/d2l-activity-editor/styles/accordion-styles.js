import { css } from 'lit-element';

export const accordionStyles = css`
	:host {
		display: block;
	}

	:host([hidden]) {
		display: none;
	}
`;
