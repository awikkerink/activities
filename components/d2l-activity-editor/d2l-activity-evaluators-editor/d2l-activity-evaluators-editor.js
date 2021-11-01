import { css, html } from 'lit-element/lit-element.js';
import { accordionStyles } from '../styles/accordion-styles';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { LocalizeActivityEditorMixin } from '../mixins/d2l-activity-editor-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { Rels } from 'd2l-hypermedia-constants';

class ActivityEvaluatorsEditor extends ActivityEditorMixin(RtlMixin(LocalizeActivityEditorMixin(MobxLitElement))) {
			
	static get styles() {
		return [
			labelStyles,
			accordionStyles,
			css``
		];
	}



	render() {
	
			return html`
				<div class="d2l-label-text">
					${this.localize('evaluators.lblEvaluators')}
				</div>
				${this._renderSelectedEvaluators()}
				${this._renderDialogOpener()}
			`;
	}

	_openManageEvaluators(){
		alert(this.href);
	}

	_renderDialogOpener() {

		return html`
			<d2l-button-subtle
				icon="tier1:edit"
				text="${this.localize('evaluators.btnManageEvaluators')}"
				h-align="text"
				@click="${this._openManageEvaluators}">
			</d2l-button-subtle>
		`;
	}
        
	_renderSelectedEvaluators(){
		return html`
		`;
	}

}

customElements.define(
	'd2l-activity-evaluators-editor',
	ActivityEvaluatorsEditor
);