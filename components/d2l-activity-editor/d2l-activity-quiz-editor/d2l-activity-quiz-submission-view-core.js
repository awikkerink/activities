import '@brightspace-ui/core/components/button/button-icon.js';
import '@brightspace-ui/core/components/dialog/dialog.js';
import { ActivityEditorDialogMixin } from '../mixins/d2l-activity-editor-dialog-mixin.js';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { checkboxStyles } from '../styles/checkbox-styles.js';
import { css, html } from 'lit-element/lit-element.js';
import { LocalizeActivityQuizEditorMixin } from './mixins/d2l-activity-quiz-lang-mixin';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { selectStyles } from '@brightspace-ui/core/components/inputs/input-select-styles.js';
import { shared as store } from './state/quiz-store';


class ActivityQuizSubmissionViewCore 
    extends ActivityEditorMixin(RtlMixin(LocalizeActivityQuizEditorMixin(ActivityEditorDialogMixin(MobxLitElement)))) {
   
        static get styles() {
            return [
                labelStyles,
                selectStyles,
                checkboxStyles,
                css`
                    .d2l-label-text {
                        padding-bottom: 10px;     
                    }
                `
            ];
        }
    
        constructor() {
            super(store);
        }

        render() {
            return html`

            <div class="d2l-label-text">
                ${this.localize('submissionViewHeading1')}
			</div>

            <d2l-input-checkbox-spacer
                class="d2l-body-small">
            </d2l-input-checkbox-spacer>

            <d2l-input-checkbox 
                ?checked=""
                @change="${this._placeholder1}"
                ariaLabel="${this.localize('submissionViewCheckbox')}"
                ?disabled="">

                <label> ${this.localize('submissionViewCheckbox')} </label>
                
            </d2l-input-checkbox>

            <div class="d2l-label-text">
                ${this.localize('submissionViewHeading2')}
			</div>

            <div>
                <select
                    id="submission-view-editor"
                    class="d2l-input-select d2l-block-select"
                    @change="">

                    <option value="">${this.localize('submissionViewDropdown1')}</option>
                    <option value="">${this.localize('submissionViewDropdown2')}</option>
                </select>
            </div>

            <div>
                <d2l-button-subtle
                    text=${this.localize('submissionViewButton1')}
                    @click=""
                    h-align="text">
                </d2l-button-subtle>
            </div>
            
		`;
	}


    _placeholder1(event){
    }
 }

customElements.define(
    'd2l-activity-quiz-submission-view-core',
    ActivityQuizSubmissionViewCore
);
