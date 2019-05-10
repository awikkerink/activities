'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangKoImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.ko = {
			'activities': 'Activities',
			'activityName': '활동 이름',
			'caughtUp': '거의 따라잡았습니다!',
			'checkBackOften': '새로운 제출 항목이 있는지 자주 다시 확인하십시오.',
			'clearSearch': '검색 지우기',
			'courseName': '강의',
			'displayName': '이름, 성',
			'evaluate': '{displayName} 평가',
			'failedToFilter': '필터를 적용할 수 없습니다. 몇 분 후에 다시 시도하십시오.',
			'failedToLoadData': '제출 항목을 로드할 수 없습니다. 몇 분 후에 다시 시도하십시오.',
			'failedToLoadMore': '추가 제출 항목을 로드할 수 없습니다. 몇 분 후에 다시 시도하십시오.',
			'failedToSearch': '탐색을 적용할 수 없습니다. 몇 분 후에 다시 시도하십시오.',
			'firstName': '이름',
			'lastName': '성',
			'loadMore': '더 많이 로드',
			'loading': '로드 중',
			'masterTeacher': '교사',
			'noCriteriaMatch': '기준과 일치하는 제출 항목이 없습니다',
			'noResults': '결과가 없습니다.',
			'noSubmissions': '주목할 제출 항목이 없습니다.',
			'search': '검색',
			'searchResultsMore': '{num}+ 탐색 결과',
			'searchResultsMultiple': '{num} 탐색 결과',
			'searchResultsSingle': '1 탐색 결과',
			'sortBy': '{columnName}으로 정렬',
			'submissionDate': '제출일',
			'submissions': 'Submissions',
			'tableTitle': '강의 및 도구 전체의 평가되지 않은 학습자 제출 항목 목록',
			'tryAgain': '다시 시도',
			'viewBy': 'View by:'
		};
	}
};

export const LangKo = dedupingMixin(LangKoImpl);

