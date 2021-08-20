import { bodySmallStyles, labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { css, html } from 'lit-element/lit-element.js';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { LocalizeActivityEditorMixin } from '../mixins/d2l-activity-editor-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import store from './state/activity-evaluators-store';
import '@brightspace-ui/core/components/status-indicator/status-indicator.js';
import { tableStyles } from '@brightspace-ui/core/components/table/table-wrapper.js';
import 'd2l-users/components/d2l-profile-image';
import { performSirenAction } from 'siren-sdk/src/es6/SirenAction.js';

class ActivityEvaluatorDelegationEditor
	extends ActivityEditorMixin(RtlMixin(LocalizeActivityEditorMixin(MobxLitElement))) {

	static get properties() {
		return {
			href: { type: String },
			token: { type: Object },
			_addEditEvaluatorsDialogOpen: { type: Boolean },
			_manageEvaluatorsDialogOpen: { type: Boolean }
		};
	}


	static get styles() {

		return [
			bodySmallStyles,
			labelStyles,
			tableStyles,
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
		this.map = undefined;
		this.students = undefined;
	}

	_onAddEditEvalutorsButtonClicked(e){
		this._addEditEvaluatorsDialogOpen = true;
	}


	_onManageEvalutorsButtonClicked(e){
		this._manageEvaluatorsDialogOpen = true;
	}


	_updateEvaluators(e){

		if(!e.target.checked) {
			delete this.map[e.target.id];
		} else {
			this.map[e.target.id] = this.students.map(x => x.id);
		}
		console.log(this.map)

	}

	_updateMapping(e) {

		let ids = e.target.id.split("_");
		let evaluatorId = ids[0]
		let studentId = ids[1]
		if(!e.target.checked) {
			this.map[evaluatorId] = this.map[evaluatorId].filter(item => item !== studentId);
		} else {
			this.map[evaluatorId].push(studentId);
		}


	}

	_renderDialogEditor(evaluators, map){
		const itemTemplate = [];

		evaluators.forEach( x => {
			itemTemplate.push( html `
			<d2l-input-checkbox
				id="${x.id}"
				@change="${this._updateEvaluators}"
				?checked="${this.map[x.id] != undefined}">
				<d2l-profile-image
					class="d2l-user-badge-image"
					href="${x.href}"
					.token=${this.token}
					small
					aria-hidden="true">
				</d2l-profile-image>
				<d2l-status-indicator state="default" text="${x.name}"></d2l-status-indicator>
			</d2l-input-checkbox>
			`
		)})

		return html`${itemTemplate}`;

	}

	_renderManageEvaluatorsDialogEditor(evaluators, map) {
		const instructors = [];
		const students = [];
		var evaluatorsArray  = Object.keys(this.map).map((key) => [key, this.map[key]]);

		evaluatorsArray.forEach( x => {
			instructors.push( html `
			<th>
				${this.evaluators.find( y => y.id == x[0]).name}
			</th>
			`
		)});

		this.students.forEach( x => {
			let studentEvaluators = []
			evaluatorsArray.forEach( y => {
				studentEvaluators.push(
					html`
						<td>
							<d2l-input-checkbox
								id="${y[0] + "_" + x.id}"
								@change="${this._updateMapping}"
								?checked="${this.map[y[0]].includes(x.id)}">
							</d2l-input-checkbox>
						</td>`
				)
			})

			students.push( html `
			<tr>
				<td>
					${x.name}
				</td>
				${studentEvaluators}
			</td>
			`
		)});

		return html`
			<d2l-table-wrapper>
			<table class="d2l-table">
				<thead>
					<tr>
						<th>Students</th>
						${instructors}
					</tr>
				</thead>
				<tbody>
					${students}
				</tbody>
			</table>
			</d2l-table-wrapper>
		`;

	}

	_saveManageEvaluators(){
		this._manageEvaluatorsDialogOpen = false;
		const entity = store.get(this.href);
		var evaluatorsArray  = Object.keys(this.map).map((key) => [key, this.map[key]]);
		entity.save(evaluatorsArray);
	}

	_saveEvaluators(){
		this._addEditEvaluatorsDialogOpen = false;
		this._manageEvaluatorsDialogOpen = false;
	}

	render() {
		const entity = store.get(this.href);
		if (!entity) {
			return html``;
		}

		this.students = entity.getStudents();
		this.evaluators = entity.getEvaluators();

		this.map = entity.getMap();

		const itemTemplate = [];

		this.evaluators.forEach( x => {
			if(!this.map[x.id]) {
				return;
			}

			itemTemplate.push( html `
			<d2l-list-item>
			<img
				id="icon"
				src="${x.image}"
				tabindex="0"></img>
				<d2l-status-indicator state="default" text="${x.name}"></d2l-status-indicator>
			</d2l-list-item>`
		)})

		return html`
			<d2l-dialog
				id="add-edit-evaluators-dialog"
				title-text="Add / Edit Evaluators"
				width="500px"
				?opened="${this._addEditEvaluatorsDialogOpen}">
					${this._renderDialogEditor(this.evaluators, this.map)}
					<d2l-button id="d2l-activity-add-edit-evaluators-save" slot="footer" primary @click=${this._saveEvaluators}>Save</d2l-button>
					<d2l-button slot="footer"  @click=${this._saveEvaluators} data-dialog-action="abort">Cancel</d2l-button>
			</d2l-dialog>
			<d2l-dialog
				id="manage-evaluators-dialog"
				title-text="Add / Edit Evaluators"
				width="500px"
				?opened="${this._manageEvaluatorsDialogOpen}">
					${this._renderManageEvaluatorsDialogEditor(this.evaluators, this.map)}
					<d2l-button id="d2l-activity-add-edit-evaluators-save" slot="footer" primary @click=${this._saveManageEvaluators}>Save</d2l-button>
					<d2l-button slot="footer"  @click=${this._saveEvaluators} data-dialog-action="abort">Cancel</d2l-button>
			</d2l-dialog>
			<div class="d2l-label-text">
				Evaluators
			</div>
			<d2l-list>
				${itemTemplate}
			</d2l-list>

			<d2l-button-subtle
				icon="tier1:edit"
				@click="${this._onAddEditEvalutorsButtonClicked}"
				text="Add / Edit Evaluators"
			></d2l-button-subtle>
			<d2l-button-subtle
			icon="tier1:edit"
			@click="${this._onManageEvalutorsButtonClicked}"
			text="Manage Evaluators"
		></d2l-button-subtle>

		`;
	}

}
customElements.define(
	'd2l-activity-evaluator-delegation-editor',
	ActivityEvaluatorDelegationEditor
);
