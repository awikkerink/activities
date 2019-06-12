'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangTrImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.tr = {
			'activities': 'Etkinlikler',
			'activityName': 'Etkinlik Adı',
			'caughtUp': 'Yetiştin!',
			'checkBackOften': 'Yeni gönderiler için belirli aralıklarla tekrar kontrol edin.',
			'clearSearch': 'Aramayı Temizle',
			'completed': 'Completed',
			'courseName': 'Ders',
			'displayName': 'Ad, Soyad',
			'due': 'Due: {date}',
			'evaluate': 'Değerlendir: {displayName}',
			'evaluateAll': 'Evaluate All',
			'evaluated': 'Evaluated',
			'failedToFilter': 'Filtre uygulanamıyor. Birkaç dakika içinde tekrar deneyin.',
			'failedToLoadData': 'Gönderiler yüklenemiyor. Birkaç dakika içinde tekrar deneyin.',
			'failedToLoadMore': 'Daha fazla gönderi yüklenemiyor. Birkaç dakika içinde tekrar deneyin.',
			'failedToSearch': 'Arama uygulanamıyor. Birkaç dakika içinde tekrar deneyin.',
			'firstName': 'Adı',
			'lastName': 'Soyadı',
			'loadMore': 'Daha fazla yükle',
			'loading': 'Yükleniyor',
			'masterTeacher': 'Öğretmen',
			'noCriteriaMatch': 'Kriterinizle eşleşen gönderi yok.',
			'noResults': 'Sonuç yok.',
			'noSubmissions': 'İlgilenmeniz gereken gönderi yok.',
			'publishAll': 'Publish All',
			'published': 'Published',
			'search': 'Ara',
			'searchResultsMore': '{num}+ Arama Sonucu',
			'searchResultsMultiple': '{num} Arama Sonucu',
			'searchResultsSingle': '1 Arama Sonucu',
			'sortBy': 'Şuna göre sırala: {columnName}',
			'submissionDate': 'Gönderme Tarihi',
			'submissionList': 'Submission List',
			'submissions': 'Gönderimler',
			'tableTitle': 'Dersler ve araçlar genelinde değerlendirilmemiş Öğrenci gönderilerinin listesi',
			'tryAgain': 'Tekrar Dene',
			'unreadSubmissions': '{num} unread submissions',
			'unreadSubmissionsDetail': '{unread} new, {resub} resubmissions',
			'viewBy': 'Görüntüleme ölçütü:'
		};
	}
};

export const LangTr = dedupingMixin(LangTrImpl);

