'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangArImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.ar = {
			'activities': 'Activities',
			'activityName': 'اسم النشاط',
			'caughtUp': 'لقد انتهيت من مهامك!',
			'checkBackOften': 'تحقق باستمرار من احتمال توفر عمليات إرسال جديدة.',
			'clearSearch': 'مسح البحث',
			'completed': 'Completed',
			'courseName': 'المقرر التعليمي',
			'displayName': 'الاسم الأول، اسم العائلة',
			'due': 'Due: {date}',
			'evaluate': 'تقييم {displayName}',
			'evaluateAll': 'Evaluate All',
			'evaluated': 'Evaluated',
			'failedToFilter': 'يتعذّر تطبيق التصفية. حاول مجددًا في غضون بضع دقائق.',
			'failedToLoadData': 'يتعذّر تحميل عمليات الإرسال. حاول مجددًا في غضون بضع دقائق.',
			'failedToLoadMore': 'يتعذّر تحميل المزيد من عمليات الإرسال. حاول مجددًا في غضون بضع دقائق.',
			'failedToSearch': 'يتعذّر تطبيق البحث. حاول مجددًا في غضون بضع دقائق.',
			'firstName': 'الاسم الأول',
			'lastName': 'اسم العائلة',
			'loadMore': 'تحميل المزيد',
			'loading': 'يتم الآن التحميل',
			'masterTeacher': 'المعلّم',
			'noCriteriaMatch': 'لا تتوفر أي عمليات إرسال تتوافق مع معاييرك.',
			'noResults': 'لا تتوفر أي نتائج هنا.',
			'noSubmissions': 'لا تتوفر أي عمليات إرسال تتطلب اهتمامك.',
			'publishAll': 'Publish All',
			'published': 'Published',
			'search': 'بحث',
			'searchResultsMore': 'أكثر من {num} من نتائج البحث',
			'searchResultsMultiple': '{num} من نتائج البحث',
			'searchResultsSingle': 'نتيجة بحث واحدة',
			'sortBy': 'الفرز بحسب {columnName}',
			'submissionDate': 'تاريخ الإرسال',
			'submissionList': 'Submission List',
			'submissions': 'Submissions',
			'tableTitle': 'قائمة بعمليات إرسال المتعلّم غير المقيّمة من المقررات التعليمية والأدوات',
			'tryAgain': 'المحاولة مرة أخرى',
			'unreadSubmissions': '{num} unread submissions',
			'unreadSubmissionsDetail': '{unread} new, {resub} resubmissions',
			'viewBy': 'View by:'
		};
	}
};

export const LangAr = dedupingMixin(LangArImpl);

