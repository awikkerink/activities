import 'gbl-map-editor/src/components/gbl-map-editor.js';
import { css, html } from 'lit-element/lit-element.js';
import { ActivityEditorMixin } from '../../../mixins/d2l-activity-editor-mixin';
import { AsyncContainerMixin } from '@brightspace-ui/core/mixins/async-container/async-container-mixin';
import { Debouncer } from '@polymer/polymer/lib/utils/debounce.js';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit';
import { ErrorHandlingMixin } from '../../../error-handling-mixin';
import { LocalizeActivityEditorMixin } from '../../../mixins/d2l-activity-editor-lang-mixin';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin';
import { shared as store } from '../state/gbl-map-store.js';
import { timeOut } from '@polymer/polymer/lib/utils/async.js';

const DEBOUNCE_INTERVAL = 500;

class GblMapEditorDetail extends AsyncContainerMixin(SkeletonMixin(ErrorHandlingMixin(LocalizeActivityEditorMixin(EntityMixinLit(RtlMixin(ActivityEditorMixin(MobxLitElement))))))) {
	static get styles() {
		return [
			super.styles,
			css`
				:host {
					display: block;
				}
				:host([hidden]) {
					display: none;
				}
				.d2l-gbl-face-container {
					display: flex;
					flex-direction: column;
				}
				.d2l-gbl-name-container {
					padding-bottom: 18px;
				}
			`
		];
	}

	constructor() {
		super(store);
		this.skeleton = true;
		this.saveOrder = 2000;
		this._debounceJobs = {};
		this._nameError = false;
	}

	render() {
		const gblMapEntity = store.getGblMapActivity(this.href);

		if (gblMapEntity) {
			this.skeleton = false;
		}

		const {
			name,
			mapData
		} = gblMapEntity || {};

		return html`
			<div class='d2l-gbl-face-container'>
				<div class='d2l-gbl-name-container'>
					<d2l-input-text
						?skeleton=${this.skeleton}
						id='gbl-map-name'
						label=${this.localize('gbl.name')}
						maxlength='150'
						value=${name}
						required
						prevent-submit
						?aria-invalid=${this._nameError}
						novalidate
						@change=${this._saveOnChange('name')}
						@input=${this._saveNameOnInput}
					>
					</d2l-input-text>
				</div>
				<div class='d2l-gbl-map-editor-container'>
					<gbl-map-editor
						appTitle='test'
						editMap
						mapData=${mapData}
						@d2l-gbl-map-updated=${this._handleMapUpdated}
						?skeleton=${this.skeleton}
					>
					</gbl-map-editor>
				</div>
			</div>
		`;
	}

	hasPendingChanges() {
		const gblMapEntity = store.getGblMapActivity(this.href);
		if (!gblMapEntity) {
			return false;
		}

		return gblMapEntity.dirty;
	}

	async save() {
		const gblMapEntity = store.getGblMapActivity(this.href);
		if (!gblMapEntity) {
			return false;
		}

		this._saveOnChange('name');
		await gblMapEntity.save();
	}

	_debounce(jobName, fn, interval = DEBOUNCE_INTERVAL) {
		const isFirstChange = !this._debounceJobs[jobName];

		this._debounceJobs[jobName] = Debouncer.debounce(
			this._debounceJobs[jobName],
			timeOut.after(interval),
			() => fn()
		);

		if (isFirstChange) {
			this._debounceJobs[jobName].flush();
		}
	}

	_handleMapUpdated({ detail: { mapData } }) {
		const gblMapEntity = store.getGblMapActivity(this.href);
		if (!gblMapEntity) {
			return false;
		}

		gblMapEntity.setMapData(mapData);
	}

	_renderNameTooltip() {
		if (!this._nameError) {
			return html``;
		}

		return html`
			<d2l-tooltip
				id='name-tooltip'
				for='gbl-map-name'
				position='bottom'
				?showing=${!!this._nameError}
			>
				${this._nameError}
			</d2l-tooltip>
		`;
	}

	_saveNameOnInput({ target: { value: name } }) {
		const isNameEmpty = (name || '').trim().length === 0;

		this._debounce(
			'name',
			() => {
				if (isNameEmpty) {
					this.setError('_nameError', 'gbl.emptyNameField');
				} else {
					this.clearError('_nameError');
					store.getGblMapActivity(this.href).setName(name);
				}
			}
		);
	}

	_saveOnChange(jobName) {
		return () => this._debounceJobs[jobName] && this._debounceJobs[jobName].flush();
	}
}

customElements.define('d2l-activity-gbl-map-editor-detail', GblMapEditorDetail);
