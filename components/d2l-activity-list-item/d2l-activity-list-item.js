import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {mixinBehaviors} from '@polymer/polymer/lib/legacy/class.js';
import {MutableData} from '@polymer/polymer/lib/mixins/mutable-data.js';
import {beforeNextRender, afterNextRender} from '@polymer/polymer/lib/utils/render-status.js';
import {IronResizableBehavior} from '@polymer/iron-resizable-behavior/iron-resizable-behavior.js';
import 'fastdom/fastdom.min.js';
import 'd2l-offscreen/d2l-offscreen-shared-styles.js';
import 'd2l-icons/d2l-icon.js';
import 'd2l-icons/tier1-icons.js';
import 'd2l-course-image/d2l-course-image.js';
import {Classes, Rels} from 'd2l-hypermedia-constants';
import 'd2l-fetch/d2l-fetch.js';
import 'd2l-organizations/components/d2l-organization-name/d2l-organization-name.js';
import 'd2l-typography/d2l-typography.js';
import 'd2l-polymer-behaviors/d2l-focusable-behavior.js';
import 'd2l-button/d2l-button.js';
import './d2l-activity-list-item-enroll.js';
import SirenParse from 'siren-parser';
import {ActivityListItemResponsiveConstants} from './ActivityListItemResponsiveConstants.js';

/**
 * @customElement
 * @polymer
 */
class D2lActivityListItem extends mixinBehaviors([IronResizableBehavior, D2L.PolymerBehaviors.FetchSirenEntityBehavior, D2L.PolymerBehaviors.FocusableBehavior], ActivityListItemResponsiveConstants(MutableData(PolymerElement))) {
	static get template() {
		return html`
			<style include="d2l-typography-shared-styles"></style>
			<style include="d2l-offscreen-shared-styles">
				:host {
					display: block;
					max-width: 842px;
				}
				:host([active]) {
					border-color: rgba(0, 111, 191, 0.4);
					box-shadow: 0 0 0 4px rgba(0, 111, 191, 0.3);
				}
				.d2l-activity-list-item-container:hover,
				.d2l-activity-list-item-container:focus {
					background-color: #FAFBFC; /* Pending Colin */
				}
				.d2l-activity-list-item-container {
					position: relative;
					height: 100%;
				}
				.d2l-activity-list-item-link-container {
					overflow: hidden;
					display: flex;
					flex-direction: row;
					flex-grow: 1;
					flex-shrink: 1;
					flex-basis: 0;
				}
				.d2l-activity-list-item-link-text {
					display: inline-block;
					@apply --d2l-offscreen;
				}
				a.d2l-focusable {
					display: block;
					position: absolute;
					height: 100%;
					outline: none;
					width: 100%;
					z-index: 1;
				}
				/* P2-shadow */
				:host-context([dir="rtl"]) .d2l-activity-list-item-link-text {
					@apply --d2l-offscreen-rtl
				}
				/* P1-shady, P2-shady */
				:host(:dir(rtl)) .d2l-activity-list-item-link-text {
					@apply --d2l-offscreen-rtl
				}
				.d2l-activity-list-item-image {
					flex-shrink: 0;
					margin-right: 1.2rem;
					width: 273px;
					height: 161px;
					display: flex;
					align-items: center;
					justify-content: center;
					overflow: hidden;
					border: 1px solid var(--d2l-color-gypsum);
					border-radius: 6px;
				}
				.d2l-activity-list-item-title {
					flex-shrink: 0;
					@apply --d2l-heading-2;
					font-size: 0.95rem;
					line-height: 1.58rem;
					max-height: 3.16rem;
					overflow: hidden;
					color: var(--d2l-color-celestine);
					margin: 0.2rem 0;
				}
				.d2l-activity-list-item-container:hover .d2l-activity-list-item-title ,
				.d2l-activity-list-item-container:focus .d2l-activity-list-item-title {
					color: var(--d2l-color-celestine-minus-1);
					text-decoration: underline;
				}
				.d2l-activity-list-item-description p {
					margin: 0;
					padding: 0;
					@apply --d2l-body-compact-text;
					color: var(--d2l-color-ferrite);
				}
				.d2l-activity-list-item-footer,
				.d2l-activity-list-item-footer span d2l-icon {
					flex-shrink: 0;
					color: var(--d2l-color-tungsten);
					@apply --d2l-body-small-text;
				}
				.d2l-activity-list-item-footer {
					height: 1rem;
					margin: 0;
					margin-top: 0.45rem;
					overflow: hidden;
				}
				.d2l-activity-list-item-footer span d2l-icon {
					--d2l-icon-width: 18px;
					--d2l-icon-height: 18px;
				}
				.d2l-activity-list-item-footer span:first-child d2l-icon {
					display: none;
				}
				.d2l-activity-list-item-footer span {
					white-space: nowrap;
				}
				.d2l-activity-list-item-content {
					flex-grow: 1;
					display: flex;
					flex-direction: column;
					width: 100%;
				}
				:host d2l-activity-list-item-enroll {
					margin: 0.5rem 1rem;
				}
				.d2l-activity-list-item-category {
					flex-shrink: 0;
					@apply --d2l-body-small-text;
					line-height: 0.9rem;
					margin: 0;
					overflow: hidden;
					height: 0.9rem;
					white-space: nowrap;
				}
			</style>
			<div class="d2l-activity-list-item-container">
				<a class="d2l-focusable" href$="[[_link]]">
					<span class="d2l-activity-list-item-link-text">[[_accessibilityDataToString(_accessibilityData)]]</span>
				</a>
				<div class="d2l-activity-list-item-link-container">
					<div class="d2l-activity-list-item-image">
						<d2l-course-image
							image="[[_image]]"
							sizes="[[_tileSizes]]"
							type="narrow">
						</d2l-course-image>
					</div>
					<div class="d2l-activity-list-item-content">
						<div class="d2l-activity-list-item-category">[[_category]]</div>
						<h2 class="d2l-activity-list-item-title">
							<d2l-organization-name href="[[_organizationUrl]]"></d2l-organization-name>
						</h2>
						<div class="d2l-activity-list-item-description" hidden$="[[!_showDescription]]"><p>[[_description]]</p></div>
						<div class="d2l-activity-list-item-footer" hidden$="[[!_tags]]">
							<template is="dom-repeat" items="[[_tags]]">
								<span>
									<d2l-icon icon="d2l-tier1:bullet"></d2l-icon>
									[[item]]
								</span>
							</template>
						</div>
					</div>
				</div>
			</div>
			<d2l-activity-list-item-enroll hidden$="[[!_actionEnroll]]" action-enroll="[[_actionEnroll]]"></d2l-activity-list-item-enroll>
		`;
	}

	static get properties() {
		return {
			href: {
				type: String,
				observer: '_onHrefChange'
			},
			entity: {
				type: Object,
				value: function() {
					return {};
				},
				observer: '_onSirenEntityChange'
			},
			_imageUrl: String,
			_title: String,
			_category: String,
			_description: {
				type: String,
				observer: '_onDescriptionChange'
			},
			_organizationUrl: String,
			_tags: String,
			_showDescription: Boolean,
			_image: Object,
			_imageLoading: {
				type: Boolean,
				value: false
			},
			_imageLoadingProgress: {
				type: Boolean,
				value: false
			},
			_tileSizes: {
				type: Object,
				value: function() {
					return {
						mobile: {
							maxwidth: 767,
							size: 100
						},
						tablet: {
							maxwidth: 1243,
							size: 67
						},
						desktop: {
							size: 25
						}
					};
				}
			},
			actionEnroll: {
				type: String,
				value: ''
			},
			_link: String,
			_accessibilityData: {
				type: Object,
				value: function() { return {}; }
			}
		};
	}

	constructor() {
		super();
		this._currentResponsiveConfig = undefined;
	}

	ready() {
		super.ready();
		this._onLinkBlur = this._onLinkBlur.bind(this);
		this._onLinkFocus = this._onLinkFocus.bind(this);
		this._onIronSize = () => this._setResponsiveSizes(this.offsetWidth);
		this.addEventListener('d2l-organization-accessible', this._onD2lOrganizationAccessible);
	}
	attached() {
		super.attached();
		afterNextRender(this, () => {
			const link = this.shadowRoot.querySelector('a');
			link.addEventListener('blur', this._onLinkBlur);
			link.addEventListener('focus', this._onLinkFocus);
			this.addEventListener('iron-resize', this._onIronSize);
			this._setResponsiveSizes(this.offsetWidth);
		});
	}
	_onD2lOrganizationAccessible(e) {
		this._accessibilityData.organizationName = e.detail.organization && e.detail.organization.name;
		this._accessibilityData.semesterName = e.detail.semesterName && e.detail.semesterName;

		this.notifyPath('_accessibilityData');
	}

	_accessibilityDataToString(accessibility) {
		if (!accessibility) {
			return;
		}

		const textData = [
			accessibility.organizationName
		];
		return textData.filter(function(text) {
			return text && typeof text === 'string';
		}).join(', ');
	}
	detached() {
		const link = this.shadowRoot.querySelector('a');
		link.removeEventListener('blur', this._onLinkBlur);
		link.removeEventListener('focus', this._onLinkFocus);
		this.removeEventListener('iron-resize', this._onIronSize);
	}

	_reset() {
		Object.keys(D2lActivityListItem.properties).forEach((key) => {
			this.set(key, D2lActivityListItem.properties[key].default);
		});
	}

	_onLinkBlur() {
		window.fastdom.mutate(function() {
			this.removeAttribute('active', 'active');
		}.bind(this));
	}

	_onLinkFocus() {
		window.fastdom.mutate(function() {
			this.setAttribute('active', 'active');
		}.bind(this));
	}

	_setResponsiveSizes(currentWidth) {
		const currentConfig = this._getResponsiveConfig(currentWidth);
		this._showDescription = currentConfig.showDescription;
		this._clampDescription(this._description);

		if (this._currentResponsiveConfig && this._currentResponsiveConfig.minWidth === currentConfig.minWidth) {
			return;
		}

		this._currentResponsiveConfig = currentConfig;
		window.fastdom.mutate(() => {
			const container = this.shadowRoot.querySelector('.d2l-activity-list-item-container');
			container.style.padding = currentConfig.padding;

			const image = this.shadowRoot.querySelector('.d2l-activity-list-item-image');
			image.style.width = currentConfig.image.width + 'px';
			image.style.height = currentConfig.image.height + 'px';
			image.style.marginRight = currentConfig.image.marginRight;

			const title = this.shadowRoot.querySelector('.d2l-activity-list-item-title');
			title.style.fontSize = currentConfig.title.fontSize + 'rem';
			title.style.fontWeight = currentConfig.title.fontWeight;
			title.style.lineHeight = currentConfig.title.lineHeight + 'rem';
			title.style.maxHeight = 2 * currentConfig.title.lineHeight + 'rem';
			title.style.margin = currentConfig.title.margin;
		});
	}
	_onDescriptionChange(description) {
		this._clampDescription(description);
	}
	_clampDescription(description) {
		if (!this._showDescription) {
			return;
		}
		const p = this.shadowRoot.querySelector('.d2l-activity-list-item-description p');
		let height = 0;
		window.fastdom.measure(() => {
			height = window.getComputedStyle(p).getPropertyValue('line-height').match(/\d+/);
		});
		beforeNextRender(this, () => {
			window.fastdom.mutate(() => {
				const lineHeight = height && height[0];
				p.textContent = description;
				const currentLineNumber = p.offsetHeight / lineHeight;
				if (currentLineNumber <= this._descriptionLineCount) {
					return;
				}
				// The idea is to mathematically find the most probable point to clamp.
				// Take the average per line while distrbuting the characters from the last line between all the lines.
				// So the average line length is between 1 to (1 + 1/(this._descriptionLineCount+1)) the actual average.
				// The `+1` in the previous line is because the description has to be more than the this._descriptionLineCount
				// For example if the description max number of lines is 2 then the average count would be between 1 to 1.33 times the actual average.
				const avgCharPerLine = description.length / ((currentLineNumber - 1));

				// This is where we clamp using the ~average length of a line. We want the clamp to not be exactly at the edge
				// so clamp 75% of the last line. Since the average line could be larger we need to make sure that this cut
				// is still lower then the average line.
				// So we need to prove 1 <= 3/4*(1 + 1/(this._descriptionLineCount+1))
				// The above line simplifies to this._descriptionLineCount >= 2
				// So as long as we clamp down to two lines this will work.
				p.textContent = description.substring(0, avgCharPerLine * (this._descriptionLineCount - 0.75));

				// Okay what about when this._descriptionLineCount = 1? We will do a loop through this step to solve that case.
				// This loop will make sure the clamping is done on words and will make sure that if our quick cut above
				// wasn't enough to fix that too.
				do {
					p.textContent = p.textContent.replace(/\W*\s(\S)*$/, '');
				} while (p.offsetHeight > this._descriptionLineCount * lineHeight && p.textContent);
				p.textContent += '...';
			});
		});
	}
	_onHrefChange(href) {
		if (!href || (this.entity.hasLinkByRel && this.entity.hasLinkByRel('self') && this.entity.getLinkByRel('self').href !== href)) {
			return;
		}

		this._fetchEntity(href)
			.then((sirenEntity) => this.entity = sirenEntity);
	}
	_onSirenEntityChange(sirenEntity) {
		if (!sirenEntity ||
			!sirenEntity.hasAction ||
			!sirenEntity.hasLink
		) {
			return;
		}
		this._description = sirenEntity.properties && sirenEntity.properties.description;

		if (sirenEntity.hasAction('assign') && !sirenEntity.hasClass('enroll')) {
			this._actionEnroll = sirenEntity.getAction('assign');
		}

		this._organizationUrl = sirenEntity.hasLink(Rels.organization) && sirenEntity.getLinkByRel(Rels.organization).href;
		if (this._organizationUrl) {
			this._fetchEntity(this._organizationUrl)
				.then(this._handleOrganizationResponse.bind(this));
		}

		this.href = sirenEntity.hasLink('self') && sirenEntity.getLinkByRel('self').href;
	}

	_handleOrganizationResponse(organization) {
		this._organization = organization;

		if (organization.hasSubEntityByClass(Classes.courseImage.courseImage)) {
			const imageEntity = organization.getSubEntityByClass(Classes.courseImage.courseImage);
			if (imageEntity.href) {
				this._fetchEntity(imageEntity.href)
					.then(function(hydratedImageEntity) {
						this._image = hydratedImageEntity;
					}.bind(this));
			} else {
				this._image = imageEntity;
			}
		}

		return Promise.resolve();
	}

	_fetchEntity(url) {
		if (!url) {
			return;
		}

		return window.d2lfetch
			.fetch(new Request(url, {
				headers: { Accept: 'application/vnd.siren+json' },
			}))
			.then(this._responseToSirenEntity.bind(this));
	}
	_responseToSirenEntity(response) {
		if (response.ok) {
			return response
				.json()
				.then(function(json) {
					return SirenParse(json);
				});
		}
		return Promise.reject(response.status + ' ' + response.statusText);
	}
}

window.customElements.define('d2l-activity-list-item', D2lActivityListItem);
