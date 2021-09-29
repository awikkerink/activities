/* eslint quotes: 0 */

export default {
	"editor.btnEditReleaseConditions": "릴리스 조건 편집", // edit release conditions button
	"editor.btnAddReleaseCondition": "릴리스 조건 추가", // add release condition button
	"editor.btnCreateNew": "새로 만들기", // create new button
	"editor.btnAddExisting": "기존 항목 추가", // add existing button
	"editor.btnRemoveCondition": "조건 제거", // remove condition button
	"editor.lblConditionsOperator": "이 항목을 보려면 사용자가 다음을 충족해야 합니다.", // conditions operator label
	"editor.txtConditionAdded": "다음 조건 추가: {title}",
	"editor.txtConditionRemoved": "다음 조건 제거: {title}",
	"editor.txtConditionsAdded": "추가된 조건 {count}개",
	"editor.txtNumReleaseConditions": "{count, plural, =1 {{count}개 릴리스 조건} other {{count}개 릴리스 조건}}", // num release condition text
	"editor.txtNumSpecialAccess": "{userCount, plural, =1 {특별 접근 권한이 있는 1명 사용자} other {특별 접근 권한이 있는 {userCount}명 사용자}}", // num users with special access text
	"editor.btnCancel": "취소", // cancel button
	"editor.btnSave": "저장 및 닫기", // save and close button
	"editor.btnSaveMobile": "저장", // save and close button for mobile devices
	"editor.dueDate": "기한", // ARIA label for the due date field when creating/editing an activity
	"editor.endDate": "종료일", // ARIA label for the end date field when creating/editing an activity
	"editor.startDate": "시작일", // ARIA label for the start date field when creating/editing an activity
	"editor.dueTime": "기한 시간", // ARIA label for the due time field when creating/editing an activity
	"editor.endTime": "종료 시각", // ARIA label for the end time field when creating/editing an activity
	"editor.startTime": "시작 시각", // ARIA label for the start time field when creating/editing an activity
	"editor.hidden": "숨김", // Label displayed with the visibility switch when hidden
	"editor.noDueDate": "기한 없음", // Placeholder text for due date field when no due date is set
	"editor.noEndDate": "종료일 없음", // Placeholder text for due date field when no due date is set
	"editor.noStartDate": "시작일 없음", // Placeholder text for due date field when no due date is set
	"editor.visible": "표시", // Label displayed with the visibility switch when visible
	"editor.txtAvailabilityStartAndEnd": "사용 가능 날짜는 {startDate}에 시작되고 {endDate}에 종료됩니다.", // start/end text
	"editor.txtAvailabilityStartOnly": "사용 가능 날짜 시작일 {startDate}", // start only text
	"editor.txtAvailabilityEndOnly": "사용 가능 날짜 종료일 {endDate}", // end only text
	"editor.txtAvailabilityNeither": "항상 사용 가능", // always available text
	"editor.ungraded": "평점 미산정", // State of score field when there is no score and no grade item, when creating/editing an activity
	"editor.inGrades": "평점 내", // State of the grades field when there is a score, and an associated grade item
	"editor.notInGrades": "평점에 없음", // State of the grades field when there is a score, but no associated grade item
	"editor.addToGrades": "평점에 추가", // Menu item for adding grade association
	"editor.addAGrade": "평점 추가", //ARIA label to add a grade to the activity
	"editor.removeFromGrades": "평점에서 삭제됩니다.", // Menu item for removing grade association
	"editor.setUngraded": "평점 없음으로 재설정", // Menu item for setting the activity to ungraded
	"editor.scoreOutOf": "기준 만점 점수", // ARIA label for the score out of field, when creating/editing an activity
	"editor.emptyScoreOutOfError": "평점 내 활동에 대한 포인트 값을 지정해야 합니다.", // Error message to inform user that the score out of value is a required field when a grade item is associated
	"editor.invalidScoreOutOfError": "기준 만점 점수는 0.01 이상 9,999,999,999 이하여야 합니다.", // Error message when an invalid score out of value is entered
	"editor.loading": "로드 중...", // Message displayed while page is loading
	"editor.ok": "확인", // Text of dialog button to commit action
	"editor.cancel": "취소", // Text of dialog button to cancel action
	"editor.ariaToolbarShortcutInstructions": "도구 모음을 불러오려면 ALT-F10을 누르고, 도구 모음을 끝내려면 도구 모음 내에서 ESC를 누르십시오.", // Instructions for screenreader users on how to enter and exit the html editor toolbar
	"editor.chooseFromGrades": "평점 중에서 선택하십시오.", // Link text and dialog title for the edit grades dialog,
	"editor.editLinkExisting": "기존 항목 편집 또는 기존 항목에 링크", // New Link text and dialog title for the edit grades dialog,
	"editor.hdrRubrics": "루브릭", //Header for the rubrics section
	"editor.startBeforeEndDate": "시작일은 종료일 이전이어야 합니다.",
	"editor.dueBetweenStartEndDate": "기한은 시작 날짜 이후여야 하며 종료 날짜 이전이거나 종료일과 같아야 합니다.",
	"editor.dueAfterStartDate": "기한은 시작일 이후여야 합니다.",
	"editor.dueBeforeEndDate": "기한은 종료일 이전이거나 종료일과 같아야 합니다.",
	"editor.createAndLinkToNewGradeItem": "새 평점 항목을 생성하고 연결합니다.", //Radio button text
	"editor.linkToExistingGradeItem": "기존 평점 항목에 연결합니다.", //Radio button text
	"editor.points": "점수: {points}", // Text label for displaying points of a grade
	"editor.noGradeItems": "기존 평점 항목이 없습니다.", // Reason why existing grade items cannot be linked in the choose grades dialog
	"editor.noGradeCreatePermission": "새 평점 항목을 생성할 권한이 없습니다.", // Reason why a new grade items cannot be created in the choose grades dialog
	"editor.competencies": "학습 목표", //Text label for the competencies tool integration
	"editor.manageCompetencies": "학습 목표 관리", //Button text to launch competencies tool dialog
	"editor.competenciesCount": "{count, plural, =1 {1개 첨부됨} other {{count}개 첨부됨}}", //Label for number of associated competencies
	"editor.noLearningObjectives": "학습 목표 없음", //text label when there are no associated learning objectives
	"editor.competenciesCountSummary": "{count, plural, =1 {1개 학습 목표} other {{count}개 학습 목표}}", // num release condition text
	"editor.unevaluatedCompetencies": "{count, plural, =1 {1개 평가 누락} other {{count}개 평가 누락}}", //Label for number of unevalated associated competencies
	"editor.btnClose": "닫기", //Label for Close button
	"editor.btnCloseDialog": "이 대화 상자 닫기", // close dialog button
	"editor.btnManageSpecialAccess": "특별 접근 관리", // manage special access button
	"editor.saveSuccessful": "성공적으로 저장됨", // alert message after a successful save
	"editor.specialAccessRestrictedText": "특별 접근 권한이 있는 사용자만이 이 폴더를 볼 수 있습니다.", // restricted special access description
	"editor.specialAccessNotRestrictedText": "사용자는 정상 사용 가능 날짜 이외의 날짜를 제출할 수 있습니다.", // not restricted special access description
	"editor.specialAccessCount": "특별 접근 권한이 있는 {count, plural, =1 {1명 사용자} other {{count}명 사용자}}", // Label for number of special access users
	"editor.noUsersWithSpecialAccess": "사용자 없음", // text label when there are no users with special access
	"editor.specialAccessDialogTitle": "특별 접근 관리", // Dialog title
	"editor.specialAccessHidden": "특별한 접근으로 숨겨져 있습니다", // Warning label that the activity is restricted but is being hidden from all users by special access rules
	"editor.discardChangesTitle": "변경 사항을 제거하시겠습니까?", // Discard Changes User Prompt
	"editor.discardChangesQuestion": "이 변경 사항을 제거하시겠습니까?", // Discard Changes User Prompt
	"editor.yesLabel": "예",
	"editor.noLabel": "아니요",
	"editor.notificationEmailLabel": "알림 이메일", // Label for notification email input field
	"editor.invalidNotificationEmailError": "유효한 이메일 주소를 입력하십시오.", // error shown on tooltip when notification email is invalid
	"editor.gradeOutOf": "평점 기준 만점", // ARIA label for the grade out of field, when creating/editing an activity
	"editor.inGradebook": "성적부에 있음", // New state of the grades field when there is a score, and an associated grade item
	"editor.notInGradebook": "성적부에 없음", // New state of the grades field when there is a score, but no associated grade item
	"editor.addToGradebook": "성적부에 추가", // New menu item for adding grade association

	"rubrics.btnAddRubric": "루브릭 추가", //text for add rubric button
	"rubrics.btnCreateNew": "새로 만들기", //Text for create new dropdown
	"rubrics.hdrCreateRubric": "루브릭 생성", // Header for creating a new rubric
	"rubrics.btnDetach": "분리", //Text for the button to confirm detaching a rubric
	"rubrics.btnAddExisting": "기존 항목 추가", //Text for Add Existing dropdown
	"rubrics.hdrRubrics": "루브릭", //Header for the rubrics section
	"rubrics.btnAttachRubric": "루브릭 부착", //Button for the attach new rubric overlay
	"rubrics.btnCancel": "취소", //Button for canceling out of the attach new rubric overlay
	"rubrics.txtAddExisting": "기존 항목 추가", //Title for the attach rubrics dialog,
	"rubrics.txtNoRubricAdded": "추가된 루브릭 없음", // rubric summary for no rubrics
	"rubrics.txtRubricsAdded": "{count, plural, =1 {루브릭 1개 추가} other {{count}개 루브릭 추가}}", // count of asoociated rubrics
	"rubrics.txtDeleteRubric": "루브릭 삭제", // Text for deleting rubric icon
	"rubrics.txtRubricAdded": "루브릭 추가됨", // Text for notifying screenreader rubric was added
	"rubrics.txtRubricRemoved": "루브릭 제거됨", // Text for notifying screenreader rubric was removed
	"rubrics.txtConfirmDetachRubric": "루브릭이 분리되면 이 활동에서 루브릭에 대한 이전의 모든 평가가 삭제됩니다. 루브릭을 분리하시겠습니까?", //Text for the dialog to confirm detaching a rubric from an evaluated activity
	"rubrics.defaultScoringRubric": "기본 점수 산정 루브릭", // Sub heading for the default scoring rubric select dropdown
	"rubrics.noDefaultScoringRubricSelected": "기본값이 선택되지 않았습니다", // option in default scoring rubric when no default scoring rubric selected

	"grades.points": "점수: {points}", // Text label for displaying points of a grade
	"grades.weight": "가중치: {weight}", // Text label for displaying weight of a grade
	"grades.gradeItem": "평점 항목", //ARIA label for grade-item picker when linking an activity to an existing grade item
	"grades.gradeUnits": "점수", // unit label for GradeOutOf value (e.g. 10 points)
	"grades.chooseNewGradeItemCategory": "평점 범주 선택", // Label for add category button
	"grades.newGradeItemCategory": "평점 범주", // Label for selecting a category dropdown
	"grades.noGradeItemCategory": "범주 없음", // Category dropdown text for not selecting a category
	"grades.changeNewGradeTypeAndScheme": "평점 유형 및 제도 변경", // Label for change type and scheme button
	"grades.newGradeType": "평점 유형", // Label for the grade type
	"grades.newGradeTypeNumeric": "숫자", // Label for numeric grade type radio option
	"grades.newGradeTypeSelectbox": "선택란", // Label for selectbox grade type radio option
	"grades.numericDescription": "지정된 점수 합계에서 일정 값을 할당하여 사용자의 평점을 산정합니다.", // Description of numeric grade type
	"grades.numericDescriptionExample": "예: 8/10", // Example of numeric grade type
	"grades.selectboxDescription": "사용자의 성취와 가장 일치하는 평점 제도 수준을 선택하여 사용자의 평점을 산정합니다.", // Description of selectbox grade type
	"grades.selectboxDescriptionExample": "예: \"매우 좋음\" 또는 \"B+\"", // Example of selectbox grade type
	"grades.newGradeScheme": "평점 제도", // Label for the grade scheme
	"grades.defaultGradeScheme": "-- 기본값 --({schemeName})", // name of default grade scheme
	"grades.creatingNewNumericGradeItem": "새 숫자 평점 항목 {newGradeName} 생성 중", // Aria text for new grade we are creating
	"grades.creatingNewSelectboxGradeItem": "새 선택 상자 평점 항목 {newGradeName} 생성 중", // Aria text for new grade we are creating
	"grades.linkingToGradeItem": "기존 평점 항목 {gradeName}에 연결 중", // Aria text for grade item we are linking to

	"attachments.addGoogleDriveLink": "Google Drive에서 첨부", // Tooltip for a button that adds a link to a Google Drive file
	"attachments.addFile": "파일 업로드", // Tooltip for a button that opens a file upload dialog
	"attachments.addLink": "웹 링크 첨부", // Tooltip for a button that adds a link to a URL
	"attachments.addOneDriveLink": "OneDrive에서 첨부", // Tooltip for a button that adds a link to a OneDrive file
	"attachments.addQuicklink": "기존 활동에 대한 링크 첨부", // Tooltip for a button that adds a link to an existing activity
	"attachments.back": "뒤로", // Text for a back button
	"attachments.closeDialog": "대화 상자 닫기", // ARIA text for button to close dialog
	"attachments.recordAudio": "오디오 녹음", // Text for a button that opens a dialog to record audio
	"attachments.recordVideo": "동영상 녹화", // Text for a button that opens a dialog to record video
	"attachments.save": "저장", // Text for a save button,
	"attachments.attach": "첨부", // Text for Attach button to open attachment row
	"attachments.addGoogleDriveLinkMenu": "Google Drive", // Attach menu item text
	"attachments.addFileMenu": "파일 업로드", // Attach menu item text
	"attachments.addLinkMenu": "웹 링크", // Attach menu item text
	"attachments.addOneDriveLinkMenu": "OneDrive", // Attach menu item text
	"attachments.addQuicklinkMenu": "기존 활동", // Attach menu item text

	"content.name": "이름", // Text label for name input field
	"content.emptyNameField": "이름이 필요합니다.", // Error text that appears below name field when it is left empty
	"content.description": "설명", // Text label for description input field
	"content.pageContent": "페이지 콘텐츠", // Text label for page content input field (html files)
	"content.selectTemplate": "템플릿 선택", // The label text for the subtle-button for selecting an html template
	"content.htmlTemplatesLoading": "로드 중...", // Message displayed while list of html templates is loading
	"content.noHtmlTemplates": "사용 가능한 템플릿이 없음", // Message displayed in dropdown when no html templates are found
	"content.defaultHtmlTemplateHeader": "HTML 파일 템플릿", // The text to display as the default header for the html template select dropdown
	"content.browseForHtmlTemplate": "템플릿 찾아보기", // Text for button to browse for an html template
	"content.availabilityHeader": "사용 가능 날짜", // availability header
	"content.saveError": "콘텐츠 항목이 저장되지 않았습니다. 빨간색으로 표시된 필드를 수정하십시오.", // Error message to inform the user that there was a problem saving the content item, instructing them to correct invalid fields
	"content.displayOptions": "표시 옵션", // Text label for display options
	"content.addDueDate": "기한 추가", // Text label for name input field
	"content.embedOnPage": "페이지에 임베드됨", // Text label for link radio button
	"content.openNewTab": "새 탭에서 열기(권장)", // Text label for link radio button
	"content.openNewTabRecommendation": "리소스에 대한 인증 문제를 방지하려면 이 옵션을 사용하는 것이 좋습니다.", // Text for the help icon that explains reason for recommending new tab option
	"content.openNewTabHelp": "페이지의 시간은 추적되지 않습니다.", // Text for the help icon next to link radio button
	"content.link": "링크", //Text label for link input field
	"content.emptyLinkField": "링크가 필요합니다.", //Error message shown on link tooltip when the link is empty
	"content.invalidLink": "유효한 URL을 입력하십시오.", //Error message shown on link tooltip when the link is not formatted correctly
	"content.notHttps": "\"https\"를 사용한 링크만 임베드됩니다.", //Error message shown on link tooltip when https is not used for embedded links
	"content.noEmbed": "해당 사이트는 임베드할 수 없습니다.", //Error message shown on link tooltip when the link cannot be embedded
	"content.previewLabel": "미리 보기", // The label text for the link preview
	"content.openInNewWindow": "새 창에서 열기", // The label text for the subtle-button for opening a LTI link in a new window
	"content.externalActivity": "외부 활동", // The label text for the external activity section on the LTI link page
	"content.externalActivityOpened": "콘텐츠를 보려면 새 창에서 활동을 엽니다.", // Text for displaying underneath the LTI link jump logo
	"content.externalActivityEmbeddedNotAllowed": "이 외부 활동은 임베드 기능을 지원하지 않습니다. 새 창에서 열기만 하면 볼 수 있습니다.", // Text that replaces the LTI display options if embedding is not allowed
	"content.confirmDialogTitle": "기존 콘텐츠가 삭제됩니다.", // The text for the title of the replace html template confirmation dialog
	"content.confirmDialogBody": "사용자의 기존 콘텐츠를 이 템플릿으로 바꾸시겠습니까?", // The text for the body of the replace html template confirmation dialog
	"content.confirmDialogActionOption": "바꾸기", // The text for the confirmation action to replace content
	"content.confirmDialogCancelOption": "취소", // The text for the cancel action to not replace content
	"content.useEmbeddedPlayer": "임베드된 플레이어 사용", // The text for using the embedded player
	"content.scormActivity": "SCORM 패키지", // The label for the name of the SCORM package
	"content.lastEdited": "최종 편집" // The date when the entity was last edited
};
