import { ActivityUsage} from '../../../components/d2l-activity-editor/state/activity-usage.js';
import { ActivityUsageEntity } from 'siren-sdk/src/activities/ActivityUsageEntity.js';
import { expect } from 'chai';
import { fetchEntity } from '../../../components/d2l-activity-editor/state/fetch-entity.js';
import sinon from 'sinon';
import { when } from 'mobx';

jest.mock('siren-sdk/src/activities/ActivityUsageEntity.js');
jest.mock('../../../components/d2l-activity-editor/state/fetch-entity.js');

describe('Activity Usage', function() {

	const defaultEntityMock = {
		dueDate: () => '2020-01-23T04:59:00.000Z',
		canEditDueDate: () => Promise.resolve(true),
		isDraft: () => true,
		canEditDraft: () => true
	};

	afterEach(() => {
		sinon.restore();
		ActivityUsageEntity.mockClear();
		fetchEntity.mockClear();
	});

	let sirenEntity;

	describe('fetching', () => {
		beforeEach(() => {
			sirenEntity = sinon.stub();

			ActivityUsageEntity.mockImplementation(() => {
				return defaultEntityMock;
			});

			fetchEntity.mockImplementation(() => Promise.resolve(sirenEntity));
		});

		it('fetches', async() => {
			const activity = new ActivityUsage('http://1', 'token');
			await activity.fetch();

			expect(activity.dueDate).to.equal('2020-01-23T04:59:00.000Z');
			expect(activity.canEditDueDate).to.be.true;

			expect(activity.isDraft).to.be.true;
			expect(activity.canEditDraft).to.be.true;

			expect(fetchEntity.mock.calls.length).to.equal(1);
			expect(ActivityUsageEntity.mock.calls[0][0]).to.equal(sirenEntity);
			expect(ActivityUsageEntity.mock.calls[0][1]).to.equal('token');
		});
	});

	describe('updating', () => {
		beforeEach(() => {
			sirenEntity = sinon.stub();

			ActivityUsageEntity.mockImplementation(() => {
				return defaultEntityMock;
			});

			fetchEntity.mockImplementation(() => sirenEntity);
		});

		it('reacts to due date', async(done) => {
			const activity = new ActivityUsage('http://1', 'token');
			await activity.fetch();

			when(
				() => activity.dueDate === '2020-02-23T04:59:00.000Z',
				() => {
					done();
				}
			);

			activity.setDueDate('2020-02-23T04:59:00.000Z');
		});

		it('reacts to is draft', async(done) => {
			const activity = new ActivityUsage('http://1', 'token');
			await activity.fetch();

			when(
				() => activity.isDraft === false,
				() => {
					done();
				}
			);

			activity.setDraftStatus(false);
		});
	});

	describe('saving', () => {
		const save = jest.fn();

		beforeEach(() => {
			sirenEntity = sinon.stub();

			ActivityUsageEntity.mockImplementation(() => Object.assign({}, defaultEntityMock,	{
				save
			}));

			fetchEntity.mockImplementation(() => sirenEntity);
		});

		it('saves', async() => {
			const activity = new ActivityUsage('http://1', 'token');
			await activity.fetch();

			activity.setDueDate('2020-02-23T04:59:00.000Z');
			activity.setDraftStatus(false);

			await activity.save();

			expect(save.mock.calls.length).to.equal(1);
			expect(save.mock.calls[0][0]).to.eql({
				dueDate: '2020-02-23T04:59:00.000Z',
				isDraft: false
			});
		});
	});
});