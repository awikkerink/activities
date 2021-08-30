/* eslint-disable indent */
import '@brightspace-ui/core/components/button/button-subtle.js';
import './d2l-activity-content-scorm-activity-jump-icon.js';
import '../shared-components/d2l-activity-content-link-preview.js';
import { bodyCompactStyles, bodySmallStyles, labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
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
			css`
				.d2l-external-activity-title-container {
					align-content: flex-end;
					display: flex;
					justify-content: space-between;
				}
				.d2l-external-activity-container {
					margin-top: 36px;
				}
				.d2l-external-activity-outer-frame {
					display: flex;
					flex-direction: column;
					height: 100%;
					justify-content: flex-start;
				}
				.d2l-external-activity-inner-frame {
					margin-top: 6px;
				}
			`
		];
	}

	constructor() {
		super();
		this.activityWindowPopout = null;
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
									.entity=${this.entity}>
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
				<p class="d2l-body-small d2l-skeletize">
					${this.subTitle}
				</p>`
			: html``;
	}

	_renderTitle() {
		return this.title
			? html`
				<div class="d2l-skeletize-container d2l-external-activity-title-container">
					<div>
						<label class="d2l-label-text d2l-skeletize">
							${this.title}
						</label>
						${this._renderSubTitle()}
					</div>
					<d2l-button-subtle
						text="${this.localize('content.openInNewWindow')}"
						icon="tier1:new-window"
						@click="${this._openPopout}"
						class="d2l-skeletize"
					>
					</d2l-button-subtle>
				</div>`
			: html``;
	}
}
customElements.define('d2l-activity-content-external-activity', ActivityContentScormExternalActivity);
