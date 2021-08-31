import { action, configure as configureMobx, decorate, observable } from 'mobx';
import { formatDateTimeInISO, getLocalDateTimeFromUTCDateTime, parseISODateTime } from '@brightspace-ui/core/helpers/dateTime.js';
import { convertLocalToUTCDateTime } from '@brightspace-ui/intl/lib/dateTime.js';

configureMobx({ enforceActions: 'observed' });

export class ActivityDates {

	constructor(entity) {
		this.dueDate = this.fixManualEndOfDay(entity.dueDate());
		this.startDate = this.fixManualEndOfDay(entity.startDate());
		this.endDate = this.fixManualEndOfDay(entity.endDate());
		this.canEditDates = entity.canEditDates();
		this.dueDateErrorTerm = null;
		this.startDateErrorTerm = null;
		this.endDateErrorTerm = null;
	}

	// 11:59:00 (manually entered) becomes "end of day" (11:59:59) so date/time validation treats them the same
	fixManualEndOfDay(date) {
		if (!date) {
			return date;
		}
		const localDate = getLocalDateTimeFromUTCDateTime(date);
		const parsedLocalDate = parseISODateTime(localDate);

		const isManualEndOfDay = parsedLocalDate.hours === 23 && parsedLocalDate.minutes === 59 && parsedLocalDate.seconds === 0;
		if (isManualEndOfDay) {
			parsedLocalDate.seconds = 59;
			const parsedUtcDate = convertLocalToUTCDateTime(parsedLocalDate);
			return formatDateTimeInISO(parsedUtcDate);
		}

		return date;
	}

	setCanEditDates(value) {
		this.canEditDates = value;
	}
	setDueDate(date) {
		this.dueDate = date;
	}

	setEndDate(date) {
		this.endDate = date;
	}
	setErrorLangTerms(errorType) {
		if (errorType && errorType.includes('end-due-start-date-error')) {
			this.dueDateErrorTerm = 'editor.dueBetweenStartEndDate';
			this.startDateErrorTerm = 'editor.dueBetweenStartEndDate';
			this.endDateErrorTerm = 'editor.dueBetweenStartEndDate';
			return;
		}

		if (errorType && errorType.includes('start-after-due-end-date-error')) {
			this.dueDateErrorTerm = 'editor.dueAfterStartDate';
			this.startDateErrorTerm = 'editor.dueAfterStartDate';
			this.endDateErrorTerm = 'editor.startBeforeEndDate';
			return;
		}

		if (errorType && errorType.includes('start-after-due-date-error')) {
			this.dueDateErrorTerm = 'editor.dueAfterStartDate';
			this.startDateErrorTerm = 'editor.dueAfterStartDate';
			this.endDateErrorTerm = null;
			return;
		}

		if (errorType && errorType.includes('end-before-start-due-date-error')) {
			this.dueDateErrorTerm = 'editor.dueBeforeEndDate';
			this.startDateErrorTerm = 'editor.startBeforeEndDate';
			this.endDateErrorTerm = 'editor.dueBeforeEndDate';
			return;
		}

		if (errorType && errorType.includes('end-before-due-date-error')) {
			this.dueDateErrorTerm = 'editor.dueBeforeEndDate';
			this.startDateErrorTerm = null;
			this.endDateErrorTerm = 'editor.dueBeforeEndDate';
			return;
		}

		if (errorType && errorType.includes('end-before-start-date-error')) {
			this.dueDateErrorTerm = null;
			this.startDateErrorTerm = 'editor.startBeforeEndDate';
			this.endDateErrorTerm = 'editor.startBeforeEndDate';
			return;
		}

		this.dueDateErrorTerm = null;
		this.startDateErrorTerm = null;
		this.endDateErrorTerm = null;
	}
	setStartDate(date) {
		this.startDate = date;
	}

}

decorate(ActivityDates, {
	// props
	dueDate: observable,
	startDate: observable,
	endDate: observable,
	canEditDates: observable,
	dueDateErrorTerm: observable,
	startDateErrorTerm: observable,
	endDateErrorTerm: observable,
	// actions
	setDueDate: action,
	setStartDate: action,
	setEndDate: action,
	setCanEditDates: action,
	setErrorLangTerms: action
});
