import 'd2l-inputs/d2l-input-text.js';
import 'd2l-tooltip/d2l-tooltip';
import '@brightspace-ui/core/components/button/button-subtle.js';
import { bodyCompactStyles, labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { css, html } from 'lit-element/lit-element.js';
import { activityContentEditorStyles } from '../shared-components/d2l-activity-content-editor-styles.js';
import { ActivityEditorMixin } from '../../mixins/d2l-activity-editor-mixin.js';
import { ErrorHandlingMixin } from '../../error-handling-mixin.js';
import { LocalizeActivityEditorMixin } from '../../mixins/d2l-activity-editor-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { radioStyles } from '@brightspace-ui/core/components/inputs/input-radio-styles.js';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin.js';

class ContentEditorScormActivityDisplayOptions extends SkeletonMixin(ErrorHandlingMixin(LocalizeActivityEditorMixin(RtlMixin(ActivityEditorMixin(MobxLitElement))))) {

	static get properties() {
		return {
			entity: { type: Object },
			skeleton: { type: Boolean },
			onSave: { type: Function },
			showLinkOptions: { type: Boolean }
		};
	}

	static get styles() {
		return  [
			super.styles,
			labelStyles,
			radioStyles,
			activityContentEditorStyles,
			bodyCompactStyles,
			css`
				.d2l-display-options-heading-container {
					align-content: flex-start;
					display: flex;
				}
				.d2l-display-options-text {
					margin-bottom: 6px;
				}
				.d2l-label-text {
					display: inline-block;
				}
				#open-new-tab-help-span {
					margin-left: 12px;
				}
				:host([dir='rtl']) #open-new-tab-help-span {
					margin-left: 0;
					margin-right: 12px;
				}
				:host > div {
					padding-bottom: 0; /* undo the activity-content-editor-styles padding */
				}
			`,
		];
	}

	constructor() {
		super();
		this._debounceJobs = {};
		this.saveOrder = 2000;
		this.showLinkOptions = true;
	}

	render() {
		let isExternalResource = false;

		if (this.entity) {
			isExternalResource = this.entity.isExternalResource;

			if (!this.showLinkOptions) {
				isExternalResource = true;
				this.onSave(isExternalResource);
			}
		}

		return html`
		<div id="content-link-options-container">
			<div class="d2l-display-options-heading-container">
				<label class="d2l-label-text d2l-skeletize d2l-display-options-text">
					${this.localize('content.displayOptions')}
				</label>
			</div>
			${this._renderLinkOptions(isExternalResource)}
		</div>
		`;
	}

	_renderLinkOptions(isExternalResource) {
		return html`
			<label class="d2l-input-radio-label d2l-skeletize">
				<input
					id="use-embedded-player"
					type="radio"
					name="link-display-group"
					value="embed"
					?checked="${!isExternalResource}"
					@change="${this._saveLinkOptions}">
					${this.localize('content.useEmbeddedPlayer')}
			</label>
			<label class="d2l-input-radio-label d2l-skeletize">
				<input
					id="open-new-tab"
					type="radio"
					name="link-display-group"
					value="newTab"
					?checked="${isExternalResource}"
					@change="${this._saveLinkOptions}">
					${this.localize('content.openNewTab')}
					<span id="open-new-tab-help-span" tabindex="0">
						<d2l-icon
							icon="d2l-tier1:help">
						</d2l-icon>
						<d2l-tooltip
							for="open-new-tab-help-span">
							${this.localize('content.openNewTabRecommendation')}
							${this.localize('content.openNewTabHelp')}
						</d2l-tooltip>
					</span>
			</label>
			`;
	}

	_saveLinkOptions(e) {
		this.onSave(e.target.value === 'newTab');
	}
}
customElements.define('d2l-activity-content-scorm-activity-display-options', ContentEditorScormActivityDisplayOptions);
