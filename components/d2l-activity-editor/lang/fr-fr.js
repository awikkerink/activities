/* eslint quotes: 0 */

export default {
	"editor.btnEditReleaseConditions": "Modifier les conditions de diffusion", // edit release conditions button
	"editor.btnAddReleaseCondition": "Ajouter des conditions de diffusion", // add release condition button
	"editor.btnCreateNew": "Créer", // create new button
	"editor.btnAddExisting": "Ajouter un élément existant", // add existing button
	"editor.btnRemoveCondition": "Supprimer la condition", // remove condition button
	"editor.lblConditionsOperator": "Pour afficher cet élément, l’utilisateur doit satisfaire", // conditions operator label
	"editor.txtConditionAdded": "Condition ajoutée : {title}",
	"editor.txtConditionRemoved": "Condition supprimée : {title}",
	"editor.txtConditionsAdded": "{count} conditions ajoutées",
	"editor.txtNumReleaseConditions": "{count, plural, =1 {{count} condition de diffusion} other {{count} conditions de diffusion}}", // num release condition text
	"editor.txtNumSpecialAccess": "{userCount, plural, =1 {1 utilisateur avec accès spécial} other {{userCount} utilisateurs avec accès spécial}}", // num users with special access text
	"editor.btnCancel": "Annuler", // cancel button
	"editor.btnSave": "Enregistrer et fermer", // save and close button
	"editor.btnSaveMobile": "Enregistrer", // save and close button for mobile devices
	"editor.dueDate": "Date d’échéance", // ARIA label for the due date field when creating/editing an activity
	"editor.endDate": "Date de fin", // ARIA label for the end date field when creating/editing an activity
	"editor.startDate": "Date de début", // ARIA label for the start date field when creating/editing an activity
	"editor.dueTime": "Heure d’échéance", // ARIA label for the due time field when creating/editing an activity
	"editor.endTime": "Heure de fin", // ARIA label for the end time field when creating/editing an activity
	"editor.startTime": "Heure de début", // ARIA label for the start time field when creating/editing an activity
	"editor.hidden": "Masqué", // Label displayed with the visibility switch when hidden
	"editor.noDueDate": "Aucune date d’échéance", // Placeholder text for due date field when no due date is set
	"editor.noEndDate": "Aucune date de fin", // Placeholder text for due date field when no due date is set
	"editor.noStartDate": "Aucune date de début", // Placeholder text for due date field when no due date is set
	"editor.visible": "Visible", // Label displayed with the visibility switch when visible
	"editor.txtAvailabilityStartAndEnd": "La disponibilité commence le {startDate} et se termine le {endDate}", // start/end text
	"editor.txtAvailabilityStartOnly": "La disponibilité commence le {startDate}", // start only text
	"editor.txtAvailabilityEndOnly": "Fin de disponibilité le {endDate}", // end only text
	"editor.txtAvailabilityNeither": "Toujours disponible", // always available text
	"editor.ungraded": "Non noté", // State of score field when there is no score and no grade item, when creating/editing an activity
	"editor.inGrades": "Dans Notes", // State of the grades field when there is a score, and an associated grade item
	"editor.notInGrades": "Introuvable dans Notes", // State of the grades field when there is a score, but no associated grade item
	"editor.addToGrades": "Ajouter aux Notes", // Menu item for adding grade association
	"editor.addAGrade": "Ajouter une note", //ARIA label to add a grade to the activity
	"editor.removeFromGrades": "Supprimer des Notes", // Menu item for removing grade association
	"editor.setUngraded": "Réinitialiser à la valeur Non noté", // Menu item for setting the activity to ungraded
	"editor.scoreOutOf": "Note sur", // ARIA label for the score out of field, when creating/editing an activity
	"editor.emptyScoreOutOfError": "Des valeurs en points doivent être déterminées pour les activités dans Notes", // Error message to inform user that the score out of value is a required field when a grade item is associated
	"editor.invalidScoreOutOfError": "La valeur de Note sur doit être supérieure ou égale à 0,01 et inférieure ou égale à 9 999 999 999", // Error message when an invalid score out of value is entered
	"editor.loading": "Chargement en cours...", // Message displayed while page is loading
	"editor.ok": "OK", // Text of dialog button to commit action
	"editor.cancel": "Annuler", // Text of dialog button to cancel action
	"editor.ariaToolbarShortcutInstructions": "Appuyez sur Alt-F10 pour accéder à la barre d’outils. Pour quitter cette barre d’outils, appuyez sur Échap.", // Instructions for screenreader users on how to enter and exit the html editor toolbar
	"editor.chooseFromGrades": "Choisir parmi les Notes", // Link text and dialog title for the edit grades dialog,
	"editor.editLinkExisting": "Modifier ou lier à l’existant", // New Link text and dialog title for the edit grades dialog,
	"editor.hdrRubrics": "Grilles d’évaluation", //Header for the rubrics section
	"editor.startBeforeEndDate": "La date de début doit être antérieure à la date de fin",
	"editor.dueBetweenStartEndDate": "La date d’échéance doit être postérieure à la date de début et antérieure ou égale à la date de fin",
	"editor.dueAfterStartDate": "La date d’échéance doit être postérieure à la date de début",
	"editor.dueBeforeEndDate": "La date d’échéance doit être antérieure ou égale à la date de fin",
	"editor.createAndLinkToNewGradeItem": "Créer et associer à un nouvel élément de note", //Radio button text
	"editor.linkToExistingGradeItem": "Associer à un élément de note existant", //Radio button text
	"editor.points": "Points : {points}", // Text label for displaying points of a grade
	"editor.noGradeItems": "Aucun élément de note", // Reason why existing grade items cannot be linked in the choose grades dialog
	"editor.noGradeCreatePermission": "Vous ne disposez pas des autorisations requises pour créer un élément de note", // Reason why a new grade items cannot be created in the choose grades dialog
	"editor.competencies": "Objectifs d’apprentissage", //Text label for the competencies tool integration
	"editor.manageCompetencies": "Gérer les objectifs d’apprentissage", //Button text to launch competencies tool dialog
	"editor.competenciesCount": "{count, plural, =1 {1 associé} other {{count} associés}}", //Label for number of associated competencies
	"editor.noLearningObjectives": "Aucun objet d'apprentissage", //text label when there are no associated learning objectives
	"editor.competenciesCountSummary": "{count, plural, =1 {1 objet d’apprentissage} other {{count} objets d’apprentissage}}", // num release condition text
	"editor.unevaluatedCompetencies": "{count, plural, =1 {1 évaluation manquante} other {{count} évaluations manquantes}}", //Label for number of unevalated associated competencies
	"editor.btnClose": "Fermer", //Label for Close button
	"editor.btnCloseDialog": "Fermer cette boîte de dialogue", // close dialog button
	"editor.btnManageSpecialAccess": "Gérer l’accès spécial", // manage special access button
	"editor.saveSuccessful": "Enregistrement réussi", // alert message after a successful save
	"editor.specialAccessRestrictedText": "Seuls les utilisateurs avec l’accès spécial peuvent voir ce dossier", // restricted special access description
	"editor.specialAccessNotRestrictedText": "Les utilisateurs peuvent soumettre des demandes en dehors des dates de disponibilité normales", // not restricted special access description
	"editor.specialAccessCount": "{count, plural, =1 {1 utilisateur} other {{count} utilisateurs}} avec accès spécial", // Label for number of special access users
	"editor.noUsersWithSpecialAccess": "Aucun utilisateur", // text label when there are no users with special access
	"editor.specialAccessDialogTitle": "Gérer l’accès spécial", // Dialog title
	"editor.specialAccessHidden": "Masqué par un accès spécial", // Warning label that the activity is restricted but is being hidden from all users by special access rules
	"editor.discardChangesTitle": "Annuler les modifications ?", // Discard Changes User Prompt
	"editor.discardChangesQuestion": "Voulez-vous vraiment annuler vos modifications ?", // Discard Changes User Prompt
	"editor.yesLabel": "Oui",
	"editor.noLabel": "Non",
	"editor.notificationEmailLabel": "E-mail de notification", // Label for notification email input field
	"editor.invalidNotificationEmailError": "Veuillez saisir une adresse e-mail valide.", // error shown on tooltip when notification email is invalid
	"editor.gradeOutOf": "Note sur", // ARIA label for the grade out of field, when creating/editing an activity
	"editor.inGradebook": "Dans le livret de notes", // New state of the grades field when there is a score, and an associated grade item
	"editor.notInGradebook": "Pas dans le livret de notes", // New state of the grades field when there is a score, but no associated grade item
	"editor.addToGradebook": "Ajouter au livret de notes", // New menu item for adding grade association
	"editor.beforeStartDate": "Avant de commencer :", //Text for before start availability date type
	"editor.afterEndDate": "Une fois terminé :", //Text for after end availability date type
	"editor.lblVisibleWithAccessRestricted": "Visible avec accès restreint", //Text for after end availability date type
	"editor.lblVisibleWithSubmissionRestricted": "Visible avec soumission restreinte", //Text for after end availability date type
	"editor.lblHidden": "Masqué", //Text for after end availability date type
	"editor.availabilityStartTitle": "Availability: Start Date", // Dialog title for editing start date type
	"editor.availabilityEndTitle": "Availability: End Date", // Dialog title for editing start date type
	"editor.startDescription": "The following settings determine how the {assignment} appears to learners before the start date", // Description for start date type
	"editor.endDescription": "The following settings determine how the {assignment} appears to learners after the end date", // Description for start date type
	"editor.assignment": "assignment", // Langterm for assignment or dropbox

	"rubrics.btnAddRubric": "Ajouter une grille d’évaluation", //text for add rubric button
	"rubrics.btnCreateNew": "Créer", //Text for create new dropdown
	"rubrics.hdrCreateRubric": "Créer une grille d’évaluation", // Header for creating a new rubric
	"rubrics.btnDetach": "Détacher", //Text for the button to confirm detaching a rubric
	"rubrics.btnAddExisting": "Ajouter un élément existant", //Text for Add Existing dropdown
	"rubrics.hdrRubrics": "Grilles d’évaluation", //Header for the rubrics section
	"rubrics.btnAttachRubric": "Joindre la grille d’évaluation", //Button for the attach new rubric overlay
	"rubrics.btnCancel": "Annuler", //Button for canceling out of the attach new rubric overlay
	"rubrics.txtAddExisting": "Ajouter un élément existant", //Title for the attach rubrics dialog,
	"rubrics.txtNoRubricAdded": "Aucune grille d’évaluation ajoutée", // rubric summary for no rubrics
	"rubrics.txtRubricsAdded": "{count, plural, =1 {1 grille d’évaluation ajoutée} other {{count} grilles d’évaluation ajoutées}}", // count of asoociated rubrics
	"rubrics.txtDeleteRubric": "Supprimer la grille d’évaluation", // Text for deleting rubric icon
	"rubrics.txtRubricAdded": "Grille d’évaluation ajoutée", // Text for notifying screenreader rubric was added
	"rubrics.txtRubricRemoved": "Grille d’évaluation supprimée", // Text for notifying screenreader rubric was removed
	"rubrics.txtConfirmDetachRubric": "Une fois la grille d’évaluation détachée, toutes les évaluations précédentes de la rubrique dans cette activité seront supprimées. Confirmer le détachement de la grille d’évaluation ?", //Text for the dialog to confirm detaching a rubric from an evaluated activity
	"rubrics.defaultScoringRubric": "Grille d’évaluation d’attribution de note par défaut", // Sub heading for the default scoring rubric select dropdown
	"rubrics.noDefaultScoringRubricSelected": "Aucune valeur par défaut sélectionnée", // option in default scoring rubric when no default scoring rubric selected

	"grades.points": "Points : {points}", // Text label for displaying points of a grade
	"grades.weight": "Pondération : {weight}", // Text label for displaying weight of a grade
	"grades.gradeItem": "Élément de note", //ARIA label for grade-item picker when linking an activity to an existing grade item
	"grades.gradeUnits": "points", // unit label for GradeOutOf value (e.g. 10 points)
	"grades.gradeUnitsSingular": "point", // unit label for GradeOutOf value when value is 1
	"grades.chooseNewGradeItemCategory": "Choisir la catégorie de notes", // Label for add category button
	"grades.newGradeItemCategory": "Catégorie de note", // Label for selecting a category dropdown
	"grades.noGradeItemCategory": "Aucune catégorie", // Category dropdown text for not selecting a category
	"grades.changeNewGradeTypeAndScheme": "Changer le type et le barème de notation", // Label for change type and scheme button
	"grades.chooseNewGradeScheme": "Choisir le barème de notation", // Label for choose grade scheme button (when there is only one type)
	"grades.newGradeType": "Type de notation", // Label for the grade type
	"grades.newGradeTypeNumeric": "Numérique", // Label for numeric grade type radio option
	"grades.newGradeTypeSelectbox": "Zone de liste", // Label for selectbox grade type radio option
	"grades.numericDescription": "Accorder une note à l’utilisateur par l’attribution d’une valeur rapportée à un total de points.", // Description of numeric grade type
	"grades.numericDescriptionExample": "Par ex., 8/10", // Example of numeric grade type
	"grades.selectboxDescription": "Noter les utilisateurs en sélectionnant le niveau du barème de notation qui correspond le mieux à leur accomplissement.", // Description of selectbox grade type
	"grades.selectboxDescriptionExample": "Par ex. « Très bien » ou « B+ »", // Example of selectbox grade type
	"grades.newGradeScheme": "Barème de notation", // Label for the grade scheme
	"grades.defaultGradeScheme": "--Par défaut-- ({schemeName})", // name of default grade scheme
	"grades.creatingNewNumericGradeItem": "Création d’un nouvel élément de note numérique {newGradeName}", // Aria text for new grade we are creating
	"grades.creatingNewSelectboxGradeItem": "Création d’un nouvel élément de note de la zone de liste {newGradeName}", // Aria text for new grade we are creating
	"grades.linkingToGradeItem": "Lien vers l’élément de note existant {gradeName}", // Aria text for grade item we are linking to
	"grades.gradeOutOfMenuItem": "À quoi correspond la section « Note sur » ?", // menu item to launch gradeOutOf help dialog
	"grades.gradeOutOfHelpDialogTitle": "Information : section « Note sur »", // title that appears when the gradeOutOf help dialog is rendered
	"grades.gradeOutOfHelpDialogConfirmationText": "OK", // text that appears on the gradeOutOf help dialog confirmation button
	"grades.gradeOutOfHelpDialogParagraph1": "Si le questionnaire indique la mention « Pas dans le livret de notes », la section « Note sur » reflète le nombre total de points obtenus sur les questions.", // content for paragraph 1 of gradeOutOf help dialog
	"grades.gradeOutOfHelpDialogParagraph2": "Si le questionnaire indique « Dans le livret de notes », la section « Note sur » correspond au nombre maximal de points ou à la pondération dans l’outil Notes.", // content for paragraph 2 of gradeOutOf help dialog

	"attachments.addGoogleDriveLink": "Joindre depuis Google Drive", // Tooltip for a button that adds a link to a Google Drive file
	"attachments.addFile": "Téléchargement du fichier", // Tooltip for a button that opens a file upload dialog
	"attachments.addLink": "Joindre un lien Web", // Tooltip for a button that adds a link to a URL
	"attachments.addOneDriveLink": "Joindre depuis OneDrive", // Tooltip for a button that adds a link to a OneDrive file
	"attachments.addQuicklink": "Joindre un lien à une activité existante", // Tooltip for a button that adds a link to an existing activity
	"attachments.back": "Retour", // Text for a back button
	"attachments.closeDialog": "Fermer la boîte de dialogue", // ARIA text for button to close dialog
	"attachments.recordAudio": "Enregistrer un fichier audio", // Text for a button that opens a dialog to record audio
	"attachments.recordVideo": "Enregistrer une vidéo", // Text for a button that opens a dialog to record video
	"attachments.save": "Enregistrer", // Text for a save button,
	"attachments.attach": "Joindre", // Text for Attach button to open attachment row
	"attachments.addGoogleDriveLinkMenu": "Google Drive", // Attach menu item text
	"attachments.addFileMenu": "Téléchargement du fichier", // Attach menu item text
	"attachments.addLinkMenu": "Lien Web", // Attach menu item text
	"attachments.addOneDriveLinkMenu": "OneDrive", // Attach menu item text
	"attachments.addQuicklinkMenu": "Activité existante", // Attach menu item text

	"content.name": "Nom", // Text label for name input field
	"content.emptyNameField": "Le nom est obligatoire.", // Error text that appears below name field when it is left empty
	"content.description": "Description", // Text label for description input field
	"content.pageContent": "Contenu de la page", // Text label for page content input field (html files)
	"content.selectTemplate": "Sélectionner un modèle", // The label text for the subtle-button for selecting an html template
	"content.htmlTemplatesLoading": "Chargement en cours...", // Message displayed while list of html templates is loading
	"content.noHtmlTemplates": "Aucun modèle disponible", // Message displayed in dropdown when no html templates are found
	"content.defaultHtmlTemplateHeader": "Modèles de fichier HTML", // The text to display as the default header for the html template select dropdown
	"content.browseForHtmlTemplate": "Parcourir pour trouver un modèle", // Text for button to browse for an html template
	"content.availabilityHeader": "Dates de disponibilité", // availability header
	"content.saveError": "Votre élément de contenu n’a pas été enregistré. Corrigez les champs indiqués en rouge.", // Error message to inform the user that there was a problem saving the content item, instructing them to correct invalid fields
	"content.displayOptions": "Afficher les options", // Text label for display options
	"content.addDueDate": "Ajouter la date d’échéance", // Text label for name input field
	"content.embedOnPage": "Incorporer à la page", // Text label for link radio button
	"content.openNewTab": "Ouvrir dans un nouvel onglet (recommandé)", // Text label for link radio button
	"content.openNewTabRecommendation": "Cette option est recommandée pour éviter les problèmes d’authentification pour votre ressource.", // Text for the help icon that explains reason for recommending new tab option
	"content.openNewTabHelp": "Le temps passé sur la page n’est pas surveillé.", // Text for the help icon next to link radio button
	"content.link": "Lien", //Text label for link input field
	"content.emptyLinkField": "Le lien est obligatoire.", //Error message shown on link tooltip when the link is empty
	"content.invalidLink": "Saisissez une URL valide.", //Error message shown on link tooltip when the link is not formatted correctly
	"content.notHttps": "Seuls les liens contenant « https » peuvent être incorporés.", //Error message shown on link tooltip when https is not used for embedded links
	"content.noEmbed": "Ce site ne peut pas être incorporé.", //Error message shown on link tooltip when the link cannot be embedded
	"content.previewLabel": "Prévisualiser", // The label text for the link preview
	"content.openInNewWindow": "Ouvrir dans une nouvelle fenêtre", // The label text for the subtle-button for opening a LTI link in a new window
	"content.externalActivity": "Activité externe", // The label text for the external activity section on the LTI link page
	"content.externalActivityOpened": "Ouvrir l’activité dans une nouvelle fenêtre pour afficher son contenu.", // Text for displaying underneath the LTI link jump logo
	"content.externalActivityEmbeddedNotAllowed": "Cette activité externe ne prend pas en charge l’intégration. Elle ne peut s’afficher que dans une nouvelle fenêtre.", // Text that replaces the LTI display options if embedding is not allowed
	"content.confirmDialogTitle": "Le contenu existant sera supprimé.", // The text for the title of the replace html template confirmation dialog
	"content.confirmDialogBody": "Voulez-vous vraiment remplacer le contenu existant par ce modèle ?", // The text for the body of the replace html template confirmation dialog
	"content.confirmDialogActionOption": "Remplacer", // The text for the confirmation action to replace content
	"content.confirmDialogCancelOption": "Annuler", // The text for the cancel action to not replace content
	"content.useEmbeddedPlayer": "Utiliser un lecteur intégré", // The text for using the embedded player
	"content.scormActivity": "Package SCORM", // The label for the name of the SCORM package
	"content.lastEdited": "Dernière modification", // The date when the entity was last edited
	"content.externalFile": "External file", // The text to use for labeling external files
	"content.advancedEditing": 'Advanced Editing', // The text to use on the advanced editing button
	"content.fileHasCaptions": "This file has captions in", // The text to use preceding the list of captions
};
