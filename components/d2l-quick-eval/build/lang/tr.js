'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangTrImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.tr = {
			'activities': 'Etkinlikler',
			'activityName': 'Etkinlik Adı',
			'assignment': 'Ödev',
			'caughtUp': 'Yetiştin!',
			'checkBackOften': 'Yeni gönderiler için belirli aralıklarla tekrar kontrol edin.',
			'clearSearch': 'Aramayı Temizle',
			'close': 'Close',
			'completed': 'Tamamlandı',
			'confirmation': 'Confirmation',
			'courseName': 'Ders',
			'discussion': 'Tartışma',
			'displayName': 'Ad, Soyad',
			'due': 'Bitiş:{date}',
			'evaluate': 'Değerlendir: {displayName}',
			'evaluateAll': 'Tümünü Değerlendir',
			'evaluated': 'Değerlendirildi',
			'failedToFilter': 'Filtre uygulanamıyor. Birkaç dakika içinde tekrar deneyin.',
			'failedToLoadData': 'Gönderiler yüklenemiyor. Birkaç dakika içinde tekrar deneyin.',
			'failedToLoadActivities': 'Unable to load activities. Try again in a few minutes.',
			'failedToLoadMore': 'Daha fazla gönderi yüklenemiyor. Birkaç dakika içinde tekrar deneyin.',
			'failedToSearch': 'Arama uygulanamıyor. Birkaç dakika içinde tekrar deneyin.',
			'firstName': 'Adı',
			'lastName': 'Soyadı',
			'loadMore': 'Daha fazla yükle',
			'loading': 'Yükleniyor',
			'masterTeacher': 'Öğretmen',
			'no': 'No',
			'noCriteriaMatch': 'Kriterinizle eşleşen gönderi yok.',
			'noCriteriaMatchActivities': 'There are no activities that match your criteria.',
			'noResults': 'Sonuç yok.',
			'noSubmissions': 'İlgilenmeniz gereken gönderi yok.',
			'publishAll': 'Tümünü Yayımla',
			'publishAllConfirmDialogMessage': '{evaluated} out of {assigned} users will receive feedback on publishing. Do you want to continue?',
			'publishAllToastMessage': '{activityName} evaluations published successfully.',
			'publishAllToastMessageTruncated': '{truncatedActivityName}… evaluations published successfully.',
			'published': 'Yayınlandı',
			'quiz': 'Sınav',
			'search': 'Ara',
			'searchResultsMore': '{num}+ Arama Sonucu',
			'searchResultsMultiple': '{num} Arama Sonucu',
			'searchResultsSingle': '1 Arama Sonucu',
			'sortBy': 'Şuna göre sırala: {columnName}',
			'submissionDate': 'Gönderme Tarihi',
			'submissionList': 'Gönderim Listesi',
			'submissions': 'Gönderimler',
			'tableTitle': 'Dersler ve araçlar genelinde değerlendirilmemiş Öğrenci gönderilerinin listesi',
			'toggleIndicatorLabel': 'Perform Actions on {target}',
			'tryAgain': 'Tekrar Dene',
			'newSubmissions': 'New Submissions',
			'newSubmissionDetails': '{newNum, plural, =0 {{resub, plural, =1 {1 resubmission} other {{resub} resubmissions}}} other {{resub, plural, =0 {{newNum} new} =1{{newNum} new, 1 resubmission} other {{newNum} new, {resub} resubmissions}}}}',
			'newPosts': 'New Posts',
			'newPostDetails': '{numInteractions, plural, =1 {1 thread or reply} other {{numInteractions} threads or replies}}',
			'newAttempts': 'New Attempts',
			'newAttemptsDetails': '{newNum, plural, =0 {{reAttemptNum, plural, =1 {1 reattempt} other {{reAttemptNum} reattempts}}} other {{reAttemptNum, plural, =0 {{newNum} new} =1{{newNum} new, 1 reattempt} other {{newNum} new, {reAttemptNum} reattempts}}}}',
			'viewBy': 'Görüntüleme ölçütü:',
			'yes': 'Yes'
		};
	}
};

export const LangTr = dedupingMixin(LangTrImpl);

