import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin';
import { html } from 'lit-element/lit-element';
import { LocalizeActivityQuizEditorMixin } from './mixins/d2l-activity-quiz-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';

class ActivityQuizManageTimingContainer extends ActivityEditorMixin(LocalizeActivityQuizEditorMixin(MobxLitElement)) {
	render() {
		return html`
		<div>
			<slot name='one'></slot>
			<slot name='two'></slot>
		</div>
    `;
	}

}

customElements.define(
	'd2l-activity-quiz-manage-timing-container',
	ActivityQuizManageTimingContainer
);
