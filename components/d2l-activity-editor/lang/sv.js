/* eslint quotes: 0 */

export default {
	"editor.btnEditReleaseConditions": "Redigera publiceringsvillkor", // edit release conditions button
	"editor.btnAddReleaseCondition": "Lägg till publiceringsvillkor", // add release condition button
	"editor.btnCreateNew": "Skapa ny", // create new button
	"editor.btnAddExisting": "Lägg till befintligt", // add existing button
	"editor.btnRemoveCondition": "Ta bort villkor", // remove condition button
	"editor.lblConditionsOperator": "Om användare vill få åtkomst till det här objektet måste de uppfylla", // conditions operator label
	"editor.txtConditionAdded": "Lade till villkor: {title}",
	"editor.txtConditionRemoved": "Tog bort villkor: {title}",
	"editor.txtConditionsAdded": "Lade till {count} villkor",
	"editor.txtNumReleaseConditions": "{count, plural, =1 {{count} publiceringsvillkor} other {{count} publiceringsvillkor}}", // num release condition text
	"editor.txtNumSpecialAccess": "{userCount, plural, =1 {1 användare med specialåtkomst} other {{userCount} användare med specialåtkomst}}", // num users with special access text
	"editor.btnCancel": "Avbryt", // cancel button
	"editor.btnSave": "Spara och stäng", // save and close button
	"editor.btnSaveMobile": "Spara", // save and close button for mobile devices
	"editor.dueDate": "Förfallodatum", // ARIA label for the due date field when creating/editing an activity
	"editor.endDate": "Slutdatum", // ARIA label for the end date field when creating/editing an activity
	"editor.startDate": "Startdatum", // ARIA label for the start date field when creating/editing an activity
	"editor.dueTime": "Förfallotid", // ARIA label for the due time field when creating/editing an activity
	"editor.endTime": "Sluttid", // ARIA label for the end time field when creating/editing an activity
	"editor.startTime": "Starttid", // ARIA label for the start time field when creating/editing an activity
	"editor.hidden": "Dold", // Label displayed with the visibility switch when hidden
	"editor.noDueDate": "Inget förfallodatum", // Placeholder text for due date field when no due date is set
	"editor.noEndDate": "Inget slutdatum", // Placeholder text for due date field when no due date is set
	"editor.noStartDate": "Inget startdatum", // Placeholder text for due date field when no due date is set
	"editor.visible": "Synlig", // Label displayed with the visibility switch when visible
	"editor.txtAvailabilityStartAndEnd": "Tillgänglighet börjar {startDate} och upphör {endDate}", // start/end text
	"editor.txtAvailabilityStartOnly": "Tillgänglighet börjar {startDate}", // start only text
	"editor.txtAvailabilityEndOnly": "Tillgänglighet upphör {endDate}", // end only text
	"editor.txtAvailabilityNeither": "Alltid tillgänglig", // always available text
	"editor.ungraded": "Ej betygsatt", // State of score field when there is no score and no grade item, when creating/editing an activity
	"editor.inGrades": "I Betyg", // State of the grades field when there is a score, and an associated grade item
	"editor.notInGrades": "Inte i Betyg", // State of the grades field when there is a score, but no associated grade item
	"editor.addToGrades": "Lägg till betyg", // Menu item for adding grade association
	"editor.addAGrade": "Lägg till ett betyg", //ARIA label to add a grade to the activity
	"editor.removeFromGrades": "Ta bort från Betyg", // Menu item for removing grade association
	"editor.setUngraded": "Återställ till Ej betygsatt", // Menu item for setting the activity to ungraded
	"editor.scoreOutOf": "Resultat av totalt", // ARIA label for the score out of field, when creating/editing an activity
	"editor.emptyScoreOutOfError": "Ett poängvärde måste anges för aktiviteter i Betyg", // Error message to inform user that the score out of value is a required field when a grade item is associated
	"editor.invalidScoreOutOfError": "Resultat av totalt måste vara större än eller lika med 0,01 och mindre än eller lika med 9 999 999 999.", // Error message when an invalid score out of value is entered
	"editor.loading": "Läser in ...", // Message displayed while page is loading
	"editor.ok": "OK", // Text of dialog button to commit action
	"editor.cancel": "Avbryt", // Text of dialog button to cancel action
	"editor.ariaToolbarShortcutInstructions": "Tryck ALT-F10 för verktygsfält och ESC för att avsluta verktygsfältet när du är i det.", // Instructions for screenreader users on how to enter and exit the html editor toolbar
	"editor.chooseFromGrades": "Välj betyg", // Link text and dialog title for the edit grades dialog,
	"editor.editLinkExisting": "Redigera eller länka till befintlig", // New Link text and dialog title for the edit grades dialog,
	"editor.hdrRubrics": "Rubriceringar", //Header for the rubrics section
	"editor.startBeforeEndDate": "Startdatumet måste vara före slutdatumet",
	"editor.dueBetweenStartEndDate": "Förfallodatum måste vara efter startdatumet och före eller på slutdatumet",
	"editor.dueAfterStartDate": "Förfallodatumet måste vara senare än startdatumet",
	"editor.dueBeforeEndDate": "Förfallodatumet måste vara på eller före slutdatumet",
	"editor.createAndLinkToNewGradeItem": "Skapa och länka till ett betygsobjekt", //Radio button text
	"editor.linkToExistingGradeItem": "Länka till ett befintligt betygsobjekt", //Radio button text
	"editor.points": "Poäng: {points}", // Text label for displaying points of a grade
	"editor.noGradeItems": "Det finns inga betygsobjekt", // Reason why existing grade items cannot be linked in the choose grades dialog
	"editor.noGradeCreatePermission": "Du har inte behörighet att skapa betygsobjekt", // Reason why a new grade items cannot be created in the choose grades dialog
	"editor.competencies": "Inlärningsmål", //Text label for the competencies tool integration
	"editor.manageCompetencies": "Hantera utbildningsmål", //Button text to launch competencies tool dialog
	"editor.competenciesCount": "{count, plural, =1 {1 bifogad} other {{count} bifogade}}", //Label for number of associated competencies
	"editor.noLearningObjectives": "Inga läromål", //text label when there are no associated learning objectives
	"editor.competenciesCountSummary": "{count, plural, =1 {1 inlärningsmål} other {{count} inlärningsmål}}", // num release condition text
	"editor.unevaluatedCompetencies": "{count, plural, =1 {1 bedömning saknas} other {{count} bedömningar saknas}}", //Label for number of unevalated associated competencies
	"editor.btnClose": "Stäng", //Label for Close button
	"editor.btnCloseDialog": "Stäng den här dialogrutan", // close dialog button
	"editor.btnManageSpecialAccess": "Hantera särskild behörighet", // manage special access button
	"editor.saveSuccessful": "Sparades", // alert message after a successful save
	"editor.specialAccessRestrictedText": "Endast användare med specialåtkomst kan se den här mappen", // restricted special access description
	"editor.specialAccessNotRestrictedText": "Användare kan lämna in utanför normala tillgänglighetsdatum", // not restricted special access description
	"editor.specialAccessCount": "{count, plural, =1 {1 användare} other {{count} användare}} med specialåtkomst", // Label for number of special access users
	"editor.noUsersWithSpecialAccess": "Inga användare", // text label when there are no users with special access
	"editor.specialAccessDialogTitle": "Hantera särskild behörighet", // Dialog title
	"editor.specialAccessHidden": "Dold av särskild behörighet", // Warning label that the activity is restricted but is being hidden from all users by special access rules
	"editor.discardChangesTitle": "Vill du ignorera ändringarna?", // Discard Changes User Prompt
	"editor.discardChangesQuestion": "Är du säker på att du vill ignorera dina ändringar?", // Discard Changes User Prompt
	"editor.yesLabel": "Ja",
	"editor.noLabel": "Nej",
	"editor.notificationEmailLabel": "E-postmeddelande", // Label for notification email input field
	"editor.invalidNotificationEmailError": "Ange en giltig e-postadress", // error shown on tooltip when notification email is invalid
	"editor.gradeOutOf": "Betyg av", // ARIA label for the grade out of field, when creating/editing an activity
	"editor.inGradebook": "I betygsboken", // New state of the grades field when there is a score, and an associated grade item
	"editor.notInGradebook": "Inte i betygsboken", // New state of the grades field when there is a score, but no associated grade item
	"editor.addToGradebook": "Lägg till i betygsboken", // New menu item for adding grade association
	"editor.beforeStartDate": "Före start:", //Text for before start availability date type
	"editor.afterEndDate": "Efter slut:", //Text for after end availability date type
	"editor.lblVisibleWithAccessRestricted": "Synlig med begränsad åtkomst", //Text for after end availability date type
	"editor.lblVisibleWithSubmissionRestricted": "Synlig med begränsad inlämning", //Text for after end availability date type
	"editor.lblHidden": "Dold", //Text for after end availability date type
	"editor.availabilityStartTitle": "Availability: Start Date", // Dialog title for editing start date type
	"editor.availabilityEndTitle": "Availability: End Date", // Dialog title for editing start date type
	"editor.startDescription": "The following settings determine how the {assignment} appears to learners before the start date", // Description for start date type
	"editor.endDescription": "The following settings determine how the {assignment} appears to learners after the end date", // Description for start date type
	"editor.assignment": "assignment", // Langterm for assignment or dropbox

	"rubrics.btnAddRubric": "Lägg till rubricering", //text for add rubric button
	"rubrics.btnCreateNew": "Skapa ny", //Text for create new dropdown
	"rubrics.hdrCreateRubric": "Skapa rubricering", // Header for creating a new rubric
	"rubrics.btnDetach": "Ta bort", //Text for the button to confirm detaching a rubric
	"rubrics.btnAddExisting": "Lägg till befintligt", //Text for Add Existing dropdown
	"rubrics.hdrRubrics": "Rubriceringar", //Header for the rubrics section
	"rubrics.btnAttachRubric": "Bifoga rubrik", //Button for the attach new rubric overlay
	"rubrics.btnCancel": "Avbryt", //Button for canceling out of the attach new rubric overlay
	"rubrics.txtAddExisting": "Lägg till befintligt", //Title for the attach rubrics dialog,
	"rubrics.txtNoRubricAdded": "Du har inte lagt till någon rubrik", // rubric summary for no rubrics
	"rubrics.txtRubricsAdded": "{count, plural, =1 {1 rubrik har lagts till} other {{count} rubriker har lagts till}}", // count of asoociated rubrics
	"rubrics.txtDeleteRubric": "Ta bort rubricering", // Text for deleting rubric icon
	"rubrics.txtRubricAdded": "Rubriken har lagts till", // Text for notifying screenreader rubric was added
	"rubrics.txtRubricRemoved": "Rubriken har tagits bort", // Text for notifying screenreader rubric was removed
	"rubrics.txtConfirmDetachRubric": "När rubriceringen har tagits bort tas alla tidigare bedömningar av rubriceringen i den här aktiviteten bort. Bekräfta borttagning av rubricering?", //Text for the dialog to confirm detaching a rubric from an evaluated activity
	"rubrics.defaultScoringRubric": "Standardresultatrubricering", // Sub heading for the default scoring rubric select dropdown
	"rubrics.noDefaultScoringRubricSelected": "Ingen standard vald", // option in default scoring rubric when no default scoring rubric selected

	"grades.points": "Poäng: {points}", // Text label for displaying points of a grade
	"grades.weight": "Vikt: {weight}", // Text label for displaying weight of a grade
	"grades.gradeItem": "Betygsobjekt", //ARIA label for grade-item picker when linking an activity to an existing grade item
	"grades.gradeUnits": "poäng", // unit label for GradeOutOf value (e.g. 10 points)
	"grades.gradeUnitsSingular": "poäng", // unit label for GradeOutOf value when value is 1
	"grades.chooseNewGradeItemCategory": "Välj betygskategori", // Label for add category button
	"grades.newGradeItemCategory": "Betygskategori", // Label for selecting a category dropdown
	"grades.noGradeItemCategory": "Ingen kategori", // Category dropdown text for not selecting a category
	"grades.changeNewGradeTypeAndScheme": "Ändra betygstyp och schema", // Label for change type and scheme button
	"grades.chooseNewGradeScheme": "Välj betygsschema", // Label for choose grade scheme button (when there is only one type)
	"grades.newGradeType": "Betygstyp", // Label for the grade type
	"grades.newGradeTypeNumeric": "Numerisk", // Label for numeric grade type radio option
	"grades.newGradeTypeSelectbox": "Markeringsruta", // Label for selectbox grade type radio option
	"grades.numericDescription": "Bedöm användare genom att tilldela dem ett värde bland ett specificerat totalt antal poäng.", // Description of numeric grade type
	"grades.numericDescriptionExample": "Exempel: 8/10", // Example of numeric grade type
	"grades.selectboxDescription": "Bedöm användare genom att välja nivån i betygsschemat som bäst matchar deras prestation.", // Description of selectbox grade type
	"grades.selectboxDescriptionExample": "Exempel: \"Mycket bra\" eller \"B+\"", // Example of selectbox grade type
	"grades.newGradeScheme": "Betygsschema", // Label for the grade scheme
	"grades.defaultGradeScheme": "--Standard-- ({schemeName})", // name of default grade scheme
	"grades.creatingNewNumericGradeItem": "Skapa nytt numeriskt betygsobjekt {newGradeName}", // Aria text for new grade we are creating
	"grades.creatingNewSelectboxGradeItem": "Skapa nytt betygsobjekt av typen markeringsruta {newGradeName}", // Aria text for new grade we are creating
	"grades.linkingToGradeItem": "Länkar till befintligt betygsobjekt {gradeName}", // Aria text for grade item we are linking to
	"grades.gradeOutOfMenuItem": "Vad är Betyg av?", // menu item to launch gradeOutOf help dialog
	"grades.gradeOutOfHelpDialogTitle": "Information: Betyg av", // title that appears when the gradeOutOf help dialog is rendered
	"grades.gradeOutOfHelpDialogConfirmationText": "OK", // text that appears on the gradeOutOf help dialog confirmation button
	"grades.gradeOutOfHelpDialogParagraph1": "Om förhöret visar ”Inte i betygsbok” avspeglar Betyg av totalt antal poäng för frågorna.", // content for paragraph 1 of gradeOutOf help dialog
	"grades.gradeOutOfHelpDialogParagraph2": "Om förhöret visar ”I betygsbok” är Betyg av maxpoäng eller maxvikt i verktyget Betyg.", // content for paragraph 2 of gradeOutOf help dialog

	"attachments.addGoogleDriveLink": "Bifoga från Google Drive", // Tooltip for a button that adds a link to a Google Drive file
	"attachments.addFile": "Filuppladdning", // Tooltip for a button that opens a file upload dialog
	"attachments.addLink": "Bifoga webblänk", // Tooltip for a button that adds a link to a URL
	"attachments.addOneDriveLink": "Bifoga från OneDrive", // Tooltip for a button that adds a link to a OneDrive file
	"attachments.addQuicklink": "Bifoga länk i befintlig aktivitet", // Tooltip for a button that adds a link to an existing activity
	"attachments.back": "Tillbaka", // Text for a back button
	"attachments.closeDialog": "Stäng dialogruta", // ARIA text for button to close dialog
	"attachments.recordAudio": "Spela in ljud", // Text for a button that opens a dialog to record audio
	"attachments.recordVideo": "Spela in video", // Text for a button that opens a dialog to record video
	"attachments.save": "Spara", // Text for a save button,
	"attachments.attach": "Bifoga", // Text for Attach button to open attachment row
	"attachments.addGoogleDriveLinkMenu": "Google Drive", // Attach menu item text
	"attachments.addFileMenu": "Filuppladdning", // Attach menu item text
	"attachments.addLinkMenu": "Webblänk", // Attach menu item text
	"attachments.addOneDriveLinkMenu": "OneDrive", // Attach menu item text
	"attachments.addQuicklinkMenu": "Befintlig aktivitet", // Attach menu item text

	"content.name": "Namn", // Text label for name input field
	"content.emptyNameField": "Namn krävs.", // Error text that appears below name field when it is left empty
	"content.description": "Beskrivning", // Text label for description input field
	"content.pageContent": "Sidoinnehåll", // Text label for page content input field (html files)
	"content.selectTemplate": "Välj mall", // The label text for the subtle-button for selecting an html template
	"content.htmlTemplatesLoading": "Läser in ...", // Message displayed while list of html templates is loading
	"content.noHtmlTemplates": "Inga mallar tillgängliga", // Message displayed in dropdown when no html templates are found
	"content.defaultHtmlTemplateHeader": "HTML-filmallar", // The text to display as the default header for the html template select dropdown
	"content.browseForHtmlTemplate": "Bläddra efter en mall", // Text for button to browse for an html template
	"content.availabilityHeader": "Tillgänglighetsdatum", // availability header
	"content.saveError": "Ditt innehållsobjekt sparades inte. Korrigera de fält som är markerade med rött.", // Error message to inform the user that there was a problem saving the content item, instructing them to correct invalid fields
	"content.displayOptions": "Visa alternativ", // Text label for display options
	"content.addDueDate": "Lägg till slutdatum", // Text label for name input field
	"content.embedOnPage": "Integrera i sidan", // Text label for link radio button
	"content.openNewTab": "Öppna i ny flik (rekommenderas)", // Text label for link radio button
	"content.openNewTabRecommendation": "Du bör använda det här alternativet för att undvika autentiseringsproblem för resursen.", // Text for the help icon that explains reason for recommending new tab option
	"content.openNewTabHelp": "Tid på sidan spåras inte.", // Text for the help icon next to link radio button
	"content.link": "Länk", //Text label for link input field
	"content.emptyLinkField": "Länk krävs.", //Error message shown on link tooltip when the link is empty
	"content.invalidLink": "Ange en giltig webbadress.", //Error message shown on link tooltip when the link is not formatted correctly
	"content.notHttps": "Bara länkar som använder \"https\" kan integreras.", //Error message shown on link tooltip when https is not used for embedded links
	"content.noEmbed": "Sidan kan inte integreras.", //Error message shown on link tooltip when the link cannot be embedded
	"content.previewLabel": "Förhandsgranska", // The label text for the link preview
	"content.openInNewWindow": "Öppna i nytt fönster", // The label text for the subtle-button for opening a LTI link in a new window
	"content.externalActivity": "Extern aktivitet", // The label text for the external activity section on the LTI link page
	"content.externalActivityOpened": "Öppna aktiviteten i ett nytt fönster för att visa innehållet i den.", // Text for displaying underneath the LTI link jump logo
	"content.externalActivityEmbeddedNotAllowed": "Den här externa aktiviteten stöder inte inbäddning. Du kan endast visa den genom att öppna den i ett nytt fönster.", // Text that replaces the LTI display options if embedding is not allowed
	"content.confirmDialogTitle": "Det befintliga innehållet raderas.", // The text for the title of the replace html template confirmation dialog
	"content.confirmDialogBody": "Är du säker på att du vill ersätta befintligt innehåll med den här mallen?", // The text for the body of the replace html template confirmation dialog
	"content.confirmDialogActionOption": "Ersätt", // The text for the confirmation action to replace content
	"content.confirmDialogCancelOption": "Avbryt", // The text for the cancel action to not replace content
	"content.useEmbeddedPlayer": "Använd den inbyggda spelaren", // The text for using the embedded player
	"content.scormActivity": "SCORM-paket", // The label for the name of the SCORM package
	"content.lastEdited": "Redigerades", // The date when the entity was last edited
	"content.externalFile": "External file", // The text to use for labeling external files
	"content.advancedEditing": 'Advanced Editing', // The text to use on the advanced editing button
	"content.fileHasCaptions": "This file has captions in", // The text to use preceding the list of captions
};
