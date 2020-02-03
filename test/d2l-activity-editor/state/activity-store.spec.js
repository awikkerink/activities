import chai, { expect } from 'chai';
import { ActivityStore } from '../../../components/d2l-activity-editor/state/activity-store.js';
import { ActivityUsage } from '../../../components/d2l-activity-editor/state/activity-usage.js';
import chaiAsPromised from 'chai-as-promised';
import { when } from 'mobx';

chai.use(chaiAsPromised);

jest.mock('../../../components/d2l-activity-editor/state/activity-usage.js');

describe('Activity Store', function() {

	let store;

	beforeEach(() => {
		store = new ActivityStore();
	});

	afterEach(() => {
		ActivityUsage.mockClear();
	});

	describe('when succeeds', () => {
		let mockActivityFetch;

		beforeEach(() => {
			ActivityUsage.mockImplementation(() => {
				const object =  {};
				mockActivityFetch = jest.fn(() => Promise.resolve(object));
				object.fetch = mockActivityFetch;
				return object;
			});
		});

		it('fetches activity', async() => {
			const activity = await store.fetch('http://1', 'token');
			expect(store._objects.size).to.equal(1);

			const activity2 = await store.fetch('http://1', 'token');
			expect(activity2).to.equal(activity);

			expect(ActivityUsage.mock.calls.length).to.equal(1);
			expect(ActivityUsage.mock.calls[0][0]).to.equal('http://1');
			expect(ActivityUsage.mock.calls[0][1]).to.equal('token');
			expect(mockActivityFetch.mock.calls.length).to.equal(1);

			const activity3 = store.get('http://1');
			expect(activity3).to.equal(activity);
		});

		it('reacts to activity get', async(done) => {
			when(
				() => !!store.get('http://1'),
				() => {
					done();
				}
			);

			await store.fetch('http://1', 'token');
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
			await expect(store.fetch('http://1', 'token')).to.be.rejected;
			expect(store._fetches.size).to.equal(0);
			expect(store._objects.size).to.equal(0);
		});
	});
});
