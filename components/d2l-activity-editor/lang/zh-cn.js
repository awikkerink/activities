/* eslint quotes: 0 */

export default {
	"editor.btnEditReleaseConditions": "编辑发布条件", // edit release conditions button
	"editor.btnAddReleaseCondition": "添加发布条件", // add release condition button
	"editor.btnCreateNew": "新建", // create new button
	"editor.btnAddExisting": "添加现有", // add existing button
	"editor.btnRemoveCondition": "删除条件", // remove condition button
	"editor.lblConditionsOperator": "若要访问此项目，用户必须满足以下条件", // conditions operator label
	"editor.txtConditionAdded": "已添加条件：{title}",
	"editor.txtConditionRemoved": "已移除条件：{title}",
	"editor.txtConditionsAdded": "添加了 {count} 个条件",
	"editor.txtNumReleaseConditions": "{count, plural, =1 {{count} 个发布条件} other {{count} 个发布条件}}", // num release condition text
	"editor.txtNumSpecialAccess": "{userCount, plural, =1 {1 位具有特殊访问权限的用户} other {{userCount} 位具有特殊访问权限的用户}}", // num users with special access text
	"editor.btnCancel": "取消", // cancel button
	"editor.btnSave": "保存并关闭", // save and close button
	"editor.btnSaveMobile": "保存", // save and close button for mobile devices
	"editor.dueDate": "截止日期", // ARIA label for the due date field when creating/editing an activity
	"editor.endDate": "结束日期", // ARIA label for the end date field when creating/editing an activity
	"editor.startDate": "开始日期", // ARIA label for the start date field when creating/editing an activity
	"editor.dueTime": "截止时间", // ARIA label for the due time field when creating/editing an activity
	"editor.endTime": "结束时间", // ARIA label for the end time field when creating/editing an activity
	"editor.startTime": "开始时间", // ARIA label for the start time field when creating/editing an activity
	"editor.hidden": "隐藏", // Label displayed with the visibility switch when hidden
	"editor.noDueDate": "无截止日期", // Placeholder text for due date field when no due date is set
	"editor.noEndDate": "无结束日期", // Placeholder text for due date field when no due date is set
	"editor.noStartDate": "无开始日期", // Placeholder text for due date field when no due date is set
	"editor.visible": "可见", // Label displayed with the visibility switch when visible
	"editor.txtAvailabilityStartAndEnd": "可用开始日期 {startDate} 和结束日期 {endDate}", // start/end text
	"editor.txtAvailabilityStartOnly": "可用开始日期 {startDate}", // start only text
	"editor.txtAvailabilityEndOnly": "可用结束日期 {endDate}", // end only text
	"editor.txtAvailabilityNeither": "始终可用", // always available text
	"editor.ungraded": "无成绩", // State of score field when there is no score and no grade item, when creating/editing an activity
	"editor.inGrades": "在成绩中", // State of the grades field when there is a score, and an associated grade item
	"editor.notInGrades": "不在成绩中", // State of the grades field when there is a score, but no associated grade item
	"editor.addToGrades": "添加至成绩", // Menu item for adding grade association
	"editor.addAGrade": "添加成绩", //ARIA label to add a grade to the activity
	"editor.removeFromGrades": "从成绩中删除", // Menu item for removing grade association
	"editor.setUngraded": "重置为无成绩", // Menu item for setting the activity to ungraded
	"editor.scoreOutOf": "总分", // ARIA label for the score out of field, when creating/editing an activity
	"editor.emptyScoreOutOfError": "必须为“成绩”中的活动指定分数值", // Error message to inform user that the score out of value is a required field when a grade item is associated
	"editor.invalidScoreOutOfError": "总分必须大于或等于 0.01，同时小于或等于 9,999,999,999", // Error message when an invalid score out of value is entered
	"editor.loading": "正在加载...", // Message displayed while page is loading
	"editor.ok": "确定", // Text of dialog button to commit action
	"editor.cancel": "取消", // Text of dialog button to cancel action
	"editor.ariaToolbarShortcutInstructions": "按 ALT-F10 可调用工具栏；按 ESC 可退出正在使用的工具栏。", // Instructions for screenreader users on how to enter and exit the html editor toolbar
	"editor.chooseFromGrades": "从成绩中选择", // Link text and dialog title for the edit grades dialog,
	"editor.editLinkExisting": "编辑或链接到现有项目", // New Link text and dialog title for the edit grades dialog,
	"editor.hdrRubrics": "量规", //Header for the rubrics section
	"editor.startBeforeEndDate": "开始日期必须早于结束日期",
	"editor.dueBetweenStartEndDate": "截止日期必须晚于开始日期且早于或等于结束日期",
	"editor.dueAfterStartDate": "截止日期必须晚于开始日期",
	"editor.dueBeforeEndDate": "截止日期不能晚于结束日期",
	"editor.createAndLinkToNewGradeItem": "创建并链接到新成绩项目", //Radio button text
	"editor.linkToExistingGradeItem": "链接到现有成绩项目", //Radio button text
	"editor.points": "分数：{points}", // Text label for displaying points of a grade
	"editor.noGradeItems": "无现有成绩项目", // Reason why existing grade items cannot be linked in the choose grades dialog
	"editor.noGradeCreatePermission": "您没有权限创建新的成绩项目", // Reason why a new grade items cannot be created in the choose grades dialog
	"editor.competencies": "学习目标", //Text label for the competencies tool integration
	"editor.manageCompetencies": "管理学习目标", //Button text to launch competencies tool dialog
	"editor.competenciesCount": "{count, plural, =1 {1 个附件} other {{count} 个附件}}", //Label for number of associated competencies
	"editor.noLearningObjectives": "没有学习目标", //text label when there are no associated learning objectives
	"editor.competenciesCountSummary": "{count, plural, =1 {1 个学习目标} other {{count} 个学习目标}}", // num release condition text
	"editor.unevaluatedCompetencies": "{count, plural, =1 {1 个评估缺失} other {{count} 个评估缺失}}", //Label for number of unevalated associated competencies
	"editor.btnClose": "关闭", //Label for Close button
	"editor.btnCloseDialog": "关闭此对话框", // close dialog button
	"editor.btnManageSpecialAccess": "管理特殊访问权限", // manage special access button
	"editor.saveSuccessful": "保存成功", // alert message after a successful save
	"editor.specialAccessRestrictedText": "仅具有特殊访问权限的用户才能查看此文件夹", // restricted special access description
	"editor.specialAccessNotRestrictedText": "用户可以在正常可用日期之外提交", // not restricted special access description
	"editor.specialAccessCount": "{count, plural, =1 {1 位用户} other {{count} 位用户}} 具有特殊访问权限", // Label for number of special access users
	"editor.noUsersWithSpecialAccess": "没有用户", // text label when there are no users with special access
	"editor.specialAccessDialogTitle": "管理特殊访问权限", // Dialog title
	"editor.specialAccessHidden": "按特殊访问权限隐藏", // Warning label that the activity is restricted but is being hidden from all users by special access rules
	"editor.discardChangesTitle": "放弃更改？", // Discard Changes User Prompt
	"editor.discardChangesQuestion": "是否确定要放弃您所做的更改？", // Discard Changes User Prompt
	"editor.yesLabel": "是",
	"editor.noLabel": "否",
	"editor.notificationEmailLabel": "通知电子邮件", // Label for notification email input field
	"editor.invalidNotificationEmailError": "请输入一个有效的电子邮件地址", // error shown on tooltip when notification email is invalid
	"editor.gradeOutOf": "成绩超出", // ARIA label for the grade out of field, when creating/editing an activity
	"editor.inGradebook": "在成绩簿中", // New state of the grades field when there is a score, and an associated grade item
	"editor.notInGradebook": "不在成绩簿中", // New state of the grades field when there is a score, but no associated grade item
	"editor.addToGradebook": "添加到成绩簿", // New menu item for adding grade association
	"editor.beforeStartDate": "开始前：", //Text for before start availability date type
	"editor.afterEndDate": "结束后：", //Text for after end availability date type
	"editor.lblVisibleWithAccessRestricted": "可见，访问受限", //Text for after end availability date type
	"editor.lblVisibleWithSubmissionRestricted": "可见，提交/尝试受限", //Text for after end availability date type
	"editor.lblHidden": "隐藏", //Text for after end availability date type
	"editor.availabilityStartTitle": "Availability: Start Date", // Dialog title for editing start date type
	"editor.availabilityEndTitle": "Availability: End Date", // Dialog title for editing start date type
	"editor.startDescription": "The following settings determine how the {assignment} appears to learners before the start date", // Description for start date type
	"editor.endDescription": "The following settings determine how the {assignment} appears to learners after the end date", // Description for start date type
	"editor.assignment": "assignment", // Langterm for assignment or dropbox

	"rubrics.btnAddRubric": "添加量规", //text for add rubric button
	"rubrics.btnCreateNew": "新建", //Text for create new dropdown
	"rubrics.hdrCreateRubric": "创建量规", // Header for creating a new rubric
	"rubrics.btnDetach": "分离", //Text for the button to confirm detaching a rubric
	"rubrics.btnAddExisting": "添加现有", //Text for Add Existing dropdown
	"rubrics.hdrRubrics": "量规", //Header for the rubrics section
	"rubrics.btnAttachRubric": "附加量规", //Button for the attach new rubric overlay
	"rubrics.btnCancel": "取消", //Button for canceling out of the attach new rubric overlay
	"rubrics.txtAddExisting": "添加现有", //Title for the attach rubrics dialog,
	"rubrics.txtNoRubricAdded": "未添加量规", // rubric summary for no rubrics
	"rubrics.txtRubricsAdded": "{count, plural, =1 {添加了 1 个量规} other {添加了 {count} 个量规}}", // count of asoociated rubrics
	"rubrics.txtDeleteRubric": "删除量规", // Text for deleting rubric icon
	"rubrics.txtRubricAdded": "量规已添加", // Text for notifying screenreader rubric was added
	"rubrics.txtRubricRemoved": "量规已移除", // Text for notifying screenreader rubric was removed
	"rubrics.txtConfirmDetachRubric": "一旦分离量规，此活动中所以之前评估的量规都将被删除。是否确认分离量规？", //Text for the dialog to confirm detaching a rubric from an evaluated activity
	"rubrics.defaultScoringRubric": "默认评分量规", // Sub heading for the default scoring rubric select dropdown
	"rubrics.noDefaultScoringRubricSelected": "无已选择的默认值", // option in default scoring rubric when no default scoring rubric selected

	"grades.points": "分数：{points}", // Text label for displaying points of a grade
	"grades.weight": "权重：{weight}", // Text label for displaying weight of a grade
	"grades.gradeItem": "成绩项目", //ARIA label for grade-item picker when linking an activity to an existing grade item
	"grades.gradeUnits": "分", // unit label for GradeOutOf value (e.g. 10 points)
	"grades.gradeUnitsSingular": "分", // unit label for GradeOutOf value when value is 1
	"grades.chooseNewGradeItemCategory": "选择成绩类别", // Label for add category button
	"grades.newGradeItemCategory": "成绩类别", // Label for selecting a category dropdown
	"grades.noGradeItemCategory": "无类别", // Category dropdown text for not selecting a category
	"grades.changeNewGradeTypeAndScheme": "更改成绩类型和方案", // Label for change type and scheme button
	"grades.chooseNewGradeScheme": "默认等级方案", // Label for choose grade scheme button (when there is only one type)
	"grades.newGradeType": "成绩类型", // Label for the grade type
	"grades.newGradeTypeNumeric": "数值", // Label for numeric grade type radio option
	"grades.newGradeTypeSelectbox": "选择框", // Label for selectbox grade type radio option
	"grades.numericDescription": "通过分配占指定总分数的百分比值，进行用户分级。", // Description of numeric grade type
	"grades.numericDescriptionExample": "例如 8/10", // Example of numeric grade type
	"grades.selectboxDescription": "选择与成绩最匹配的成绩方案级别，进行用户分级。", // Description of selectbox grade type
	"grades.selectboxDescriptionExample": "例如，“非常好”或“B+”", // Example of selectbox grade type
	"grades.newGradeScheme": "成绩方案", // Label for the grade scheme
	"grades.defaultGradeScheme": "--默认-- ({schemeName})", // name of default grade scheme
	"grades.creatingNewNumericGradeItem": "创建新的数字成绩项目 {newGradeName}", // Aria text for new grade we are creating
	"grades.creatingNewSelectboxGradeItem": "创建新的选择框成绩项目 {newGradeName}", // Aria text for new grade we are creating
	"grades.linkingToGradeItem": "关联至现有成绩项目 ｛gradeName｝", // Aria text for grade item we are linking to
	"grades.gradeOutOfMenuItem": "什么是等级超出？", // menu item to launch gradeOutOf help dialog
	"grades.gradeOutOfHelpDialogTitle": "信息：等级超出", // title that appears when the gradeOutOf help dialog is rendered
	"grades.gradeOutOfHelpDialogConfirmationText": "确定", // text that appears on the gradeOutOf help dialog confirmation button
	"grades.gradeOutOfHelpDialogParagraph1": "如果测验为 \" 不在成绩单中 \" ， \" 分数超出 \" 将反映问题的总分。", // content for paragraph 1 of gradeOutOf help dialog
	"grades.gradeOutOfHelpDialogParagraph2": "如果测验为 \" 在成绩单中 \" ， \" 分数超出 \" 是 \" 成绩 \" 工具中的最大分数或重量。", // content for paragraph 2 of gradeOutOf help dialog

	"attachments.addGoogleDriveLink": "从 Google Drive 附加", // Tooltip for a button that adds a link to a Google Drive file
	"attachments.addFile": "文件上传", // Tooltip for a button that opens a file upload dialog
	"attachments.addLink": "附加网页链接", // Tooltip for a button that adds a link to a URL
	"attachments.addOneDriveLink": "从 OneDrive 附加", // Tooltip for a button that adds a link to a OneDrive file
	"attachments.addQuicklink": "将链接附加至现有活动", // Tooltip for a button that adds a link to an existing activity
	"attachments.back": "返回", // Text for a back button
	"attachments.closeDialog": "关闭对话框", // ARIA text for button to close dialog
	"attachments.recordAudio": "录制音频", // Text for a button that opens a dialog to record audio
	"attachments.recordVideo": "录像", // Text for a button that opens a dialog to record video
	"attachments.save": "保存", // Text for a save button,
	"attachments.attach": "附加", // Text for Attach button to open attachment row
	"attachments.addGoogleDriveLinkMenu": "Google Drive", // Attach menu item text
	"attachments.addFileMenu": "文件上传", // Attach menu item text
	"attachments.addLinkMenu": "网页链接", // Attach menu item text
	"attachments.addOneDriveLinkMenu": "OneDrive", // Attach menu item text
	"attachments.addQuicklinkMenu": "现有活动", // Attach menu item text

	"content.name": "名称", // Text label for name input field
	"content.emptyNameField": "必须提供名称。", // Error text that appears below name field when it is left empty
	"content.description": "描述", // Text label for description input field
	"content.pageContent": "页面内容", // Text label for page content input field (html files)
	"content.selectTemplate": "选择模板", // The label text for the subtle-button for selecting an html template
	"content.htmlTemplatesLoading": "正在加载...", // Message displayed while list of html templates is loading
	"content.noHtmlTemplates": "无可用模板", // Message displayed in dropdown when no html templates are found
	"content.defaultHtmlTemplateHeader": "HTML 文件模板", // The text to display as the default header for the html template select dropdown
	"content.browseForHtmlTemplate": "浏览模板", // Text for button to browse for an html template
	"content.availabilityHeader": "可用日期", // availability header
	"content.saveError": "您的内容项目未保存。请更正以红色标出的字段。", // Error message to inform the user that there was a problem saving the content item, instructing them to correct invalid fields
	"content.displayOptions": "显示选项", // Text label for display options
	"content.addDueDate": "添加截止日期", // Text label for name input field
	"content.embedOnPage": "嵌入页面中", // Text label for link radio button
	"content.openNewTab": "在新选项卡中打开（建议）", // Text label for link radio button
	"content.openNewTabRecommendation": "建议使用此选项以防您的资源出现验证问题。", // Text for the help icon that explains reason for recommending new tab option
	"content.openNewTabHelp": "不跟踪页面上的时间。", // Text for the help icon next to link radio button
	"content.link": "链接", //Text label for link input field
	"content.emptyLinkField": "必须提供链接。", //Error message shown on link tooltip when the link is empty
	"content.invalidLink": "请输入一个有效 URL。", //Error message shown on link tooltip when the link is not formatted correctly
	"content.notHttps": "仅可嵌入含有 \"https\" 的链接。", //Error message shown on link tooltip when https is not used for embedded links
	"content.noEmbed": "该站点无法嵌入。", //Error message shown on link tooltip when the link cannot be embedded
	"content.previewLabel": "预览", // The label text for the link preview
	"content.openInNewWindow": "在新窗口中打开", // The label text for the subtle-button for opening a LTI link in a new window
	"content.externalActivity": "外部活动", // The label text for the external activity section on the LTI link page
	"content.externalActivityOpened": "在新窗口中打开活动以查看其内容。", // Text for displaying underneath the LTI link jump logo
	"content.externalActivityEmbeddedNotAllowed": "此外部活动不支持嵌入。它只能通过在新窗口中打开来查看。", // Text that replaces the LTI display options if embedding is not allowed
	"content.confirmDialogTitle": "您的现有内容将被删除。", // The text for the title of the replace html template confirmation dialog
	"content.confirmDialogBody": "您是否确定要使用此模板替换现有内容？", // The text for the body of the replace html template confirmation dialog
	"content.confirmDialogActionOption": "替换", // The text for the confirmation action to replace content
	"content.confirmDialogCancelOption": "取消", // The text for the cancel action to not replace content
	"content.useEmbeddedPlayer": "使用嵌入式播放器", // The text for using the embedded player
	"content.scormActivity": "SCORM 安装包", // The label for the name of the SCORM package
	"content.lastEdited": "上次编辑", // The date when the entity was last edited
	"content.externalFile": "External file", // The text to use for labeling external files
	"content.advancedEditing": 'Advanced Editing', // The text to use on the advanced editing button
	"content.fileHasCaptions": "This file has captions in", // The text to use preceding the list of captions
};
