import '../../../components/d2l-activity-editor/d2l-activity-rubrics/d2l-activity-rubrics-list-container.js';
import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import { ActivityUsage } from '../../../components/d2l-activity-editor/state/activity-usage.js';
import { shared as activityUsageStore } from '../../../components/d2l-activity-editor/state/activity-store.js';
import { Assignment } from '../../../components/d2l-activity-editor/d2l-activity-assignment-editor/state/assignment.js';
import { shared as assignmentStore } from '../../../components/d2l-activity-editor/d2l-activity-assignment-editor/state/assignment-store.js';
import { AssociationCollection } from '../../../components/d2l-activity-editor/d2l-activity-rubrics/state/association-collection.js';
import { default as associationStore } from '../../../components/d2l-activity-editor/d2l-activity-rubrics/state/association-collection-store.js';
import { runConstructor } from '@brightspace-ui/core/tools/constructor-test-helper.js';

describe('d2l-activity-assignment-editor-evaluation-editor', function() {

	let href, token, associationCollection, assignment, activity, milestones;

	function _requestProviderMock(e) {
		e.detail.provider = 'hello';
		e.stopPropagation();
	}

	async function loadComponent() {
		associationStore.put(href, associationCollection);
		assignmentStore.put(href, assignment);
		activityUsageStore.put(href, activity);

		return await fixture(
			html`
				<d2l-activity-rubrics-list-container
					href=${href}
					activityUsageHref=${href}
					.token="${token}"
				>
				</d2l-activity-rubrics-list-container>
			`
		);
	}

	before(async() => {
		window.addEventListener('d2l-request-provider', _requestProviderMock);
	});

	after(() => {
		window.removeEventListener('d2l-request-provider', _requestProviderMock);
	});

	beforeEach(async() => {
		href = 'http://activity/1';
		token = 'token';

		associationCollection = new AssociationCollection(href, token);
		associationCollection.defaultScoringRubricOptions = [];
		associationCollection.addPotentialAssociationToMap(href, {});

		assignment = new Assignment(href, token);
		assignment.canEditAnnotations = true;
		assignment.annotationToolsAvailable = false;

		activity = new ActivityUsage(href, token);
		activity.canEditCompetencies = true;
	});

	afterEach(() => {
		associationCollection = undefined;
		associationStore.clear();
	});

	describe('constructor', () => {

		it('should construct', async() => {
			await loadComponent();
			runConstructor('d2l-activity-rubrics-list-container');
		});

	});

	it('passes accessibility test', async() => {
		const el = await loadComponent();
		await expect(el).to.be.accessible();
	});

	it('has rubrics list editor', async() => {
		const el = await loadComponent();
		const editor = el.shadowRoot.querySelector('d2l-activity-rubrics-list-editor');
		expect(editor).to.not.be.null;
	});
});
