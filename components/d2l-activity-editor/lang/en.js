/* eslint quotes: 0 */

export default {
	"d2l-activity-editor.btnEditReleaseConditions": "Edit Release Conditions", // edit release conditions button
	"d2l-activity-editor.btnAddReleaseCondition": "Add Release Condition", // add release condition button
	"d2l-activity-editor.btnCreateNew": "Create New", // create new button
	"d2l-activity-editor.btnAddExisting": "Add Existing", // add existing button
	"d2l-activity-editor.btnRemoveCondition": "Remove Condition", // remove condition button
	"d2l-activity-editor.lblConditionsOperator": "To view this item, users must satisfy", // conditions operator label
	"d2l-activity-editor.txtNumReleaseConditions": "{count, plural, =1 {{count} Release Condition} other {{count} Release Conditions}}", // num release condition text
	"d2l-activity-editor.btnCancel": "Cancel", // cancel button
	"d2l-activity-editor.btnSave": "Save and Close", // save and close button
	"d2l-activity-editor.btnSaveMobile": "Save", // save and close button for mobile devices
	"d2l-activity-editor.dueDate": "Due Date", // ARIA label for the due date field when creating/editing an activity
	"d2l-activity-editor.endDate": "End Date", // ARIA label for the end date field when creating/editing an activity
	"d2l-activity-editor.startDate": "Start Date", // ARIA label for the start date field when creating/editing an activity
	"d2l-activity-editor.dueTime": "Due Time", // ARIA label for the due time field when creating/editing an activity
	"d2l-activity-editor.endTime": "End Time", // ARIA label for the end time field when creating/editing an activity
	"d2l-activity-editor.startTime": "Start Time", // ARIA label for the start time field when creating/editing an activity
	"d2l-activity-editor.hidden": "Hidden", // Label displayed with the visibility switch when hidden
	"d2l-activity-editor.noDueDate": "No due date", // Placeholder text for due date field when no due date is set
	"d2l-activity-editor.noEndDate": "No end date", // Placeholder text for due date field when no due date is set
	"d2l-activity-editor.noStartDate": "No start date", // Placeholder text for due date field when no due date is set
	"d2l-activity-editor.visible": "Visible", // Label displayed with the visibility switch when visible
	"d2l-activity-editor.txtAvailabilityStartAndEnd": "Availability starts {startDate} and ends {endDate}", // start/end text
	"d2l-activity-editor.txtAvailabilityStartOnly": "Availability starts {startDate}", // start only text
	"d2l-activity-editor.txtAvailabilityEndOnly": "Availability ends {endDate}", // end only text
	"d2l-activity-editor.txtAvailabilityNeither": "Always available", // always available text
	"d2l-activity-editor.ungraded": "Ungraded", // State of score field when there is no score and no grade item, when creating/editing an activity
	"d2l-activity-editor.inGrades": "In Grades", // State of the grades field when there is a score, and an associated grade item
	"d2l-activity-editor.notInGrades": "Not in Grades", // State of the grades field when there is a score, but no associated grade item
	"d2l-activity-editor.addToGrades": "Add to Grades", // Menu item for adding grade association
	"d2l-activity-editor.addAGrade": "Add a Grade", //ARIA label to add a grade to the activity
	"d2l-activity-editor.removeFromGrades": "Remove from Grades", // Menu item for removing grade association
	"d2l-activity-editor.setUngraded": "Reset to Ungraded", // Menu item for setting the activity to ungraded
	"d2l-activity-editor.scoreOutOf": "Score Out Of", // ARIA label for the score out of field, when creating/editing an activity
	"d2l-activity-editor.emptyScoreOutOfError": "A points value must be specified for activities in Grades", // Error message to inform user that the score out of value is a required field when a grade item is associated
	"d2l-activity-editor.invalidScoreOutOfError": "Score Out Of must be greater than or equal to 0.01 and less than or equal to 9,999,999,999", // Error message when an invalid score out of value is entered
	"d2l-activity-editor.loading": "Loading...", // Message displayed while page is loading
	"d2l-activity-editor.ok": "OK", // Text of dialog button to commit action
	"d2l-activity-editor.cancel": "Cancel", // Text of dialog button to cancel action
	"d2l-activity-editor.ariaToolbarShortcutInstructions": "Press ALT-F10 for toolbar, and press ESC to exit toolbar once inside.", // Instructions for screenreader users on how to enter and exit the html editor toolbar
	"d2l-activity-editor.chooseFromGrades": "Choose from Grades", // Link text and dialog title for the edit grades dialog,
	"d2l-activity-editor.hdrRubrics": "Rubrics", //Header for the rubrics section
	"d2l-activity-editor.startBeforeEndDate": "Start Date must be before End Date",
	"d2l-activity-editor.dueBetweenStartEndDate": "Due Date must be after Start Date and before or equal to End Date",
	"d2l-activity-editor.dueAfterStartDate": "Due Date must be after Start Date",
	"d2l-activity-editor.dueBeforeEndDate": "Due Date must be before or equal to End Date",
	"d2l-activity-editor.createAndLinkToNewGradeItem": "Create and link to a new grade item", //Radio button text
	"d2l-activity-editor.linkToExistingGradeItem": "Link to an existing grade item", //Radio button text
	"d2l-activity-editor.points": "Points: {points}", // Text label for displaying points of a grade
	"d2l-activity-editor.noGradeItems": "No existing grade items", // Reason why existing grade items cannot be linked in the choose grades dialog
	"d2l-activity-editor.noGradeCreatePermission": "You do not have permission to create a new grade item", // Reason why a new grade items cannot be created in the choose grades dialog
	"d2l-activity-editor.competencies": "Learning Objectives", //Text label for the competencies tool integration
	"d2l-activity-editor.manageCompetencies": "Manage Learning Objectives", //Button text to launch competencies tool dialog
	"d2l-activity-editor.competenciesCount": "{count, plural, =0 {No learning objectives} =1 {1 attached} other {{count} attached}}", //Label for number of associated competencies
	"d2l-activity-editor.competenciesCountSummary": "{count, plural, =0 {No learning objectives} =1 {1 learning objective} other {{count} learning objectives}}",
	"d2l-activity-editor.unevaluatedCompetencies": "{count, plural, =1 {1 missing assessment} other {{count} missing assessments}}", //Label for number of unevalated associated competencies
	"d2l-activity-editor.btnClose": "Close", //Label for Close button
	"d2l-activity-editor.btnCloseDialog": "Close this Dialog", // close dialog button
	"d2l-activity-editor.btnManageSpecialAccess": "Manage Special Access", // manage special access button
	"d2l-activity-editor.specialAccessRestrictedText": "Only users with special access can see this folder", // restricted special access description
	"d2l-activity-editor.specialAccessNotRestrictedText": "Users can submit outside normal availability dates", // not restricted special access description
	"d2l-activity-editor.specialAccessCount": "{count, plural, =1 {1 user} other {{count} users}} with special access", // Label for number of special access users

	"d2l-activity-rubrics.btnAddRubric": "Add rubric", //text for add rubric button
	"d2l-activity-rubrics.btnCreateNew": "Create New", //Text for create new dropdown
	"d2l-activity-rubrics.btnAddExisting": "Add Existing", //Text for Add Existing dropdown
	"d2l-activity-rubrics.hdrRubrics": "zzRubrics", //Header for the rubrics section
	"d2l-activity-rubrics.btnAttachRubric": "Attach Rubric", //Button for the attach new rubric overlay
	"d2l-activity-rubrics.btnCancel": "Cancel", //Button for canceling out of the attach new rubric overlay
	"d2l-activity-rubrics.txtAddExisting": "Add Existing", //Title for the attach rubrics dialog,
	"d2l-activity-rubrics.txtNoRubricAdded": "No rubric added", // rubric summary for no rubrics
	"d2l-activity-rubrics.txtRubricsAdded": "{count, plural, =1 {1 rubric added} other {{count} rubrics added}}", // count of asoociated rubrics
	"d2l-activity-rubrics.txtDeleteRubric": "Delete Rubric", // Text for deleting rubric icon
	"d2l-activity-rubrics.btnClose": "Close", // X button for exiting the create new rubric overlay
	"d2l-activity-rubrics.txtRubricAdded": "Rubric added", // Text for notifying screenreader rubric was added
	"d2l-activity-rubrics.txtRubricRemoved": "Rubric removed", // Text for notifying screenreader rubric was removed 

	"d2l-activity-grades.points": "Points: {points}", // Text label for displaying points of a grade
	"d2l-activity-grades.weight": "Weight: {weight}", // Text label for displaying weight of a grade
	"d2l-activity-grades.gradeItem": "Grade Item", //ARIA label for grade-item picker when linking an activity to an existing grade item
	"d2l-activity-grades.newGradeItemCategory": "Grade Category", // Label for selecting a category dropdown
	"d2l-activity-grades.noGradeItemCategory": "No Category", // Category dropdown text for not selecting a category

	"d2l-activity-attachments.addGoogleDriveLink": "Attach from Google Drive", // Tooltip for a button that adds a link to a Google Drive file
	"d2l-activity-attachments.ddFile": "File Upload", // Tooltip for a button that opens a file upload dialog
	"d2l-activity-attachments.addLink": "Attach Weblink", // Tooltip for a button that adds a link to a URL
	"d2l-activity-attachments.addOneDriveLink": "Attach from OneDrive", // Tooltip for a button that adds a link to a OneDrive file
	"d2l-activity-attachments.addQuicklink": "Attach Link to Existing Activity", // Tooltip for a button that adds a link to an existing activity
	"d2l-activity-attachments.back": "Back", // Text for a back button
	"d2l-activity-attachments.closeDialog": "Close Dialog", // ARIA text for button to close dialog
	"d2l-activity-attachments.recordAudio": "Record Audio", // Text for a button that opens a dialog to record audio
	"d2l-activity-attachments.recordVideo": "Record Video", // Text for a button that opens a dialog to record video
	"d2l-activity-attachments.save": "Save", // Text for a save button,
	"d2l-activity-attachments.attach": "Attach", // Text for Attach button to open attachment row
	"d2l-activity-attachments.addGoogleDriveLinkMenu": "Google Drive", // Attach menu item text
	"d2l-activity-attachments.addFileMenu": "File Upload", // Attach menu item text
	"d2l-activity-attachments.addLinkMenu": "Weblink", // Attach menu item text
	"d2l-activity-attachments.addOneDriveLinkMenu": "OneDrive", // Attach menu item text
	"d2l-activity-attachments.addQuicklinkMenu": "Existing Activity", // Attach menu item text

	"d2l-activity-assignment-editor.hdrReleaseConditions": "Release Conditions", // release conditions heading
	"d2l-activity-assignment-editor.hlpReleaseConditions": "Users are not able to access or view the assignment unless they meet the release conditions.", // release conditions help
	"d2l-activity-assignment-editor.completionType": "Marked as completed", // Label for the completion type field when creating/editing an assignment
	"d2l-activity-assignment-editor.lblAnonymousMarking": "Anonymous Marking", // Label for anonymous marking
	"d2l-activity-assignment-editor.chkAnonymousMarking": "Hide student names during assessment", // Checkbox for anonymous marking
	"d2l-activity-assignment-editor.dueDate": "Due Date", // ARIA label for the due date field when creating/editing an activity
	"d2l-activity-assignment-editor.txtAnnotationsOff": "Annotations off", // annotations off text
	"d2l-activity-assignment-editor.emptyNameError": "Name is required", // Error message to inform user that the assignment name is a required field
	"d2l-activity-assignment-editor.instructions": "Instructions", // Label for the instruction field when creating/editing an assignment
	"d2l-activity-assignment-editor.hdrTurnitin": "Turnitin Integration", // turnitin heading
	"d2l-activity-assignment-editor.hlpTurnitin": "Turnitin® adds additional functionality to evaluation.", // turnitin help
	"d2l-activity-assignment-editor.btnEditTurnitin": "Manage Turnitin", // edit turnitin button
	"d2l-activity-assignment-editor.btnCloseDialog": "Close this Dialog", // close dialog button
	"d2l-activity-assignment-editor.txtOriginalityCheckOn": "Originality Check On", // originality check on text
	"d2l-activity-assignment-editor.txtGradeMarkOn": "GradeMark On", // grade mark on text
	"d2l-activity-assignment-editor.txtTurnitinOn": "Turnitin enabled", // turnitin on text
	"d2l-activity-assignment-editor.btnCancel": "Cancel", // cancel button
	"d2l-activity-assignment-editor.btnSave": "Save", // save button
	"d2l-activity-assignment-editor.hdrAvailability": "Availability Dates & Conditions", // availability header
	"d2l-activity-assignment-editor.name": "Name", // Label for the name field when creating/editing an activity
	"d2l-activity-assignment-editor.submissionType": "Submission Type", // Label for the submission type field when creating/editing an assignment
	"d2l-activity-assignment-editor.annotationTools": "Annotation Tools", // Label for enabling/disabling Annotation Tools when creating/editing an assignment
	"d2l-activity-assignment-editor.annotationToolDescription": "Make annotation tools available for assessment", //Description next to the checkbox for annotation tools when creating/editing an assignment
	"d2l-activity-assignment-editor.scoreOutOf": "Score Out Of", // Label for the score-out-of field when creating/editing an activity
	"d2l-activity-assignment-editor.anonymousGradingEnabled": "Anonymous marking", // Summary message for accordion when anonymous grading is enabled
	"d2l-activity-assignment-editor.evaluationAndFeedback": "Evaluation & Feedback", // Header text for the evaluation and feedback summarizer
	"d2l-activity-assignment-editor.txtAssignmentType": "Assignment Type", // Label for assignment type
	"d2l-activity-assignment-editor.txtIndividual": "Individual Assignment", // Label for individual assignment type
	"d2l-activity-assignment-editor.txtGroup": "Group Assignment", // Label for group assignment type,
	"d2l-activity-assignment-editor.txtGroupCategoryWithName": "Group Category: {groupCategory}", //Label for the group category {groupCategory} is the name of the group category
	"d2l-activity-assignment-editor.txtGroupCategory": "Group Category", // Label for group category,
	"d2l-activity-assignment-editor.txtGroupAssignmentSummary": "Group assignment", // Summary message for accordion when assignment type is set to group
	"d2l-activity-assignment-editor.submissionCompletionAndCategorization": "Submission & Completion", // Label for the availability and dates summarizer
	"d2l-activity-assignment-editor.assignmentSaveError": "Your assignment wasn't saved. Please correct the fields outlined in red.", // Error message to inform the user that there was a problem saving the assignment, instructing them to correct invalid fields
	"d2l-activity-assignment-editor.folderTypeCannotChange": "Assignment type cannot be changed once submissions are present", // Folder type cannot change
	"d2l-activity-assignment-editor.folderTypeNoGroups": "No groups exist. Create new groups in the Groups tool.", // Folder type no groups
	"d2l-activity-assignment-editor.folderTypeCreateGroups": "Create new groups in the Groups tool.", // Folder type create groups
	"d2l-activity-assignment-editor.discardChangesTitle": "Discard changes?", // Discard Changes User Prompt
	"d2l-activity-assignment-editor.discardChangesQuestion": "Are you sure you want to discard your changes?", // Discard Changes User Prompt
	"d2l-activity-assignment-editor.yesLabel": "Yes",
	"d2l-activity-assignment-editor.noLabel": "No",
	"d2l-activity-assignment-editor.filesSubmissionLimit": "Files Allowed Per Submission",
	"d2l-activity-assignment-editor.UnlimitedFilesPerSubmission": "Unlimited",
	"d2l-activity-assignment-editor.OneFilePerSubmission": "One File",
	"d2l-activity-assignment-editor.submissionsRule": "Submissions",
	"d2l-activity-assignment-editor.hdrSpecialAccess": "Special Access", // special access heading
	"d2l-activity-assignment-editor.hlpSpecialAccess": "Special Access allows assignments to be available to only a select group of users or individualized due dates for certain users.", // special access help
};
