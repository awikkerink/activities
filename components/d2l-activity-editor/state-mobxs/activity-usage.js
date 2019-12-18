import { observable, action, runInAction } from 'mobx';
import { ActivityUsageEntity } from 'siren-sdk/src/activities/ActivityUsageEntity';
import fetchEntity from './fetch-entity.js';

export class ActivityUsage {

	@observable isDraft = true;
	@observable canEditDraft = false;

	@observable dueDate = '';
	@observable canEditDueDate = false;

	@observable endDate = '';
	@observable canEditEndDate = false;

	@observable startDate = '';
	@observable canEditStartDate = false;

	@observable loaded = false;

	constructor(href, token, autoSave = false) {
		this.href = href;
		this.token = token;
		this.autoSave = autoSave;
		this.fetchActivity();
	}

	async fetchEntity(href, token) {
		let entity = await window.D2L.Siren.EntityStore.get(href, token);
		if (!entity) {
			const fetched = await window.D2L.Siren.EntityStore.fetch(href, token);
			if (!fetched || !fetched.entity) {
				throw new Error('Cannot load entity');
			}
			entity = fetched.entity;
		}
		return entity;
	}

	@action
	async fetchActivity() {
		try {
			const entity = await fetchEntity(this.href, this.token, this.autoSave);
			this.activityUsage = new ActivityUsageEntity(entity, this.token, { remove: () => { } });

			const canEditDueDate = await this.activityUsage.canEditDueDate();
			const canEditStartDate = await this.activityUsage.canEditStartDate();
			const canEditEndDate = await this.activityUsage.canEditEndDate();

			runInAction(() => {
				this.isDraft = this.activityUsage.isDraft();
				this.canEditDraft = this.activityUsage.canEditDraft();

				this.dueDate = this.activityUsage.dueDate();
				this.canEditDueDate = canEditDueDate;

				this.startDate = this.activityUsage.startDate();
				this.canEditStartDate = canEditStartDate;

				this.endDate = this.activityUsage.endDate();
				this.canEditEndDate = canEditEndDate;

				this.loaded = true;
			});

		} catch (e) {
			runInAction(() => this.loaded = true);
		}
	}

	@action setDraftStatus(isDraft) {
		this.isDraft = isDraft;
	}

	@action setDueDate(date) {
		this.dueDate = date;
	}

	@action setStartDate(date) {
		this.startDate = date;
	}

	@action setEndDate(date) {
		this.endDate = date;
	}

	@action
	async saveActivity() {
		await this.activityUsage.save({
			dueDate: this.dueDate,
			startDate: this.startDate,
			endDate: this.endDate,
			isDraft: this.isDraft
		});
		await this.fetchActivity();
	}
}