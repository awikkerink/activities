import { ActivityEditorTelemetryMixin } from '../../mixins/d2l-activity-editor-telemetry-mixin.js'
export const ActivityQuizEditorTelemetryMixin = superclass => class extends ActivityEditorTelemetryMixin(superclass) {
	logIntroAppendedToDescriptionEvent(href, type, telemetryId) {
		if (!href || !type || !telemetryId) return;
		this._logTelemetryEvent(href, 'IntroductionAppendedToDescription', type, telemetryId);
	}
};
