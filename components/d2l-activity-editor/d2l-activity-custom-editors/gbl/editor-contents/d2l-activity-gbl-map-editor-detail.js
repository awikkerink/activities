import { ActivityEditorMixin } from '../../../mixins/d2l-activity-editor-mixin';
import { AsyncContainerMixin } from '@brightspace-ui/core/mixins/async-container/async-container-mixin';
import { Debouncer } from '@polymer/polymer/lib/utils/debounce.js';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit';
import { ErrorHandlingMixin } from '../../../error-handling-mixin';
import { html } from 'lit-element/lit-element.js';
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
			super.styles
		];
	}

	constructor() {
		super(store);
		this._debounceJobs = {};
		this.skeleton = true;
		this.saveOrder = 2000;
	}

	render() {
		const gblMapEntity = store.getGblMapActivity(this.href);

		if (gblMapEntity) {
			this.skeleton = false;
		}

		const {
			title
		} = gblMapEntity || {};

		return html`
			<div class='d2l-gbl-name-container'>
				<d2l-input-text
					?skeleton=${this.skeleton}
					id='gbl-map-name'
					label=${this.localize('name')}
					maxlength='256'
					value=${title}
					required
					prevent-submit
					@change=${this._saveOnChange('name')}
					@input=${this._saveNameOnInput}
				>
				</d2l-input-text>
			</div>
		`;
	}

	_debounce(debounceJobs, fn, interval = DEBOUNCE_INTERVAL) {
		const isFirstChange = !debounceJobs;

		debounceJobs = Debouncer.debounce(
			debounceJobs,
			timeOut.after(interval),
			() => fn()
		);

		if (isFirstChange) {
			debounceJobs.flush();
		}
	}

	_saveNameOnInput({ target: { value } }) {
		this._debounce(
			this._debounceJobs.name,
			() => store.getGblMapActivity(this.href).setName(value)
		);
	}

	_saveOnChange(jobName) {
		return () => this._debounceJobs[jobName] && this._debounceJobs[jobName].flush();
	}
}

customElements.define('d2l-activity-gbl-map-editor-detail', GblMapEditorDetail);
