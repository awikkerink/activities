import { css, html } from 'lit-element/lit-element.js';
import { accordionStyles } from '../styles/accordion-styles';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { LocalizeActivityEditorMixin } from '../mixins/d2l-activity-editor-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';

class ActivityEvaluatorsSymmary extends ActivityEditorMixin(RtlMixin(LocalizeActivityEditorMixin(MobxLitElement))) {


    render() {

        const evaluatorsCount = 0;

        if (evaluatorsCount > 0) {
            return html`${this.localize('evaluators.txtEvaluatorsAdded', 'count', evaluatorsCount)}`;
        } else {
            return html`${this.localize('evaluators.txtNoEvaluatorsAdded')}`;
        }
    }

}

customElements.define(
    'd2l-activity-evaluators-summary',
    ActivityEvaluatorsSymmary
);