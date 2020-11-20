import { css, html, LitElement } from 'lit-element';
import '@brightspace-ui/core/components/link/link.js';
import '@brightspace-ui/core/components/list/list.js';
import { heading2Styles, bodyCompactStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { fetchActivities, fetchActivityName, fetchCourseName, getDueDate, fetchSubmissionCount, determineIcon, fetchEvaluateAllHref } from './controller.js';
import './activity-card';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin.js';

export class QuickEvalWidget extends SkeletonMixin(LitElement) {
	static get properties() {
		return {
			href: { type: String },
			token: { type: Object },
			quickEvalHref: {
				attribute: 'quick-eval-href',
				type: String
			},
			activities: { type: Array },
			count: { type: Number }
		};
	}

	static get styles() {
		return [ super.styles, bodyCompactStyles, heading2Styles, css`
			hr {
				margin: 0;
			}
			.d2l-quick-eval-widget-heading {
				margin-bottom: 0.5rem;
			}
			.d2l-quick-eval-widget-list {
				margin-top: 0.5rem;
			}
		` ];
	}

	constructor() {
		super();
		this.activities = [];
		this.count = 3;
	}

	async updated(changedProperties) {
		super.updated();

		if ((changedProperties.has('href') || changedProperties.has('token')) && this.href && this.token) {
			this.skeleton = true;
			this.activities = await this.getActivities(this.href, this.token);
			this.skeleton = false;
		}
	}

	async getActivities(href, token) {
		const unassessedActivityCollection = await fetchActivities(href, token);
		const activityUsages = unassessedActivityCollection.entities.slice(0, this.count);

		return Promise.all(activityUsages.map(async au => {
			const activityName = await fetchActivityName(au, token);
			const courseName = await fetchCourseName(au, token);
			const dueDate = getDueDate(au);
			const submissionCount = await fetchSubmissionCount(au, token);
			const icon = determineIcon(au);
			const evaluateAllHref = await fetchEvaluateAllHref(au, token);

			return {
				activityName,
				courseName,
				dueDate,
				submissionCount,
				icon,
				evaluateAllHref
			};
		}));
	}

	render() {
		const listItems = this.activities.map(a => {
			const dueDate = a.dueDate ? a.dueDate : 'No due date';
			return html`<d2l-quick-eval-widget-activity-card
					activityName="${a.activityName}"
					courseName="${a.courseName}"
					dueDate="${dueDate}"
					submissionCount="${a.submissionCount}"
					icon="${a.icon}"
					evaluateAllHref="${a.evaluateAllHref}"
				></d2l-quick-eval-widget-activity-card>`;
		});

		const loaded = html`<d2l-list class="d2l-quick-eval-widget-list" separators="none">${listItems}</d2l-list>`;

		// delete when d2l-list supports SkeletonMixin
		const loading = [];
		for (let i = 0; i < this.count ; i++) {
			loading.push(html`<ol class="d2l-skeletize"><li></li><li></li></ol>`);
		}

		return html`
			<div class="d2l-heading-2 d2l-quick-eval-widget-heading">Evaluations To Do</div>
			<hr>
			${ this.skeleton ? loading : loaded }
			<d2l-link class="d2l-body-compact" href="${this.quickEvalHref}">View All</d2l-link>
		`;
	}
}

customElements.define('d2l-quick-eval-widget', QuickEvalWidget);
