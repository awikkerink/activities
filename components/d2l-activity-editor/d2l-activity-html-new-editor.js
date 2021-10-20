import '@brightspace-ui/htmleditor/htmleditor.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { ActivityEditorMixin } from './mixins/d2l-activity-editor-mixin.js';
import { ifDefined } from 'lit-html/directives/if-defined';
import { live } from 'lit-html/directives/live.js';
import { LocalizeActivityEditorMixin } from './mixins/d2l-activity-editor-lang-mixin.js';

class ActivityHtmlNewEditor extends ActivityEditorMixin(LocalizeActivityEditorMixin(LitElement)) {

	static get properties() {
		return {
			value: { type: String },
			ariaLabel: { type: String },
			disabled: { type: Boolean },
			htmlEditorType: { type: String },
			_filesToReplace: { type: Object },
			htmlEditorHeight: { type: String, attribute: 'html-editor-height' },
			htmlEditorMaxHeight: { type: String, attribute: 'html-editor-max-height' },
			fullPage: { type: Boolean, attribute: 'full-page' },
			fullPageFontSize: { type: String, attribute: 'full-page-font-size' },
			fullPageFontFamily: { type: String, attribute: 'full-page-font-family' }
		};
	}

	static get styles() {
		return  [
			css`
				d2l-htmleditor {
					height: 100%;
				}
			`
		];
	}

	constructor() {
		super();
		this._context = JSON.parse(document.documentElement.getAttribute('data-he-context'));
		this._filesToReplace = {};
		this.saveOrder = 400;
		this.fullPage = false;
		this.htmlEditorHeight = this.htmlEditorHeight || '10rem';
		this.value = this.value || '';
		this.htmlEditorType = this.htmlEditorType || 'full';
	}

	render() {
		const allowPaste = this._isPasteAllowed();

		return html`
			<d2l-htmleditor
				.html="${live(this.value)}"
				label="${this.ariaLabel}"
				label-hidden
				no-filter
				?disabled="${this.disabled}"
				height=${ifDefined(this.htmlEditorHeight)}
				max-height=${ifDefined(this.htmlEditorMaxHeight)}
				?full-page="${this.fullPage}"
				type="${this.htmlEditorType}"
				full-page-font-size="${ifDefined(this.fullPageFontSize)}"
				full-page-font-family="${ifDefined(this.fullPageFontFamily)}"
				?paste-local-images="${allowPaste}"
				@d2l-htmleditor-blur="${this._onBlur}">
			</d2l-htmleditor>
		`;
	}

	reset() {
		this.requestUpdate();
	}

	async save() {
		const editor = this.shadowRoot.querySelector('d2l-htmleditor');

		this._dispatchChangeEvent(editor.html);

		if (!editor || !editor.files || !editor.files.length || !editor.isDirty) return;

		const tempFiles = editor.files.filter(file => file.FileSystemType === 'Temp');
		if (!tempFiles || !tempFiles.length) return;

		const moveFilePromises = tempFiles.map(file => this._moveFile(file));
		await Promise.all(moveFilePromises).catch(() => { });

		this._parseHtml();
	}

	_dispatchChangeEvent(content) {
		this.dispatchEvent(new CustomEvent('d2l-activity-html-editor-change', {
			bubbles: true,
			composed: true,
			detail: {
				content: content
			}
		}));
	}

	_isPasteAllowed() {
		return this._context.uploadFiles && this._context.viewFiles;
	}

	_moveFile(file) {
		const { orgUnitId } = this._context;

		return new Promise((resolve, reject) => {
			D2L.LP.Web.UI.Rpc.Connect(D2L.LP.Web.UI.Rpc.Verbs.POST,
				new D2L.LP.Web.Http.UrlLocation('/d2l/lp/htmleditor/tinymce/moveUploadedFile'),
				{ orgUnitId: orgUnitId, fileId: file.Id },
				{
					success: result => {
						this._filesToReplace[file.Location] = result.FileUrl;
						resolve(result);
					},
					failure: error => {
						reject(error);
					}
				});
		});
	}

	_onBlur() {
		const editor = this.shadowRoot.querySelector('d2l-htmleditor');
		this._dispatchChangeEvent(editor.html);
	}

	_parseHtml() {
		const editor = this.shadowRoot.querySelector('d2l-htmleditor');
		if (!editor) return;

		const currentHtml = editor.html;

		// Dynamically generates regex like: /oldLocation1|oldLocation2|oldLocation3/gi
		const regex = new RegExp(Object.keys(this._filesToReplace).join('|'), 'gi');

		editor.html = currentHtml.replace(regex, (matched) => this._filesToReplace[matched]);

		this._dispatchChangeEvent(editor.html);
	}
}

customElements.define('d2l-activity-html-new-editor', ActivityHtmlNewEditor);
