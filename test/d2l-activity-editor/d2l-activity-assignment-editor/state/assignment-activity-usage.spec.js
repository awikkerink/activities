import * as EntityFactory from 'siren-sdk/src/es6/EntityFactory.js';
import { AssignmentActivityUsage} from '../../../../components/d2l-activity-editor/d2l-activity-assignment-editor/state/assignment-activity-usage.js';
import { AssignmentActivityUsageEntity } from 'siren-sdk/src/activities/assignments/AssignmentActivityUsageEntity.js';
import { expect } from 'chai';
import sinon from 'sinon';

describe('Assignment Activity Usage', function() {

	afterEach(() => {
		sinon.restore();
	});

	it('fetches', async() => {
		const entity = sinon.createStubInstance(AssignmentActivityUsageEntity, {
			assignmentHref: 'http://assignment/1'
		});

		sinon.stub(EntityFactory, 'entityFactory').callsArgWith(3, entity);

		const activity = new AssignmentActivityUsage('http://1', 'token');
		activity.fetch();

		expect(activity.assignmentHref).to.equal('http://assignment/1');
	});
});
