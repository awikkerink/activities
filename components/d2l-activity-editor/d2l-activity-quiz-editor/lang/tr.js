/* eslint quotes: 0 */

export default {
	"name": "Ad", // Label for the name field when creating/editing an activity
	"quizSaveError": "Sınavınız kaydedilmedi. Lütfen işaretlenmiş alanları düzeltin.", // Error message to inform the user that there was a problem saving the quiz, instructing them to correct invalid fields
	"hdrAvailability": "Uygunluk Tarihleri ve Koşulları", // availability header
	"hdrTimingAndDisplay": "Zamanlama ve Görüntüleme", // timing/display accordion header
	"subHdrTimingTools": "Zamanlama", // Title for timing tools
	"manageTiming": "Zamanlamayı Yönet", // Label for button to launch timing dialog
	"hdrAttemptsAndCompletion": "Denemeler ve Tamamlamalar", //attempts/completion accordion header
	"subHdrPagingTools": "Sayfalama", // Title for paging tools
	"subHdrShuffleQuiz": "Sınavı karıştır",// Title for shuffle quiz tool(s)
	"subHdrDisplayTools": "Görüntüle", // Title for display tools
	"shuffleDescription": "Sınav sorularını ve bölümlerini karıştır. Alt bölümleri basamaklandırmaz.", // description for question shuffling behavior
	"shuffleSummary": "Soruları karıştır", // summary text for shuffle quiz questions
	"hintsToolDescription": "İpuçlarına izin ver", // decription for hints tool
	"hintsAllowedSummary": "İpuçlarına izin verildi", // summary text when hints are enabled,
	"passwordLabel": "Parola", // Label for the quiz password text input field
	"passwordSummary": "Parola korumalı", // summary text when quiz has a password
	"disableRightClickDescription": "Sağ tıklatmayı devre dışı bırak", // description for disable right click
	"disableRightClickSummary": "Sağ tıklatma devre dışı bırakıldı", // summary text when right clicks are disabled
	"preventMovingBackwardsDescription": "Önceki sayfalara dönmeyi engelle",
	"disablePagerAndAlertsDescription": "Brightspace'teki E-posta, Anlık Mesajlar ve Uyarıları Devre Dışı Bırak", // description for blocking communications / disable pager and alerts during a quiz
	"disablePagerAndAlertsSummary": "Uyarılar ve iletişim engellendi", // summary text when communications / pager and alerts are disabled
	"emailNotificationSummary": "E-posta ile deneme bildirimi", // summary for email notification
	"preventMovingBackwardsSummary": "Sayfalama sınırlamaları", // summary for prevent moving backwards checkbox
	"dividerHeader": "Sorular", // The header that is displayed on the divider
	"previewLabel": "Ön İzle", // The label text for the preview button
	"hdrReleaseConditions": "Sürüm Koşulları", // release conditions heading
	"hlpReleaseConditions": "Öğrenciler, sürüm koşullarını yerine getirmedikçe sınava erişemez veya sınavı görüntüleyemez.", // release conditions help
	"hdrEvaluationAndFeedback": "Değerlendirme ve geri bildirim", // evaluation/feedback accordion header
	"subHdrAutomaticGrades": "Otomatik Not", // Title for automatic grade tool
	"autoSetGradedDescription": "Tamamlandıktan hemen sonra deneme sonuçlarını otomatik yayınla", // description for automatic grade checkbox
	"autoSetGradedSummary": "Sonuçları otomatik yayınla", // summary for auto set graded checkbox
	"passwordDescription": "Yalnızca bu parolayı giren kullanıcılara bu sınavı yazma erişimi verilecektir.", // description for password input
	"hlpSubmissionNotificationEmail": "Bir sınav denemesi yapıldığında bildirim almak için bir e-posta adresi veya virgülle ayırarak birden çok e-posta adresi girin.", // description for email notification input
	"autoSetGradedAccessibleHelpText": "Otomatik Not hakkında yardım alın", // accessible help text for autoSetGraded question mark button
	"autoSetGradedHelpDialogTitle": "Bilgi: Tamamlandıktan hemen sonra deneme sonuçlarını otomatik yayınla", // title that appears when the autoSetGraded help dialog is rendered
	"autoSetGradedHelpDialogConfirmationText": "Tamam", // copy that appears on the autoSetGraded help dialog confirmation button
	"autoSetGradedHelpDialogParagraph1": "Bu özellik açıkken otomatik değerlendirme denemesi sonuçları yayınlanır ve öğrencilere görünür.", // content for paragraph 1 of autoSetGraded help dialog
	"autoSetGradedHelpDialogParagraph2": "Not: Sorular sistem tarafından değerlendirilemiyorsa (ör. Yazılı yanıt içeren sorular) manuel değerlendirmeye kadar bu sorular otomatik olarak sıfır olarak puanlanır.", // content for paragraph 2 of autoSetGraded help dialog
	"autoSetGradedHelpDialogParagraph3": "", // content for paragraph 3 of autoSetGraded help dialog
	"disableAlertsHelpDialogTitle": "Bilgi: Brightspace'teki E-posta, Anlık Mesajlar ve Uyarıları Devre Dışı Bırakma", // title that appears when the disable alerts help dialog is rendered
	"disableAlertsHelpDialogContent": "Bu seçeneği etkinleştirdiğinizde öğrenciler, devam eden bir denemeleri varken Brightspace E-postalarına, Anlık Mesajlarına veya uyarılarına erişemezler.", // content that appears when the disable alerts help dialog is rendered
	"disableAlertsHelpDialogConfirmationText": "Tamam", // copy that appears on the disable alerts help dialog confirmation button
	"disableAlertsAccessibleHelpText": "Brightspace'teki E-posta, Anlık Mesajlar ve Uyarıları Devre Dışı Bırakma konusunda yardım alın", // accessible help text for disable alerts question mark button
	"disableRightClickAccessibleHelpText": "Sağ Tıklatmayı Devre Dışı Bırakma hakkında yardım alın", // accessible help text for disable right click question mark button
	"disableRightClickHelpDialogTitle": "Bilgi: Sağ Tıklatmayı Devre Dışı Bırakma", // title that appears when the disable right click help dialog is rendered
	"disableRightClickHelpDialogParagraph1": "Bu özellik, devam eden denemeleri olan öğrencilerin sorulara sağ tıklayarak soruları yazdırmalarını engeller. Ancak, öğrenciler yine de tarayıcının dışındaki diğer teknolojilerle sınav ekranını yakalayabilir.", // content for paragraph 1 of disable right click help dialog
	"disableRightClickHelpDialogParagraph2": "Öğrenci soru metnini kopyalayıp yapıştıramadığı için bazı erişilebilirlik iş akışları engellenecektir. Bu özellik bir sınav için etkinleştirilmiş olsa dahi kullanıcının İmkanlar bölümünde \"Sağ Tıklamaya Her Zaman İzin Ver\" seçeneği etkinleştirilerek bireysel kullanıcılara bir sınava sağ tıklama yetisi verilebilir.", // content for paragraph 2 of disable right click help dialog
	"disableRightClickHelpDialogConfirmationText": "Tamam", // copy that appears on the disable right click help dialog confirmation button
	"manageTimingDialogConfirmationText": "Tamam", // copy that appears on the Timing dialog confirmation button
	"manageTimingDialogCancelText": "İptal", // copy that appears on the Timing dialog cancel button
	"description": "Açıklama", // Description label for the Description text input box,
	"btnOpenIpRestrictionDialog": "IP kısıtlamalarını yönet", // Button text for opening IP restriction dialog
	"hdrIpRestrictionDialog": "IP Kısıtlamaları (IPv4)", // timing/display accordion header
	"ipRestrictionLabel": "IP Kısıtlamaları", // Label for IP restrictions editor
	"minutesLabel": "dakika",  // label for Timing dialog time limit input slot
	"minutesBeforeFlaggedLabel": "Süre sınırının aşıldığını belirten bayrak işareti eklenmeden önce kalan dakika:", // label for Timing dialog grace period input slot
	"extendedDeadlineLabel": "Uzatılmış Teslim Tarihi",  // label for timing dialog - extended deadline select
	"extendedDeadlineInputLabel": "Ek Süre bittikten sonra geçen dakika",  //label for Timing dialog extended deadline select slot
	"subHdrExceededTimeLimitBehaviour": "Aşılan Süre Sınırı Davranışı", // Title for submission late type options,
	"exceededTimeLimitBehaviourPrefix": "Ek süre bittikten sonra sınav denemesine süre sınırı aşıldığını belirten bir bayrak işareti ekleyin ve", // label for submission label type options
	"showClockLabel": "Sınav başlamadan önce görüntülenecektir", // Label for show clock checkbox
	"showClockTitle": "Saati göster", // Title for show clock
	"manageAttemptsDialogConfirmationText": "Tamam", // copy that appears on the Attempts dialog confirmation button
	"manageAttemptsDialogCancelText": "İptal", // copy that appears on the Attempts dialog cancel button
	"subHdrAttemptsTools": "Denemeler", // Title for attempts tools
	"manageAttempts": "Denemeleri Yönet", // Label for button to launch attempts dialog
	"textIsDisplayedPart1": "Yeni sınav oluşturma deneyiminde alanlar kapatılamaz.", // First sentence of alert warning that text fields will be visible
	"textIsDisplayedSingularPart2": "Sınav kaydedildiğinde öğrenciler {field} alanını görebilir.", // Second sentence of alert warning that text fields will be visible, when there is only one field
	"introMovedToDescription": "Sınavlar artık Tanıtımları desteklememektedir. Tanıtım alanındaki mevcut içerik artık Açıklama alanında görüntülenir.", // Alert warning that existing quiz introduction has been removed and that the text in the introduction has been put into the quiz description
	"attemptsAllowed": "İzin Verilen Denemeler", // Title for Attempts Allowed select in Attempts dialog
	"quizAttemptsAllowedSummary": "{numAttemptsAllowed, plural, =1 {1 denemeye izin verilir} other {{numAttemptsAllowed} denemeye izin verilir}}", //
	"overallGradeCalculation": "Genel Not Hesaplaması", // Title for Overall Grade Calculation select in Attempts dialog
	"retakeIncorrectQuestionsOnly": "Yalnızca Yanlış Yanıtlanan Soruları Yeniden Al", // Title for RIO checkbox in Attempts dialog
	"rioCheckboxLabel": "Yeni denemelerde yalnızca daha önce yanlış yanıtlanan soruların yanıtlanmasına izin verilir", // Label for RIO checkbox in Attempts dialog
	"btnAttemptConditions": "Deneme Koşulları", // Label for Attempt Conditions button in Attempts dialog
	"rioAccessibileHelpText": "Yalnızca Yanlış Soruları Yeniden Alma hakkında yardım alın", // accessible help text for RIO question mark button
	"rioDialogTitle": "Bilgi: Yalnızca Yanlış Yanıtlanan Soruları Yeniden Alma", // Title for RIO help dialog
	"rioDialogParagraph": "Bu ayar seçildiğinde bir sınavı birden fazla kez deneyen öğrenciler yalnızca önceki denemede yanlış yanıt verdikleri soruları yanıtlayabilir.", // content for RIO dialog
	"rioDialogParagraph2": "Otomatik yayınlama kullanıyorsanız Yazılı Yanıt içeren sorular 0 olarak puanlanır ve manuel olarak notlandırılana kadar sonraki denemelere dahil edilir.", // second paragraph for RIO dialog
	"rioDialogConfirmationText": "Tamam", // copy that appears on the RIO help dialog confirmation button
	"ipRestrictionDialogDescription": "Yalnızca tanımlanan kısıtlamalara uyan IP adreslerinden bağlanan öğrenciler sınava katılabilecektir.", // guidelines for IP restrictions dialog
	"btnIpRestrictionsDialogAdd": "Ekle", // text for IP restrictions dialog "Add" button
	"btnIpRestrictionsDialogBtnCancel": "İptal", // text for IP restrictions dialog "Cancel" button
	"ipRestrictionsDialogAddNewRange": "IP Aralığı", // text for IP restrictions dialog "Add new IP range" button
	"ipRestrictionsTableStartRangeHdr": "IP Aralığı Başlangıcı", // text for IP restrictions table header start
	"ipRestrictionsTableEndRangeHdr": "IP Aralığı Sonu", // text for IP restrictions table header end
	"ipRestrictionsTableDeleteRangeHdr": "Sil", // text for IP restrictions table header delete
	"ipRestrictionsTableDeleteRangeLabel": "Sil", // label for IP restrictions delete button
	"ipRestrictionsTableStartRangeLabel": "IP aralığı başlangıcı {index}", // label for IP restrictions start range input
	"ipRestrictionsTableEndRangeLabel": "IP aralığı sonu {index}", // label for IP restrictions end range input
	"ipRestrictionsValidationError": "Geçersiz IP adresi biçimi. Lütfen işaretlenmiş alanları düzeltin. Örnek IP adresi: 155.55.5.15.", // error message for invalid IP addresses
	"ipRestrictions500Error": "Bir sorun oluştu. Lütfen tekrar deneyin.", // error message for IP restrictions 500 response
	"ipRestrictionsHelpTxtConfirmation": "Tamam", // confirmation text on IP restrictions help dialog
	"hdrIpRestrictionsHelpDialog": "Bilgi: IP Kısıtlamaları (IPv4)", // timing/display accordion header
	"hdrIpRestrictionsHelpDialogP1": "Kabul edilen IP adresi aralığını belirlemek için, sırasıyla IP Aralığı Başlangıcı ve IP Aralığı Sonu alanlarına bir nokta ile ayrılmış, 0 ile 255 arasında değişen dörder değer girin.", // IP restrictions help dialog paragraph 1
	"hdrIpRestrictionsHelpDialogP2": "Örnek IP adresi: 155.55.5.15", // IP restrictions help dialog paragraph 2
	"hdrIpRestrictionsHelpDialogP3": "Tek bir IP adresini kabul etmek için yalnızca IP Aralığı Başlangıcı değerini belirtin.", // IP restrictions help dialog paragraph 3
	"hdrIpRestrictionsHelpDialogP4": "Not: IP Aralığı Başlangıcı değeri, IP Aralığı Sonu değerinden küçük olmalıdır.", // IP restrictions help dialog paragraph 4
	"hdrSpecialAccess": "Özel Erişim", // special access heading,
	"hlpSpecialAccess": "Özel Erişim, sınavların yalnızca belirli bir kullanıcı grubu tarafından veya belirli kullanıcılar için kişiselleştirilmiş sona erme tarihlerinde kullanılabilmesini sağlar.", // special access help
	"specialAccessRestrictedText": "Yalnızca özel erişime sahip kullanıcılar bu sınavı görebilir", // restricted special access description
	"ipRestrictionsAccessibileHelpText": "IP kısıtlamaları hakkında yardım alın", // accessible help text for IP restrictions question mark button
	"attemptConditions": "Deneme Koşulları", // Header for Attempts Conditions section in Attempts dialog
	"attemptConditionsParagraph1": "Bir öğrencinin başka bir denemeye hak kazanması için bir önceki denemede ulaşması gereken, 0 ile 100 arasında minimum ve/veya maksimum bir yüzdelik değer belirleyin.", // content for paragraph1 on the Attempts dialog Attempts Condition section
	"attemptConditionsParagraph2": "Minimum veya maksimum alanı boşsa deneme aralığının bu kısmına bir sınır uygulanmaz.", // content for paragragh2 on the Attempts dialog Attempts Condition section
	"attemptConditionsRangePrefixText1": "{index}. Denemede:", // prefix text 1 for Attempt Conditions range editor on Attempts dialog
	"attemptConditionsRangePrefixText2": "öğrenciler şu aralığa ulaşmalıdır", // prefix text 2 for Attempt Conditions range editor on Attempts dialog
	"attemptConditionsRangeSuffixText1": "bırakmak için", //suffix text 1 for Attempts Conditions range editor on Attempts dialog
	"attemptConditionsRangeSuffixText2": "Deneme {next}", // suffix text 2 for Attempts Condition range editor on Attempts dialog
	"minLabel": "Minimum:", // label for Min input on Attempts Conditions range editor on Attempts Dialog
	"maxLabel": "Maksimum:", // label for Max input on Attempts Conditions range editor on Attempts Dialog
	"andRangeText": "ve", // copy on Attempts Condition range editor on Attempts Dialog
	"percentageRangeText": "%", // copy on Attempts Condition range editor on Attempts Dialog
	"ipRestrictionsSummary": "IP kısıtlamaları", // summary to be displayed when a quiz has ip restrictions
	"ipRestrictionsInnerSummary" : "{count, plural, =1 {1 kısıtlama} other {{count} kısıtlama}}", // summary to be displayed when accordion is expanded
	"quizTimingValidationError": "Zamanlama değiştirilemez, lütfen işaretlenmiş alanları düzeltin.", // Appears in error alert when validation fails in Manage Timing dialog
	"quizTimingServerError": "Bir sorun oluştu. Lütfen tekrar deneyin.", // Timing save server error alert message
	"quizTimingRecommendedSummary": "Önerilen süre sınırı ({numMinutes, plural, =1 {1 dakika} other {{numMinutes} dakika}})", // Recommended time limit (x minute) or (x minutes).
	"quizTimingEnforcedSummary": "Uygulanan süre sınırı ({numMinutes, plural, =1 {1 dakika} other {{numMinutes} dakika}})", // Enforced time limit(x minute) or (x minutes).
	"ipRestrictionsDuplicateError": "Yinelenen IP aralığı başlangıcı adresi. Her bir IP aralığı başlangıcı değeri benzersiz olmalıdır.", // Error for duplicate IP
	"ipRestrictionsRangeError": "Geçersiz IP adresi aralığı sağlandı. Lütfen aralıkların doğru formatlandığından emin olun.", // Error for invalid IP ranges
	"quizAttemptsValidationError": "Denemeler değiştirilemez, lütfen işaretlenmiş alanları düzeltin.", // Appears in error alert when validation fails in Manage Attempts dialog
	"totalPoints": "Toplam Puan {scoreOutOf}", // Total points text that appears on quiz editor above list of questions
	"subHdrHeaderFooter": "Üstbilgi ve Altbilgi", // Header and Footer accordion header
	"manageHeaderFooterButton": "Üstbilgi ve Altbilgiyi Yönet", // Label for button to launch Header and Footer dialog
	"headerFooterDialogTitle": "Üstbilgi ve Altbilgi",
	"manageHeaderFooterDialogAddText": "Ekle", // Label for Add button for header and footer dialog
	"manageHeaderFooterDialogCancelText": "İptal", // Label for Cancel button header and footer dialog
	"headerLabel": "Üstbilgi", // Label for the header text box
	"headerDialogText": "Öğrenciler, Sınav Üstbilgisini ve Altbilgisini sırasıyla sınavın en üstünde ve en altında görebilir.", // Header and Footer dialog text
	"header": "Üstbilgi", // Header label for the header text box.
	"headerAdded": "Üstbilgi eklendi", // Header added summary text for Timing and Display accordion.
	"footerAdded": "Altbilgi eklendi", // Footer added summary text for Timing and Display accordion.
	"headerAndFooterAdded": "Üstbilgi ve altbilgi eklendi", // Header and footer added text for Timing and Display accordion.
	"footer": "Altbilgi", // Footer lable for the footer text box.
	"footerLabel": "Altbilgi", // Label for the footer text box.
	"headerAndFooter": "Üstbilgi ve altbilgi eklendi", // Header and footer summary text for closed accordion
	"createNewLabel": "Yeni Oluştur", // Label for button to open menu for adding new items to the quiz.
	"addExistingLabel": "Mevcut Olanı Ekle", // Label for button to open menu for adding pre-existing items to the quiz.
	"addQuestionsLabel": "Yeni Soru", // Label for button to open menu for adding new questions to the quiz.
	"submissionViewHeading1": "Yayınlandığında katılımcılara şunu gösterin:", // Label for checkbox in submission view container.
	"submissionViewHeading2": "ve", // Label for submission view dropdown in submission view container.
	"submissionViewCheckboxLabel": "Deneme notu", // Text next to the submission view checkbox in the container.
	"submissionViewButtonText": "Sınav sonuç ekranlarını özelleştir", // Text for the button at the bottom of the submission view container.
	"gradeOutOf": "Şu Not Üzerinden Notlandır:", // Label for the grade-out-of field when creating/editing an activity
	"submissionViewsHelpDialogTitle": "Bilgi: Sınav sonuçları ekranı", // Title for help dialog on submission view customization screen.
	"submissionViewsHelpDialogParagraph1": "Sınav sonuçları ekranı, kullanıcıların yayınlanan sınav denemesi sonuçlarını nasıl görüntüleyebileceklerini (gönderi kutusu gönderiminden hemen sonra veya daha sonra denemelerini gözden geçirirken) belirler.", // Paragraph 1 for help dialog on submission view customization screen.
	"submissionViewsHelpDialogParagraph2": "Birincil Görünüm katılımcılara varsayılan olarak gösterilir ve Ek Görünümler ayarlanan parametrelere göre Birincil Görünümü geçersiz kılar.", // Paragraph 2 for help dialog on submission view customization screen.
	"submissionViewsHelpDialogConfirmation": "Tamam", //Text for closing the information Dialog for customization in submission views.
	"submissionViewsDialogConfirmationMain": "Tamam", //Text for closing the main Dialog for customization in submission views.
	"submissionViewsDialogCancelMain": "İptal et", // Text for cancelling changes on the main Dialog for customization in submission views.
	"submissionViewsAccordionDropdownNoQuestions": "Soru yok", // Option in dropdown to decide what to display to learner.
	"submissionViewsAccordionDropdownIncorrectQuestionsWithCorrectAnswers": "Yalnızca yanlış sorular, doğru yanıtlarla birlikte", // Option in dropdown to decide what to display to learner.
	"submissionViewsAccordionDropdownIncorrectQuestionsWithoutCorrectAnswers": "Yalnızca yanlış sorular, doğru yanıtlar olmadan", // Option in dropdown to decide what to display to learner.
	"submissionViewsAccordionDropdownAllQuestionsWithCorrectAnswers": "Tüm sorular, doğru yanıtlarla birlikte", // Option in dropdown to decide what to display to learner.
	"submissionViewsAccordionDropdownAllQuestionsWithoutCorrectAnswers": "Tüm sorular, doğru yanıtlar olmadan", // Option in dropdown to decide what to display to learner.
	"primaryView": "Birincil Görünüm", // Label
	"additionalViewComesIntoEffect": "Additional view comes into effect:", // Label
	"submissionViewDialogCardAttemptScoreTrueText": "Değerlendirilen sorular için gösterilen deneme notu", // Submission view dialog card, text appearing when attempted grades are displayed.
	"submissionViewDialogCardAttemptScoreFalseText": "Görüntülenmiyor", // Submission view dialog card, text appearing when attempted grades are not displayed.
	"submissionViewDialogCardQuestionsNotDisplayed": "Görüntülenmiyor", // Submission view dialog card, text appearing when no questions are displayed.
	"submissionViewDialogCardQuestionsAllDisplayed": "Tüm sorular görüntülenir", // Submission view dialog card, text appearing when all questions are displayed.
	"submissionViewDialogCardQuestionsIncorrectOnlyDisplayed": "Yalnızca yanlış olanlar görüntülenir", // Submission view dialog card, text appearing when incorrect questions only are displayed.
	"submissionViewDialogCardQuestionsCorrectOnlyDisplayed": "Yalnızca doğru olanlar görüntülenir", // Submission view dialog card, text appearing when correct questions only are displayed.
	"submissionViewDialogCardShowAnswersTrueText": "Tüm yanıtlar görüntülenir", // Submission view dialog card, text appearing when all answers are displayed.
	"submissionViewDialogCardShowAnswersFalseText": "Görüntülenmiyor", // Submission view dialog card, text appearing when not all answers are displayed.
	"submissionViewDialogCardShowResponsesTrueText": "Görüntülenir", // Submission view dialog card, text appearing when learners responses are displayed.
	"submissionViewDialogCardShowResponsesFalseText": "Görüntülenmiyor", // Submission view dialog card, text appearing when learners responses are not displayed.
	"submissionViewDialogCardSubmissionViewMessageHeader": "Mesaj", // Submission view dialog card, message heading.
	"submissionViewDialogCardSubmissionViewGradeHeader": "Not", // Submission view dialog card, grade heading.
	"submissionViewDialogCardSubmissionViewQuestionsHeader": "Sorular", // Submission view dialog card, questions heading.
	"submissionViewDialogCardSubmissionViewAnswerHeader" : "Yanıtlar", // Submission view dialog card, answers heading.
	"submissionViewDialogCardSubmissionViewResponseHeader": "Öğrencinin Yanıtları", // Submission view dialog card, learners responses heading.
	"submissionViewDialogCardButtonOptionEditView": "Görünümü Düzenle", // Submission view dialog card, OK button text.
	"submissionViewDialogCardButtonOptionDeleteView": "Görünümü Sil", // Submission view dialog card, Cancel button text.
	"submissionViewsAccordionSummary" : "{count, plural, =1 {1 sonuç görüntülenir} other {{count} sonuç görüntülenir}}", // number of submission views summary shown in collapsed accordion
	"submissionViewsDialogEditorGradeCheckbox": "Değerlendirilen sorular için deneme notunu göster", // submission views dialog editor edit display attempt score checkbox
	"statistics": "İstatistikler", //Label
	"submissionViewsDialogEditorClassAverageCheckbox": "Sınıf ortalamasını görüntüle", // submission views dialog editor edit display class average checkbox
	"submissionViewsDialogEditorGradeDistributionCheckbox": "Not dağılımını göster", // submission views dialog editor edit display grade distribution checkbox
	"quizSubmissionViewsDialogCardUpdate": "Güncelle", // submission views dialog card Update button
	"quizSubmissionViewsDialogCardCancel": "İptal et", // submission views dialog card Cancel button
	"allQuestionsWithCorrectAnswers": "Not görünmez, tüm soruları doğru yanıtlarla birlikte göster", // summarize list of selected options in comma separated list
	"allQuestions": "Not görünmez, tüm soruları göster", // summarize list of selected options in comma separated list
	"gradeVisibleAllQuestionsWithCorrectAnswers": "Not görünür, tüm soruları doğru yanıtlarla göster", // summarize list of selected options in comma separated list
	"gradeVisibleAllQuestions": "Not görünür, tüm soruları göster", // summarize list of selected options in comma separated list
	"allQuestionsWithCorrectAnswersLearnersResponses": "Not görünmez, tüm soruları doğru yanıtlarla ve katılımcının yanıtlarıyla birlikte göster", // summarize list of selected options in comma separated list
	"allQuestionsLearnersResponses": "Not görünmez, tüm soruları ve katılımcının yanıtlarını göster", // summarize list of selected options in comma separated list
	"gradeVisibleAllQuestionsWithCorrectAnswersLearnersResponses": "Not görünür, tüm soruları doğru yanıtlarla ve katılımcının yanıtlarıyla birlikte göster", // summarize list of selected options in comma separated list
	"gradeVisibleAllQuestionsLearnersResponses": "Not görünür, tüm soruları ve katılımcının yanıtlarını göster", // summarize list of selected options in comma separated list
	"incorrectQuestionsWithCorrectAnswers": "Not görünmez, yalnızca doğru yanıtlarla birlikte yanlış soruları göster", // summarize list of selected options in comma separated list
	"incorrectQuestions": "Not görünmez, yalnızca yanlış soruları göster", // summarize list of selected options in comma separated list
	"gradeVisibleIncorrectQuestionsWithCorrectAnswers": "Not görünür, yanlış soruları yalnızca doğru yanıtlarla birlikte göster", // summarize list of selected options in comma separated list
	"gradeVisibleIncorrectQuestions": "Not görünür, yalnızca yanlış soruları göster", // summarize list of selected options in comma separated list
	"incorrectQuestionsWithCorrectAnswersLearnersResponses": "Not görünmez, yalnızca doğru cevaplar ve katılımcının yanıtları ile birlikte yanlış soruları göster", // summarize list of selected options in comma separated list
	"incorrectQuestionsLearnersResponses": "Not görünmez, yalnızca yanlış soruları ve katılımcının yanıtlarını göster", // summarize list of selected options in comma separated list
	"gradeVisibleIncorrectQuestionsWithCorrectAnswersLearnersResponses": "Not görünür, yalnızca yanlış soruları doğru yanıtlarla ve katılımcının yanıtlarıyla birlikte göster", // summarize list of selected options in comma separated list
	"gradeVisibleIncorrectQuestionsLearnersResponses": "Not görünür, yalnızca yanlış soruları ve katılımcının yanıtlarını göster", // summarize list of selected options in comma separated list
	"correctQuestionsWithCorrectAnswers": "Not görünmez, doğru soruları yalnızca doğru yanıtlarla göster", // summarize list of selected options in comma separated list
	"correctQuestions": "Not görünmez, yalnızca doğru soruları göster", // summarize list of selected options in comma separated list
	"gradeVisibleCorrectQuestionsWithCorrectAnswers": "Not görünür, doğru soruları yalnızca doğru yanıtlarla göster", // summarize list of selected options in comma separated list
	"gradeVisibleCorrectQuestions": "Not görünür, yalnızca doğru soruları göster", // summarize list of selected options in comma separated list
	"correctQuestionsWithCorrectAnswersLearnersResponses": "Not görünmez, doğru soruları yalnızca doğru yanıtlarla ve katılımcının yanıtlarıyla birlikte gösterin", // summarize list of selected options in comma separated list
	"correctQuestionsLearnersResponses": "Not görünmez, yalnızca doğru soruları ve katılımcının yanıtlarını göster", // summarize list of selected options in comma separated list
	"gradeVisibleCorrectQuestionsWithCorrectAnswersLearnersResponses": "Not görünür, doğru soruları yalnızca doğru cevaplarla ve katılımcının yanıtlarıyla birlikte göster", // summarize list of selected options in comma separated list
	"gradeVisibleCorrectQuestionsLearnersResponses": "Not görünür, yalnızca doğru soruları ve katılımcının yanıtlarını göster", // summarize list of selected options in comma separated list
	"noQuestions": "Not görünmez, soruları gösterme", // summarize list of selected options in comma separated list
	"gradeVisibleNoQuestions": "Not görünür, soruları gösterme", // summarize list of selected options in comma separated list
	"deleteViewWithTitle": "Görünümü sil: {message}", // aria-label for delete view button with view message/title
	"submissionViewReleaseDateSummary": "At { releaseDate }{ attemptRestrictionNumber, plural, =0 {} one {, on the 1st attempt} =2 {, on the 2nd attempt} =3 {, on the 3rd attempt} other {, on the {attemptRestrictionNumber}th attempt} }{minGrade, plural, =0 {} other {, with attempt grades above {minGrade}%}}{maxGrade, plural, =0 {} other {, with attempt grades below {maxGrade}%}}{ ipRestrictions, select, true {, when accessed from within the set IP range} false {} }{ timeLimitNumber, plural, =0 {} one {, until 1 minute has passed after submission} other {, until {timeLimitNumber} minutes have passed after submission}}", // summary of when a view is released with restriction info
	"submissionViewReleaseDateSummaryBothMinMaxGrades": "At { releaseDate }{ attemptRestrictionNumber, plural, =0 {} one {, on the 1st attempt} =2 {, on the 2nd attempt} =3 {, on the 3rd attempt} other {, on the {attemptRestrictionNumber}th attempt} } with attempt grades above {minGrade}% and below {maxGrade}%{ ipRestrictions, select, true {, when accessed from within the set IP range} false {} }{ timeLimitNumber, plural, =0 {} one {, until 1 minute has passed after submission} other {, until {timeLimitNumber} minutes have passed after submission}}", // summary of when a view is released with restriction info with both min and max grades
	"showOutcomesForTheDisplayedQuestionsCheckbox": "Show {outcomesTerm} for the displayed questions" // text for a checkbox which when checked, will show standards/outcomes for the displayed questions
};
