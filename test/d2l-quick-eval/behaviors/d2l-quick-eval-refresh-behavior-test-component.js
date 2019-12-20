import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import '../../../components/d2l-quick-eval/behaviors/d2l-quick-eval-refresh-behavior.js';

class D2LQuickEvalRefreshBehaviorTestComponent extends mixinBehaviors([
	D2L.PolymerBehaviors.QuickEval.D2LQuickEvalRefreshBehavior
], PolymerElement) {}

window.customElements.define('d2l-quick-eval-refresh-behavior-test-component', D2LQuickEvalRefreshBehaviorTestComponent);
