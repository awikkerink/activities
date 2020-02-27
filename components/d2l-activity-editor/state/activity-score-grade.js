import {  action, configure as configureMobx, decorate, observable } from 'mobx';

configureMobx({ enforceActions: 'observed' });

export class ActivityScoreGrade {

	constructor(entity) {
		this.scoreOutOf = entity.scoreOutOf().toString();
		this.inGrades = entity.inGrades();
		this.gradeType = (entity.gradeType() || 'Points').toLowerCase();
		this.isUngraded = !this.inGrades && !this.scoreOutOf;
		this.canEditScoreOutOf = entity.canEditScoreOutOf();
		this.canSeeGrades = entity.canSeeGrades();
		this.canEditGrades = entity.canEditGrades();
	}

	setScoreOutOf(value) {
		this.scoreOutOf = value;
	}

	setUngraded() {
		this.scoreOutOf = '';
		this.inGrades = false;
		this.isUngraded = true;
	}

	setGraded() {
		this.inGrades = true;
		this.isUngraded = false;
	}

	removeFromGrades() {
		this.inGrades = false;
	}

	addToGrades() {
		this.inGrades = true;
	}
}

decorate(ActivityScoreGrade, {
	// props
	scoreOutOf: observable,
	inGrades: observable,
	gradeType: observable,
	isUngraded: observable,
	canEditScoreOutOf: observable,
	canSeeGrades: observable,
	canEditGrades: observable,
	// actions
	setScoreOutOf: action,
	setUngraded: action,
	setGraded: action,
	removeFromGrades: action,
	addToGrades: action
});
