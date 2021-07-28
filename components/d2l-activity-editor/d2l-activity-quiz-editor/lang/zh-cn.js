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
	"autoSetGradedDescription": "允许完成尝试后立即将其设置为已分级", // description for automatic grade checkbox
	"autoSetGradedSummary": "自动分级", // summary for auto set graded checkbox
	"passwordDescription": "只有输入此密码的用户才有权填写此测验。", // description for password input
	"hlpSubmissionNotificationEmail": "输入一个或多个电子邮件地址（用逗号分隔），以在尝试测验时接收通知。", // description for email notification input
	"autoSetGradedAccessibleHelpText": "获取此主题的帮助 - 自动分级", // accessible help text for autoSetGraded question mark button
	"autoSetGradedHelpDialogTitle": "信息：自动分级", // title that appears when the autoSetGraded help dialog is rendered
	"autoSetGradedHelpDialogConfirmationText": "确定", // copy that appears on the autoSetGraded help dialog confirmation button
	"autoSetGradedHelpDialogParagraph1": "打开此设置后，用户在提交尝试后可以立即看到其分数。显示的分数仅为系统可以自动分级的分数。", // content for paragraph 1 of autoSetGraded help dialog
	"autoSetGradedHelpDialogParagraph2": "此设置必须打开，这样用户完成尝试时，等级将自动发送到成绩簿，并向用户发布默认提交视图。", // content for paragraph 2 of autoSetGraded help dialog
	"autoSetGradedHelpDialogParagraph3": "注意：书面答题问题将标记为 0，直至手动评分。", // content for paragraph 3 of autoSetGraded help dialog
	"disableAlertsHelpDialogTitle": "信息：在 Brightspace 内禁用电子邮件，即时消息和警报", // title that appears when the disable alerts help dialog is rendered
	"disableAlertsHelpDialogContent": "如果启用此选项，如果学员在进行测验尝试，其将无法访问 Brightspace 电子邮件、即时消息其提醒。", // content that appears when the disable alerts help dialog is rendered
	"disableAlertsHelpDialogConfirmationText": "确定", // copy that appears on the disable alerts help dialog confirmation button
	"disableAlertsAccessibleHelpText": "获取此主题的帮助 - 在 Brightspace 内禁用电子邮件、即时消息和提示", // accessible help text for disable alerts question mark button
	"disableRightClickAccessibleHelpText": "获取此主题的帮助 - 禁用右键单击", // accessible help text for disable right click question mark button
	"disableRightClickHelpDialogTitle": "信息：禁用右键单击", // title that appears when the disable right click help dialog is rendered
	"disableRightClickHelpDialogParagraph1": "此功能禁止学员在尝试过程中通过右键单击问题来打印测验问题。但是，学员仍然能够通过浏览器之外的其他技术，以截屏的方式捕捉测验内容。", // content for paragraph 1 of disable right click help dialog
	"disableRightClickHelpDialogParagraph2": "由于学员无法复制和粘贴问题文本，某些辅助功能工作流将被阻止。", // content for paragraph 2 of disable right click help dialog
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
	"rioDialogParagraph": "选择此设置后，多次尝试测验的学员将仅能回答之前尝试时答错的问题。如果您使用的是自动评分，则书面答题问题将标记为 0 且包含在未来尝试中，直至它们手动评分。", // content for RIO dialog
	"rioDialogConfirmationText": "确定", // copy that appears on the RIO help dialog confirmation button
	"ipRestrictionDialogDescription": "只有来自符合规定限制的 IP 地址的学员才能填写测验。", // guidelines for IP restrictions dialog
	"btnIpRestrictionsDialogAdd": "添加", // text for IP restrictions dialog "Add" button
	"btnIpRestrictionsDialogBtnCancel": "取消", // text for IP restrictions dialog "Cancel" button
	"ipRestrictionsDialogAddNewRange": "IP 范围", // text for IP restrictions dialog "Add new IP range" button
	"ipRestrictionsTableStartRangeHdr": "IP 范围起始", // text for IP restrictions table header start
	"ipRestrictionsTableEndRangeHdr": "IP 范围结尾", // text for IP restrictions table header end
	"ipRestrictionsTableDeleteRangeHdr": "删除", // text for IP restrictions table header delete
	"ipRestrictionsValidationError": "无效的 IP 地址格式。请更正所标出的字段。IP 地址示例：155.55.5.15。", // error message for invalid IP addresses
	"ipRestrictions500Error": "出现错误。请重试。", // error message for IP restrictions 500 response
	"ipRestrictionsHelpTxtConfirmation": "确定", // confirmation text on IP restrictions help dialog
	"hdrIpRestrictionsHelpDialog": "信息：IP 限制 (IPv4)", // timing/display accordion header
	"hdrIpRestrictionsHelpDialogP1": "要指定可接受的 IP 地址范围，请在“IP 范围起始”和“IP 范围结束”字段中分别输入四组范围各自从 0 到 255 的值，各组之间以句点分隔。", // IP restrictions help dialog paragraph 1
	"hdrIpRestrictionsHelpDialogP2": "IP 地址示例：155.55.5.15", // IP restrictions help dialog paragraph 2
	"hdrIpRestrictionsHelpDialogP3": "要包括单个可接受的 IP 地址，只需指定“IP 范围起始”值即可。", // IP restrictions help dialog paragraph 3
	"hdrIpRestrictionsHelpDialogP4": "注意：“IP 范围起始”值必须小于“IP 范围结束”值。", // IP restrictions help dialog paragraph 4
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
	"addQuestionsLabel": "新问题" // Label for button to open menu for adding new questions to the quiz.
};
