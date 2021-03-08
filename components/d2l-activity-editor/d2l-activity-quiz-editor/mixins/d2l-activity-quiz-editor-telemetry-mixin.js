import Events from 'd2l-telemetry-browser-client';

export const ActivityQuizEditorTelemetryMixin = superclass => class extends superclass {
	logIntroAppendedToDescriptionEvent(href, type, telemetryId) {
		if (!href || !type || !telemetryId) return;
		this._logTelemetryEvent(href, 'IntroductionAppendedToDescription', type, telemetryId);
	}

	async _logTelemetryEvent(href, action, type, telemetryId) {
		if (!href || !action || !type || !telemetryId) return;

		const eventBody = new Events.EventBody()
			.setAction(action)
			.setObject(href, type);
		const event = new Events.TelemetryEvent()
			.setType('TelemetryEvent')
			.setDate(new Date())
			.setSourceId(telemetryId)
			.setBody(eventBody);
		const client = await D2L.Telemetry.CreateClient();
		client.logUserEvent(event);
	}
};
