import * as EntityFactory from 'siren-sdk/src/es6/EntityFactory.js';
import { Assignment } from '../../../../components/d2l-activity-editor/d2l-activity-assignment-editor/state/assignment.js';
import { AssignmentEntity } from 'siren-sdk/src/activities/assignments/AssignmentEntity.js';
import { expect } from 'chai';
import sinon from 'sinon';

describe('Assignment ', function() {

	afterEach(() => {
		sinon.restore();
	});

	it('fetches', async() => {
		const entity = sinon.createStubInstance(AssignmentEntity, {
			name: 'Homework 101',
			instructionsEditorHtml: 'These are your instructions'
		});

		sinon.stub(EntityFactory, 'entityFactory').callsArgWith(3, entity);

		const assignment = new Assignment('http://assignment/1', 'token');
		assignment.fetch();

		expect(assignment.name).to.equal('Homework 101');
		expect(assignment.instructions).to.equal('These are your instructions');
	});
});
