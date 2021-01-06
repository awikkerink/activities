import '@brightspace-ui/core/components/dialog/dialog.js';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin';
import { html } from 'lit-element/lit-element';
import { LocalizeActivityQuizEditorMixin } from './mixins/d2l-activity-quiz-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';

class ActivityQuizManageTimingContainer extends ActivityEditorMixin(LocalizeActivityQuizEditorMixin(MobxLitElement)) {
	render() {
		return html`
		<div>
			<d2l-dialog id="quiz-manage-timing-dialog" ?opened=${this.isDialogOpen} title-text=${this.localize('subHdrTimingTools')}>
				<d2l-button slot="footer" primary data-dialog-action="add">${this.localize('btnAdd')}</d2l-button>
				<d2l-button slot="footer" data-dialog-action>${this.localize('btnCancel')}</d2l-button>
			</d2l-dialog>
		</div>
    `;
	}

}

customElements.define(
	'd2l-activity-quiz-manage-timing-container',
	ActivityQuizManageTimingContainer
);
