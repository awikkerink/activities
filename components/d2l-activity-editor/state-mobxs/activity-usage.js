import { observable, action, runInAction } from 'mobx';
import { ActivityUsageEntity } from 'siren-sdk/src/activities/ActivityUsageEntity';
import { entityFactory, dispose } from 'siren-sdk/src/es6/EntityFactory.js';

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
		this._fetchEntity();
	}

	async _fetchEntity() {
		dispose(this._entity);

		entityFactory(ActivityUsageEntity, this.href, this.token, (entity, error) => {
			if (entity) {
				const newEntity = this.autoSave || !this._entity ? entity : this._entity;
				if (newEntity !== this._entity) {
					this.loadActivity(newEntity);
				}
			} else {
				// TODO handle error
			}
		});
	}

	@action
	async loadActivity(entity) {
		try {
			this._entity = entity;
			const canEditDueDate = await this._entity.canEditDueDate();
			const canEditStartDate = await this._entity.canEditStartDate();
			const canEditEndDate = await this._entity.canEditEndDate();

			runInAction(() => {
				this.isDraft = this._entity.isDraft();
				this.canEditDraft = this._entity.canEditDraft();

				this.dueDate = this._entity.dueDate();
				this.canEditDueDate = canEditDueDate;

				this.startDate = this._entity.startDate();
				this.canEditStartDate = canEditStartDate;

				this.endDate = this._entity.endDate();
				this.canEditEndDate = canEditEndDate;

				this.loaded = true;
			});

		} catch (e) {
			runInAction(() => this.loaded = true);
		}
	}

	@action
	async setDraftStatus(isDraft) {
		if (isDraft === this.isDraft) {
			return;
		}

		this.isDraft = isDraft;
		if (this.autoSave) {
			await this._entity.setDraftStatus(isDraft);
		}
	}

	@action
	async setDueDate(date) {
		if (date === this.dueDate) {
			return;
		}

		this.dueDate = date;
		if (this.autoSave) {
			await this._entity.setDueDate(date);
		}
	}

	@action
	async setStartDate(date) {
		if (date === this.startDate) {
			return;
		}

		this.startDate = date;
		if (this.autoSave) {
			await this._entity.setStartDate(date);
		}
	}

	@action
	async setEndDate(date) {
		if (date === this.endDate) {
			return;
		}

		this.endDate = date;
		if (this.autoSave) {
			await this._entity.setEndDate(date);
		}
	}

	@action
	async saveActivity() {
		await this._entity.save({
			dueDate: this.dueDate,
			startDate: this.startDate,
			endDate: this.endDate,
			isDraft: this.isDraft
		});
		this._fetchEntity();
	}
}