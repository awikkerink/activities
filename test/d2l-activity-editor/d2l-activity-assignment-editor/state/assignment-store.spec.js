import { Assignment } from '../../../../components/d2l-activity-editor/d2l-activity-assignment-editor/state/assignment.js';
import { AssignmentActivityUsage } from '../../../../components/d2l-activity-editor/d2l-activity-assignment-editor/state/assignment-activity-usage.js';
import { AssignmentStore} from '../../../../components/d2l-activity-editor/d2l-activity-assignment-editor/state/assignment-store.js';
import { expect } from 'chai';
import sinon from 'sinon';

jest.mock('../../../../components/d2l-activity-editor/d2l-activity-assignment-editor/state/assignment.js');
jest.mock('../../../../components/d2l-activity-editor/d2l-activity-assignment-editor/state/assignment-activity-usage.js');

describe('Assignment Store', function() {
	afterEach(() => {
		sinon.restore();
	});

	it('fetches activity', async() => {
		const store = new AssignmentStore();

		const activity = await store.fetchActivity('http://1', 'token');
		expect(store._activities.size).to.equal(1);

		const activity2 = await store.fetchActivity('http://1', 'token');
		expect(activity2).to.equal(activity);

		expect(AssignmentActivityUsage.mock.calls.length).to.equal(1);
		expect(AssignmentActivityUsage.mock.calls[0][0]).to.equal('http://1');
		expect(AssignmentActivityUsage.mock.calls[0][1]).to.equal('token');
	});

	it('fetches assignment', async() => {
		const store = new AssignmentStore();

		const assignment = await store.fetchAssignment('http://1', 'token');
		expect(store._assignments.size).to.equal(1);

		const assignment2 = await store.fetchAssignment('http://1', 'token');
		expect(assignment2).to.equal(assignment);

		expect(Assignment.mock.calls.length).to.equal(1);
		expect(Assignment.mock.calls[0][0]).to.equal('http://1');
		expect(Assignment.mock.calls[0][1]).to.equal('token');

	});
});
