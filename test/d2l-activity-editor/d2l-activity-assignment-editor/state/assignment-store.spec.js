import chai, { expect } from 'chai';
import { Assignment } from '../../../../components/d2l-activity-editor/d2l-activity-assignment-editor/state/assignment.js';
import { AssignmentActivityUsage } from '../../../../components/d2l-activity-editor/d2l-activity-assignment-editor/state/assignment-activity-usage.js';
import { AssignmentStore} from '../../../../components/d2l-activity-editor/d2l-activity-assignment-editor/state/assignment-store.js';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);

jest.mock('../../../../components/d2l-activity-editor/d2l-activity-assignment-editor/state/assignment.js');
jest.mock('../../../../components/d2l-activity-editor/d2l-activity-assignment-editor/state/assignment-activity-usage.js');

describe('Assignment Store', function() {
	afterEach(() => {
		Assignment.mockClear();
		AssignmentActivityUsage.mockClear();
	});

	describe('when succeeds', () => {
		const mockActivityFetch = jest.fn(() => Promise.resolve());
		const mockAssignmentFetch = jest.fn(() => Promise.resolve());

		beforeAll(() => {
			AssignmentActivityUsage.mockImplementation(() => {
				return {
					fetch: mockActivityFetch
				};
			});

			Assignment.mockImplementation(() => {
				return {
					fetch: mockAssignmentFetch
				};
			});
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
			expect(mockActivityFetch.mock.calls.length).to.equal(1);
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
			expect(mockAssignmentFetch.mock.calls.length).to.equal(1);
		});
	});

	describe('When activity throws an error', () => {
		beforeAll(() => {
			AssignmentActivityUsage.mockImplementation(() => {
				return {
					fetch: () => {
						throw new Error('Test Error');
					}
				};
			});
		});

		it('propagates error', async() => {
			const store = new AssignmentStore();
			return expect(store.fetchActivity('http://1', 'token')).to.be.rejected;
		});
	});
});
