import { bodySmallStyles, labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { css, html } from 'lit-element/lit-element.js';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { LocalizeActivityEditorMixin } from '../mixins/d2l-activity-editor-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import store from './state/activity-evaluators-store';

class ActivityEvaluatorDelegationEditor
	extends ActivityEditorMixin(RtlMixin(LocalizeActivityEditorMixin(MobxLitElement))) {

	static get properties() {
		return {
			href: { type: String },
			token: { type: Object },
			_addEditEvaluatorsDialogOpen: { type: Boolean }
		};
	}


	static get styles() {

		return [
			bodySmallStyles,
			labelStyles,
			css`
			.d2l-body-small {
				margin: 0 0 0.3rem 0;
			}

			d2l-input-checkbox-spacer {
				margin-top: -0.9rem;
			}

			d2l-input-checkbox-spacer[hidden] {
				display: none;
			}
			`
		];
	}

	constructor() {
		super(store);
	}

	_onAddEditEvalutorsButtonClicked(e){
		console.log(e);
		this._addEditEvaluatorsDialogOpen = true;
	}

	_saveEvaluators(){

	}

	_renderDialogEditor(){
		return html`
			<div>
				Something
			</div>
		`
	}

	_renderDialog(){
		return html`

		`;
	}

	render() {

		const entity = store.get(this.href);
		if (!entity) {
			return html``;
		}

		return html`
			<d2l-dialog
				id="add-edit-evaluators-dialog"
				title-text="Add / Edit Evaluators"
				width="500px"
				?opened="${this._addEditEvaluatorsDialogOpen}">
					${this._renderDialogEditor()}
					<d2l-button id="d2l-activity-add-edit-evaluators-save" slot="footer" primary @click=${this._saveEvaluators}>Save</d2l-button>
					<d2l-button slot="footer"  @click=${this._saveEvaluators} data-dialog-action="abort">Cancel</d2l-button>
			</d2l-dialog>
			<div class="d2l-label-text">
				Evaluators
			</div>
			<d2l-button-icon
				?hidden="${false}"
				class="d2l-add-edit-evaluators-button"
				icon="tier1:alert"
				@click="${this._onAddEditEvalutorsButtonClicked}"
				text="Add / Edit Evaluators")}
			></d2l-button-icon>
		`;
	}

}
customElements.define(
	'd2l-activity-evaluator-delegation-editor',
	ActivityEvaluatorDelegationEditor
);
