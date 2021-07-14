import '../../../d2l-activity-accordion-collapse.js';
import { css, html } from 'lit-element/lit-element.js';
import { accordionStyles } from '../../../styles/accordion-styles.js';
import { labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { LocalizeActivityEditorMixin } from '../../../mixins/d2l-activity-editor-lang-mixin';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin';
import { shared as store } from '../state/gbl-map-store.js';

const BASE_URL = import.meta.url;
const PRELOADED_BACKGROUND_IMAGES = [
	{
		url: new URL('../../../images/backgrounds/concrete.jpg', BASE_URL),
		labelTerm: 'gbl.backgrounds.concrete'
	},
	{
		url: new URL('../../../images/backgrounds/grass.jpg', BASE_URL),
		labelTerm: 'gbl.backgrounds.grass'
	},
	{
		url: new URL('../../../images/backgrounds/sand.jpg', BASE_URL),
		labelTerm: 'gbl.backgrounds.sand'
	}
];

class GblMapBackgroundEditor extends SkeletonMixin(LocalizeActivityEditorMixin(RtlMixin(MobxLitElement))) {
	static get properties() {
		return {
			href: { type: String },
			token: { type: Object },
			_backgroundImgName: { type: String }
		};
	}

	static get styles() {
		return [
			super.styles,
			labelStyles,
			accordionStyles,
			css`
				.d2l-gbl-background-editor-container {
					display: flex;
					flex-direction: column;
				}
				.d2l-gbl-background-editor-buttons-container {
					display: flex;
					flex-flow: row wrap;
					flex-wrap: wrap;
					width: 98%
				}
				.d2l-gbl-background-selection-item {
					margin: 10px 20px 10px 0;
				}
				.d2l-gbl-background-card {
					padding: 0;
					border: 0;
					background-color: white;
					background: none;
					box-shadow: none;
					vertical-align: middle;
					text-align: left;
				}
				.d2l-gbl-background-selection-item:hover {
					transform: translateY(-6px);
					box-shadow: 0 4px 18px 2px rgba(0,0,0,0.08);
				}
				.d2l-gbl-background-image {
					width: 75px;
					border-radius: 6px 6px 0 0;
				}
			`
		];
	}

	constructor() {
		super(store);
		this._backgroundImgName = '';
	}

	render() {
		const gblMapEntity = store.getGblMapActivity(this.href);

		if (gblMapEntity) {
			this.skeleton = false;
		} else {
			return html``;
		}

		const { mapData: mapDataStr } = gblMapEntity;
		const mapData = JSON.parse(mapDataStr);
		this._backgroundImgName = this._getCurrentBackgroundImageName(mapData);

		return html`
			<d2l-activity-accordion-collapse ?skeleton=${this.skeleton}>
				<span slot="header">
					${this.localize('gbl.backgroundHeader')}
				</span>
				<li slot="summary-items">${this._renderBackgroundSummary()}</li>
				<span slot="components">
					${this._renderBackgroundEditor()}
				</span>
			</d2l-activity-accordion-collapse>
		`;
	}

	_backgroundCardClicked({ currentTarget: card }) {
		const gblMapEntity = store.getGblMapActivity(this.href);
		if (!gblMapEntity) {
			return;
		}

		const key = card.getAttribute('key');
		const { url } = PRELOADED_BACKGROUND_IMAGES[key];
		const newMapData = {
			...this._getDeserializedMapData(gblMapEntity),
			background: url.toString()
		};
		gblMapEntity.setMapData(JSON.stringify(newMapData));
		this._backgroundImgName = this._getCurrentBackgroundImageName(newMapData);
	}

	_getCurrentBackgroundImageName({ background }) {
		const re = /([^/])+$/g;
		const [ backgroundImageName ] = background.match(re);

		return backgroundImageName;
	}

	_getDeserializedMapData({ mapData: mapDataStr }) {
		return JSON.parse(mapDataStr);
	}

	_renderBackgroundCard({ url, labelTerm }, idx) {
		return html`
			<div class='d2l-gbl-background-selection-item'>
				<button class='d2l-gbl-background-card' @click=${this._backgroundCardClicked} key=${idx}>
					<img class='d2l-gbl-background-image' src=${url} />
					<div class='d2l-typography'>${this.localize(labelTerm)}</div>
				</button>
			</div>
		`;
	}

	_renderBackgroundEditor() {
		return html`
			<div class='d2l-gbl-background-editor-container'>
				<span>${this._backgroundImgName}</span>
				<div class='d2l-gbl-background-editor-buttons-container'>
					${PRELOADED_BACKGROUND_IMAGES.map((backgroundImage, idx) => this._renderBackgroundCard(backgroundImage, idx))}
				</div>
			</div>
		`;
	}

	_renderBackgroundSummary() {
		return html`${this._backgroundImgName}`;
	}
}

customElements.define('d2l-activity-gbl-map-background-editor', GblMapBackgroundEditor);
