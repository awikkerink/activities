import '@brightspace-hmc/foundation-components/components/activity/editor/d2l-activity-editor-main.js';
import { css, LitElement } from 'lit-element/lit-element.js';
import { html } from '@brightspace-hmc/foundation-engine/framework/lit/hypermedia-components.js';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { LocalizeActivityQuizEditorMixin } from './mixins/d2l-activity-quiz-lang-mixin';
import { AsyncContainerMixin, asyncStates } from '@brightspace-ui/core/mixins/async-container/async-container-mixin.js';

const componentClass = class extends LitElement {
	static get properties() {
		return {
			href: { type: String, reflect: true },
			token: { type: String }
		};
	}
	static get styles() {
		return [css`
			:host {
				display: block;
			}`];
	}
	render() {
		return html `
			<d2l-activity-editor-main href="${this.href}" .token="${this.token}"></d2l-activity-editor-main>
		`;
	}
}

customElements.define('d2l-activity-quiz-question-editor', componentClass);
