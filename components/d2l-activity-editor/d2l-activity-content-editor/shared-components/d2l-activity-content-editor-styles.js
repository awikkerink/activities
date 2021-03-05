import { css } from 'lit-element/lit-element.js';

export const activityContentEditorStyles = css`
	:host {
		display: block;
	}
	:host([hidden]) {
		display: none;
	}
	:host([skeleton]) .d2l-skeletize::before {
		z-index: 3;
	}
	:host > div {
		padding-bottom: 20px;
	}
`;
