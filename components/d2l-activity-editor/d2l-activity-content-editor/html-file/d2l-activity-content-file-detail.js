import '../shared-components/d2l-activity-content-editor-title.js';
import { AsyncContainerMixin, asyncStates } from '@brightspace-ui/core/mixins/async-container/async-container-mixin.js';
import { activityContentEditorStyles } from '../shared-components/d2l-activity-content-editor-styles.js';
import { ActivityEditorMixin } from '../../mixins/d2l-activity-editor-mixin.js';
import { ContentHtmlFileEntity } from 'siren-sdk/src/activities/content/ContentHtmlFileEntity.js';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit.js';
import { ErrorHandlingMixin } from '../../error-handling-mixin.js';
import { html } from 'lit-element/lit-element.js';
import { shared as htmlFileStore } from './state/content-html-file-store.js';
import { labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { LocalizeActivityEditorMixin } from '../../mixins/d2l-activity-editor-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin.js';

class ContentFileDetail extends AsyncContainerMixin(SkeletonMixin(ErrorHandlingMixin(LocalizeActivityEditorMixin(EntityMixinLit(RtlMixin(ActivityEditorMixin(MobxLitElement))))))) {

	static get styles() {
		return  [
			super.styles,
			labelStyles,
			activityContentEditorStyles
		];
	}

	constructor() {
		super(htmlFileStore);
		this._debounceJobs = {};
		this._setEntityType(ContentHtmlFileEntity);
		this.skeleton = true;
		this.saveOrder = 2000;
	}

	connectedCallback() {
		super.connectedCallback();
		this.saveTitle = this.saveTitle.bind(this);
	}

	render() {
		const htmlFileEntity = htmlFileStore.getContentHtmlFileActivity(this.href);

		// eslint-disable-next-line no-console
		console.log({ htmlFileEntity });

		if (htmlFileEntity) {
			this.skeleton = false;
		}

		return html`
			<h1>HELLO WORLD</h1>
			<d2l-activity-content-editor-title
				.entity=${htmlFileEntity}
				.onSave=${this.saveTitle}
			>
			</d2l-activity-content-editor-title>
			<slot name="due-date"></slot>

		`;
	}

	updated(changedProperties) {
		if (changedProperties.has('asyncState')) {
			this.skeleton = this.asyncState !== asyncStates.complete;
		}
	}

	async cancelCreate() {
		const htmlFileEntity = htmlFileStore.getContentHtmlFileActivity(this.href);
		if (!htmlFileEntity) {
			return;
		}

		await htmlFileEntity.cancelCreate();
	}

	hasPendingChanges() {
		const htmlFileEntity = htmlFileStore.getContentHtmlFileActivity(this.href);
		if (!htmlFileEntity) {
			return false;
		}
		return htmlFileEntity.dirty;
	}

	async save() {
		const htmlFileEntity = htmlFileStore.getContentHtmlFileActivity(this.href);
		if (!htmlFileEntity) {
			return;
		}

		await htmlFileEntity.save();
	}

	saveTitle(title) {
		const htmlFileEntity = htmlFileStore.getContentHtmlFileActivity(this.href);
		if (!htmlFileEntity) {
			return;
		}
		htmlFileEntity.setTitle(title);
	}
}

customElements.define('d2l-activity-content-file-detail', ContentFileDetail);
