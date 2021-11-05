/* eslint quotes: 0 */

export default {
	"name": "名称", // Label for the name field when creating/editing an activity
	"quizSaveError": "您的测验未保存。请更正所列出的字段。", // Error message to inform the user that there was a problem saving the quiz, instructing them to correct invalid fields
	"hdrAvailability": "可用日期和条件", // availability header
	"hdrTimingAndDisplay": "定时和显示", // timing/display accordion header
	"subHdrTimingTools": "计时", // Title for timing tools
	"manageTiming": "管理定时设置", // Label for button to launch timing dialog
	"hdrAttemptsAndCompletion": "尝试并完成", //attempts/completion accordion header
	"subHdrPagingTools": "寻呼", // Title for paging tools
	"subHdrShuffleQuiz": "随机打乱测验顺序",// Title for shuffle quiz tool(s)
	"subHdrDisplayTools": "显示", // Title for display tools
	"shuffleDescription": "随机打乱测验中的各问题和各部分。请勿级联至子章节。", // description for question shuffling behavior
	"shuffleSummary": "随机打乱问题", // summary text for shuffle quiz questions
	"hintsToolDescription": "允许提示", // decription for hints tool
	"hintsAllowedSummary": "允许提示", // summary text when hints are enabled,
	"passwordLabel": "密码", // Label for the quiz password text input field
	"passwordSummary": "已使用密码保护", // summary text when quiz has a password
	"disableRightClickDescription": "禁用右键单击", // description for disable right click
	"disableRightClickSummary": "已禁用右键单击", // summary text when right clicks are disabled
	"preventMovingBackwardsDescription": "禁止返回到先前的页面",
	"disablePagerAndAlertsDescription": "在 Brightspace 内禁用电子邮件、即时消息和提示", // description for blocking communications / disable pager and alerts during a quiz
	"disablePagerAndAlertsSummary": "警报和通信被阻止", // summary text when communications / pager and alerts are disabled
	"emailNotificationSummary": "通过电子邮件发送的尝试通知", // summary for email notification
	"preventMovingBackwardsSummary": "分页限制", // summary for prevent moving backwards checkbox
	"dividerHeader": "问题", // The header that is displayed on the divider
	"previewLabel": "预览", // The label text for the preview button
	"hdrReleaseConditions": "发布条件", // release conditions heading
	"hlpReleaseConditions": "除非满足发布条件，否则用户将无法访问或查看测验。", // release conditions help
	"hdrEvaluationAndFeedback": "评估和反馈", // evaluation/feedback accordion header
	"subHdrAutomaticGrades": "自动分级", // Title for automatic grade tool
	"autoSetGradedDescription": "在完成后，立即显示自动发布尝试结果", // description for automatic grade checkbox
	"autoSetGradedSummary": "自动发布结果", // summary for auto set graded checkbox
	"passwordDescription": "只有输入此密码的用户才有权填写此测验。", // description for password input
	"hlpSubmissionNotificationEmail": "输入一个或多个电子邮件地址（用逗号分隔），以在尝试测验时接收通知。", // description for email notification input
	"autoSetGradedAccessibleHelpText": "获取此主题的帮助 - 自动分级", // accessible help text for autoSetGraded question mark button
	"autoSetGradedHelpDialogTitle": "信息：在完成后，立即显示自动发布尝试结果", // title that appears when the autoSetGraded help dialog is rendered
	"autoSetGradedHelpDialogConfirmationText": "确定", // copy that appears on the autoSetGraded help dialog confirmation button
	"autoSetGradedHelpDialogParagraph1": "启用此功能后，系统将公布自动评估的尝试结果并向学员显示。", // content for paragraph 1 of autoSetGraded help dialog
	"autoSetGradedHelpDialogParagraph2": "注意：如果系统无法评估问题（例如书面论述题），则在手动评估之前，这些问题将自动评分为零。", // content for paragraph 2 of autoSetGraded help dialog
	"autoSetGradedHelpDialogParagraph3": "", // content for paragraph 3 of autoSetGraded help dialog
	"disableAlertsHelpDialogTitle": "信息：在 Brightspace 内禁用电子邮件，即时消息和警报", // title that appears when the disable alerts help dialog is rendered
	"disableAlertsHelpDialogContent": "如果启用此选项，如果学员在进行测验尝试，其将无法访问 Brightspace 电子邮件、即时消息其提醒。", // content that appears when the disable alerts help dialog is rendered
	"disableAlertsHelpDialogConfirmationText": "确定", // copy that appears on the disable alerts help dialog confirmation button
	"disableAlertsAccessibleHelpText": "获取此主题的帮助 - 在 Brightspace 内禁用电子邮件、即时消息和提示", // accessible help text for disable alerts question mark button
	"disableRightClickAccessibleHelpText": "获取此主题的帮助 - 禁用右键单击", // accessible help text for disable right click question mark button
	"disableRightClickHelpDialogTitle": "信息：禁用右键单击", // title that appears when the disable right click help dialog is rendered
	"disableRightClickHelpDialogParagraph1": "此功能禁止学员在尝试过程中通过右键单击问题来打印测验问题。但是，学员仍然能够通过浏览器之外的其他技术，以截屏的方式捕捉测验内容。", // content for paragraph 1 of disable right click help dialog
	"disableRightClickHelpDialogParagraph2": "由于学员无法复制和粘贴问题文本，某些辅助功能工作流将被阻止。通过在用户的特殊调整中启用“始终允许右键单击”，即使已为测验启用此功能，也可以授予单个用户右键单击测验的能力。", // content for paragraph 2 of disable right click help dialog
	"disableRightClickHelpDialogConfirmationText": "确定", // copy that appears on the disable right click help dialog confirmation button
	"manageTimingDialogConfirmationText": "确定", // copy that appears on the Timing dialog confirmation button
	"manageTimingDialogCancelText": "取消", // copy that appears on the Timing dialog cancel button
	"description": "描述", // Description label for the Description text input box,
	"btnOpenIpRestrictionDialog": "管理 IP 限制", // Button text for opening IP restriction dialog
	"hdrIpRestrictionDialog": "IP 限制 (IPv4)", // timing/display accordion header
	"ipRestrictionLabel": "IP 限制", // Label for IP restrictions editor
	"minutesLabel": "分钟数",  // label for Timing dialog time limit input slot
	"minutesBeforeFlaggedLabel": "分钟后将标记为超过时限", // label for Timing dialog grace period input slot
	"extendedDeadlineLabel": "已延长截止期",  // label for timing dialog - extended deadline select
	"extendedDeadlineInputLabel": "分钟前宽限期已结束",  //label for Timing dialog extended deadline select slot
	"subHdrExceededTimeLimitBehaviour": "已超过时限行为", // Title for submission late type options,
	"exceededTimeLimitBehaviourPrefix": "在宽限期后，将测验标记为已超过时限，并且", // label for submission label type options
	"showClockLabel": "将在测试开始前显示", // Label for show clock checkbox
	"showClockTitle": "显示时钟", // Title for show clock
	"manageAttemptsDialogConfirmationText": "确定", // copy that appears on the Attempts dialog confirmation button
	"manageAttemptsDialogCancelText": "取消", // copy that appears on the Attempts dialog cancel button
	"subHdrAttemptsTools": "尝试次数", // Title for attempts tools
	"manageAttempts": "管理尝试", // Label for button to launch attempts dialog
	"textIsDisplayedPart1": "在新的测验创建体验中，字段不能关闭。", // First sentence of alert warning that text fields will be visible
	"textIsDisplayedSingularPart2": "保存测验时，{field} 字段将会对学员显示。", // Second sentence of alert warning that text fields will be visible, when there is only one field
	"introMovedToDescription": "测验不再支持说明。“说明”字段中的现有内容现在显示在“描述”字段中。", // Alert warning that existing quiz introduction has been removed and that the text in the introduction has been put into the quiz description
	"attemptsAllowed": "允许的尝试", // Title for Attempts Allowed select in Attempts dialog
	"quizAttemptsAllowedSummary": "{numAttemptsAllowed, plural, =1 {允许 1 次尝试} other {允许 {numAttemptsAllowed} 次尝试}}", //
	"overallGradeCalculation": "总成绩计算", // Title for Overall Grade Calculation select in Attempts dialog
	"retakeIncorrectQuestionsOnly": "仅重考答错的问题", // Title for RIO checkbox in Attempts dialog
	"rioCheckboxLabel": "在重新尝试时仅允许回答之前答错的问题", // Label for RIO checkbox in Attempts dialog
	"btnAttemptConditions": "尝试条件", // Label for Attempt Conditions button in Attempts dialog
	"rioAccessibileHelpText": "获取有关此主题的帮助 - 仅重考答错的问题", // accessible help text for RIO question mark button
	"rioDialogTitle": "信息：仅重考答错的问题", // Title for RIO help dialog
	"rioDialogParagraph": "选择此设置后，多次尝试测验的学员将仅能回答之前尝试时答错的问题。", // content for RIO dialog
	"rioDialogParagraph2": "如果您使用的是自动发布，则书面论述题将标记为 0 分且包含在未来尝试中，直至它们得到手动评分。", // second paragraph for RIO dialog
	"rioDialogConfirmationText": "确定", // copy that appears on the RIO help dialog confirmation button
	"ipRestrictionDialogDescription": "只有来自符合规定限制的 IP 地址的学员才能填写测验。", // guidelines for IP restrictions dialog
	"btnIpRestrictionsDialogAdd": "添加", // text for IP restrictions dialog "Add" button
	"btnIpRestrictionsDialogBtnCancel": "取消", // text for IP restrictions dialog "Cancel" button
	"ipRestrictionsDialogAddNewRange": "IP 范围", // text for IP restrictions dialog "Add new IP range" button
	"ipRestrictionsTableStartRangeHdr": "IP 范围起始", // text for IP restrictions table header start
	"ipRestrictionsTableEndRangeHdr": "IP 范围结尾", // text for IP restrictions table header end
	"ipRestrictionsTableDeleteRangeHdr": "删除", // text for IP restrictions table header delete
	"ipRestrictionsTableDeleteRangeLabel": "删除", // label for IP restrictions delete button
	"ipRestrictionsTableStartRangeLabel": "IP 范围开始 ｛ index ｝", // label for IP restrictions start range input
	"ipRestrictionsTableEndRangeLabel": "IP 范围结束 ｛ index ｝", // label for IP restrictions end range input
	"ipRestrictionsValidationError": "无效的 IP 地址格式。请更正所标出的字段。IP 地址示例：155.55.5.15。", // error message for invalid IP addresses
	"ipRestrictions500Error": "出现错误。请重试。", // error message for IP restrictions 500 response
	"ipRestrictionsHelpTxtConfirmation": "确定", // confirmation text on IP restrictions help dialog
	"hdrIpRestrictionsHelpDialog": "信息：IP 限制 (IPv4)", // timing/display accordion header
	"hdrIpRestrictionsHelpDialogP1": "要指定可接受的 IP 地址范围，请在“IP 范围起始”和“IP 范围结束”字段中分别输入四组范围各自从 0 到 255 的值，各组之间以句点分隔。", // IP restrictions help dialog paragraph 1
	"hdrIpRestrictionsHelpDialogP2": "IP 地址示例：155.55.5.15", // IP restrictions help dialog paragraph 2
	"hdrIpRestrictionsHelpDialogP3": "要包括单个可接受的 IP 地址，只需指定“IP 范围起始”值即可。", // IP restrictions help dialog paragraph 3
	"hdrIpRestrictionsHelpDialogP4": "注意：“IP 范围起始”值必须小于“IP 范围结束”值。", // IP restrictions help dialog paragraph 4
	"hdrSpecialAccess": "特殊访问权限", // special access heading,
	"hlpSpecialAccess": "特殊访问权限可使作业仅供选定用户组或根据特定用户的个性化截止日期进行使用。", // special access help
	"specialAccessRestrictedText": "仅具有特殊访问权限的用户才能查看此文件夹", // restricted special access description
	"ipRestrictionsAccessibileHelpText": "获取有关此主题的帮助 - IP 限制", // accessible help text for IP restrictions question mark button
	"attemptConditions": "尝试条件", // Header for Attempts Conditions section in Attempts dialog
	"attemptConditionsParagraph1": "要使学员有资格进行另一次尝试，请设置介于 0 到 100 之间的最小和/或最大百分比值，并且上一次尝试必须达到此限制条件。", // content for paragraph1 on the Attempts dialog Attempts Condition section
	"attemptConditionsParagraph2": "如果最小值或最大值字段为空，则尝试范围中的该部分将不受限制。", // content for paragragh2 on the Attempts dialog Attempts Condition section
	"attemptConditionsRangePrefixText1": "在第 {index} 次尝试时：", // prefix text 1 for Attempt Conditions range editor on Attempts dialog
	"attemptConditionsRangePrefixText2": "学员必须达到", // prefix text 2 for Attempt Conditions range editor on Attempts dialog
	"attemptConditionsRangeSuffixText1": "才能释放", //suffix text 1 for Attempts Conditions range editor on Attempts dialog
	"attemptConditionsRangeSuffixText2": "第 {next} 次尝试", // suffix text 2 for Attempts Condition range editor on Attempts dialog
	"minLabel": "最小：", // label for Min input on Attempts Conditions range editor on Attempts Dialog
	"maxLabel": "最大：", // label for Max input on Attempts Conditions range editor on Attempts Dialog
	"andRangeText": "和", // copy on Attempts Condition range editor on Attempts Dialog
	"percentageRangeText": "%", // copy on Attempts Condition range editor on Attempts Dialog
	"ipRestrictionsSummary": "IP 限制", // summary to be displayed when a quiz has ip restrictions
	"ipRestrictionsInnerSummary" : "{count, plural, =1 {1 个限制} other {{count} 个限制}}", // summary to be displayed when accordion is expanded
	"quizTimingValidationError": "无法更改尝试时间设置，请更正所标出的字段。", // Appears in error alert when validation fails in Manage Timing dialog
	"quizTimingServerError": "出现错误。请重试。", // Timing save server error alert message
	"quizTimingRecommendedSummary": "建议的时间限制（{numMinutes, plural, =1 {1 分钟} other {{numMinutes} 分钟}})", // Recommended time limit (x minute) or (x minutes).
	"quizTimingEnforcedSummary": "强制时间限制（{numMinutes, plural, =1 {1 分钟} other {{numMinutes} 分钟}})", // Enforced time limit(x minute) or (x minutes).
	"ipRestrictionsDuplicateError": "IP 范围起始地址重复。每个 IP 范围起始值必须唯一。", // Error for duplicate IP
	"ipRestrictionsRangeError": "提供的 IP 地址范围无效。请确保范围的格式正确。", // Error for invalid IP ranges
	"quizAttemptsValidationError": "无法更改尝试次数，请更正所标出的字段。", // Appears in error alert when validation fails in Manage Attempts dialog
	"totalPoints": "总分为 {scoreOutOf}", // Total points text that appears on quiz editor above list of questions
	"subHdrHeaderFooter": "页眉和表尾", // Header and Footer accordion header
	"manageHeaderFooterButton": "管理页眉和页脚", // Label for button to launch Header and Footer dialog
	"headerFooterDialogTitle": "页眉和表尾",
	"manageHeaderFooterDialogAddText": "添加", // Label for Add button for header and footer dialog
	"manageHeaderFooterDialogCancelText": "取消", // Label for Cancel button header and footer dialog
	"headerLabel": "页眉", // Label for the header text box
	"headerDialogText": "测验页眉和页脚将分别显示在测验的顶部和底部。", // Header and Footer dialog text
	"header": "页眉", // Header label for the header text box.
	"headerAdded": "已添加页眉", // Header added summary text for Timing and Display accordion.
	"footerAdded": "已添加页脚", // Footer added summary text for Timing and Display accordion.
	"headerAndFooterAdded": "已添加页眉和页脚", // Header and footer added text for Timing and Display accordion.
	"footer": "页脚", // Footer lable for the footer text box.
	"footerLabel": "页脚", // Label for the footer text box.
	"headerAndFooter": "已添加页眉和页脚", // Header and footer summary text for closed accordion
	"createNewLabel": "新建", // Label for button to open menu for adding new items to the quiz.
	"addExistingLabel": "添加现有", // Label for button to open menu for adding pre-existing items to the quiz.
	"addQuestionsLabel": "新问题", // Label for button to open menu for adding new questions to the quiz.
	"submissionViewHeading1": "发布后，向学员展示：", // Label for checkbox in submission view container.
	"submissionViewHeading2": "和", // Label for submission view dropdown in submission view container.
	"submissionViewCheckboxLabel": "尝试评级", // Text next to the submission view checkbox in the container.
	"submissionViewButtonText": "自定义测验结果显示", // Text for the button at the bottom of the submission view container.
	"gradeOutOf": "成绩超出", // Label for the grade-out-of field when creating/editing an activity
	"submissionViewsHelpDialogTitle": "信息：显示测验结果", // Title for help dialog on submission view customization screen.
	"submissionViewsHelpDialogParagraph1": "测验结果显示确定学员如何查看已发布的测验结果，包括在提交后立即查看或稍后查看其尝试。", // Paragraph 1 for help dialog on submission view customization screen.
	"submissionViewsHelpDialogParagraph2": "主视图作为默认视图显示给学员，其他视图将根据设置的参数覆盖主视图。", // Paragraph 2 for help dialog on submission view customization screen.
	"submissionViewsHelpDialogConfirmation": "确定", //Text for closing the information Dialog for customization in submission views.
	"submissionViewsDialogConfirmationMain": "确定", //Text for closing the main Dialog for customization in submission views.
	"submissionViewsDialogCancelMain": "取消", // Text for cancelling changes on the main Dialog for customization in submission views.
	"submissionViewsAccordionDropdownNoQuestions": "共  个问题", // Option in dropdown to decide what to display to learner.
	"submissionViewsAccordionDropdownIncorrectQuestionsWithCorrectAnswers": "仅错误问题，答案正确", // Option in dropdown to decide what to display to learner.
	"submissionViewsAccordionDropdownIncorrectQuestionsWithoutCorrectAnswers": "问题不正确，答案不正确", // Option in dropdown to decide what to display to learner.
	"submissionViewsAccordionDropdownAllQuestionsWithCorrectAnswers": "所有问题，答案正确", // Option in dropdown to decide what to display to learner.
	"submissionViewsAccordionDropdownAllQuestionsWithoutCorrectAnswers": "所有问题，没有正确答案", // Option in dropdown to decide what to display to learner.
	"primaryView": "主视图", // Label
	"additionalViewComesIntoEffect": "Additional view comes into effect:", // Label
	"submissionViewDialogCardAttemptScoreTrueText": "对评估的问题显示尝试等级", // Submission view dialog card, text appearing when attempted grades are displayed.
	"submissionViewDialogCardAttemptScoreFalseText": "未显示", // Submission view dialog card, text appearing when attempted grades are not displayed.
	"submissionViewDialogCardQuestionsNotDisplayed": "未显示", // Submission view dialog card, text appearing when no questions are displayed.
	"submissionViewDialogCardQuestionsAllDisplayed": "显示所有问题", // Submission view dialog card, text appearing when all questions are displayed.
	"submissionViewDialogCardQuestionsIncorrectOnlyDisplayed": "仅显示不正确", // Submission view dialog card, text appearing when incorrect questions only are displayed.
	"submissionViewDialogCardQuestionsCorrectOnlyDisplayed": "仅显示正确", // Submission view dialog card, text appearing when correct questions only are displayed.
	"submissionViewDialogCardShowAnswersTrueText": "显示所有答案", // Submission view dialog card, text appearing when all answers are displayed.
	"submissionViewDialogCardShowAnswersFalseText": "未显示", // Submission view dialog card, text appearing when not all answers are displayed.
	"submissionViewDialogCardShowResponsesTrueText": "显示？", // Submission view dialog card, text appearing when learners responses are displayed.
	"submissionViewDialogCardShowResponsesFalseText": "未显示", // Submission view dialog card, text appearing when learners responses are not displayed.
	"submissionViewDialogCardSubmissionViewMessageHeader": "消息", // Submission view dialog card, message heading.
	"submissionViewDialogCardSubmissionViewGradeHeader": "成绩", // Submission view dialog card, grade heading.
	"submissionViewDialogCardSubmissionViewQuestionsHeader": "问题", // Submission view dialog card, questions heading.
	"submissionViewDialogCardSubmissionViewAnswerHeader" : "答案", // Submission view dialog card, answers heading.
	"submissionViewDialogCardSubmissionViewResponseHeader": "学员的回答", // Submission view dialog card, learners responses heading.
	"submissionViewDialogCardButtonOptionEditView": "编辑视图", // Submission view dialog card, OK button text.
	"submissionViewDialogCardButtonOptionDeleteView": "删除视图", // Submission view dialog card, Cancel button text.
	"submissionViewsAccordionSummary" : "{count, plural, =1 {1 结果显示} other {{ count} 结果显示 }}", // number of submission views summary shown in collapsed accordion
	"submissionViewsDialogEditorGradeCheckbox": "显示评估问题的尝试等级", // submission views dialog editor edit display attempt score checkbox
	"statistics": "统计", //Label
	"submissionViewsDialogEditorClassAverageCheckbox": "显示班级平均成绩", // submission views dialog editor edit display class average checkbox
	"submissionViewsDialogEditorGradeDistributionCheckbox": "显示成绩分布", // submission views dialog editor edit display grade distribution checkbox
	"quizSubmissionViewsDialogCardUpdate": "更新", // submission views dialog card Update button
	"quizSubmissionViewsDialogCardCancel": "取消", // submission views dialog card Cancel button
	"allQuestionsWithCorrectAnswers": "分级不可见，显示所有问题并提供正确答案", // summarize list of selected options in comma separated list
	"allQuestions": "等级不可见，显示所有问题", // summarize list of selected options in comma separated list
	"gradeVisibleAllQuestionsWithCorrectAnswers": "等级可见，显示所有问题并提供正确答案", // summarize list of selected options in comma separated list
	"gradeVisibleAllQuestions": "等级可见，显示所有问题", // summarize list of selected options in comma separated list
	"allQuestionsWithCorrectAnswersLearnersResponses": "为不可见的学员评分，用正确答案和学员的回答显示所有问题", // summarize list of selected options in comma separated list
	"allQuestionsLearnersResponses": "对不可见的学员进行评分，显示所有问题和学员的回答", // summarize list of selected options in comma separated list
	"gradeVisibleAllQuestionsWithCorrectAnswersLearnersResponses": "等级可见，显示所有问题，并提供正确答案和学员的回答", // summarize list of selected options in comma separated list
	"gradeVisibleAllQuestionsLearnersResponses": "等级可见，显示所有问题和学员的回答", // summarize list of selected options in comma separated list
	"incorrectQuestionsWithCorrectAnswers": "等级不可见，仅显示正确答案的错误问题", // summarize list of selected options in comma separated list
	"incorrectQuestions": "等级不可见，仅显示错误问题", // summarize list of selected options in comma separated list
	"gradeVisibleIncorrectQuestionsWithCorrectAnswers": "等级可见，仅显示正确答案的错误问题", // summarize list of selected options in comma separated list
	"gradeVisibleIncorrectQuestions": "等级可见，仅显示不正确的问题", // summarize list of selected options in comma separated list
	"incorrectQuestionsWithCorrectAnswersLearnersResponses": "分级不可见，仅显示正确答案和学员答案的错误问题", // summarize list of selected options in comma separated list
	"incorrectQuestionsLearnersResponses": "分级不可见，仅显示不正确的问题和学员的回答", // summarize list of selected options in comma separated list
	"gradeVisibleIncorrectQuestionsWithCorrectAnswersLearnersResponses": "等级可见，仅显示正确答案和学员答案的错误问题", // summarize list of selected options in comma separated list
	"gradeVisibleIncorrectQuestionsLearnersResponses": "等级可见，仅显示错误问题和学员的回答", // summarize list of selected options in comma separated list
	"correctQuestionsWithCorrectAnswers": "等级不可见，仅显示正确的问题，并提供正确的答案", // summarize list of selected options in comma separated list
	"correctQuestions": "等级不可见，仅显示正确的问题", // summarize list of selected options in comma separated list
	"gradeVisibleCorrectQuestionsWithCorrectAnswers": "等级可见，仅显示正确的问题并提供正确的答案", // summarize list of selected options in comma separated list
	"gradeVisibleCorrectQuestions": "等级可见，仅显示正确的问题", // summarize list of selected options in comma separated list
	"correctQuestionsWithCorrectAnswersLearnersResponses": "为不可见的学员评分，仅显示正确的问题，并提供正确的答案和学员的回答", // summarize list of selected options in comma separated list
	"correctQuestionsLearnersResponses": "分级不可见，仅显示正确的问题和学员的回答", // summarize list of selected options in comma separated list
	"gradeVisibleCorrectQuestionsWithCorrectAnswersLearnersResponses": "等级可见，仅显示正确的问题，并提供正确的答案和学员的回答", // summarize list of selected options in comma separated list
	"gradeVisibleCorrectQuestionsLearnersResponses": "等级可见，仅显示正确的问题和学员的回答", // summarize list of selected options in comma separated list
	"noQuestions": "等级不可见，不显示问题", // summarize list of selected options in comma separated list
	"gradeVisibleNoQuestions": "等级可见，不显示问题", // summarize list of selected options in comma separated list
	"deleteViewWithTitle": "删除视图: {message}", // aria-label for delete view button with view message/title
	"submissionViewReleaseDateSummary": "At { releaseDate }{ attemptRestrictionNumber, plural, =0 {} one {, on the 1st attempt} =2 {, on the 2nd attempt} =3 {, on the 3rd attempt} other {, on the {attemptRestrictionNumber}th attempt} }{minGrade, plural, =0 {} other {, with attempt grades above {minGrade}%}}{maxGrade, plural, =0 {} other {, with attempt grades below {maxGrade}%}}{ ipRestrictions, select, true {, when accessed from within the set IP range} false {} }{ timeLimitNumber, plural, =0 {} one {, until 1 minute has passed after submission} other {, until {timeLimitNumber} minutes have passed after submission}}", // summary of when a view is released with restriction info
	"submissionViewReleaseDateSummaryBothMinMaxGrades": "At { releaseDate }{ attemptRestrictionNumber, plural, =0 {} one {, on the 1st attempt} =2 {, on the 2nd attempt} =3 {, on the 3rd attempt} other {, on the {attemptRestrictionNumber}th attempt} } with attempt grades above {minGrade}% and below {maxGrade}%{ ipRestrictions, select, true {, when accessed from within the set IP range} false {} }{ timeLimitNumber, plural, =0 {} one {, until 1 minute has passed after submission} other {, until {timeLimitNumber} minutes have passed after submission}}", // summary of when a view is released with restriction info with both min and max grades
	"showOutcomesForTheDisplayedQuestionsCheckbox": "Show {outcomesTerm} for the displayed questions" // text for a checkbox which when checked, will show standards/outcomes for the displayed questions
};
