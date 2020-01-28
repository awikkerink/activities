import { Assignment } from '../../../../components/d2l-activity-editor/d2l-activity-assignment-editor/state/assignment.js';
import { AssignmentActivityUsage } from '../../../../components/d2l-activity-editor/d2l-activity-assignment-editor/state/assignment-activity-usage.js';
import { AssignmentStore} from '../../../../components/d2l-activity-editor/d2l-activity-assignment-editor/state/assignment-store.js';
import { expect } from 'chai';
import { expect as jexpect } from '../../../custom-jest.js';

jest.mock('../../../../components/d2l-activity-editor/d2l-activity-assignment-editor/state/assignment.js');
jest.mock('../../../../components/d2l-activity-editor/d2l-activity-assignment-editor/state/assignment-activity-usage.js');

describe('Assignment Store', function() {
	beforeEach(() => {
		AssignmentActivityUsage.mockClear();
	});

	it('fetches activity', async() => {
		const store = new AssignmentStore();
		const activity = store.fetchActivity('http://1', 'token');

		jexpect(AssignmentActivityUsage).toHaveBeenCalledTimes(1);
		expect(AssignmentActivityUsage.mock.calls[0][0]).to.equal('http://1');
		expect(AssignmentActivityUsage.mock.calls[0][1]).to.equal('token');

		jexpect(activity.fetch).toHaveBeenCalledTimes(1);

		expect(store.activities).to.include(activity);
	});

	it('fetches assignment', async() => {
		const store = new AssignmentStore();
		const assignment = store.fetchAssignment('http://1', 'token');

		jexpect(Assignment).toHaveBeenCalledTimes(1);
		expect(Assignment.mock.calls[0][0]).to.equal('http://1');
		expect(Assignment.mock.calls[0][1]).to.equal('token');

		jexpect(assignment.fetch).toHaveBeenCalledTimes(1);

		expect(store.assignments).to.include(assignment);
	});
});
