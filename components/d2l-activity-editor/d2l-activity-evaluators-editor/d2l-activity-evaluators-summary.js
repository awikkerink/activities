import { css, html } from 'lit-element/lit-element.js';
import { accordionStyles } from '../styles/accordion-styles';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { LocalizeActivityEditorMixin } from '../mixins/d2l-activity-editor-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { sharedEvaluators as store } from '../state/activity-evluators-store.js'
import { ActivityEvaluators } from '../state/activity-evaluators';

class ActivityEvaluatorsSymmary extends ActivityEditorMixin(RtlMixin(LocalizeActivityEditorMixin(MobxLitElement))) {


	constructor() {

		super(store);
	}

    render() {

        let evaluators =  store.get(this.href);

        if (!evaluators || !evaluators.isEnabled) {
            return html``;
        }

        //console.log("ActivityEvaluatorsSymmary render "+(typeof (this.token)));

        let countSelected = evaluators.countSelected;
        if (countSelected > 0) {
            return html`${this.localize('evaluators.txtEvaluatorsAdded', 'count', countSelected)}`;
        } else {
            return html`${this.localize('evaluators.txtNoEvaluatorsAdded')}`;
        }
    }

}

customElements.define(
    'd2l-activity-evaluators-summary',
    ActivityEvaluatorsSymmary
);