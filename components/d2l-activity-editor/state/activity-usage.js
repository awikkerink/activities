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
			await this.load(entity);
		}
		return this;
	}

	async load(entity) {
		this._entity = entity;

		const canEditDueDate = await entity.canEditDueDate();
		const canEditStartDate = await entity.canEditStartDate();
		const canEditEndDate = await entity.canEditEndDate();

		runInAction(() => {
			this.dueDate = entity.dueDate();
			this.canEditDueDate = canEditDueDate;
			this.startDate = entity.startDate();
			this.canEditStartDate = canEditStartDate;
			this.endDate = entity.endDate();
			this.canEditEndDate = canEditEndDate;
			this.isDraft = entity.isDraft();
			this.canEditDraft = entity.canEditDraft();
		});
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

	setCanEditStartDate(value) {
		this.canEditStartDate = value;
	}

	setCanEditEndDate(value) {
		this.canEditEndDate = value;
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
	canEditDueDate: observable,
	startDate: observable,
	canEditStartDate: observable,
	endDate: observable,
	canEditEndDate: observable,
	isDraft: observable,
	canEditDraft: observable,
	// actions
	load: action,
	setDueDate: action,
	setStartDate: action,
	setEndDate: action,
	setDraftStatus: action,
	setCanEditDraft: action,
	setCanEditStartDate: action,
	setCanEditEndDate: action,
	save: action
});
