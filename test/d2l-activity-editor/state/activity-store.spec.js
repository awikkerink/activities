import chai, { expect } from 'chai';
import { ActivityStore } from '../../../components/d2l-activity-editor/state/activity-store.js';
import { ActivityUsage } from '../../../components/d2l-activity-editor/state/activity-usage.js';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);

jest.mock('../../../components/d2l-activity-editor/state/activity-usage.js');

describe('Activity Store', function() {
	afterEach(() => {
		ActivityUsage.mockClear();
	});

	describe('when succeeds', () => {
		const mockActivityFetch = jest.fn(() => Promise.resolve(this));

		beforeEach(() => {
			ActivityUsage.mockImplementation(() => {
				return {
					fetch: mockActivityFetch
				};
			});
		});

		it('fetches activity', async() => {
			const store = new ActivityStore();

			const activity = await store.fetchActivity('http://1', 'token');
			expect(store._activities.size).to.equal(1);

			const activity2 = await store.fetchActivity('http://1', 'token');
			expect(activity2).to.equal(activity);

			expect(ActivityUsage.mock.calls.length).to.equal(1);
			expect(ActivityUsage.mock.calls[0][0]).to.equal('http://1');
			expect(ActivityUsage.mock.calls[0][1]).to.equal('token');
			expect(mockActivityFetch.mock.calls.length).to.equal(1);
		});
	});

	describe('When activity throws an error', () => {
		beforeAll(() => {
			ActivityUsage.mockImplementation(() => {
				return {
					fetch: () => 	Promise.reject()
				};
			});
		});

		it('propagates error', async() => {
			const store = new ActivityStore();
			return expect(store.fetchActivity('http://1', 'token')).to.be.rejected;
		});
	});
});
