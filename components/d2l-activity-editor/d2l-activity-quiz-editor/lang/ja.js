/* eslint quotes: 0 */

export default {
	"name": "名前", // Label for the name field when creating/editing an activity
	"quizSaveError": "クイズは保存されませんでした。囲まれたフィールドを修正してください。", // Error message to inform the user that there was a problem saving the quiz, instructing them to correct invalid fields
	"hdrAvailability": "使用可能な日と条件", // availability header
	"hdrTimingAndDisplay": "タイミングと表示", // timing/display accordion header
	"subHdrTimingTools": "タイミング", // Title for timing tools
	"manageTiming": "タイミングの管理", // Label for button to launch timing dialog
	"hdrAttemptsAndCompletion": "試行と完了", //attempts/completion accordion header
	"subHdrPagingTools": "ページング", // Title for paging tools
	"subHdrShuffleQuiz": "クイズのシャッフル",// Title for shuffle quiz tool(s)
	"subHdrDisplayTools": "表示", // Title for display tools
	"shuffleDescription": "クイズ内の質問やセクションをシャッフルします。サブセクションにカスケードしません。", // description for question shuffling behavior
	"shuffleSummary": "質問のシャッフル", // summary text for shuffle quiz questions
	"hintsToolDescription": "ヒントの許可", // decription for hints tool
	"hintsAllowedSummary": "ヒントを許可しました", // summary text when hints are enabled,
	"passwordLabel": "パスワード", // Label for the quiz password text input field
	"passwordSummary": "パスワード保護", // summary text when quiz has a password
	"disableRightClickDescription": "右クリックの無効化", // description for disable right click
	"disableRightClickSummary": "右クリックは無効です", // summary text when right clicks are disabled
	"preventMovingBackwardsDescription": "前のページに戻らないようにする",
	"disablePagerAndAlertsDescription": "Brightspace 内の電子メール、ページャー、アラートの無効化", // description for blocking communications / disable pager and alerts during a quiz
	"disablePagerAndAlertsSummary": "アラートと通信がブロックされました", // summary text when communications / pager and alerts are disabled
	"emailNotificationSummary": "電子メールによる試行の通知", // summary for email notification
	"preventMovingBackwardsSummary": "ページングの制限", // summary for prevent moving backwards checkbox
	"dividerHeader": "質問", // The header that is displayed on the divider
	"previewLabel": "プレビュー", // The label text for the preview button
	"hdrReleaseConditions": "リリース条件", // release conditions heading
	"hlpReleaseConditions": "ユーザーはリリース条件を満たしていない限り、クイズにアクセスできず、クイズを表示することもできません。", // release conditions help
	"hdrEvaluationAndFeedback": "評価とフィードバック", // evaluation/feedback accordion header
	"subHdrAutomaticGrades": "自動成績評価", // Title for automatic grade tool
	"autoSetGradedDescription": "完了後直ちに試行の結果を自動公開", // description for automatic grade checkbox
	"autoSetGradedSummary": "結果の自動公開", // summary for auto set graded checkbox
	"passwordDescription": "このパスワードを入力したユーザーだけにクイズの書き込みアクセスが認められます。", // description for password input
	"hlpSubmissionNotificationEmail": "クイズが試行されたときに通知を受け取るには、1 つの電子メールを入力するか複数の電子メールをカンマで区切って入力します。", // description for email notification input
	"autoSetGradedAccessibleHelpText": "ヘルプの表示 - 自動成績評価", // accessible help text for autoSetGraded question mark button
	"autoSetGradedHelpDialogTitle": "情報: 完了後直ちに試行の結果を自動公開", // title that appears when the autoSetGraded help dialog is rendered
	"autoSetGradedHelpDialogConfirmationText": "OK", // copy that appears on the autoSetGraded help dialog confirmation button
	"autoSetGradedHelpDialogParagraph1": "この機能をオンにすると、自動評価された試行の結果が公開され、受講者に表示されます。", // content for paragraph 1 of autoSetGraded help dialog
	"autoSetGradedHelpDialogParagraph2": "注意: 質問がシステムによって評価されない場合（記述回答式質問など）、これらの質問は、手動評価まで自動的に 0 点とされます。", // content for paragraph 2 of autoSetGraded help dialog
	"autoSetGradedHelpDialogParagraph3": "", // content for paragraph 3 of autoSetGraded help dialog
	"disableAlertsHelpDialogTitle": "情報: Brightspace 内の電子メール、ページャー、アラートの無効化", // title that appears when the disable alerts help dialog is rendered
	"disableAlertsHelpDialogContent": "このオプションをオンにすると、クイズの試行が進行中である間、受講者は Brightspace 電子メール、ページャー、アラートにアクセスできなくなります。", // content that appears when the disable alerts help dialog is rendered
	"disableAlertsHelpDialogConfirmationText": "OK", // copy that appears on the disable alerts help dialog confirmation button
	"disableAlertsAccessibleHelpText": "ヘルプの表示 - Brightspace 内の電子メール、ページャー、アラートの無効化", // accessible help text for disable alerts question mark button
	"disableRightClickAccessibleHelpText": "ヘルプの表示 - 右クリックの無効化", // accessible help text for disable right click question mark button
	"disableRightClickHelpDialogTitle": "情報: 右クリックの無効化", // title that appears when the disable right click help dialog is rendered
	"disableRightClickHelpDialogParagraph1": "この機能によって、受講者は試行中に質問を右クリックしてクイズの質問を印刷できなくできます。ただし、受講者はブラウザ以外の他の技術によってクイズ画面を取り込めます。", // content for paragraph 1 of disable right click help dialog
	"disableRightClickHelpDialogParagraph2": "受講者が質問のテキストをコピーして貼り付けられないように、特定のアクセシビリティワークフローはブロックされます。", // content for paragraph 2 of disable right click help dialog
	"disableRightClickHelpDialogConfirmationText": "OK", // copy that appears on the disable right click help dialog confirmation button
	"manageTimingDialogConfirmationText": "OK", // copy that appears on the Timing dialog confirmation button
	"manageTimingDialogCancelText": "キャンセル", // copy that appears on the Timing dialog cancel button
	"description": "説明", // Description label for the Description text input box,
	"btnOpenIpRestrictionDialog": "IP 制限の管理", // Button text for opening IP restriction dialog
	"hdrIpRestrictionDialog": "IP 制限（IPv4）", // timing/display accordion header
	"ipRestrictionLabel": "IP 制限", // Label for IP restrictions editor
	"minutesLabel": "分",  // label for Timing dialog time limit input slot
	"minutesBeforeFlaggedLabel": "時間制限超過と判断されるまでの時間（分）。", // label for Timing dialog grace period input slot
	"extendedDeadlineLabel": "延長された締め切り",  // label for timing dialog - extended deadline select
	"extendedDeadlineInputLabel": "猶予期間終了後の経過時間（分）",  //label for Timing dialog extended deadline select slot
	"subHdrExceededTimeLimitBehaviour": "時間制限超過時の挙動", // Title for submission late type options,
	"exceededTimeLimitBehaviourPrefix": "猶予期間が過ぎると、クイズの試行は時間制限超過と判断され、次のオプションが適用されます。", // label for submission label type options
	"showClockLabel": "クイズが始まる前に表示する", // Label for show clock checkbox
	"showClockTitle": "クロックの表示", // Title for show clock
	"manageAttemptsDialogConfirmationText": "OK", // copy that appears on the Attempts dialog confirmation button
	"manageAttemptsDialogCancelText": "キャンセル", // copy that appears on the Attempts dialog cancel button
	"subHdrAttemptsTools": "試行", // Title for attempts tools
	"manageAttempts": "試行の管理", // Label for button to launch attempts dialog
	"textIsDisplayedPart1": "クイズ新規作成エクスペリエンスでは、フィールドをオフに切り替えられません。", // First sentence of alert warning that text fields will be visible
	"textIsDisplayedSingularPart2": "クイズが保存されると、受講者に {field} フィールドが表示されます。", // Second sentence of alert warning that text fields will be visible, when there is only one field
	"introMovedToDescription": "クイズは、概要をサポートしていません。［概要］フィールドの既存のコンテンツが［説明］フィールドに表示されます。", // Alert warning that existing quiz introduction has been removed and that the text in the introduction has been put into the quiz description
	"attemptsAllowed": "許可された試行", // Title for Attempts Allowed select in Attempts dialog
	"quizAttemptsAllowedSummary": "{numAttemptsAllowed, plural, =1 {1 件の許可された試行} other {{numAttemptsAllowed} 件の許可された試行}}", //
	"overallGradeCalculation": "全体の成績算定", // Title for Overall Grade Calculation select in Attempts dialog
	"retakeIncorrectQuestionsOnly": "不正解の質問のみの再受験", // Title for RIO checkbox in Attempts dialog
	"rioCheckboxLabel": "新しい試行では、前回不正解だった質問に対してのみ回答ができます。", // Label for RIO checkbox in Attempts dialog
	"btnAttemptConditions": "試行の条件", // Label for Attempt Conditions button in Attempts dialog
	"rioAccessibileHelpText": "ヘルプの表示 - 不正解のみの再受験", // accessible help text for RIO question mark button
	"rioDialogTitle": "情報: 不正解の質問のみの再受験", // Title for RIO help dialog
	"rioDialogParagraph": "この設定を選択すると、クイズに 2 回以上挑戦した受講者は、前回の挑戦で不正解だった質問にしか答えることができません。", // content for RIO dialog
	"rioDialogParagraph2": "自動公開を使用している場合、記述回答式の質問は 0 とマークされ、手動で成績評価されるまで今後の試行に含まれます。", // second paragraph for RIO dialog
	"rioDialogConfirmationText": "OK", // copy that appears on the RIO help dialog confirmation button
	"ipRestrictionDialogDescription": "定義済みの制限を満たす IP アドレスを使用してアクセスした受講者のみがクイズに書き込めます。", // guidelines for IP restrictions dialog
	"btnIpRestrictionsDialogAdd": "追加", // text for IP restrictions dialog "Add" button
	"btnIpRestrictionsDialogBtnCancel": "キャンセル", // text for IP restrictions dialog "Cancel" button
	"ipRestrictionsDialogAddNewRange": "IP 範囲", // text for IP restrictions dialog "Add new IP range" button
	"ipRestrictionsTableStartRangeHdr": "IP 範囲の開始", // text for IP restrictions table header start
	"ipRestrictionsTableEndRangeHdr": "IP 範囲の終了", // text for IP restrictions table header end
	"ipRestrictionsTableDeleteRangeHdr": "削除", // text for IP restrictions table header delete
	"ipRestrictionsValidationError": "無効な IP アドレス形式です。囲まれたフィールドを修正してください。IP アドレスの例: 155.55.5.15", // error message for invalid IP addresses
	"ipRestrictions500Error": "問題が発生しました。もう一度試してください。", // error message for IP restrictions 500 response
	"ipRestrictionsHelpTxtConfirmation": "OK", // confirmation text on IP restrictions help dialog
	"hdrIpRestrictionsHelpDialog": "情報: IP 制限（IPv4）", // timing/display accordion header
	"hdrIpRestrictionsHelpDialogP1": "許可される IP アドレスの範囲を指定する場合は、［IP 範囲の開始］フィールドと［IP 範囲の終了］フィールドそれぞれに、0～255 の範囲の値をピリオド区切りで 4 セット入力します。", // IP restrictions help dialog paragraph 1
	"hdrIpRestrictionsHelpDialogP2": "IP アドレスの例: 155.55.5.15", // IP restrictions help dialog paragraph 2
	"hdrIpRestrictionsHelpDialogP3": "個別の許可される IP アドレスを含めるには、IP 範囲の開始値のみを指定します。", // IP restrictions help dialog paragraph 3
	"hdrIpRestrictionsHelpDialogP4": "注: IP 範囲の開始値は、IP 範囲の終了値より小さくする必要があります。", // IP restrictions help dialog paragraph 4
	"hdrSpecialAccess": "特殊なアクセス", // special access heading,
	"hlpSpecialAccess": "Special Access allows quizzes to be available to only a select group of users or individualized due dates for certain users.", // special access help
	"specialAccessRestrictedText": "Only users with special access can see this quiz", // restricted special access description
	"ipRestrictionsAccessibileHelpText": "ヘルプの表示 - IP 制限", // accessible help text for IP restrictions question mark button
	"attemptConditions": "試行の条件", // Header for Attempts Conditions section in Attempts dialog
	"attemptConditionsParagraph1": "受講者が別の試行を受ける資格を得るには、前回の試行で達成する必要がある最小、最大のパーセンテージ値を 0～100 の間で設定します。", // content for paragraph1 on the Attempts dialog Attempts Condition section
	"attemptConditionsParagraph2": "最小フィールドまたは最大フィールドが空欄の場合は、試行範囲のその部分に制限は適用されません。", // content for paragragh2 on the Attempts dialog Attempts Condition section
	"attemptConditionsRangePrefixText1": "試行中 {index}:", // prefix text 1 for Attempt Conditions range editor on Attempts dialog
	"attemptConditionsRangePrefixText2": "受講者は次の間を達成する必要があります。", // prefix text 2 for Attempt Conditions range editor on Attempts dialog
	"attemptConditionsRangeSuffixText1": "リリースする", //suffix text 1 for Attempts Conditions range editor on Attempts dialog
	"attemptConditionsRangeSuffixText2": "{next} の試行", // suffix text 2 for Attempts Condition range editor on Attempts dialog
	"minLabel": "最小:", // label for Min input on Attempts Conditions range editor on Attempts Dialog
	"maxLabel": "最大:", // label for Max input on Attempts Conditions range editor on Attempts Dialog
	"andRangeText": "と", // copy on Attempts Condition range editor on Attempts Dialog
	"percentageRangeText": "%", // copy on Attempts Condition range editor on Attempts Dialog
	"ipRestrictionsSummary": "IP 制限", // summary to be displayed when a quiz has ip restrictions
	"ipRestrictionsInnerSummary" : "{count, plural, =1 {1 件の制限} other {{count} 件の制限}}", // summary to be displayed when accordion is expanded
	"quizTimingValidationError": "タイミングは変更できません、囲まれたフィールドを修正してください。", // Appears in error alert when validation fails in Manage Timing dialog
	"quizTimingServerError": "問題が発生しました。もう一度試してください。", // Timing save server error alert message
	"quizTimingRecommendedSummary": "推奨時間制限 ({numMinutes, plural, =1 {1 分} other {{numMinutes} 分}})", // Recommended time limit (x minute) or (x minutes).
	"quizTimingEnforcedSummary": "時間制限の強制 ({numMinutes, plural, =1 {1 分} other {{numMinutes} 分}})", // Enforced time limit(x minute) or (x minutes).
	"ipRestrictionsDuplicateError": "IP 範囲の開始アドレスが重複しています。各 IP 範囲の開始値は一意である必要があります。", // Error for duplicate IP
	"ipRestrictionsRangeError": "無効な IP アドレス範囲が指定されました。範囲が正しい形式になっていることを確認してください。", // Error for invalid IP ranges
	"quizAttemptsValidationError": "試行は変更できません、囲まれたフィールドを修正してください。", // Appears in error alert when validation fails in Manage Attempts dialog
	"totalPoints": "合計ポイント {scoreOutOf}", // Total points text that appears on quiz editor above list of questions
	"subHdrHeaderFooter": "ヘッダーとフッター", // Header and Footer accordion header
	"manageHeaderFooterButton": "ヘッダーとフッターの管理", // Label for button to launch Header and Footer dialog
	"headerFooterDialogTitle": "ヘッダーとフッター",
	"manageHeaderFooterDialogAddText": "追加", // Label for Add button for header and footer dialog
	"manageHeaderFooterDialogCancelText": "キャンセル", // Label for Cancel button header and footer dialog
	"headerLabel": "ヘッダー", // Label for the header text box
	"headerDialogText": "クイズのヘッダーとフッターは、クイズの上部と下部にそれぞれ表示されます。", // Header and Footer dialog text
	"header": "ヘッダー", // Header label for the header text box.
	"headerAdded": "ヘッダーを追加しました", // Header added summary text for Timing and Display accordion.
	"footerAdded": "フッターが追加されました", // Footer added summary text for Timing and Display accordion.
	"headerAndFooterAdded": "ヘッダーとフッターを追加しました", // Header and footer added text for Timing and Display accordion.
	"footer": "フッター", // Footer lable for the footer text box.
	"footerLabel": "フッター", // Label for the footer text box.
	"headerAndFooter": "ヘッダーとフッターを追加しました", // Header and footer summary text for closed accordion
	"createNewLabel": "新規作成", // Label for button to open menu for adding new items to the quiz.
	"addExistingLabel": "既存の追加", // Label for button to open menu for adding pre-existing items to the quiz.
	"addQuestionsLabel": "新規の質問", // Label for button to open menu for adding new questions to the quiz.
	"submissionViewHeading1": "When published, display to learners:", // Label for checkbox in submission view container.
	"submissionViewHeading2": "と", // Label for submission view dropdown in submission view container.
	"submissionViewCheckboxLabel": "Attempt grade", // Text next to the submission view checkbox in the container.
	"submissionViewButtonText": "Customize quiz results display", // Text for the button at the bottom of the submission view container.
	"gradeOutOf": "満点の成績" // Label for the grade-out-of field when creating/editing an activity
};
