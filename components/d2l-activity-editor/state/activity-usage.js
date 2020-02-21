import { action, configure as configureMobx, decorate, observable, runInAction } from 'mobx';
import { ActivityUsageEntity } from 'siren-sdk/src/activities/ActivityUsageEntity.js';
import { fetchEntity } from '../state/fetch-entity.js';

configureMobx({ enforceActions: 'observed' });

export class ActivityUsage {

	constructor(href, token) {
		this.href = href;
		this.token = token;
	}

	async fetch() {
		const sirenEntity = await fetchEntity(this.href, this.token);
		if (sirenEntity) {
			const entity = new ActivityUsageEntity(sirenEntity, this.token, { remove: () => { } });
			this.load(entity);
		}
		return this;
	}

	load(entity) {
		this._entity = entity;
		this.dueDate = entity.dueDate();
		this.startDate = entity.startDate();
		this.endDate = entity.endDate();
		this.canEditDates = entity.canEditDates();
		this.isDraft = entity.isDraft();
		this.canEditDraft = entity.canEditDraft();
		this.isError = false;
		this.errorType = null;
	}

	setDueDate(date) {
		this.dueDate = date;
	}

	setStartDate(date) {
		this.startDate = date;
	}

	setEndDate(date) {
		this.endDate = date;
	}

	setDraftStatus(isDraft) {
		this.isDraft = isDraft;
	}

	setCanEditDraft(value) {
		this.canEditDraft = value;
	}

	setCanEditDates(value) {
		this.canEditDates = value;
	}

	async validate() {
		if (!this._entity) {
			return;
		}

		this.isError = false;
		this.errorType = null;

		await this._entity.validate({
			dueDate: this.dueDate,
			startDate: this.startDate,
			endDate: this.endDate
		}).catch(e => runInAction(() => {
			this.isError = true;
			if (e.json && e.json.properties && e.json.properties.type) {
				this.errorType = e.json.properties.type;
			}
			throw e;
		}));
	}

	async save() {
		if (!this._entity) {
			return;
		}

		await this._entity.save({
			dueDate: this.dueDate,
			startDate: this.startDate,
			endDate: this.endDate,
			isDraft: this.isDraft
		});

		await this.fetch();
	}
}

decorate(ActivityUsage, {
	// props
	dueDate: observable,
	startDate: observable,
	endDate: observable,
	canEditDates: observable,
	isDraft: observable,
	canEditDraft: observable,
	isError: observable,
	errorType: observable,
	// actions
	load: action,
	setDueDate: action,
	setStartDate: action,
	setEndDate: action,
	setDraftStatus: action,
	setCanEditDraft: action,
	setCanEditDates: action,
	save: action,
	validate: action
});
