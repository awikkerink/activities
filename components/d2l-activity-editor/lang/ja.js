/* eslint quotes: 0 */

export default {
	"editor.btnEditReleaseConditions": "リリース条件の編集", // edit release conditions button
	"editor.btnAddReleaseCondition": "リリース条件の追加", // add release condition button
	"editor.btnCreateNew": "新規作成", // create new button
	"editor.btnAddExisting": "既存の追加", // add existing button
	"editor.btnRemoveCondition": "条件の削除", // remove condition button
	"editor.lblConditionsOperator": "この項目を見るには、次の条件を満たしている必要があります", // conditions operator label
	"editor.txtConditionAdded": "条件: {title} が追加されました",
	"editor.txtConditionRemoved": "条件: {title} が削除されました",
	"editor.txtConditionsAdded": "{count} 個の条件が追加されました",
	"editor.txtNumReleaseConditions": "{count, plural, =1 {{count} 個のリリース条件} other {{count} 個のリリース条件}}", // num release condition text
	"editor.txtNumSpecialAccess": "{userCount, plural, =1 {特殊なアクセスを持つ 1 人のユーザー} other {特殊なアクセスを持つ {userCount} 人のユーザー}}", // num users with special access text
	"editor.btnCancel": "キャンセル", // cancel button
	"editor.btnSave": "保存して閉じる", // save and close button
	"editor.btnSaveMobile": "保存", // save and close button for mobile devices
	"editor.dueDate": "期限", // ARIA label for the due date field when creating/editing an activity
	"editor.endDate": "終了日", // ARIA label for the end date field when creating/editing an activity
	"editor.startDate": "開始日", // ARIA label for the start date field when creating/editing an activity
	"editor.dueTime": "期限時刻", // ARIA label for the due time field when creating/editing an activity
	"editor.endTime": "終了時刻", // ARIA label for the end time field when creating/editing an activity
	"editor.startTime": "開始時刻", // ARIA label for the start time field when creating/editing an activity
	"editor.hidden": "非表示", // Label displayed with the visibility switch when hidden
	"editor.noDueDate": "期限がありません", // Placeholder text for due date field when no due date is set
	"editor.noEndDate": "終了日がありません", // Placeholder text for due date field when no due date is set
	"editor.noStartDate": "開始日がありません", // Placeholder text for due date field when no due date is set
	"editor.visible": "表示", // Label displayed with the visibility switch when visible
	"editor.txtAvailabilityStartAndEnd": "使用可能期間開始日 {startDate}、終了日 {endDate}", // start/end text
	"editor.txtAvailabilityStartOnly": "使用可能期間開始日 {startDate}", // start only text
	"editor.txtAvailabilityEndOnly": "使用可能期間終了日 {endDate}", // end only text
	"editor.txtAvailabilityNeither": "常に使用可能", // always available text
	"editor.ungraded": "成績評価なし", // State of score field when there is no score and no grade item, when creating/editing an activity
	"editor.inGrades": "成績にあり", // State of the grades field when there is a score, and an associated grade item
	"editor.notInGrades": "成績になし", // State of the grades field when there is a score, but no associated grade item
	"editor.addToGrades": "成績に追加", // Menu item for adding grade association
	"editor.addAGrade": "成績の追加", //ARIA label to add a grade to the activity
	"editor.removeFromGrades": "成績から削除", // Menu item for removing grade association
	"editor.setUngraded": "成績評価なしにリセット", // Menu item for setting the activity to ungraded
	"editor.scoreOutOf": "満点スコア", // ARIA label for the score out of field, when creating/editing an activity
	"editor.emptyScoreOutOfError": "成績にあるアクティビティについてポイント値を指定する必要があります", // Error message to inform user that the score out of value is a required field when a grade item is associated
	"editor.invalidScoreOutOfError": "満点スコアは 0.01 以上 9,999,999,999 以下の数値にする必要があります。", // Error message when an invalid score out of value is entered
	"editor.loading": "読み込み中...", // Message displayed while page is loading
	"editor.ok": "OK", // Text of dialog button to commit action
	"editor.cancel": "キャンセル", // Text of dialog button to cancel action
	"editor.ariaToolbarShortcutInstructions": "ツールバーを表示するには ALT-F10 キーを、ツールバーを終了するにはツールバーにカーソルを置いた状態で ESC キーを押します。", // Instructions for screenreader users on how to enter and exit the html editor toolbar
	"editor.chooseFromGrades": "成績から選択", // Link text and dialog title for the edit grades dialog,
	"editor.editLinkExisting": "既存の項目の編集またはリンク", // New Link text and dialog title for the edit grades dialog,
	"editor.hdrRubrics": "注釈", //Header for the rubrics section
	"editor.startBeforeEndDate": "開始日は終了日の前である必要があります",
	"editor.dueBetweenStartEndDate": "期限は開始日の後および終了日以前である必要があります",
	"editor.dueAfterStartDate": "期限は開始日の後である必要があります",
	"editor.dueBeforeEndDate": "期限は終了日以前である必要があります",
	"editor.createAndLinkToNewGradeItem": "新規成績項目の作成および新規成績項目へのリンク", //Radio button text
	"editor.linkToExistingGradeItem": "既存の成績項目へのリンク", //Radio button text
	"editor.points": "ポイント: {points}", // Text label for displaying points of a grade
	"editor.noGradeItems": "既存の成績項目がありません", // Reason why existing grade items cannot be linked in the choose grades dialog
	"editor.noGradeCreatePermission": "新規成績項目を作成する権限がありません", // Reason why a new grade items cannot be created in the choose grades dialog
	"editor.competencies": "学習目的", //Text label for the competencies tool integration
	"editor.manageCompetencies": "学習目的の管理", //Button text to launch competencies tool dialog
	"editor.competenciesCount": "{count, plural, =1 {1 個添付} other {{count} 個添付}}", //Label for number of associated competencies
	"editor.noLearningObjectives": "学習目的がありません", //text label when there are no associated learning objectives
	"editor.competenciesCountSummary": "{count, plural, =1 {1 個の学習目的} other {{count} 個の学習目的}}", // num release condition text
	"editor.unevaluatedCompetencies": "{count, plural, =1 {1 件評価なし} other {{count} 件評価なし}}", //Label for number of unevalated associated competencies
	"editor.btnClose": "閉じる", //Label for Close button
	"editor.btnCloseDialog": "このダイアログを閉じる", // close dialog button
	"editor.btnManageSpecialAccess": "特殊なアクセスの管理", // manage special access button
	"editor.saveSuccessful": "正常に保存されました", // alert message after a successful save
	"editor.specialAccessRestrictedText": "特殊なアクセスを持つユーザーのみがこのフォルダを表示することができます", // restricted special access description
	"editor.specialAccessNotRestrictedText": "ユーザーは、通常の利用可能日以外の日にも送信することができます", // not restricted special access description
	"editor.specialAccessCount": "特殊なアクセスを持つ {count, plural, =1 {1 人のユーザー} other {{count} 人のユーザー}}", // Label for number of special access users
	"editor.noUsersWithSpecialAccess": "ユーザーはいません", // text label when there are no users with special access
	"editor.specialAccessDialogTitle": "特殊なアクセスの管理", // Dialog title
	"editor.specialAccessHidden": "特殊なアクセスで非表示", // Warning label that the activity is restricted but is being hidden from all users by special access rules
	"editor.discardChangesTitle": "変更を破棄しますか？", // Discard Changes User Prompt
	"editor.discardChangesQuestion": "この変更を破棄してもよろしいですか？", // Discard Changes User Prompt
	"editor.yesLabel": "はい",
	"editor.noLabel": "いいえ",
	"editor.notificationEmailLabel": "通知電子メール", // Label for notification email input field
	"editor.invalidNotificationEmailError": "有効な電子メールアドレスを入力してください", // error shown on tooltip when notification email is invalid
	"editor.gradeOutOf": "満点の成績", // ARIA label for the grade out of field, when creating/editing an activity
	"editor.inGradebook": "グレードブック（成績表）中にあり", // New state of the grades field when there is a score, and an associated grade item
	"editor.notInGradebook": "グレードブック（成績表）中になし", // New state of the grades field when there is a score, but no associated grade item
	"editor.addToGradebook": "グレードブック（成績表）に追加", // New menu item for adding grade association
	"editor.beforeStartDate": "開始前:", //Text for before start availability date type
	"editor.afterEndDate": "終了後:", //Text for after end availability date type
	"editor.lblVisibleWithAccessRestricted": "アクセスが制限されている状態で表示", //Text for after end availability date type
	"editor.lblVisibleWithSubmissionRestricted": "送信が制限されている状態で表示", //Text for after end availability date type
	"editor.lblHidden": "非表示", //Text for after end availability date type

	"rubrics.btnAddRubric": "注釈の追加", //text for add rubric button
	"rubrics.btnCreateNew": "新規作成", //Text for create new dropdown
	"rubrics.hdrCreateRubric": "注釈の作成", // Header for creating a new rubric
	"rubrics.btnDetach": "取り外し", //Text for the button to confirm detaching a rubric
	"rubrics.btnAddExisting": "既存の追加", //Text for Add Existing dropdown
	"rubrics.hdrRubrics": "注釈", //Header for the rubrics section
	"rubrics.btnAttachRubric": "注釈の添付", //Button for the attach new rubric overlay
	"rubrics.btnCancel": "キャンセル", //Button for canceling out of the attach new rubric overlay
	"rubrics.txtAddExisting": "既存の追加", //Title for the attach rubrics dialog,
	"rubrics.txtNoRubricAdded": "追加された注釈がありません", // rubric summary for no rubrics
	"rubrics.txtRubricsAdded": "{count, plural, =1 {1 つの注釈が追加されました} other {{count} 個の注釈が追加されました}}", // count of asoociated rubrics
	"rubrics.txtDeleteRubric": "注釈の削除", // Text for deleting rubric icon
	"rubrics.txtRubricAdded": "注釈が追加されました", // Text for notifying screenreader rubric was added
	"rubrics.txtRubricRemoved": "注釈が削除されました", // Text for notifying screenreader rubric was removed
	"rubrics.txtConfirmDetachRubric": "注釈を取り外すと、このアクティビティの注釈の以前の評価はすべて削除されます。注釈を取り外しますか？", //Text for the dialog to confirm detaching a rubric from an evaluated activity
	"rubrics.defaultScoringRubric": "デフォルトのスコア注釈", // Sub heading for the default scoring rubric select dropdown
	"rubrics.noDefaultScoringRubricSelected": "デフォルトが選択されていません", // option in default scoring rubric when no default scoring rubric selected

	"grades.points": "ポイント: {points}", // Text label for displaying points of a grade
	"grades.weight": "加重: {weight}", // Text label for displaying weight of a grade
	"grades.gradeItem": "成績項目", //ARIA label for grade-item picker when linking an activity to an existing grade item
	"grades.gradeUnits": "ポイント", // unit label for GradeOutOf value (e.g. 10 points)
	"grades.gradeUnitsSingular": "ポイント", // unit label for GradeOutOf value when value is 1
	"grades.chooseNewGradeItemCategory": "成績カテゴリの選択", // Label for add category button
	"grades.newGradeItemCategory": "成績カテゴリ", // Label for selecting a category dropdown
	"grades.noGradeItemCategory": "カテゴリなし", // Category dropdown text for not selecting a category
	"grades.changeNewGradeTypeAndScheme": "成績タイプとスキームの変更", // Label for change type and scheme button
	"grades.chooseNewGradeScheme": "成績スキームの選択", // Label for choose grade scheme button (when there is only one type)
	"grades.newGradeType": "成績タイプ", // Label for the grade type
	"grades.newGradeTypeNumeric": "数値", // Label for numeric grade type radio option
	"grades.newGradeTypeSelectbox": "選択ボックス", // Label for selectbox grade type radio option
	"grades.numericDescription": "指定した合計ポイント数から値を割り当てることにより、ユーザーに成績を付けます。", // Description of numeric grade type
	"grades.numericDescriptionExample": "例: 8/10", // Example of numeric grade type
	"grades.selectboxDescription": "成績に最も一致する成績スキームレベルを選択することにより、ユーザーに成績を付けます。", // Description of selectbox grade type
	"grades.selectboxDescriptionExample": "例: 「とても良い」または「B+」", // Example of selectbox grade type
	"grades.newGradeScheme": "成績スキーム", // Label for the grade scheme
	"grades.defaultGradeScheme": "-- デフォルト -- （{schemeName}）", // name of default grade scheme
	"grades.creatingNewNumericGradeItem": "数値の成績項目 {newGradeName} を新規作成", // Aria text for new grade we are creating
	"grades.creatingNewSelectboxGradeItem": "選択ボックスの成績項目 {newGradeName} を新規作成", // Aria text for new grade we are creating
	"grades.linkingToGradeItem": "既存の成績項目 {gradeName} にリンク", // Aria text for grade item we are linking to
	"grades.gradeOutOfMenuItem": "成績に占める割合とは", // menu item to launch gradeOutOf help dialog
	"grades.gradeOutOfHelpDialogTitle": "情報: 成績に占める割合", // title that appears when the gradeOutOf help dialog is rendered
	"grades.gradeOutOfHelpDialogConfirmationText": "OK", // text that appears on the gradeOutOf help dialog confirmation button
	"grades.gradeOutOfHelpDialogParagraph1": "クイズが「グレードブック（成績表）にない」場合、［満点の成績］には質問の合計ポイントが反映されます。", // content for paragraph 1 of gradeOutOf help dialog
	"grades.gradeOutOfHelpDialogParagraph2": "クイズが「グレードブック（成績表）にある」場合、［成績に占める割合］は最大ポイントまたは［成績］ツールの重みです。", // content for paragraph 2 of gradeOutOf help dialog

	"attachments.addGoogleDriveLink": "Google ドライブから添付", // Tooltip for a button that adds a link to a Google Drive file
	"attachments.addFile": "ファイルアップロード", // Tooltip for a button that opens a file upload dialog
	"attachments.addLink": "ウェブリンクの添付", // Tooltip for a button that adds a link to a URL
	"attachments.addOneDriveLink": "OneDrive から添付", // Tooltip for a button that adds a link to a OneDrive file
	"attachments.addQuicklink": "既存アクティビティへのリンクの添付", // Tooltip for a button that adds a link to an existing activity
	"attachments.back": "戻る", // Text for a back button
	"attachments.closeDialog": "ダイアログを閉じる", // ARIA text for button to close dialog
	"attachments.recordAudio": "オーディオの録音", // Text for a button that opens a dialog to record audio
	"attachments.recordVideo": "ビデオの録画", // Text for a button that opens a dialog to record video
	"attachments.save": "保存", // Text for a save button,
	"attachments.attach": "添付", // Text for Attach button to open attachment row
	"attachments.addGoogleDriveLinkMenu": "Google ドライブ", // Attach menu item text
	"attachments.addFileMenu": "ファイルアップロード", // Attach menu item text
	"attachments.addLinkMenu": "ウェブリンク", // Attach menu item text
	"attachments.addOneDriveLinkMenu": "OneDrive", // Attach menu item text
	"attachments.addQuicklinkMenu": "既存アクティビティ", // Attach menu item text

	"content.name": "名前", // Text label for name input field
	"content.emptyNameField": "名前は必須です。", // Error text that appears below name field when it is left empty
	"content.description": "説明", // Text label for description input field
	"content.pageContent": "ページコンテンツ", // Text label for page content input field (html files)
	"content.selectTemplate": "テンプレートの選択", // The label text for the subtle-button for selecting an html template
	"content.htmlTemplatesLoading": "読み込み中...", // Message displayed while list of html templates is loading
	"content.noHtmlTemplates": "使用可能なテンプレートはありません", // Message displayed in dropdown when no html templates are found
	"content.defaultHtmlTemplateHeader": "HTML ファイルのテンプレート", // The text to display as the default header for the html template select dropdown
	"content.browseForHtmlTemplate": "テンプレートの参照", // Text for button to browse for an html template
	"content.availabilityHeader": "使用可能日", // availability header
	"content.saveError": "コンテンツ項目は保存されませんでした。赤で囲まれたフィールドを修正してください。", // Error message to inform the user that there was a problem saving the content item, instructing them to correct invalid fields
	"content.displayOptions": "表示オプション", // Text label for display options
	"content.addDueDate": "期限の追加", // Text label for name input field
	"content.embedOnPage": "ページに埋め込み", // Text label for link radio button
	"content.openNewTab": "新規タブで開く（推奨）", // Text label for link radio button
	"content.openNewTabRecommendation": "リソースに対する認証の問題を回避するには、このオプションを推奨します。", // Text for the help icon that explains reason for recommending new tab option
	"content.openNewTabHelp": "ページにとどまった時間は追跡されません。", // Text for the help icon next to link radio button
	"content.link": "リンク", //Text label for link input field
	"content.emptyLinkField": "リンクは必須です。", //Error message shown on link tooltip when the link is empty
	"content.invalidLink": "有効な URL を入力してください。", //Error message shown on link tooltip when the link is not formatted correctly
	"content.notHttps": "埋め込みできるのは「https」を使ったリンクのみです。", //Error message shown on link tooltip when https is not used for embedded links
	"content.noEmbed": "そのサイトを埋め込むことはできません。", //Error message shown on link tooltip when the link cannot be embedded
	"content.previewLabel": "プレビュー", // The label text for the link preview
	"content.openInNewWindow": "新規ウィンドウで開く", // The label text for the subtle-button for opening a LTI link in a new window
	"content.externalActivity": "外部アクティビティ", // The label text for the external activity section on the LTI link page
	"content.externalActivityOpened": "アクティビティの内容を表示するには新しいウィンドウで開きます。", // Text for displaying underneath the LTI link jump logo
	"content.externalActivityEmbeddedNotAllowed": "この外部アクティビティは埋め込みをサポートしていません。新しいウィンドウで開くことでのみ表示できます。", // Text that replaces the LTI display options if embedding is not allowed
	"content.confirmDialogTitle": "既存のコンテンツは削除されます。", // The text for the title of the replace html template confirmation dialog
	"content.confirmDialogBody": "既存のコンテンツをこのテンプレートに置き換えてもよろしいですか？", // The text for the body of the replace html template confirmation dialog
	"content.confirmDialogActionOption": "置換", // The text for the confirmation action to replace content
	"content.confirmDialogCancelOption": "キャンセル", // The text for the cancel action to not replace content
	"content.useEmbeddedPlayer": "埋め込まれたプレーヤーの使用", // The text for using the embedded player
	"content.scormActivity": "SCORM パッケージ", // The label for the name of the SCORM package
	"content.lastEdited": "最後の編集日", // The date when the entity was last edited
	"content.externalFile": "External file", // The text to use for labeling external files
	"content.advancedEditing": 'Advanced Editing', // The text to use on the advanced editing button
	"content.fileHasCaptions": "This file has captions in", // The text to use preceding the list of captions
};
