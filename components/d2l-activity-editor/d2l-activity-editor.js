import { css, html, LitElement } from 'lit-element/lit-element.js';

class ActivityEditor extends LitElement {

	static get properties() {
		return {
			loading: { type: Boolean },
			/**
			 * API endpoint for attachment unfurling service
			 */
			unfurlEndpoint: { type: String },
			/**
			 * API endpoint for determining whether a domain is trusted
			 */
			trustedSitesEndpoint: { type: String },
		};
	}

	static get styles() {
		return css`
			:host {
				display: block;
			}
			:host([hidden]) {
				display: none;
			}
			.d2l-activity-editor-loading {
				padding: 20px;
				position: fixed;
				background-color: #fff;
				width: 100%;
				height: 100vh;
				z-index: 100001;
			}
		`;
	}

	_onRequestProvider(e) {
		// Provides unfurl API endpoint for d2l-labs-attachment component
		// https://github.com/Brightspace/attachment/blob/e44cab1f0cecc55dd93acf59212fabc6872c0bd3/components/attachment.js#L110
		if (e.detail.key === 'd2l-provider-unfurl-api-endpoint') {
			e.detail.provider = () => this.unfurlEndpoint;
			e.stopPropagation();
			return;
		}

		// Provides function to validate if a URL is trusted for d2l-labs-attachment
		// https://github.com/Brightspace/attachment/blob/e44cab1f0cecc55dd93acf59212fabc6872c0bd3/components/attachment.js#L115
		if (e.detail.key === 'd2l-provider-trusted-site-fn') {
			e.detail.provider = () => url => {
				const origin = new URL(url).origin;
				const unfilteredContent = `<iframe src="${origin}"></iframe>`;

				return new Promise((resolve, reject) => {
					const params = {
						filterMode: 1, // strict mode for html filtering. Refer to D2L.LP.TextProcessing.FilterModes
						html: unfilteredContent
					};
					const options = {
						success: resolve,
						failure: reject
					};
					D2L.LP.Web.UI.Rpc.Connect(
						D2L.LP.Web.UI.Rpc.Verbs.POST,
						new D2L.LP.Web.Http.UrlLocation(this.trustedSitesEndpoint),
						params,
						options
					);
				}).then(filteredContent => {
					const matchSrc = function(str) {
						// excludes matching query string as filterHtml may modify the query string
						return str.match(/src=["']([^?"']+)/i);
					};
					const unfilteredMatch = matchSrc(unfilteredContent);
					const unfilteredSrc = unfilteredMatch && unfilteredMatch.length === 2 && unfilteredMatch[1];

					const filteredMatch = matchSrc(filteredContent);
					const filteredSrc = filteredMatch && filteredMatch.length === 2 && filteredMatch[1];

					return unfilteredSrc === filteredSrc;
				});
			};
			e.stopPropagation();
		}
	}

	render() {
		return html`
			<div class="d2l-activity-editor-loading" ?hidden="${!this.loading}">Loading ...</div>
			<div
				@d2l-request-provider="${this._onRequestProvider}">
				<slot name="editor"></slot>
			</div>
		`;
	}
}
customElements.define('d2l-activity-editor', ActivityEditor);
