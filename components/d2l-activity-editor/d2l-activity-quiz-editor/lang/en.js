/* eslint quotes: 0 */

export default {
	"name": "Name", // Label for the name field when creating/editing an activity
	"quizSaveError": "Your quiz wasn't saved. Please correct the outlined fields.", // Error message to inform the user that there was a problem saving the quiz, instructing them to correct invalid fields
	"hdrAvailability": "Availability Dates & Conditions", // availability header
	"hdrTimingAndDisplay": "Timing & Display", // timing/display accordion header
	"subHdrTimingTools": "Timing", // Title for timing tools
	"manageTiming": "Manage Timing", // Label for button to launch timing dialog
	"hdrAttemptsAndCompletion": "Attempts & Completion", //attempts/completion accordion header
	"subHdrPagingTools": "Paging", // Title for paging tools
	"subHdrShuffleQuiz": "Shuffle Quiz",// Title for shuffle quiz tool(s)
	"subHdrDisplayTools": "Display", // Title for display tools
	"shuffleDescription": "Shuffle questions and sections within the quiz. Does not cascade to sub-sections.", // description for question shuffling behavior
	"shuffleSummary": "Shuffle questions", // summary text for shuffle quiz questions
	"hintsToolDescription": "Allow hints", // decription for hints tool
	"hintsAllowedSummary": "Hints allowed", // summary text when hints are enabled,
	"passwordLabel": "Password", // Label for the quiz password text input field
	"passwordSummary": "Password protected", // summary text when quiz has a password
	"disableRightClickDescription": "Disable right click", // description for disable right click
	"disableRightClickSummary": "Right clicks disabled", // summary text when right clicks are disabled
	"preventMovingBackwardsDescription": "Prevent going back to previous pages",
	"disablePagerAndAlertsDescription": "Disable Email, Instant Messages and Alerts within Brightspace", // description for blocking communications / disable pager and alerts during a quiz
	"disablePagerAndAlertsSummary": "Alerts and communication blocked", // summary text when communications / pager and alerts are disabled
	"emailNotificationSummary": "Attempt notification by email", // summary for email notification
	"preventMovingBackwardsSummary": "Paging limitations", // summary for prevent moving backwards checkbox
	"dividerHeader": "Questions", // The header that is displayed on the divider
	"previewLabel": "Preview", // The label text for the preview button
	"hdrReleaseConditions": "Release Conditions", // release conditions heading
	"hlpReleaseConditions": "Users are not able to access or view the quiz unless they meet the release conditions.", // release conditions help
	"hdrEvaluationAndFeedback": "Evaluation & Feedback", // evaluation/feedback accordion header
	"subHdrAutomaticGrades": "Automatic Grade", // Title for automatic grade tool
	"autoSetGradedDescription": "Auto-publish attempt results immediately upon completion", // description for automatic grade checkbox
	"autoSetGradedSummary": "Auto-publish results", // summary for auto set graded checkbox
	"passwordDescription": "Only users who enter this password will be granted access to write this quiz.", // description for password input
	"hlpSubmissionNotificationEmail": "Enter an email or multiple emails separated by a comma, to receive notifications when a quiz is attempted.", // description for email notification input
	"autoSetGradedAccessibleHelpText": "Get help on - Automatic Grade", // accessible help text for autoSetGraded question mark button
	"autoSetGradedHelpDialogTitle": "Information: Auto-publish attempt results immediately upon completion", // title that appears when the autoSetGraded help dialog is rendered
	"autoSetGradedHelpDialogConfirmationText": "OK", // copy that appears on the autoSetGraded help dialog confirmation button
	"autoSetGradedHelpDialogParagraph1": "With this feature turned on, the auto-evaluated attempt results will be published and appear to learners.", // content for paragraph 1 of autoSetGraded help dialog
	"autoSetGradedHelpDialogParagraph2": "Note: If questions cannot be evaluated by the system (e.g. written response questions), those questions will be automatically scored with a zero until manual evaluation.", // content for paragraph 2 of autoSetGraded help dialog
	"autoSetGradedHelpDialogParagraph3": "", // content for paragraph 3 of autoSetGraded help dialog
	"disableAlertsHelpDialogTitle": "Information: Disable Email, Instant Messages and Alerts within Brightspace", // title that appears when the disable alerts help dialog is rendered
	"disableAlertsHelpDialogContent": "If you turn on this option, learners cannot access the Brightspace Email, Instant Messages, or their alerts if they have a quiz attempt in progress.", // content that appears when the disable alerts help dialog is rendered
	"disableAlertsHelpDialogConfirmationText": "OK", // copy that appears on the disable alerts help dialog confirmation button
	"disableAlertsAccessibleHelpText": "Get help on - Disable Email, Instant Messages and Alerts within Brightspace", // accessible help text for disable alerts question mark button
	"disableRightClickAccessibleHelpText": "Get help on - Disable Right Click", // accessible help text for disable right click question mark button
	"disableRightClickHelpDialogTitle": "Information: Disable Right Click", // title that appears when the disable right click help dialog is rendered
	"disableRightClickHelpDialogParagraph1": "This feature prohibits learners from printing quiz questions by right-clicking on a question while an attempt is in progress. But learners will still be able to screen capture the quiz through other technologies outside of the browser.", // content for paragraph 1 of disable right click help dialog
	"disableRightClickHelpDialogParagraph2": "Certain accessibility workflows will be blocked because the learner cannot copy and paste the question text. Individual users can be granted the ability to right-click on a quiz even when this feature is enabled for a quiz by enabling “Always Allow Right Click” in that user’s Accommodations.", // content for paragraph 2 of disable right click help dialog
	"disableRightClickHelpDialogConfirmationText": "OK", // copy that appears on the disable right click help dialog confirmation button
	"manageTimingDialogConfirmationText": "OK", // copy that appears on the Timing dialog confirmation button
	"manageTimingDialogCancelText": "Cancel", // copy that appears on the Timing dialog cancel button
	"description": "Description", // Description label for the Description text input box,
	"btnOpenIpRestrictionDialog": "Manage IP restrictions", // Button text for opening IP restriction dialog
	"hdrIpRestrictionDialog": "IP Restrictions (IPv4)", // timing/display accordion header
	"ipRestrictionLabel": "IP Restrictions", // Label for IP restrictions editor
	"minutesLabel": "minute(s)",  // label for Timing dialog time limit input slot
	"minutesBeforeFlaggedLabel": "minute(s) before flagged as exceeded time limit", // label for Timing dialog grace period input slot
	"extendedDeadlineLabel": "Extended Deadline",  // label for timing dialog - extended deadline select
	"extendedDeadlineInputLabel": "minute(s) after the Grace Period ends",  //label for Timing dialog extended deadline select slot
	"subHdrExceededTimeLimitBehaviour": "Exceeded Time Limit Behaviour", // Title for submission late type options,
	"exceededTimeLimitBehaviourPrefix": "After the grace period, flag the quiz attempt as exceeded time limit and,", // label for submission label type options
	"showClockLabel": "Will be displayed before the quiz starts", // Label for show clock checkbox
	"showClockTitle": "Show clock", // Title for show clock
	"manageAttemptsDialogConfirmationText": "OK", // copy that appears on the Attempts dialog confirmation button
	"manageAttemptsDialogCancelText": "Cancel", // copy that appears on the Attempts dialog cancel button
	"subHdrAttemptsTools": "Attempts", // Title for attempts tools
	"manageAttempts": "Manage Attempts", // Label for button to launch attempts dialog
	"textIsDisplayedPart1": "Fields cannot be toggled off in the new quiz creation experience.", // First sentence of alert warning that text fields will be visible
	"textIsDisplayedSingularPart2": "The {field} field appears to learners when the quiz is saved.", // Second sentence of alert warning that text fields will be visible, when there is only one field
	"introMovedToDescription": "Quizzes no longer support Introductions. Existing content in the Introduction field now appears in the Description field.", // Alert warning that existing quiz introduction has been removed and that the text in the introduction has been put into the quiz description
	"attemptsAllowed": "Attempts Allowed", // Title for Attempts Allowed select in Attempts dialog
	"quizAttemptsAllowedSummary": "{numAttemptsAllowed, plural, =1 {1 attempt allowed} other {{numAttemptsAllowed} attempts allowed}}", //
	"overallGradeCalculation": "Overall Grade Calculation", // Title for Overall Grade Calculation select in Attempts dialog
	"retakeIncorrectQuestionsOnly": "Retake Incorrect Questions Only", // Title for RIO checkbox in Attempts dialog
	"rioCheckboxLabel": "On new attempts, only allow answers for previously incorrect questions", // Label for RIO checkbox in Attempts dialog
	"btnAttemptConditions": "Attempt Conditions", // Label for Attempt Conditions button in Attempts dialog
	"rioAccessibileHelpText": "Get help on - Retake Incorrect Only", // accessible help text for RIO question mark button
	"rioDialogTitle": "Information: Retake Incorrect Questions Only", // Title for RIO help dialog
	"rioDialogParagraph": "When this setting is selected, learners who attempt a quiz more than once can only answer questions that were incorrect on the previous attempt.", // content for RIO dialog
	"rioDialogParagraph2": "If you are using Auto-publishing, Written Response questions will be marked as 0 and included in future attempts until they are graded manually.", // second paragraph for RIO dialog
	"rioDialogConfirmationText": "OK", // copy that appears on the RIO help dialog confirmation button
	"ipRestrictionDialogDescription": "Only learners coming from IP addresses that meet the defined restrictions can write the quiz.", // guidelines for IP restrictions dialog
	"btnIpRestrictionsDialogAdd": "Add", // text for IP restrictions dialog "Add" button
	"btnIpRestrictionsDialogBtnCancel": "Cancel", // text for IP restrictions dialog "Cancel" button
	"ipRestrictionsDialogAddNewRange": "IP Range", // text for IP restrictions dialog "Add new IP range" button
	"ipRestrictionsTableStartRangeHdr": "IP Range Start", // text for IP restrictions table header start
	"ipRestrictionsTableEndRangeHdr": "IP Range End", // text for IP restrictions table header end
	"ipRestrictionsTableDeleteRangeHdr": "Delete", // text for IP restrictions table header delete
	"ipRestrictionsTableDeleteRangeLabel": "Delete", // label for IP restrictions delete button
	"ipRestrictionsTableStartRangeLabel": "IP range start {index}", // label for IP restrictions start range input
	"ipRestrictionsTableEndRangeLabel": "IP range end {index}", // label for IP restrictions end range input
	"ipRestrictionsValidationError": "Invalid IP address format. Please correct outlined fields. Example IP address: 155.55.5.15.", // error message for invalid IP addresses
	"ipRestrictions500Error": "Something went wrong. Please try again.", // error message for IP restrictions 500 response
	"ipRestrictionsHelpTxtConfirmation": "OK", // confirmation text on IP restrictions help dialog
	"hdrIpRestrictionsHelpDialog": "Information: IP Restrictions (IPv4)", // timing/display accordion header
	"hdrIpRestrictionsHelpDialogP1": "To specify a range of accepted IP addresses, enter four sets of values ranging from 0 to 255 separated by a period in the IP Range Start and IP Range End fields, respectively.", // IP restrictions help dialog paragraph 1
	"hdrIpRestrictionsHelpDialogP2": "Example IP address: 155.55.5.15", // IP restrictions help dialog paragraph 2
	"hdrIpRestrictionsHelpDialogP3": "To include an individual accepted IP address, only specify the IP Range Start value.", // IP restrictions help dialog paragraph 3
	"hdrIpRestrictionsHelpDialogP4": "Note: The IP Range Start value must be smaller than the IP Range End value.", // IP restrictions help dialog paragraph 4
	"hdrSpecialAccess": "Special Access", // special access heading,
	"hlpSpecialAccess": "Special Access allows quizzes to be available to only a select group of users or individualized due dates for certain users.", // special access help
	"specialAccessRestrictedText": "Only users with special access can see this quiz", // restricted special access description
	"ipRestrictionsAccessibileHelpText": "Get help on - IP restrictions", // accessible help text for IP restrictions question mark button
	"attemptConditions": "Attempt Conditions", // Header for Attempts Conditions section in Attempts dialog
	"attemptConditionsParagraph1": "For a learner to qualify for another attempt, set a minimum and/or maximum percentage value between 0 to 100 that must be acheived on the previous attempt.", // content for paragraph1 on the Attempts dialog Attempts Condition section
	"attemptConditionsParagraph2": "If a minimum or maximum field is blank, there won't be a limit applied to that portion of the attempt range.", // content for paragragh2 on the Attempts dialog Attempts Condition section
	"attemptConditionsRangePrefixText1": "On Attempt {index}:", // prefix text 1 for Attempt Conditions range editor on Attempts dialog
	"attemptConditionsRangePrefixText2": "learners must achieve between", // prefix text 2 for Attempt Conditions range editor on Attempts dialog
	"attemptConditionsRangeSuffixText1": "to release", //suffix text 1 for Attempts Conditions range editor on Attempts dialog
	"attemptConditionsRangeSuffixText2": "Attempt {next}", // suffix text 2 for Attempts Condition range editor on Attempts dialog
	"minLabel": "Min:", // label for Min input on Attempts Conditions range editor on Attempts Dialog
	"maxLabel": "Max:", // label for Max input on Attempts Conditions range editor on Attempts Dialog
	"andRangeText": "and", // copy on Attempts Condition range editor on Attempts Dialog
	"percentageRangeText": "%", // copy on Attempts Condition range editor on Attempts Dialog
	"ipRestrictionsSummary": "IP restrictions", // summary to be displayed when a quiz has ip restrictions
	"ipRestrictionsInnerSummary" : "{count, plural, =1 {1 restriction} other {{count} restrictions}}", // summary to be displayed when accordion is expanded
	"quizTimingValidationError": "Timing cannot be changed, please correct the outlined fields.", // Appears in error alert when validation fails in Manage Timing dialog
	"quizTimingServerError": "Something went wrong. Please try again.", // Timing save server error alert message
	"quizTimingRecommendedSummary": "Recommended time limit ({numMinutes, plural, =1 {1 minute} other {{numMinutes} minutes}})", // Recommended time limit (x minute) or (x minutes).
	"quizTimingEnforcedSummary": "Enforced time limit ({numMinutes, plural, =1 {1 minute} other {{numMinutes} minutes}})", // Enforced time limit(x minute) or (x minutes).
	"ipRestrictionsDuplicateError": "Duplicate IP range start address. Each IP range start value must be unique.", // Error for duplicate IP
	"ipRestrictionsRangeError": "Invalid IP address range provided. Please ensure ranges are correctly formatted.", // Error for invalid IP ranges
	"quizAttemptsValidationError": "Attempts cannot be changed, please correct the outlined fields.", // Appears in error alert when validation fails in Manage Attempts dialog
	"totalPoints": "Total Points {scoreOutOf}", // Total points text that appears on quiz editor above list of questions
	"subHdrHeaderFooter": "Header and Footer", // Header and Footer accordion header
	"manageHeaderFooterButton": "Manage Header and Footer", // Label for button to launch Header and Footer dialog
	"headerFooterDialogTitle": "Header and Footer",
	"manageHeaderFooterDialogAddText": "Add", // Label for Add button for header and footer dialog
	"manageHeaderFooterDialogCancelText": "Cancel", // Label for Cancel button header and footer dialog
	"headerLabel": "Header", // Label for the header text box
	"headerDialogText": "The Quiz Header and Footer will be visible to learners at the top and bottom of the quiz, respectively.", // Header and Footer dialog text
	"header": "Header", // Header label for the header text box.
	"headerAdded": "Header added", // Header added summary text for Timing and Display accordion.
	"footerAdded": "Footer added", // Footer added summary text for Timing and Display accordion.
	"headerAndFooterAdded": "Header and footer added", // Header and footer added text for Timing and Display accordion.
	"footer": "Footer", // Footer lable for the footer text box.
	"footerLabel": "Footer", // Label for the footer text box.
	"headerAndFooter": "Header and footer added", // Header and footer summary text for closed accordion
	"createNewLabel": "Create New", // Label for button to open menu for adding new items to the quiz.
	"addExistingLabel": "Add Existing", // Label for button to open menu for adding pre-existing items to the quiz.
	"addQuestionsLabel": "New Question", // Label for button to open menu for adding new questions to the quiz.
	"submissionViewHeading1": "When published, display to learners:", // Label for checkbox in submission view container.
	"submissionViewHeading2": "and", // Label for submission view dropdown in submission view container.
	"submissionViewCheckboxLabel": "Attempt grade", // Text next to the submission view checkbox in the container.
	"submissionViewButtonText": "Customize quiz results display", // Text for the button at the bottom of the submission view container.
	"gradeOutOf": "Grade Out Of", // Label for the grade-out-of field when creating/editing an activity
	"submissionViewsHelpDialogTitle": "Information: Quiz results display", // Title for help dialog on submission view customization screen.
	"submissionViewsHelpDialogParagraph1": "Quiz results display determine how learners can view their published quiz attempt results, both immediately following submission, or later when reviewing their attempt.", // Paragraph 1 for help dialog on submission view customization screen.
	"submissionViewsHelpDialogParagraph2": "The Primary View is shown to learners as the default, and Additional Views will override the Primary View based on the set parameters.", // Paragraph 2 for help dialog on submission view customization screen.
	"submissionViewsHelpDialogConfirmation": "OK", //Text for closing the information Dialog for customization in submission views.
	"submissionViewsDialogConfirmationMain": "OK", //Text for closing the main Dialog for customization in submission views.
	"submissionViewsDialogCancelMain": "Cancel", // Text for cancelling changes on the main Dialog for customization in submission views.
	"submissionViewsAccordionDropdownNoQuestions": "No questions", // Option in dropdown to decide what to display to learner.
	"submissionViewsAccordionDropdownIncorrectQuestionsWithCorrectAnswers": "Incorrect questions only, with correct answers", // Option in dropdown to decide what to display to learner.
	"submissionViewsAccordionDropdownIncorrectQuestionsWithoutCorrectAnswers": "Incorrect questions only, without correct answers", // Option in dropdown to decide what to display to learner.
	"submissionViewsAccordionDropdownAllQuestionsWithCorrectAnswers": "All questions, with correct answers", // Option in dropdown to decide what to display to learner.
	"submissionViewsAccordionDropdownAllQuestionsWithoutCorrectAnswers": "All questions, without correct answers", // Option in dropdown to decide what to display to learner.
	"primaryView": "Primary View", // Label
	"additonalViewComesIntoEffect": "Additional view comes into effect", // Label
	"gradeOutOfAccessibleHelpText": "Get help on - Grade Out Of", // accessible help text for gradeOutOf question mark button
	"gradeOutOfHelpDialogTitle": "Information: Grade Out Of", // title that appears when the gradeOutOf help dialog is rendered
	"gradeOutOfHelpDialogConfirmationText": "OK", // text that appears on the gradeOutOf help dialog confirmation button
	"gradeOutOfHelpDialogParagraph1": "If the quiz is \"Not in Gradebook\", Grade Out Of reflects the total points of the questions.", // content for paragraph 1 of gradeOutOf help dialog
	"gradeOutOfHelpDialogParagraph2": "If the quiz is \"In Gradebook\", Grade Out Of is the maximum points or weight in the Grades tool.", // content for paragraph 2 of gradeOutOf help dialog
	"submissionViewsAccordionSummary" : "{count, plural, =1 {1 result display} other {{count} result displays}}", // number of submission views summary shown in collapsed accordion
};

