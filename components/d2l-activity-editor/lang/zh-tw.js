/* eslint quotes: 0 */

export default {
	"editor.btnEditReleaseConditions": "編輯發佈條件", // edit release conditions button
	"editor.btnAddReleaseCondition": "新增發佈條件", // add release condition button
	"editor.btnCreateNew": "建立新的", // create new button
	"editor.btnAddExisting": "新增現有的", // add existing button
	"editor.btnRemoveCondition": "移除條件", // remove condition button
	"editor.lblConditionsOperator": "如果要檢視此項目，使用者必須符合", // conditions operator label
	"editor.txtConditionAdded": "已新增條件：{title}",
	"editor.txtConditionRemoved": "已移除條件：{title}",
	"editor.txtConditionsAdded": "已新增 {count} 個條件",
	"editor.txtNumReleaseConditions": "{count, plural, =1 {{count} 個發佈條件} other {{count} 個發佈條件}}", // num release condition text
	"editor.txtNumSpecialAccess": "{userCount, plural, =1 {1 位使用者具有特殊存取權限} other {{userCount} 位使用者具有特殊存取權限}}", // num users with special access text
	"editor.btnCancel": "取消", // cancel button
	"editor.btnSave": "儲存並關閉", // save and close button
	"editor.btnSaveMobile": "儲存", // save and close button for mobile devices
	"editor.dueDate": "截止日期", // ARIA label for the due date field when creating/editing an activity
	"editor.endDate": "結束日期", // ARIA label for the end date field when creating/editing an activity
	"editor.startDate": "開始日期", // ARIA label for the start date field when creating/editing an activity
	"editor.dueTime": "截止時間", // ARIA label for the due time field when creating/editing an activity
	"editor.endTime": "結束時間", // ARIA label for the end time field when creating/editing an activity
	"editor.startTime": "開始時間", // ARIA label for the start time field when creating/editing an activity
	"editor.hidden": "已隱藏", // Label displayed with the visibility switch when hidden
	"editor.noDueDate": "沒有截止日期", // Placeholder text for due date field when no due date is set
	"editor.noEndDate": "沒有結束日期", // Placeholder text for due date field when no due date is set
	"editor.noStartDate": "沒有開始日期", // Placeholder text for due date field when no due date is set
	"editor.visible": "顯示", // Label displayed with the visibility switch when visible
	"editor.txtAvailabilityStartAndEnd": "可用情況開始於 {startDate} 並結束於 {endDate}", // start/end text
	"editor.txtAvailabilityStartOnly": "可用情況開始於 {startDate}", // start only text
	"editor.txtAvailabilityEndOnly": "可用情況結束於 {endDate}", // end only text
	"editor.txtAvailabilityNeither": "一律可用", // always available text
	"editor.ungraded": "未評分", // State of score field when there is no score and no grade item, when creating/editing an activity
	"editor.inGrades": "在「成績」中", // State of the grades field when there is a score, and an associated grade item
	"editor.notInGrades": "未在「成績」中", // State of the grades field when there is a score, but no associated grade item
	"editor.addToGrades": "新增至「成績」", // Menu item for adding grade association
	"editor.addAGrade": "新增成績", //ARIA label to add a grade to the activity
	"editor.removeFromGrades": "自「成績」中移除", // Menu item for removing grade association
	"editor.setUngraded": "重設為未評分", // Menu item for setting the activity to ungraded
	"editor.scoreOutOf": "總分", // ARIA label for the score out of field, when creating/editing an activity
	"editor.emptyScoreOutOfError": "「成績」中的活動必須指定分數值", // Error message to inform user that the score out of value is a required field when a grade item is associated
	"editor.invalidScoreOutOfError": "「總分」必須大於或等於 0.01，並小於或等於 9,999,999,999", // Error message when an invalid score out of value is entered
	"editor.loading": "正在載入...", // Message displayed while page is loading
	"editor.ok": "確定", // Text of dialog button to commit action
	"editor.cancel": "取消", // Text of dialog button to cancel action
	"editor.ariaToolbarShortcutInstructions": "按下 ALT-F10 可存取工具列，按下 ESC 可退出工具列 (若已進入)。", // Instructions for screenreader users on how to enter and exit the html editor toolbar
	"editor.chooseFromGrades": "從「成績」中選擇", // Link text and dialog title for the edit grades dialog,
	"editor.editLinkExisting": "編輯或連結至現有的", // New Link text and dialog title for the edit grades dialog,
	"editor.hdrRubrics": "量規", //Header for the rubrics section
	"editor.startBeforeEndDate": "開始日期必須在結束日期之前",
	"editor.dueBetweenStartEndDate": "截止日期必須在開始日期之後，並在結束日期當日或之前",
	"editor.dueAfterStartDate": "截止日期必須在開始日期之後",
	"editor.dueBeforeEndDate": "截止日期必須在結束日期當日或之前",
	"editor.createAndLinkToNewGradeItem": "建立並連結至新的成績項目", //Radio button text
	"editor.linkToExistingGradeItem": "連結至現有成績項目", //Radio button text
	"editor.points": "分數：{points}", // Text label for displaying points of a grade
	"editor.noGradeItems": "無現有成績項目", // Reason why existing grade items cannot be linked in the choose grades dialog
	"editor.noGradeCreatePermission": "您沒有建立新成績項目的權限", // Reason why a new grade items cannot be created in the choose grades dialog
	"editor.competencies": "學習目標", //Text label for the competencies tool integration
	"editor.manageCompetencies": "管理學習目標", //Button text to launch competencies tool dialog
	"editor.competenciesCount": "{count, plural, =1 {1 個已附加} other {{count} 個已附加}}", //Label for number of associated competencies
	"editor.noLearningObjectives": "沒有學習目標", //text label when there are no associated learning objectives
	"editor.competenciesCountSummary": "{count, plural, =1 {1 個學習目標} other {{count} 個學習目標}}", // num release condition text
	"editor.unevaluatedCompetencies": "{count, plural, =1 {缺少 1 項評量} other {缺少 {count} 項評量}}", //Label for number of unevalated associated competencies
	"editor.btnClose": "關閉", //Label for Close button
	"editor.btnCloseDialog": "關閉此對話方塊", // close dialog button
	"editor.btnManageSpecialAccess": "管理特殊存取權限", // manage special access button
	"editor.saveSuccessful": "已成功儲存", // alert message after a successful save
	"editor.specialAccessRestrictedText": "僅具有特殊存取權限的使用者可檢視此資料夾", // restricted special access description
	"editor.specialAccessNotRestrictedText": "使用者可於正常可用情況日期之外提交", // not restricted special access description
	"editor.specialAccessCount": "{count, plural, =1 {1 位使用者} other {{count} 位使用者}} 具有特殊存取權限", // Label for number of special access users
	"editor.noUsersWithSpecialAccess": "沒有使用者", // text label when there are no users with special access
	"editor.specialAccessDialogTitle": "管理特殊存取權限", // Dialog title
	"editor.specialAccessHidden": "由特殊存取權限隱藏", // Warning label that the activity is restricted but is being hidden from all users by special access rules
	"editor.discardChangesTitle": "捨棄變更？", // Discard Changes User Prompt
	"editor.discardChangesQuestion": "確定要捨棄您的變更？", // Discard Changes User Prompt
	"editor.yesLabel": "是",
	"editor.noLabel": "否",
	"editor.notificationEmailLabel": "通知電子郵件", // Label for notification email input field
	"editor.invalidNotificationEmailError": "請輸入有效的電子郵件地址", // error shown on tooltip when notification email is invalid
	"editor.gradeOutOf": "成績總分", // ARIA label for the grade out of field, when creating/editing an activity
	"editor.inGradebook": "在成績單中", // New state of the grades field when there is a score, and an associated grade item
	"editor.notInGradebook": "不在成績單中", // New state of the grades field when there is a score, but no associated grade item
	"editor.addToGradebook": "新增至成績單", // New menu item for adding grade association
	"editor.beforeStartDate": "開始之前：", //Text for before start availability date type
	"editor.afterEndDate": "結束之後：", //Text for after end availability date type
	"editor.lblVisibleWithAccessRestricted": "可見 (存取受限)", //Text for after end availability date type
	"editor.lblVisibleWithSubmissionRestricted": "可見 (提交受限)", //Text for after end availability date type
	"editor.lblHidden": "已隱藏", //Text for after end availability date type

	"rubrics.btnAddRubric": "新增量規", //text for add rubric button
	"rubrics.btnCreateNew": "建立新的", //Text for create new dropdown
	"rubrics.hdrCreateRubric": "建立量規", // Header for creating a new rubric
	"rubrics.btnDetach": "中斷連結", //Text for the button to confirm detaching a rubric
	"rubrics.btnAddExisting": "新增現有的", //Text for Add Existing dropdown
	"rubrics.hdrRubrics": "量規", //Header for the rubrics section
	"rubrics.btnAttachRubric": "附加量規", //Button for the attach new rubric overlay
	"rubrics.btnCancel": "取消", //Button for canceling out of the attach new rubric overlay
	"rubrics.txtAddExisting": "新增現有的", //Title for the attach rubrics dialog,
	"rubrics.txtNoRubricAdded": "未新增量規", // rubric summary for no rubrics
	"rubrics.txtRubricsAdded": "{count, plural, =1 {已新增 1 個量規} other {已新增 {count} 個量規}}", // count of asoociated rubrics
	"rubrics.txtDeleteRubric": "刪除量規", // Text for deleting rubric icon
	"rubrics.txtRubricAdded": "量規已新增", // Text for notifying screenreader rubric was added
	"rubrics.txtRubricRemoved": "量規已移除", // Text for notifying screenreader rubric was removed
	"rubrics.txtConfirmDetachRubric": "中斷連結量規後，系統將刪除此活動中所有之前的量規評量。確認中斷連結量規？", //Text for the dialog to confirm detaching a rubric from an evaluated activity
	"rubrics.defaultScoringRubric": "預設的評分量規", // Sub heading for the default scoring rubric select dropdown
	"rubrics.noDefaultScoringRubricSelected": "未選取預設", // option in default scoring rubric when no default scoring rubric selected

	"grades.points": "分數：{points}", // Text label for displaying points of a grade
	"grades.weight": "加權：{weight}", // Text label for displaying weight of a grade
	"grades.gradeItem": "成績項目", //ARIA label for grade-item picker when linking an activity to an existing grade item
	"grades.gradeUnits": "分", // unit label for GradeOutOf value (e.g. 10 points)
	"grades.gradeUnitsSingular": "分", // unit label for GradeOutOf value when value is 1
	"grades.chooseNewGradeItemCategory": "選擇計分類別", // Label for add category button
	"grades.newGradeItemCategory": "成績類別", // Label for selecting a category dropdown
	"grades.noGradeItemCategory": "無類別", // Category dropdown text for not selecting a category
	"grades.changeNewGradeTypeAndScheme": "變更計分類型與方式", // Label for change type and scheme button
	"grades.chooseNewGradeScheme": "選擇計分方式", // Label for choose grade scheme button (when there is only one type)
	"grades.newGradeType": "計分類型", // Label for the grade type
	"grades.newGradeTypeNumeric": "數字", // Label for numeric grade type radio option
	"grades.newGradeTypeSelectbox": "分級格", // Label for selectbox grade type radio option
	"grades.numericDescription": "在指定的總分中指定值，為使用者評分。", // Description of numeric grade type
	"grades.numericDescriptionExample": "例如：8/10", // Example of numeric grade type
	"grades.selectboxDescription": "選取最適合其成果的計分方式層級，為使用者評分。", // Description of selectbox grade type
	"grades.selectboxDescriptionExample": "例如：「非常好」或「B+」", // Example of selectbox grade type
	"grades.newGradeScheme": "計分方式", // Label for the grade scheme
	"grades.defaultGradeScheme": "--預設-- ({schemeName})", // name of default grade scheme
	"grades.creatingNewNumericGradeItem": "建立新的數字成績項目 {newGradeName}", // Aria text for new grade we are creating
	"grades.creatingNewSelectboxGradeItem": "建立新的分級格成績項目 {newGradeName}", // Aria text for new grade we are creating
	"grades.linkingToGradeItem": "連結至現有成績項目 {gradeName}", // Aria text for grade item we are linking to
	"grades.gradeOutOfMenuItem": "「成績總分」是什麼？", // menu item to launch gradeOutOf help dialog
	"grades.gradeOutOfHelpDialogTitle": "資訊：成績總分", // title that appears when the gradeOutOf help dialog is rendered
	"grades.gradeOutOfHelpDialogConfirmationText": "確定", // text that appears on the gradeOutOf help dialog confirmation button
	"grades.gradeOutOfHelpDialogParagraph1": "如果測驗為「不在成績單中」，「成績總分」會反映問題的總分。", // content for paragraph 1 of gradeOutOf help dialog
	"grades.gradeOutOfHelpDialogParagraph2": "如果測驗為「在成績單中」，「成績總分」即為成績工具中的分數或權重上限。", // content for paragraph 2 of gradeOutOf help dialog

	"attachments.addGoogleDriveLink": "從 Google 雲端硬碟附加", // Tooltip for a button that adds a link to a Google Drive file
	"attachments.addFile": "檔案上傳", // Tooltip for a button that opens a file upload dialog
	"attachments.addLink": "附加網頁連結", // Tooltip for a button that adds a link to a URL
	"attachments.addOneDriveLink": "從 OneDrive 附加", // Tooltip for a button that adds a link to a OneDrive file
	"attachments.addQuicklink": "附加現有活動連結", // Tooltip for a button that adds a link to an existing activity
	"attachments.back": "返回", // Text for a back button
	"attachments.closeDialog": "關閉對話方塊", // ARIA text for button to close dialog
	"attachments.recordAudio": "錄製音訊", // Text for a button that opens a dialog to record audio
	"attachments.recordVideo": "錄製視訊", // Text for a button that opens a dialog to record video
	"attachments.save": "儲存", // Text for a save button,
	"attachments.attach": "附加", // Text for Attach button to open attachment row
	"attachments.addGoogleDriveLinkMenu": "Google 雲端硬碟", // Attach menu item text
	"attachments.addFileMenu": "檔案上傳", // Attach menu item text
	"attachments.addLinkMenu": "網頁連結", // Attach menu item text
	"attachments.addOneDriveLinkMenu": "OneDrive", // Attach menu item text
	"attachments.addQuicklinkMenu": "現有活動", // Attach menu item text

	"content.name": "名稱", // Text label for name input field
	"content.emptyNameField": "名稱為必填。", // Error text that appears below name field when it is left empty
	"content.description": "說明", // Text label for description input field
	"content.pageContent": "頁面內容", // Text label for page content input field (html files)
	"content.selectTemplate": "選取範本", // The label text for the subtle-button for selecting an html template
	"content.htmlTemplatesLoading": "正在載入...", // Message displayed while list of html templates is loading
	"content.noHtmlTemplates": "沒有可用的範本", // Message displayed in dropdown when no html templates are found
	"content.defaultHtmlTemplateHeader": "HTML 檔案範本", // The text to display as the default header for the html template select dropdown
	"content.browseForHtmlTemplate": "瀏覽範本", // Text for button to browse for an html template
	"content.availabilityHeader": "可用情況日期", // availability header
	"content.saveError": "您的內容項目尚未儲存。請修正以紅色顯示的欄位。", // Error message to inform the user that there was a problem saving the content item, instructing them to correct invalid fields
	"content.displayOptions": "顯示選項", // Text label for display options
	"content.addDueDate": "新增截止日期", // Text label for name input field
	"content.embedOnPage": "內嵌於頁面上", // Text label for link radio button
	"content.openNewTab": "在新頁籤中開啟 (建議)", // Text label for link radio button
	"content.openNewTabRecommendation": "建議使用此選項，以避免您的資源產生驗證問題。", // Text for the help icon that explains reason for recommending new tab option
	"content.openNewTabHelp": "不會追蹤頁面上的時間。", // Text for the help icon next to link radio button
	"content.link": "連結", //Text label for link input field
	"content.emptyLinkField": "連結為必填。", //Error message shown on link tooltip when the link is empty
	"content.invalidLink": "請輸入有效的 URL。", //Error message shown on link tooltip when the link is not formatted correctly
	"content.notHttps": "只能嵌入使用「https」的連結。", //Error message shown on link tooltip when https is not used for embedded links
	"content.noEmbed": "無法嵌入該網站。", //Error message shown on link tooltip when the link cannot be embedded
	"content.previewLabel": "預覽", // The label text for the link preview
	"content.openInNewWindow": "在新視窗中開啟", // The label text for the subtle-button for opening a LTI link in a new window
	"content.externalActivity": "外部活動", // The label text for the external activity section on the LTI link page
	"content.externalActivityOpened": "在新視窗中開啟活動以檢視內容。", // Text for displaying underneath the LTI link jump logo
	"content.externalActivityEmbeddedNotAllowed": "此外部活動不支援內嵌。只有開啟新視窗才能檢視此資訊。", // Text that replaces the LTI display options if embedding is not allowed
	"content.confirmDialogTitle": "您現有的內容將會遭到刪除。", // The text for the title of the replace html template confirmation dialog
	"content.confirmDialogBody": "是否確定要使用此範本取代您現有的內容？", // The text for the body of the replace html template confirmation dialog
	"content.confirmDialogActionOption": "取代", // The text for the confirmation action to replace content
	"content.confirmDialogCancelOption": "取消", // The text for the cancel action to not replace content
	"content.useEmbeddedPlayer": "使用內嵌播放程式", // The text for using the embedded player
	"content.scormActivity": "SCORM 套件", // The label for the name of the SCORM package
	"content.lastEdited": "上次編輯", // The date when the entity was last edited
	"content.externalFile": "External file", // The text to use for labeling external files
	"content.advancedEditing": 'Advanced Editing', // The text to use on the advanced editing button
	"content.fileHasCaptions": "This file has captions in", // The text to use preceding the list of captions
};
