/* eslint quotes: 0 */

export default {
	"name": "Nom", // Label for the name field when creating/editing an activity
	"quizSaveError": "Votre questionnaire n’était pas enregistré. Veuillez corriger les champs indiqués.", // Error message to inform the user that there was a problem saving the quiz, instructing them to correct invalid fields
	"hdrAvailability": "Dates et conditions de disponibilité", // availability header
	"hdrTimingAndDisplay": "Délai et affichage", // timing/display accordion header
	"subHdrTimingTools": "Durée", // Title for timing tools
	"manageTiming": "Gérer le délai", // Label for button to launch timing dialog
	"hdrAttemptsAndCompletion": "Tentatives et achèvement", //attempts/completion accordion header
	"subHdrPagingTools": "Pagination", // Title for paging tools
	"subHdrShuffleQuiz": "Modifier l’ordre du questionnaire",// Title for shuffle quiz tool(s)
	"subHdrDisplayTools": "Affichage", // Title for display tools
	"shuffleDescription": "Modifier l’ordre des questions et des sections dans le questionnaire. Ne s’applique pas aux sous-sections.", // description for question shuffling behavior
	"shuffleSummary": "Modifier l’ordre des questions", // summary text for shuffle quiz questions
	"hintsToolDescription": "Offrir la possibilité d’indice", // decription for hints tool
	"hintsAllowedSummary": "Possibilité d’indices", // summary text when hints are enabled,
	"passwordLabel": "Mot de passe", // Label for the quiz password text input field
	"passwordSummary": "Mot de passe protégé", // summary text when quiz has a password
	"disableRightClickDescription": "Désactiver le bouton de droite de la souris", // description for disable right click
	"disableRightClickSummary": "Le bouton de droite de la souris est désactivé", // summary text when right clicks are disabled
	"preventMovingBackwardsDescription": "Empêcher le retour aux pages précédentes",
	"disablePagerAndAlertsDescription": "Désactiver Courriel, Messages instantanés et Alertes dans Brightspace", // description for blocking communications / disable pager and alerts during a quiz
	"disablePagerAndAlertsSummary": "Alertes et communications bloquées", // summary text when communications / pager and alerts are disabled
	"emailNotificationSummary": "Tentative de notification par courriel", // summary for email notification
	"preventMovingBackwardsSummary": "Limites de pagination", // summary for prevent moving backwards checkbox
	"dividerHeader": "Questions", // The header that is displayed on the divider
	"previewLabel": "Prévisualiser", // The label text for the preview button
	"hdrReleaseConditions": "Condition de diffusion", // release conditions heading
	"hlpReleaseConditions": "Les utilisateurs ne peuvent pas accéder au questionnaire ou le visualiser s’ils ne remplissent pas les conditions de validation.", // release conditions help
	"hdrEvaluationAndFeedback": "Évaluation et rétroaction", // evaluation/feedback accordion header
	"subHdrAutomaticGrades": "Noter automatiquement", // Title for automatic grade tool
	"autoSetGradedDescription": "Publier automatiquement les résultats des tentatives une fois terminées", // description for automatic grade checkbox
	"autoSetGradedSummary": "Publier automatiquement les résultats", // summary for auto set graded checkbox
	"passwordDescription": "Seuls les utilisateurs qui tapent ce mot de passe se verront accorder le droit d’exécuter ce questionnaire.", // description for password input
	"hlpSubmissionNotificationEmail": "Saisissez une adresse courriel ou plusieurs adresses courriel séparées par une virgule pour recevoir des notifications lors de toute tentative de réalisation de questionnaire.", // description for email notification input
	"autoSetGradedAccessibleHelpText": "Obtenir de l’aide sur les notes automatiques", // accessible help text for autoSetGraded question mark button
	"autoSetGradedHelpDialogTitle": "Information : publier automatiquement les résultats des tentatives une fois terminées", // title that appears when the autoSetGraded help dialog is rendered
	"autoSetGradedHelpDialogConfirmationText": "OK", // copy that appears on the autoSetGraded help dialog confirmation button
	"autoSetGradedHelpDialogParagraph1": "Lorsque cette fonction est activée, les résultats des tentatives évaluées automatiquement sont publiés et s’affichent à l’intention des élèves.", // content for paragraph 1 of autoSetGraded help dialog
	"autoSetGradedHelpDialogParagraph2": "Remarque : si les questions ne peuvent pas être évaluées par le système (p. ex., questions avec réponse à développement), elles se verront automatiquement attribuer la note de zéro jusqu’à leur correction manuelle.", // content for paragraph 2 of autoSetGraded help dialog
	"autoSetGradedHelpDialogParagraph3": "", // content for paragraph 3 of autoSetGraded help dialog
	"disableAlertsHelpDialogTitle": "Information : Désactiver Courriel, Messages instantanés et Alertes dans Brightspace", // title that appears when the disable alerts help dialog is rendered
	"disableAlertsHelpDialogContent": "Activer cette option fait en sorte que les élèves ne peuvent pas accéder aux courriels de Brightspace, à la messagerie instantanée ni aux alertes qui s’affichent lorsqu’une tentative de réponse à un questionnaire est en cours.", // content that appears when the disable alerts help dialog is rendered
	"disableAlertsHelpDialogConfirmationText": "OK", // copy that appears on the disable alerts help dialog confirmation button
	"disableAlertsAccessibleHelpText": "Obtenir de l’aide sur les fonctions Désactiver Courriel, Messages instantanés et Alertes dans Brightspace", // accessible help text for disable alerts question mark button
	"disableRightClickAccessibleHelpText": "Obtenir de l’aide sur la désactivation du bouton de droite de la souris", // accessible help text for disable right click question mark button
	"disableRightClickHelpDialogTitle": "Information : désactiver le bouton de droite de la souris", // title that appears when the disable right click help dialog is rendered
	"disableRightClickHelpDialogParagraph1": "Cette fonction empêche les élèves d’imprimer les questions du questionnaire en cliquant avec le bouton droit de la souris sur une question pendant qu’une tentative est en cours. Veuillez cependant prendre note que les élèves pourront tout de même effectuer une capture d’écran du questionnaire au moyen d’autres technologies externes au navigateur.", // content for paragraph 1 of disable right click help dialog
	"disableRightClickHelpDialogParagraph2": "Certaines procédures d’accessibilité seront bloquées, car l’élève ne peut copier et coller le texte de la question. On peut accorder à chaque utilisateur la possibilité de cliquer avec le bouton droit de la souris sur un questionnaire, même lorsque cette fonction est activée pour un questionnaire, en activant la fonction « Toujours autoriser le clic droit » dans les accommodations de cet utilisateur.", // content for paragraph 2 of disable right click help dialog
	"disableRightClickHelpDialogConfirmationText": "OK", // copy that appears on the disable right click help dialog confirmation button
	"manageTimingDialogConfirmationText": "OK", // copy that appears on the Timing dialog confirmation button
	"manageTimingDialogCancelText": "Annuler", // copy that appears on the Timing dialog cancel button
	"description": "Description", // Description label for the Description text input box,
	"btnOpenIpRestrictionDialog": "Gérer les restrictions à l’adresse IP", // Button text for opening IP restriction dialog
	"hdrIpRestrictionDialog": "Restrictions à l’adresse IP (IPv4)", // timing/display accordion header
	"ipRestrictionLabel": "Restrictions à l’adresse IP", // Label for IP restrictions editor
	"minutesLabel": "minute(s)",  // label for Timing dialog time limit input slot
	"minutesBeforeFlaggedLabel": "minute(s) avant que le questionnaire ne soit marqué du drapeau-indicateur comme étant en retard", // label for Timing dialog grace period input slot
	"extendedDeadlineLabel": "Échéance prolongée",  // label for timing dialog - extended deadline select
	"extendedDeadlineInputLabel": "minute(s) une fois le délai de grâce passé",  //label for Timing dialog extended deadline select slot
	"subHdrExceededTimeLimitBehaviour": "Comportement en cas de délai dépassé", // Title for submission late type options,
	"exceededTimeLimitBehaviourPrefix": "Après le délai de grâce, marquer la tentative comme ayant dépassé le temps imparti, et", // label for submission label type options
	"showClockLabel": "À afficher avant le début du questionnaire", // Label for show clock checkbox
	"showClockTitle": "Afficher l’horloge", // Title for show clock
	"manageAttemptsDialogConfirmationText": "OK", // copy that appears on the Attempts dialog confirmation button
	"manageAttemptsDialogCancelText": "Annuler", // copy that appears on the Attempts dialog cancel button
	"subHdrAttemptsTools": "Tentatives", // Title for attempts tools
	"manageAttempts": "Gérer les tentatives", // Label for button to launch attempts dialog
	"textIsDisplayedPart1": "Les champs ne peuvent pas être déactivés dans la nouvelle expérience de création de questionnaires.", // First sentence of alert warning that text fields will be visible
	"textIsDisplayedSingularPart2": "Les élèves peuvent voir le champ {field} une fois leur questionnaire enregistré.", // Second sentence of alert warning that text fields will be visible, when there is only one field
	"introMovedToDescription": "Les questionnaires ne prennent plus en charge les présentations. Le contenu existant dans le champ Présentation figure maintenant dans le champ Description.", // Alert warning that existing quiz introduction has been removed and that the text in the introduction has been put into the quiz description
	"attemptsAllowed": "Tentatives autorisées", // Title for Attempts Allowed select in Attempts dialog
	"quizAttemptsAllowedSummary": "{numAttemptsAllowed, plural, =1 {1 tentative autorisée} other {{numAttemptsAllowed} tentatives autorisées}}", //
	"overallGradeCalculation": "Calcul de la note d’appréciation générale", // Title for Overall Grade Calculation select in Attempts dialog
	"retakeIncorrectQuestionsOnly": "Reprendre uniquement les questions dont les réponses sont incorrectes", // Title for RIO checkbox in Attempts dialog
	"rioCheckboxLabel": "Pour les nouvelles tentatives, n’autoriser que des réponses aux questions qui avaient été jugées incorrectes.", // Label for RIO checkbox in Attempts dialog
	"btnAttemptConditions": "Conditions régissant la tentative", // Label for Attempt Conditions button in Attempts dialog
	"rioAccessibileHelpText": "Obtenir de l’aide sur la fonction permettant de reprendre uniquement les questions avec des réponses incorrectes", // accessible help text for RIO question mark button
	"rioDialogTitle": "Information : Reprendre uniquement les questions dont les réponses sont incorrectes", // Title for RIO help dialog
	"rioDialogParagraph": "Lorsque ce réglage est sélectionné, les élèves qui tentent de répondre à un questionnaire plus d’une fois ne peuvent reprendre que les questions incorrectes de la tentative précédente.", // content for RIO dialog
	"rioDialogParagraph2": "Si vous utilisez la publication automatique, les questions des réponses à développement recevront la note « 0 » et seront incluses dans les tentatives futures jusqu’à ce qu’elles soient notées manuellement.", // second paragraph for RIO dialog
	"rioDialogConfirmationText": "OK", // copy that appears on the RIO help dialog confirmation button
	"ipRestrictionDialogDescription": "Seuls les élèves provenant d’adresses IP qui respectent les restrictions définies peuvent répondre au questionnaire.", // guidelines for IP restrictions dialog
	"btnIpRestrictionsDialogAdd": "Ajouter", // text for IP restrictions dialog "Add" button
	"btnIpRestrictionsDialogBtnCancel": "Annuler", // text for IP restrictions dialog "Cancel" button
	"ipRestrictionsDialogAddNewRange": "Plage d’adresses IP", // text for IP restrictions dialog "Add new IP range" button
	"ipRestrictionsTableStartRangeHdr": "Début de la plage d’adresses IP", // text for IP restrictions table header start
	"ipRestrictionsTableEndRangeHdr": "Fin de la plage d’adresses IP", // text for IP restrictions table header end
	"ipRestrictionsTableDeleteRangeHdr": "Supprimer", // text for IP restrictions table header delete
	"ipRestrictionsTableDeleteRangeLabel": "Supprimer", // label for IP restrictions delete button
	"ipRestrictionsTableStartRangeLabel": "Début de la plage d’adresses IP {index}", // label for IP restrictions start range input
	"ipRestrictionsTableEndRangeLabel": "Fin de la plage d’adresses IP {index}", // label for IP restrictions end range input
	"ipRestrictionsValidationError": "Format d’adresse IP non valide. Veuillez corriger les champs indiqués. Exemple d’adresse IP : 155.55.5.15.", // error message for invalid IP addresses
	"ipRestrictions500Error": "Un problème est survenu. Veuillez essayer à nouveau.", // error message for IP restrictions 500 response
	"ipRestrictionsHelpTxtConfirmation": "OK", // confirmation text on IP restrictions help dialog
	"hdrIpRestrictionsHelpDialog": "Information : Restrictions à l’adresse IP (IPv4)", // timing/display accordion header
	"hdrIpRestrictionsHelpDialogP1": "Pour préciser une plage d’adresses IP acceptées, saisissez quatre séries de valeurs comprises entre 0 et 255, séparées par un point, dans les champs Début de la plage d’adresses IP et Fin de la plage d’adresses IP et IP Range End, respectivement.", // IP restrictions help dialog paragraph 1
	"hdrIpRestrictionsHelpDialogP2": "Exemple d’adresse IP : 155.55.5.15", // IP restrictions help dialog paragraph 2
	"hdrIpRestrictionsHelpDialogP3": "Pour inclure une adresse IP individuelle acceptée, n’entrez une valeur que dans le champ Début de la plage d’adresses IP", // IP restrictions help dialog paragraph 3
	"hdrIpRestrictionsHelpDialogP4": "Remarque : la valeur entrée dans le champ Début de la plage d’adresses IP doit être inférieure à la valeur entrée dans le champ Fin de la plage d’adresses IP.", // IP restrictions help dialog paragraph 4
	"hdrSpecialAccess": "Accès spécial", // special access heading,
	"hlpSpecialAccess": "L’accès spécial permet aux questionnaires de n’être accessibles qu’à un groupe d’utilisateurs en particulier ou permet de définir des dates d’échéance individualisées pour certains utilisateurs.", // special access help
	"specialAccessRestrictedText": "Seuls les utilisateurs ayant l’accès spécial ont la possibilité de visualiser ce questionnaire", // restricted special access description
	"ipRestrictionsAccessibileHelpText": "Obtenir de l’aide sur les restrictions à l’adresse IP", // accessible help text for IP restrictions question mark button
	"attemptConditions": "Conditions régissant la tentative", // Header for Attempts Conditions section in Attempts dialog
	"attemptConditionsParagraph1": "Pour qu’un élève soit admissible à une autre tentative, définissez un pourcentage minimum ou maximum entre 0 et 100 que l’élève doit avoir obtenu lors de la tentative précédente.", // content for paragraph1 on the Attempts dialog Attempts Condition section
	"attemptConditionsParagraph2": "Si un champ minimum ou maximum est laissé vide, aucune limite ne sera appliquée à cette partie de la plage de tentative.", // content for paragragh2 on the Attempts dialog Attempts Condition section
	"attemptConditionsRangePrefixText1": "À la tentative {index} :", // prefix text 1 for Attempt Conditions range editor on Attempts dialog
	"attemptConditionsRangePrefixText2": "les élèves doivent obtenir entre", // prefix text 2 for Attempt Conditions range editor on Attempts dialog
	"attemptConditionsRangeSuffixText1": "pour remplir les conditions", //suffix text 1 for Attempts Conditions range editor on Attempts dialog
	"attemptConditionsRangeSuffixText2": "Tentative {suivant}", // suffix text 2 for Attempts Condition range editor on Attempts dialog
	"minLabel": "Minimum :", // label for Min input on Attempts Conditions range editor on Attempts Dialog
	"maxLabel": "Maximum :", // label for Max input on Attempts Conditions range editor on Attempts Dialog
	"andRangeText": "et", // copy on Attempts Condition range editor on Attempts Dialog
	"percentageRangeText": "%", // copy on Attempts Condition range editor on Attempts Dialog
	"ipRestrictionsSummary": "Restrictions à l’adresse IP", // summary to be displayed when a quiz has ip restrictions
	"ipRestrictionsInnerSummary" : "{count, plural, =1 {1 restriction} other {{count} restrictions}}", // summary to be displayed when accordion is expanded
	"quizTimingValidationError": "Le délai ne peut pas être modifié. Veuillez corriger les champs indiqués.", // Appears in error alert when validation fails in Manage Timing dialog
	"quizTimingServerError": "Un problème est survenu. Veuillez essayer à nouveau.", // Timing save server error alert message
	"quizTimingRecommendedSummary": "Délai recommandé ({numMinutes, plural, =1 {1 minute} other {{numMinutes} minutes}})", // Recommended time limit (x minute) or (x minutes).
	"quizTimingEnforcedSummary": "Délai imposé ({numMinutes, plural, =1 {1 minute} other {{numMinutes} minutes}})", // Enforced time limit(x minute) or (x minutes).
	"ipRestrictionsDuplicateError": "Adresse de début de la plage d’adresses IP en double. Chaque valeur de début de la plage d’adresses IP doit être unique.", // Error for duplicate IP
	"ipRestrictionsRangeError": "Plage d’adresses IP non valide. Veuillez vous assurer que les plages sont formatées correctement.", // Error for invalid IP ranges
	"quizAttemptsValidationError": "Les tentatives ne peuvent pas être modifiées. Veuillez corriger les champs indiqués.", // Appears in error alert when validation fails in Manage Attempts dialog
	"totalPoints": "Nombre total de points {scoreOutOf}", // Total points text that appears on quiz editor above list of questions
	"subHdrHeaderFooter": "En-tête et bas de page", // Header and Footer accordion header
	"manageHeaderFooterButton": "Gérer l’en-tête et le pied de page", // Label for button to launch Header and Footer dialog
	"headerFooterDialogTitle": "En-tête et bas de page",
	"manageHeaderFooterDialogAddText": "Ajouter", // Label for Add button for header and footer dialog
	"manageHeaderFooterDialogCancelText": "Annuler", // Label for Cancel button header and footer dialog
	"headerLabel": "En-tête", // Label for the header text box
	"headerDialogText": "Les élèves pourront voir l’en-tête et le pied de page du questionnaire dans le haut et le bas du questionnaire, respectivement.", // Header and Footer dialog text
	"header": "En-tête", // Header label for the header text box.
	"headerAdded": "En-tête ajouté", // Header added summary text for Timing and Display accordion.
	"footerAdded": "Pied de page ajouté", // Footer added summary text for Timing and Display accordion.
	"headerAndFooterAdded": "En-tête et pied de page ajoutés", // Header and footer added text for Timing and Display accordion.
	"footer": "Pied de page", // Footer lable for the footer text box.
	"footerLabel": "Pied de page", // Label for the footer text box.
	"headerAndFooter": "En-tête et pied de page ajoutés", // Header and footer summary text for closed accordion
	"createNewLabel": "Créer", // Label for button to open menu for adding new items to the quiz.
	"addExistingLabel": "Ajouter existant", // Label for button to open menu for adding pre-existing items to the quiz.
	"addQuestionsLabel": "Nouvelle question", // Label for button to open menu for adding new questions to the quiz.
	"submissionViewHeading1": "Une fois les résultats publiés, afficher aux élèves :", // Label for checkbox in submission view container.
	"submissionViewHeading2": "et", // Label for submission view dropdown in submission view container.
	"submissionViewCheckboxLabel": "Note de la tentative", // Text next to the submission view checkbox in the container.
	"submissionViewButtonText": "La fonction personnalisation des résultats du questionnaire s’affiche", // Text for the button at the bottom of the submission view container.
	"gradeOutOf": "Note d’appréciation sur", // Label for the grade-out-of field when creating/editing an activity
	"submissionViewsHelpDialogTitle": "Renseignements : affichage des résultats du questionnaire", // Title for help dialog on submission view customization screen.
	"submissionViewsHelpDialogParagraph1": "L’affichage des résultats du questionnaire détermine la façon dont les élèves peuvent voir les résultats publiés de leur tentative de questionnaire, soit immédiatement après la soumission, ou plus tard lorsqu’ils révisent leur tentative.", // Paragraph 1 for help dialog on submission view customization screen.
	"submissionViewsHelpDialogParagraph2": "La vue principale est affichée par défaut, et les vues supplémentaires remplacent la vue principale en fonction des paramètres établis.", // Paragraph 2 for help dialog on submission view customization screen.
	"submissionViewsHelpDialogConfirmation": "OK", //Text for closing the information Dialog for customization in submission views.
	"submissionViewsDialogConfirmationMain": "OK", //Text for closing the main Dialog for customization in submission views.
	"submissionViewsDialogCancelMain": "Annuler", // Text for cancelling changes on the main Dialog for customization in submission views.
	"submissionViewsAccordionDropdownNoQuestions": "Aucune question", // Option in dropdown to decide what to display to learner.
	"submissionViewsAccordionDropdownIncorrectQuestionsWithCorrectAnswers": "Seulement les mauvaises questions, avec les bonnes réponses", // Option in dropdown to decide what to display to learner.
	"submissionViewsAccordionDropdownIncorrectQuestionsWithoutCorrectAnswers": "Seulement les mauvaises questions, sans les bonnes réponses", // Option in dropdown to decide what to display to learner.
	"submissionViewsAccordionDropdownAllQuestionsWithCorrectAnswers": "Toutes les questions, avec les bonnes réponses", // Option in dropdown to decide what to display to learner.
	"submissionViewsAccordionDropdownAllQuestionsWithoutCorrectAnswers": "Toutes les questions, sans les bonnes réponses", // Option in dropdown to decide what to display to learner.
	"primaryView": "Vue principale", // Label
	"additionalViewComesIntoEffect": "Additional view comes into effect:", // Label
	"submissionViewDialogCardAttemptScoreTrueText": "Note de la tentative affichée pour les questions évaluées", // Submission view dialog card, text appearing when attempted grades are displayed.
	"submissionViewDialogCardAttemptScoreFalseText": "Non affiché(e)", // Submission view dialog card, text appearing when attempted grades are not displayed.
	"submissionViewDialogCardQuestionsNotDisplayed": "Non affiché(e)", // Submission view dialog card, text appearing when no questions are displayed.
	"submissionViewDialogCardQuestionsAllDisplayed": "Toutes les questions sont affichées", // Submission view dialog card, text appearing when all questions are displayed.
	"submissionViewDialogCardQuestionsIncorrectOnlyDisplayed": "Seulement les mauvaises questions sont affichées", // Submission view dialog card, text appearing when incorrect questions only are displayed.
	"submissionViewDialogCardQuestionsCorrectOnlyDisplayed": "Seulement les bonnes questions sont affichées", // Submission view dialog card, text appearing when correct questions only are displayed.
	"submissionViewDialogCardShowAnswersTrueText": "Toutes les réponses sont affichées", // Submission view dialog card, text appearing when all answers are displayed.
	"submissionViewDialogCardShowAnswersFalseText": "Non affiché(e)", // Submission view dialog card, text appearing when not all answers are displayed.
	"submissionViewDialogCardShowResponsesTrueText": "Affiché(e)", // Submission view dialog card, text appearing when learners responses are displayed.
	"submissionViewDialogCardShowResponsesFalseText": "Non affiché(e)", // Submission view dialog card, text appearing when learners responses are not displayed.
	"submissionViewDialogCardSubmissionViewMessageHeader": "Message", // Submission view dialog card, message heading.
	"submissionViewDialogCardSubmissionViewGradeHeader": "Note", // Submission view dialog card, grade heading.
	"submissionViewDialogCardSubmissionViewQuestionsHeader": "Questions", // Submission view dialog card, questions heading.
	"submissionViewDialogCardSubmissionViewAnswerHeader" : "Réponses", // Submission view dialog card, answers heading.
	"submissionViewDialogCardSubmissionViewResponseHeader": "Réponses de l’élève", // Submission view dialog card, learners responses heading.
	"submissionViewDialogCardButtonOptionEditView": "Modifier la vue", // Submission view dialog card, OK button text.
	"submissionViewDialogCardButtonOptionDeleteView": "Supprimer la vue", // Submission view dialog card, Cancel button text.
	"submissionViewsAccordionSummary" : "{count, plural, =1 {1 affichage des résultats} other {{count} affichages des résultats}}", // number of submission views summary shown in collapsed accordion
	"submissionViewsDialogEditorGradeCheckbox": "Afficher la note de la tentative pour les questions évaluées", // submission views dialog editor edit display attempt score checkbox
	"statistics": "Statistiques", //Label
	"submissionViewsDialogEditorClassAverageCheckbox": "Afficher la moyenne de la classe", // submission views dialog editor edit display class average checkbox
	"submissionViewsDialogEditorGradeDistributionCheckbox": "Afficher la répartition des notes", // submission views dialog editor edit display grade distribution checkbox
	"quizSubmissionViewsDialogCardUpdate": "Mettre à jour", // submission views dialog card Update button
	"quizSubmissionViewsDialogCardCancel": "Annuler", // submission views dialog card Cancel button
	"allQuestionsWithCorrectAnswers": "Note invisible, affiche toutes les questions avec les bonnes réponses", // summarize list of selected options in comma separated list
	"allQuestions": "Note invisible, affiche toutes les questions", // summarize list of selected options in comma separated list
	"gradeVisibleAllQuestionsWithCorrectAnswers": "Note visible, affiche toutes les questions avec les bonnes réponses", // summarize list of selected options in comma separated list
	"gradeVisibleAllQuestions": "Note visible, affiche toutes les questions", // summarize list of selected options in comma separated list
	"allQuestionsWithCorrectAnswersLearnersResponses": "Note invisible, affiche toutes les questions avec les bonnes réponses, et les réponses de l’élève", // summarize list of selected options in comma separated list
	"allQuestionsLearnersResponses": "Note invisible, affiche toutes les questions et les réponses de l’élève", // summarize list of selected options in comma separated list
	"gradeVisibleAllQuestionsWithCorrectAnswersLearnersResponses": "Note visible, affiche toutes les questions avec les bonnes réponses, et les réponses de l’élève", // summarize list of selected options in comma separated list
	"gradeVisibleAllQuestionsLearnersResponses": "Note visible, affiche toutes les questions et les réponses de l’élève", // summarize list of selected options in comma separated list
	"incorrectQuestionsWithCorrectAnswers": "Note invisible, affiche les mauvaises questions seulement avec les bonnes réponses", // summarize list of selected options in comma separated list
	"incorrectQuestions": "Note invisible, affiche les mauvaises questions seulement", // summarize list of selected options in comma separated list
	"gradeVisibleIncorrectQuestionsWithCorrectAnswers": "Note visible, affiche les mauvaises questions seulement avec les bonnes réponses", // summarize list of selected options in comma separated list
	"gradeVisibleIncorrectQuestions": "Note visible, affiche les mauvaises questions seulement", // summarize list of selected options in comma separated list
	"incorrectQuestionsWithCorrectAnswersLearnersResponses": "Note invisible, affiche les mauvaises questions seulement avec les bonnes réponses, et les réponses de l’élève", // summarize list of selected options in comma separated list
	"incorrectQuestionsLearnersResponses": "Note invisible, affiche les mauvaises questions seulement, et les réponses de l’élève", // summarize list of selected options in comma separated list
	"gradeVisibleIncorrectQuestionsWithCorrectAnswersLearnersResponses": "Note visible, affiche les mauvaises questions seulement avec les bonnes réponses, et les réponses de l’élève", // summarize list of selected options in comma separated list
	"gradeVisibleIncorrectQuestionsLearnersResponses": "Note visible, affiche les mauvaises questions seulement, et les réponses de l’élève", // summarize list of selected options in comma separated list
	"correctQuestionsWithCorrectAnswers": "Note invisible, affiche les bonnes questions seulement avec les bonnes réponses", // summarize list of selected options in comma separated list
	"correctQuestions": "Note invisible, affiche les bonnes questions seulement", // summarize list of selected options in comma separated list
	"gradeVisibleCorrectQuestionsWithCorrectAnswers": "Note visible, affiche les bonnes questions seulement avec les bonnes réponses", // summarize list of selected options in comma separated list
	"gradeVisibleCorrectQuestions": "Note visible, affiche les bonnes questions seulement", // summarize list of selected options in comma separated list
	"correctQuestionsWithCorrectAnswersLearnersResponses": "Note invisible, affiche les bonnes questions seulement avec les bonnes réponses, et les réponses de l’élève", // summarize list of selected options in comma separated list
	"correctQuestionsLearnersResponses": "Note invisible, affiche les bonnes questions seulement, et les réponses de l’élève", // summarize list of selected options in comma separated list
	"gradeVisibleCorrectQuestionsWithCorrectAnswersLearnersResponses": "Note visible, affiche les bonnes questions seulement avec les bonnes réponses, et les réponses de l’élève", // summarize list of selected options in comma separated list
	"gradeVisibleCorrectQuestionsLearnersResponses": "Note visible, affiche les bonnes questions seulement, et les réponses de l’élève", // summarize list of selected options in comma separated list
	"noQuestions": "Note invisible, n’affiche pas les questions", // summarize list of selected options in comma separated list
	"gradeVisibleNoQuestions": "Note visible, n’affiche pas les questions", // summarize list of selected options in comma separated list
	"deleteViewWithTitle": "Supprimer la vue : {message}", // aria-label for delete view button with view message/title
	"submissionViewReleaseDateSummary": "At { releaseDate }{ attemptRestrictionNumber, plural, =0 {} one {, on the 1st attempt} =2 {, on the 2nd attempt} =3 {, on the 3rd attempt} other {, on the {attemptRestrictionNumber}th attempt} }{minGrade, plural, =0 {} other {, with attempt grades above {minGrade}%}}{maxGrade, plural, =0 {} other {, with attempt grades below {maxGrade}%}}{ ipRestrictions, select, true {, when accessed from within the set IP range} false {} }{ timeLimitNumber, plural, =0 {} one {, until 1 minute has passed after submission} other {, until {timeLimitNumber} minutes have passed after submission}}", // summary of when a view is released with restriction info
	"submissionViewReleaseDateSummaryBothMinMaxGrades": "At { releaseDate }{ attemptRestrictionNumber, plural, =0 {} one {, on the 1st attempt} =2 {, on the 2nd attempt} =3 {, on the 3rd attempt} other {, on the {attemptRestrictionNumber}th attempt} } with attempt grades above {minGrade}% and below {maxGrade}%{ ipRestrictions, select, true {, when accessed from within the set IP range} false {} }{ timeLimitNumber, plural, =0 {} one {, until 1 minute has passed after submission} other {, until {timeLimitNumber} minutes have passed after submission}}" // summary of when a view is released with restriction info with both min and max grades
};
