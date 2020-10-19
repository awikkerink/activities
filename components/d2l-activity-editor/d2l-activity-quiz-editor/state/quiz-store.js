import { ObjectStore } from '../../state/object-store.js';
import { Quiz } from './quiz.js';

export class QuizStore extends ObjectStore {
	constructor() {
		super(Quiz);
	}
}

export const shared = new QuizStore();
