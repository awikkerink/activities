import 'd2l-users/components/d2l-profile-image.js';
import { css, html } from 'lit-element/lit-element.js';
import { accordionStyles } from '../styles/accordion-styles';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { LocalizeActivityEditorMixin } from '../mixins/d2l-activity-editor-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { sharedEvaluators as store } from '../state/activity-evluators-store.js'
import '@brightspace-ui-labs/multi-select/multi-select-list-item.js';
import '@brightspace-ui-labs/multi-select/multi-select-list.js';
import '@brightspace-ui/core/components/dialog/dialog.js'
import '@brightspace-ui/core/components/inputs/input-checkbox.js';
import '@brightspace-ui/core/components/list/list.js';
import '@brightspace-ui/core/components/list/list-item.js';
import '@brightspace-ui/core/components/selection/selection-action.js';

class ActivityEvaluatorsEditor extends ActivityEditorMixin(RtlMixin(LocalizeActivityEditorMixin(MobxLitElement))) {

	static get styles() {
		return [
			labelStyles,
			accordionStyles,
			css``
		];
	}

	constructor() {

		super(store);
	}

	render() {

		let evaluators = store.get(this.href);

		if (!evaluators || !evaluators.isEnabled) {
			return html``;
		}

		return html`
			<div class="d2l-label-text">
				${this.localize('evaluators.lblEvaluators')}
			</div>
			${this._renderSelectedEvaluators(evaluators.getSelected)}
			${this._renderDialogOpener()}
			${this._renderDialog(evaluators)}
		`;
	}

	_openManageEvaluators() {

		const dialog = this.shadowRoot.querySelector('#activity-evaluators-dialog-editor');
		dialog.opened = true;		
	}

	_renderDialog(evaluators)
	{
		return html`
			<d2l-dialog 
				id="activity-evaluators-dialog-editor"
				@d2l-dialog-close=${this._dialogClose}
				width="400"
				title-text="Evaluators">
  				<div>${this._renderDialogContent(evaluators.getAll)}</div>
				${evaluators.hasUpdateAction
				? html`<d2l-button slot="footer" primary data-dialog-action="done">Save</d2l-button>`
				: html`<d2l-button slot="footer" primary data-dialog-action="done" disabled>Save</d2l-button>`
				}	
  				<d2l-button slot="footer" data-dialog-action>Cancel</d2l-button>
			</d2l-dialog>
		`;
	}

	_renderDialogContent(evaluators)
	{		
		return html`
			<d2l-list
				@d2l-list-selection-change=${this._selectionChanged}>
 				${evaluators.map(element => {

					return element.isSelected 
						?  html`
							<d2l-list-item
								key="${element.userHref}"
								selectable
								selected 
								label=${element.displayName}>
								${this._renderListItemContent(element)}
							</d2l-list-item>`
						:html`
							<d2l-list-item
								key="${element.userHref}"
								selectable 
								label=${element.displayName}>
								${this._renderListItemContent(element)}
							</d2l-list-item>`
						;
					})
 				}
 			</d2l-list>
		`;
	}

	_renderListItemContent(element)
	{
		return  html`							
			<div slot="illustration">
				<d2l-profile-image 			
					href="${element.userHref}" 
					.token="${this.token}" 
					medium>
				</d2l-profile-image>
			</div>
			<d2l-list-item-content>
				<div>${element.displayName}</div>
				<div slot="secondary">${element.orgDefinedId}</div>
			</d2l-list-item-content>
		`; 
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

	_renderSelectedEvaluators(selectedEvaluators) {

		if (selectedEvaluators.length == 0) {
			return html``;
		}

		return html`
			${selectedEvaluators.map(element => {
				
					return html`
						<div>
							<d2l-profile-image 
								href="${element.userHref}" 
								.token="${this.token}" 
								small>
							</d2l-profile-image>
							<d2l-labs-multi-select-list-item
								text="${element.displayName}">
							</d2l-labs-multi-select-list-item>
						</div>`;	
				})
			}`
		;
	}

	async _selectionChanged({ detail: { selected, key } }) {
 			
		var evaluatorsState = store.get(this.href);

		await evaluatorsState.toggleSelection(key);

 	}

	 _dialogClose(){

		console.log('_dialogClose');
	 }

}

customElements.define(
	'd2l-activity-evaluators-editor',
	ActivityEvaluatorsEditor
);