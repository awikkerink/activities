import { css, html } from 'lit-element/lit-element.js';

export const skeletonStyles = css`
	@keyframes loadingPulse {
		0% { fill: var(--d2l-color-sylvite); }
		50% { fill: var(--d2l-color-regolith); }
		75% { fill: var(--d2l-color-sylvite); }
		100% { fill: var(--d2l-color-sylvite); }
	}

	@keyframes loadingPulse2 {
		0% { background-color: var(--d2l-color-sylvite); }
		50% { background-color: var(--d2l-color-regolith); }
		75% { background-color: var(--d2l-color-sylvite); }
		100% { background-color: var(--d2l-color-sylvite); }
	}

	.d2l-skeleton-rect {
		animation: loadingPulse 1.8s linear infinite;
		fill: var(--d2l-color-sylvite);
	}
	.d2l-skeleton-fill {
		position: absolute;
		top: 0;
		right:0;
		bottom: 0;
		left: 0;
		border-radius: 0.2rem;
		height: 100%;
		width: 100%;
		z-index: 1000;
		transform: scale(1.01);
	}

	/* .d2l-label-text[skeleton]::before {
		content: "";
		position: absolute;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		color: red;
		border-radius: 0.2rem;
		animation: loadingPulse2 1.8s linear infinite;
		background-color: var(--d2l-color-sylvite);
	} */

	/* .d2l-label-text[skeleton] {
		position: relative;
		color: transparent;
	} */

	:host([skeleton]) .skeletize::before {
		content: "";
		position: absolute;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		border-radius: 0.2rem;
		animation: loadingPulse2 1.8s linear infinite;
		background-color: var(--d2l-color-sylvite);
		z-index: 2000;
	}

	:host([skeleton]) .skeletize {
		position: relative;
		color: transparent;
		border: none;
		box-shadow: none;
	}
`;

export function renderSkeleton() {
	return html`
		<svg class="d2l-skeleton-fill">
			<rect x="0" width="100%" y="0" height="100%" stroke="none" rx="4" class="d2l-skeleton-rect"></rect>
		</svg>
	`;
}

export function renderSingleLineTextSkeleton(width) {
	return html`
		<svg width="${width}" class="d2l-skeleton">
			<rect x="0" width="100%" y="0" height="100%" stroke="none" rx="4" class="d2l-skeleton-rect"></rect>
		</svg>
	`;
}

export function renderSkeletonBlock({fixed, aspectRatio}) {
	if (fixed) {
		return renderSkeletonBlockByFixed(fixed[0], fixed[1]);
	}

	return renderSkeletonBlockByAspectRatio(aspectRatio[0], aspectRatio[1]);
}

export function renderSkeletonBlockByFixed(width, height) {
	return html`
		<svg viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" class="d2l-skeleton">
			<rect x="0" width="100%" y="0" height="100%" stroke="none" class="d2l-skeleton-rect"></rect>
		</svg>
	`;
}

export function renderSkeletonBlockByAspectRatio(width, height) {
	return html`
		<svg viewBox="0 0 ${width} ${height}" width="100%" class="d2l-skeleton">
			<rect x="0" width="100%" y="0" height="100%" stroke="none" class="d2l-skeleton-rect"></rect>
		</svg>
	`;
}
