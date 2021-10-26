/* eslint-disable indent */
import '@brightspace-ui/core/components/button/button-subtle.js';
import './d2l-activity-content-scorm-activity-jump-icon.js';
import '../shared-components/d2l-activity-content-link-preview.js';
import { bodyCompactStyles, bodySmallStyles, heading4Styles, labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { css, html } from 'lit-element/lit-element.js';
import { LocalizeActivityEditorMixin } from '../../mixins/d2l-activity-editor-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin.js';

class ActivityContentScormExternalActivity extends SkeletonMixin(LocalizeActivityEditorMixin(RtlMixin(MobxLitElement))) {

	static get properties() {
		return {
			entity: { type: Object },
			skeleton: { type: Boolean },
			showInNewTab: { type: Boolean },
			showActivityPreview: { type: Boolean },
			title: { type: String },
			subTitle: { type: String }
		};
	}

	static get styles() {
		return [
			super.styles,
			labelStyles,
			bodyCompactStyles,
			bodySmallStyles,
			heading4Styles,
			css`
				.d2l-external-activity-title-container {
					align-content: flex-start;
					align-items: center;
					background-color: var(--d2l-color-regolith);
					border: 1px solid var(--d2l-color-mica);
					border-width: 1px 0;
					display: flex;
					height: 60px;
					justify-content: space-between;
					max-height: 60px;
					overflow: hidden;
					padding: 0 24px;
				}
				.d2l-external-activity-container {
					margin-top: 36px;
				}
				.d2l-external-activity-outer-frame {
					border: 1px solid var(--d2l-color-mica);
					display: flex;
					flex-direction: column;
					height: 100%;
					justify-content: flex-start;
				}
				.d2l-external-activity-subtitle {
					display: inline-block;
					height: 1rem;
					margin: 12px 0;
				}
			`
		];
	}

	constructor() {
		super();
		this.activityWindowPopout = null;
		this.skeleton = true;
	}

	render() {
		return html`
			<div class="d2l-external-activity-container">
				${this._renderTitle()}
				<div class="d2l-external-activity-outer-frame d2l-skeletize-container">
					<div class="d2l-external-activity-inner-frame d2l-skeletize">
						${this.showInNewTab || !this.showActivityPreview
							? html`
								<d2l-activity-content-scorm-activity-jump-icon>
									<p class="d2l-body-compact">
										${this.localize('content.externalActivityOpened')}
									</p>
								</d2l-activity-content-scorm-activity-jump-icon>`
							: html`
								<d2l-activity-content-link-preview
									.entity=${this.entity}
								>
								</d2l-activity-content-link-preview>`
						}
					</div>
				</div>
			</div>
		`;
	}

	_openPopout() {
		this.showInNewTab = true;
		if (this.activityWindowPopout && !this.activityWindowPopout.closed) {
			this.activityWindowPopout.focus();
			return;
		}

		this.activityWindowPopout = window.open(
			this.entity.link,
			'activityPopout',
			'width=1000,height=1000,scrollbars=no,toolbar=no,screenx=0,screeny=0,location=no,titlebar=no,directories=no,status=no,menubar=no'
		);
	}

	_renderSubTitle() {
		return this.subTitle
			? html`
				<p class="d2l-body-small d2l-skeletize d2l-external-activity-subtitle">
					${this.subTitle}
				</p>`
			: html``;
	}

	_renderTitle() {
		return this.title
			? html`
				<div class="d2l-skeletize d2l-external-activity-title-container">
						<label class="d2l-label-text d2l-heading-4">
							${this.title}
						</label>
					<d2l-button-subtle
						text="${this.localize('content.openInNewWindow')}"
						icon="tier1:new-window"
						@click="${this._openPopout}"
					>
					</d2l-button-subtle>
				</div>
				${this._renderSubTitle()}
			`
			: html``;
	}
}
customElements.define('d2l-activity-content-external-activity', ActivityContentScormExternalActivity);
