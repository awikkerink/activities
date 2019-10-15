import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {QuickEvalLocalize} from './QuickEvalLocalize.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import 'd2l-typography/d2l-typography-shared-styles.js';
import './d2l-quick-eval-view-toggle.js';
import './d2l-quick-eval-activities.js';
import './d2l-quick-eval-submissions.js';
import './behaviors/d2l-quick-eval-telemetry-behavior.js';
import '@brightspace-ui/core/components/button/button-icon.js';
import 'd2l-dropdown/d2l-dropdown-more.js';
import 'd2l-dropdown/d2l-dropdown-content.js';
import 'd2l-dropdown/d2l-dropdown-menu.js';
import 'd2l-menu/d2l-menu.js';
import 'd2l-menu/d2l-menu-item.js';
import '@brightspace-ui/core/components/dialog/dialog.js';
import '@brightspace-ui/core/components/dialog/dialog-confirm.js';
import '@brightspace-ui/core/components/inputs/input-checkbox.js';
import '@brightspace-ui/core/components/inputs/input-checkbox-spacer.js';
import 'd2l-inputs/d2l-input-radio-styles.js'
import 'd2l-datetime-picker/d2l-datetime-picker.js'
// import 'd2l-date-picker/d2l-date-picker.js'
import 'd2l-time-picker/d2l-time-picker.js'
import 'd2l-alert/d2l-alert-toast.js';


const submissions = 'submissions';
const activities = 'activities';

/**
 * @customElement
 * @polymer
 */
class D2LQuickEval extends
	mixinBehaviors (
		[
			D2L.PolymerBehaviors.QuickEval.TelemetryBehaviorImpl
		],
		QuickEvalLocalize(PolymerElement)
	) {
	static get template() {
		return html`
			<style include="d2l-input-radio-styles">
				:host {
					display: block;
				}
				.top-container {
					display: flex;
				}
				.spacer {
					flex-grow: 1;
				}
				.top-container d2l-dropdown-more {
					align-self: center;
				}
				d2l-datetime-picker {
					zin
				}
				h1 {
					@apply --d2l-heading-1;
					margin: 0;
				}
				.d2l-quick-eval-header {
					float: left;
				}
				:host(:dir(rtl)) .d2l-quick-eval-header-with-toggle {
					float: right;
				}
				.d2l-quick-eval-header-with-toggle {
					float: left;
					padding-bottom: 1.2rem;
				}
				:host([hidden]) {
					display: none;
				}
				@media (min-width: 525px) {
					d2l-quick-eval-view-toggle {
						clear: both;
						float: left;
					}
					:host(:dir(rtl)) d2l-quick-eval-view-toggle {
						float: right;
					}
				}
			</style>
				<d2l-alert-toast type="default" open>cows!</d2l-alert-toast>
			<div class="top-container">
				<template is="dom-if" if="[[headerText]]">
					<h1 class="d2l-quick-eval-header-with-toggle" hidden$="[[!activitiesViewEnabled]]">[[headerText]]</h1>
					<h1 class="d2l-quick-eval-header" hidden$="[[activitiesViewEnabled]]">[[headerText]]</h1>
				</template>
				<div class="spacer"></div>
				<!-- <d2l-button-icon text="more actions" icon="tier1:more">...</d2l-button-icon> -->
				<d2l-dropdown-more hidden="[[!_displayActivities(toggleState, activitiesViewEnabled)]]" text="Open!">
					<d2l-dropdown-menu id="dropdown">
						<d2l-menu label="Astronomy">
							<d2l-menu-item text="Dismissed-activities" on-click="[[_openDialog]]" id="dismissed-activities" ></d2l-menu-item>
						</d2l-menu>
					</d2l-dropdown-menu>
				</d2l-dropdown-more>
				<d2l-dialog  title-text="Dialog Title" on-click="[[_closeConfirmDialog]]">
				  <div>Some dialog content</div>
					<d2l-datetime-picker
						locale="en"
						overrides="[[overrides]]"
						timezoneName="Canada-Toronto"
						datetime="Wed Dec 31 1969 19:00:00 GMT-0500 (EST)",
						boundary='{"below":240}'
					></d2l-datetime-picker>
					<!-- <d2l-date-picker value="{{value}}">
						<button >[[_getButtonText(value)]]</button>
					</d2l-date-picker> -->

					<!-- <d2l-time-picker id="time-picker" time-interval="{{interval}}" hours="{{hours}}" minutes="{{minutes}}" locale="{{locale}}" timezone="{{timezone}}"></d2l-time-picker> -->
					<label class="d2l-input-radio-label"><input type="radio" name="cow" value="on">test</label>
					<label class="d2l-input-radio-label"><input type="radio" name="cow" value="on">foo</label>
					<label class="d2l-input-radio-label"><input type="radio" name="cow" value="on">bar</label>
					<label class="d2l-input-radio-label"><input type="radio" name="cow" value="on">baz</label>
					<!-- <input type="radio" name="cow" value="on"> foo <br> -->
					<!-- <input type="radio" name="cow" value="on"> bar <br> -->
					<!-- <input type="radio" name="cow" value="on"> baz <br> -->


					<d2l-input-checkbox>
						<d2l-quick-eval-activity-card
							assigned="20"
							completed="2"
							published="3"
							evaluated="4"
							newSubmissions="5"
							resubmitted="6"
							due-date="2019-10-10"
							activity-type="quiz"></d2l-quick-eval-activity-card>
					</d2l-input-checkbox>
					<d2l-input-checkbox>
						<d2l-quick-eval-activity-card
							assigned="20"
							completed="2"
							published="3"
							evaluated="4"
							newSubmissions="5"
							resubmitted="6"
							due-date="2019-10-10"
							activity-type="quiz"></d2l-quick-eval-activity-card>
					</d2l-input-checkbox>
					<d2l-input-checkbox>
						<d2l-quick-eval-activity-card
							assigned="20"
							completed="2"
							published="3"
							evaluated="4"
							newSubmissions="5"
							resubmitted="6"
							due-date="2019-10-10"
							activity-type="quiz"></d2l-quick-eval-activity-card>
					</d2l-input-checkbox>
					<d2l-input-checkbox>
						<d2l-quick-eval-activity-card
							assigned="20"
							completed="2"
							published="3"
							evaluated="4"
							newSubmissions="5"
							resubmitted="6"
							due-date="2019-10-10"
							activity-type="quiz"></d2l-quick-eval-activity-card>
					</d2l-input-checkbox>
					<!-- <d2l-quick-eval-submissions href="[[_lazySubmissionsHref]]" token="[[token]]" logging-endpoint="[[loggingEndpoint]]" data-telemetry-endpoint="[[dataTelemetryEndpoint]]" hidden$="[[_displayActivities(toggleState, activitiesViewEnabled)]]" master-teacher="[[masterTeacher]]"></d2l-quick-eval-submissions> -->
				  <d2l-button slot="footer" primary dialog-action="done">Done</d2l-button>
				  <d2l-button slot="footer" dialog-action>Cancel</d2l-button>
				</d2l-dialog>
			</div>
			<d2l-quick-eval-view-toggle current-selected="[[toggleState]]" toggle-href="[[toggleHref]]" hidden$="[[!activitiesViewEnabled]]" on-d2l-quick-eval-view-toggle-changed="_toggleView"></d2l-quick-eval-view-toggle>
			<d2l-quick-eval-submissions href="[[_lazySubmissionsHref]]" token="[[token]]" logging-endpoint="[[loggingEndpoint]]" data-telemetry-endpoint="[[dataTelemetryEndpoint]]" hidden$="[[_displayActivities(toggleState, activitiesViewEnabled)]]" master-teacher="[[masterTeacher]]"></d2l-quick-eval-submissions>
			<d2l-quick-eval-activities href="[[_lazyActivitiesHref]]" token="[[token]]" logging-endpoint="[[loggingEndpoint]]" hidden$="[[!_displayActivities(toggleState, activitiesViewEnabled)]]"></d2l-quick-eval-activities>
		`;
	}
	ready() {
		super.ready();
		this.perfMark('qeViewLoadStart');
	}
	attached() {
		const menu = this.shadowRoot.querySelector('d2l-menu');
		const checkboxes = this.shadowRoot.querySelectorAll('d2l-input-checkbox');
		checkboxes.forEach(x=> x.addEventListener('change', (e) => {
			console.log('E.TARGET', e.target);
		}));
		menu.addEventListener('d2l-menu-item-select', (e)=> {
			// console.log('item selected:', e.target.id);
			if (e.target.id === "dismissed-activities") {
				this._openDialog();
			}
		});
	}
	static get properties() {
		return {
			headerText: {
				type: String
			},
			masterTeacher: {
				type: Boolean,
				value: false
			},
			activitiesViewEnabled: {
				type: Boolean,
				value: false
			},
			loggingEndpoint: {
				type: String
			},
			dataTelemetryEndpoint: {
				type: String
			},
			submissionsHref: {
				type: String
			},
			_lazySubmissionsHref: {
				type: String,
				computed: '_computeLazySubmissionsHref(submissionsHref, toggleState)'
			},
			activitiesHref: {
				type: String
			},
			_lazyActivitiesHref: {
				type: String,
				computed: '_computeLazyActivitiesHref(activitiesHref, toggleState, activitiesViewEnabled)'
			},
			toggleHref: {
				type: String
			},
			toggleState: {
				type: String,
				value: submissions
			},
			token: {
				type: Object,
			},
			_dialogOpen: {
				type: Boolean,
				value: true
			},
			_publishAllDialogMessage: {
				type: String,
				value: "cows!"
			}
		};
	}

	_onClick() {
		console.log("do nothing");
	}

	_closeConfirmDialog() {
		console.log("do nothing");
	}
	_openDialog() {
		// this.shadowRoot.querySelector('d2l-dialog-confirm').open();
		this.shadowRoot.querySelector('d2l-dialog').open();
	}

	_displayActivities(toggleState, activitiesViewEnabled) {
		if (!activitiesViewEnabled) {
			return false;
		}

		return toggleState === activities;
	}

	_toggleView(e) {
		this.toggleState = e.detail.view;
		this.logViewQuickEvalEvent(e.detail.view);
	}

	_computeLazySubmissionsHref(submissionsHref, toggleState) {
		if (toggleState === submissions || this._lazySubmissionsHref) {
			return submissionsHref;
		}
		return '';
	}

	_computeLazyActivitiesHref(activitiesHref, toggleState, activitiesViewEnabled) {
		if ((toggleState === activities && activitiesViewEnabled) || this._lazyActivitiesHref) {
			return activitiesHref;
		}
		return '';
	}
}

window.customElements.define('d2l-quick-eval', D2LQuickEval);
