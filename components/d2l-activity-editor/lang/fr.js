/* eslint quotes: 0 */

export default {
	"editor.btnEditReleaseConditions": "Modifier les conditions de diffusion", // edit release conditions button
	"editor.btnAddReleaseCondition": "Ajouter une condition de diffusion", // add release condition button
	"editor.btnCreateNew": "Créer", // create new button
	"editor.btnAddExisting": "Ajouter existant", // add existing button
	"editor.btnRemoveCondition": "Supprimer la condition", // remove condition button
	"editor.lblConditionsOperator": "Pour consulter cet article, les utilisateurs doivent respecter", // conditions operator label
	"editor.txtConditionAdded": "Condition ajoutée : {title}",
	"editor.txtConditionRemoved": "Condition retirée : {title}",
	"editor.txtConditionsAdded": "{count} conditions ajoutées",
	"editor.txtNumReleaseConditions": "{count, plural, =1 {{count} condition de diffusion} other {{count} conditions de diffusion}}", // num release condition text
	"editor.txtNumSpecialAccess": "{userCount, plural, =1 {1 utilisateur ayant l’accès spécial} other {{userCount} utilisateurs ayant l’accès spécial}}", // num users with special access text
	"editor.btnCancel": "Annuler", // cancel button
	"editor.btnSave": "Enregistrer et fermer", // save and close button
	"editor.btnSaveMobile": "Enregistrer", // save and close button for mobile devices
	"editor.dueDate": "Date d’échéance", // ARIA label for the due date field when creating/editing an activity
	"editor.endDate": "Date de fin", // ARIA label for the end date field when creating/editing an activity
	"editor.startDate": "Date du début", // ARIA label for the start date field when creating/editing an activity
	"editor.dueTime": "Heure d’échéance", // ARIA label for the due time field when creating/editing an activity
	"editor.endTime": "Heure de fin", // ARIA label for the end time field when creating/editing an activity
	"editor.startTime": "Heure de début", // ARIA label for the start time field when creating/editing an activity
	"editor.hidden": "Masqué", // Label displayed with the visibility switch when hidden
	"editor.noDueDate": "Aucune date d’échéance", // Placeholder text for due date field when no due date is set
	"editor.noEndDate": "Pas de date de fin", // Placeholder text for due date field when no due date is set
	"editor.noStartDate": "Pas de date de début", // Placeholder text for due date field when no due date is set
	"editor.visible": "Visible", // Label displayed with the visibility switch when visible
	"editor.txtAvailabilityStartAndEnd": "La disponibilité commence le {startDate} et se termine le {endDate}", // start/end text
	"editor.txtAvailabilityStartOnly": "La disponibilité commence le {startDate}", // start only text
	"editor.txtAvailabilityEndOnly": "La disponibilité se termine le {endDate}", // end only text
	"editor.txtAvailabilityNeither": "Toujours disponible", // always available text
	"editor.ungraded": "Non noté", // State of score field when there is no score and no grade item, when creating/editing an activity
	"editor.inGrades": "Dans Notes", // State of the grades field when there is a score, and an associated grade item
	"editor.notInGrades": "Pas dans Notes d’appréciation", // State of the grades field when there is a score, but no associated grade item
	"editor.addToGrades": "Ajouter aux Notes d’appréciation", // Menu item for adding grade association
	"editor.addAGrade": "Inclure une Note d’appréciation", //ARIA label to add a grade to the activity
	"editor.removeFromGrades": "Retirer des Notes d’appréciation", // Menu item for removing grade association
	"editor.setUngraded": "Réinitialisation au statut non noté", // Menu item for setting the activity to ungraded
	"editor.scoreOutOf": "Note sur", // ARIA label for the score out of field, when creating/editing an activity
	"editor.emptyScoreOutOfError": "Une valeur en points doit être précisée pour les activités dans l’outil Notes d’appréciation", // Error message to inform user that the score out of value is a required field when a grade item is associated
	"editor.invalidScoreOutOfError": "La note sur doit être égale ou supérieure à 0,01 et égale ou inférieure à 9 999 999 999.", // Error message when an invalid score out of value is entered
	"editor.loading": "Chargement…", // Message displayed while page is loading
	"editor.ok": "OK", // Text of dialog button to commit action
	"editor.cancel": "Annuler", // Text of dialog button to cancel action
	"editor.ariaToolbarShortcutInstructions": "Cliquez sur Alt + F10 pour afficher la barre d’outils et sur Échap pour la faire disparaître.", // Instructions for screenreader users on how to enter and exit the html editor toolbar
	"editor.chooseFromGrades": "Faire un choix dans les Notes d’appréciation", // Link text and dialog title for the edit grades dialog,
	"editor.editLinkExisting": "Modifier ou lier à un élément existant", // New Link text and dialog title for the edit grades dialog,
	"editor.hdrRubrics": "Rubriques", //Header for the rubrics section
	"editor.startBeforeEndDate": "La date du début doit être antérieure à la date de fin.",
	"editor.dueBetweenStartEndDate": "La date d’échéance doit être postérieure à la date du début et antérieure ou correspondre à la date de fin.",
	"editor.dueAfterStartDate": "La date d’échéance doit être postérieure à la date du début.",
	"editor.dueBeforeEndDate": "La date d’échéance doit être antérieure ou correspondre à la date de fin.",
	"editor.createAndLinkToNewGradeItem": "Créer et lier à un nouvel élément de note", //Radio button text
	"editor.linkToExistingGradeItem": "Lier à un élément de note existant", //Radio button text
	"editor.points": "Points : {points}", // Text label for displaying points of a grade
	"editor.noGradeItems": "Aucun élément de note existant", // Reason why existing grade items cannot be linked in the choose grades dialog
	"editor.noGradeCreatePermission": "Vous n’êtes pas autorisé(e) à créer un élément de note", // Reason why a new grade items cannot be created in the choose grades dialog
	"editor.competencies": "Objectifs d’apprentissage", //Text label for the competencies tool integration
	"editor.manageCompetencies": "Gérer les objectifs d’apprentissage", //Button text to launch competencies tool dialog
	"editor.competenciesCount": "{count, plural, =1 {1 pièce jointe} other {{count} pièces jointes}}", //Label for number of associated competencies
	"editor.noLearningObjectives": "Aucun objectif d’apprentissage", //text label when there are no associated learning objectives
	"editor.competenciesCountSummary": "{count, plural, =1 {1 objectif d’apprentissage} other {{count} objectifs d’apprentissage}}", // num release condition text
	"editor.unevaluatedCompetencies": "{count, plural, =1 {1 évaluation manquante} other {{count} évaluations manquantes}}", //Label for number of unevalated associated competencies
	"editor.btnClose": "Fermer", //Label for Close button
	"editor.btnCloseDialog": "Fermer ce dialogue", // close dialog button
	"editor.btnManageSpecialAccess": "Gérer l’accès spécial", // manage special access button
	"editor.saveSuccessful": "Enregistrement réussi", // alert message after a successful save
	"editor.specialAccessRestrictedText": "Seuls les utilisateurs ayant l’accès spécial ont la possibilité de prendre connaissance de ce dossier", // restricted special access description
	"editor.specialAccessNotRestrictedText": "Les utilisateurs peuvent effectuer la soumission en dehors des dates de disponibilité normales", // not restricted special access description
	"editor.specialAccessCount": "{count, plural, =1 {1 utilisateur} other {{count} utilisateurs}} ayant l’accès spécial", // Label for number of special access users
	"editor.noUsersWithSpecialAccess": "Aucun utilisateur", // text label when there are no users with special access
	"editor.specialAccessDialogTitle": "Gérer l’accès spécial", // Dialog title
	"editor.specialAccessHidden": "Masqué par accès spécial", // Warning label that the activity is restricted but is being hidden from all users by special access rules
	"editor.discardChangesTitle": "Abandonner les modifications?", // Discard Changes User Prompt
	"editor.discardChangesQuestion": "Êtes-vous certain de vouloir abandonner vos modifications?", // Discard Changes User Prompt
	"editor.yesLabel": "Oui",
	"editor.noLabel": "Non",
	"editor.notificationEmailLabel": "Courriel de notification", // Label for notification email input field
	"editor.invalidNotificationEmailError": "Veuillez saisir une adresse courriel valide", // error shown on tooltip when notification email is invalid
	"editor.gradeOutOf": "Note d'appréciation sur", // ARIA label for the grade out of field, when creating/editing an activity
	"editor.inGradebook": "Dans le carnet de notes", // New state of the grades field when there is a score, and an associated grade item
	"editor.notInGradebook": "Ne figure pas dans le carnet de notes", // New state of the grades field when there is a score, but no associated grade item
	"editor.addToGradebook": "Inclure dans le carnet de notes", // New menu item for adding grade association
	"editor.beforeStartDate": "Avant le début :", //Text for before start availability date type
	"editor.afterEndDate": "Après la fin :", //Text for after end availability date type
	"editor.lblVisibleWithAccessRestricted": "Visible avec accès restreint", //Text for after end availability date type
	"editor.lblVisibleWithSubmissionRestricted": "Visible avec soumission restreinte", //Text for after end availability date type
	"editor.lblHidden": "Masqué(e)", //Text for after end availability date type
	"editor.availabilityStartTitle": "Availability: Start Date", // Dialog title for editing start date type
	"editor.availabilityEndTitle": "Availability: End Date", // Dialog title for editing start date type
	"editor.startDescription": "The following settings determine how the {assignment} appears to learners before the start date", // Description for start date type
	"editor.endDescription": "The following settings determine how the {assignment} appears to learners after the end date", // Description for start date type
	"editor.assignment": "assignment", // Langterm for assignment or dropbox

	"rubrics.btnAddRubric": "Ajouter une rubrique", //text for add rubric button
	"rubrics.btnCreateNew": "Créer", //Text for create new dropdown
	"rubrics.hdrCreateRubric": "Créer une rubrique", // Header for creating a new rubric
	"rubrics.btnDetach": "Retrait", //Text for the button to confirm detaching a rubric
	"rubrics.btnAddExisting": "Ajouter existant", //Text for Add Existing dropdown
	"rubrics.hdrRubrics": "Rubriques", //Header for the rubrics section
	"rubrics.btnAttachRubric": "Joindre la rubrique", //Button for the attach new rubric overlay
	"rubrics.btnCancel": "Annuler", //Button for canceling out of the attach new rubric overlay
	"rubrics.txtAddExisting": "Ajouter existant", //Title for the attach rubrics dialog,
	"rubrics.txtNoRubricAdded": "Aucune rubrique n’a été ajoutée", // rubric summary for no rubrics
	"rubrics.txtRubricsAdded": "{count, plural, =1 {1 rubrique ajoutée} other {{count} rubriques ajoutées}}", // count of asoociated rubrics
	"rubrics.txtDeleteRubric": "Supprimer la rubrique", // Text for deleting rubric icon
	"rubrics.txtRubricAdded": "Rubrique ajoutée", // Text for notifying screenreader rubric was added
	"rubrics.txtRubricRemoved": "Rubrique supprimée", // Text for notifying screenreader rubric was removed
	"rubrics.txtConfirmDetachRubric": "Quand la rubrique sera retirée, toutes les évaluations précédentes de la rubrique dans cette activité seront supprimées. Confirmer le retrait de la rubrique?", //Text for the dialog to confirm detaching a rubric from an evaluated activity
	"rubrics.defaultScoringRubric": "Rubrique de notation par défaut", // Sub heading for the default scoring rubric select dropdown
	"rubrics.noDefaultScoringRubricSelected": "Aucune valeur par défaut sélectionnée", // option in default scoring rubric when no default scoring rubric selected

	"grades.points": "Points : {points}", // Text label for displaying points of a grade
	"grades.weight": "Poids : {weight}", // Text label for displaying weight of a grade
	"grades.gradeItem": "Élément de note", //ARIA label for grade-item picker when linking an activity to an existing grade item
	"grades.gradeUnits": "points", // unit label for GradeOutOf value (e.g. 10 points)
	"grades.gradeUnitsSingular": "point", // unit label for GradeOutOf value when value is 1
	"grades.chooseNewGradeItemCategory": "Choisir la catégorie de notes", // Label for add category button
	"grades.newGradeItemCategory": "Catégorie de note d’appréciation", // Label for selecting a category dropdown
	"grades.noGradeItemCategory": "Aucune catégorie", // Category dropdown text for not selecting a category
	"grades.changeNewGradeTypeAndScheme": "Changer le type et le barème de notes", // Label for change type and scheme button
	"grades.chooseNewGradeScheme": "Sélectionner le barème de notes", // Label for choose grade scheme button (when there is only one type)
	"grades.newGradeType": "Type de la note d’appréciation", // Label for the grade type
	"grades.newGradeTypeNumeric": "Numérique", // Label for numeric grade type radio option
	"grades.newGradeTypeSelectbox": "Boîte de sélection", // Label for selectbox grade type radio option
	"grades.numericDescription": "Accorder une note à l’utilisateur par l’attribution d’une valeur provenant d’un groupe de points admissibles.", // Description of numeric grade type
	"grades.numericDescriptionExample": "P. ex., 8 sur 10", // Example of numeric grade type
	"grades.selectboxDescription": "Noter les utilisateurs en sélectionnant le niveau du barème de notes d’appréciation qui correspond le mieux à leur accomplissement.", // Description of selectbox grade type
	"grades.selectboxDescriptionExample": "P. ex., « Très bon » ou « B+ »", // Example of selectbox grade type
	"grades.newGradeScheme": "Barème de notes d’appréciation", // Label for the grade scheme
	"grades.defaultGradeScheme": "--Par défaut-- ({schemeName})", // name of default grade scheme
	"grades.creatingNewNumericGradeItem": "Création d’un nouvel élément de note de type Numérique {newGradeName}", // Aria text for new grade we are creating
	"grades.creatingNewSelectboxGradeItem": "Création d’un nouvel élément de note de type Boîte de sélection {newGradeName}", // Aria text for new grade we are creating
	"grades.linkingToGradeItem": "Lien vers l’élément de note {GradeName} existant", // Aria text for grade item we are linking to
	"grades.gradeOutOfMenuItem": "Qu’est-ce que la note maximale?", // menu item to launch gradeOutOf help dialog
	"grades.gradeOutOfHelpDialogTitle": "Information : note maximale", // title that appears when the gradeOutOf help dialog is rendered
	"grades.gradeOutOfHelpDialogConfirmationText": "OK", // text that appears on the gradeOutOf help dialog confirmation button
	"grades.gradeOutOfHelpDialogParagraph1": "Si le questionnaire n’est pas dans le carnet de notes, la note maximale correspond au total des points pour l’ensemble des questions.", // content for paragraph 1 of gradeOutOf help dialog
	"grades.gradeOutOfHelpDialogParagraph2": "Si le questionnaire est dans le carnet de notes, la note maximale correspond au maximum de points ou à la pondération dans l’outil Notes.", // content for paragraph 2 of gradeOutOf help dialog

	"attachments.addGoogleDriveLink": "Joindre à partir de Google Drive", // Tooltip for a button that adds a link to a Google Drive file
	"attachments.addFile": "Téléversement de fichier", // Tooltip for a button that opens a file upload dialog
	"attachments.addLink": "Joindre un lien Web", // Tooltip for a button that adds a link to a URL
	"attachments.addOneDriveLink": "Joindre à partir de OneDrive", // Tooltip for a button that adds a link to a OneDrive file
	"attachments.addQuicklink": "Joindre un lien à l’activité existante", // Tooltip for a button that adds a link to an existing activity
	"attachments.back": "Précédent", // Text for a back button
	"attachments.closeDialog": "Fermer la boîte de dialogue", // ARIA text for button to close dialog
	"attachments.recordAudio": "Enregistrer un fichier audio", // Text for a button that opens a dialog to record audio
	"attachments.recordVideo": "Enregistrer une vidéo", // Text for a button that opens a dialog to record video
	"attachments.save": "Enregistrer", // Text for a save button,
	"attachments.attach": "Joindre", // Text for Attach button to open attachment row
	"attachments.addGoogleDriveLinkMenu": "Google Drive", // Attach menu item text
	"attachments.addFileMenu": "Téléversement de fichier", // Attach menu item text
	"attachments.addLinkMenu": "Lien Web", // Attach menu item text
	"attachments.addOneDriveLinkMenu": "OneDrive", // Attach menu item text
	"attachments.addQuicklinkMenu": "Activité existante", // Attach menu item text

	"content.name": "Nom", // Text label for name input field
	"content.emptyNameField": "Le nom est obligatoire.", // Error text that appears below name field when it is left empty
	"content.description": "Description", // Text label for description input field
	"content.pageContent": "Contenu de la page", // Text label for page content input field (html files)
	"content.selectTemplate": "Sélectionnez un modèle", // The label text for the subtle-button for selecting an html template
	"content.htmlTemplatesLoading": "Téléchargement en cours…", // Message displayed while list of html templates is loading
	"content.noHtmlTemplates": "Aucun modèle disponible", // Message displayed in dropdown when no html templates are found
	"content.defaultHtmlTemplateHeader": "Modèles de fichiers HTML", // The text to display as the default header for the html template select dropdown
	"content.browseForHtmlTemplate": "Naviguer vers le modèle", // Text for button to browse for an html template
	"content.availabilityHeader": "Dates de disponibilité", // availability header
	"content.saveError": "Votre élément de contenu n’a pas été enregistré. Veuillez corriger les champs indiqués en rouge.", // Error message to inform the user that there was a problem saving the content item, instructing them to correct invalid fields
	"content.displayOptions": "Options d’affichage", // Text label for display options
	"content.addDueDate": "Ajouter la date d’échéance", // Text label for name input field
	"content.embedOnPage": "Incorporer dans la page", // Text label for link radio button
	"content.openNewTab": "Ouvrir dans un nouvel onglet (recommandé)", // Text label for link radio button
	"content.openNewTabRecommendation": "Cette option est recommandée pour prévenir les problèmes d’authentification liés à votre ressource.", // Text for the help icon that explains reason for recommending new tab option
	"content.openNewTabHelp": "Le temps consacré à la page n’est pas surveillé.", // Text for the help icon next to link radio button
	"content.link": "Lien", //Text label for link input field
	"content.emptyLinkField": "Le lien est obligatoire.", //Error message shown on link tooltip when the link is empty
	"content.invalidLink": "Veuillez entrer une adresse URL valide.", //Error message shown on link tooltip when the link is not formatted correctly
	"content.notHttps": "Seuls les liens commençant par « https » peuvent être incorporés.", //Error message shown on link tooltip when https is not used for embedded links
	"content.noEmbed": "Ce site ne peut pas être incorporé.", //Error message shown on link tooltip when the link cannot be embedded
	"content.previewLabel": "Prévisualiser", // The label text for the link preview
	"content.openInNewWindow": "Ouvrir dans une nouvelle fenêtre", // The label text for the subtle-button for opening a LTI link in a new window
	"content.externalActivity": "Activité externe", // The label text for the external activity section on the LTI link page
	"content.externalActivityOpened": "Ouvrir l’activité dans une nouvelle fenêtre pour en afficher le contenu.", // Text for displaying underneath the LTI link jump logo
	"content.externalActivityEmbeddedNotAllowed": "Cette activité externe ne prend pas en charge l’intégration. Il est possible de l’afficher uniquement en ouvrant une nouvelle fenêtre.", // Text that replaces the LTI display options if embedding is not allowed
	"content.confirmDialogTitle": "Votre contenu existant sera supprimé.", // The text for the title of the replace html template confirmation dialog
	"content.confirmDialogBody": "Êtes-vous certain de vouloir remplacer votre contenu existant par ce modèle?", // The text for the body of the replace html template confirmation dialog
	"content.confirmDialogActionOption": "Remplacer", // The text for the confirmation action to replace content
	"content.confirmDialogCancelOption": "Annuler", // The text for the cancel action to not replace content
	"content.useEmbeddedPlayer": "Utiliser le lecteur intégré", // The text for using the embedded player
	"content.scormActivity": "Progiciel SCORM", // The label for the name of the SCORM package
	"content.lastEdited": "Dernière modification", // The date when the entity was last edited
	"content.externalFile": "External file", // The text to use for labeling external files
	"content.advancedEditing": 'Advanced Editing', // The text to use on the advanced editing button
	"content.fileHasCaptions": "This file has captions in", // The text to use preceding the list of captions
};
