/* eslint quotes: 0 */

export default {
	"editor.btnEditReleaseConditions": "Editar condições de liberação", // edit release conditions button
	"editor.btnAddReleaseCondition": "Adicionar condição de liberação", // add release condition button
	"editor.btnCreateNew": "Criar novo", // create new button
	"editor.btnAddExisting": "Adicionar existente", // add existing button
	"editor.btnRemoveCondition": "Remover condição", // remove condition button
	"editor.lblConditionsOperator": "Para visualizar o item, os usuários devem atender a", // conditions operator label
	"editor.txtConditionAdded": "Condição adicionada: {title}",
	"editor.txtConditionRemoved": "Condição removida: {title}",
	"editor.txtConditionsAdded": "{count} condições adicionadas",
	"editor.txtNumReleaseConditions": "{count, plural, =1 {{count} condição de liberação} other {{count} condições de liberação}}", // num release condition text
	"editor.txtNumSpecialAccess": "{userCount, plural, =1 {1 usuário com acesso especial} other {{userCount} usuários com acesso especial}}", // num users with special access text
	"editor.btnCancel": "Cancelar", // cancel button
	"editor.btnSave": "Salvar e fechar", // save and close button
	"editor.btnSaveMobile": "Salvar", // save and close button for mobile devices
	"editor.dueDate": "Prazo", // ARIA label for the due date field when creating/editing an activity
	"editor.endDate": "Data final", // ARIA label for the end date field when creating/editing an activity
	"editor.startDate": "Data de início", // ARIA label for the start date field when creating/editing an activity
	"editor.dueTime": "Hora limite", // ARIA label for the due time field when creating/editing an activity
	"editor.endTime": "Hora final", // ARIA label for the end time field when creating/editing an activity
	"editor.startTime": "Hora de início", // ARIA label for the start time field when creating/editing an activity
	"editor.hidden": "Oculto", // Label displayed with the visibility switch when hidden
	"editor.noDueDate": "Sem prazo", // Placeholder text for due date field when no due date is set
	"editor.noEndDate": "Sem data final", // Placeholder text for due date field when no due date is set
	"editor.noStartDate": "Não há data de início", // Placeholder text for due date field when no due date is set
	"editor.visible": "Visível", // Label displayed with the visibility switch when visible
	"editor.txtAvailabilityStartAndEnd": "A disponibilidade começa em {startDate} e termina em {endDate}", // start/end text
	"editor.txtAvailabilityStartOnly": "Início da disponibilidade: {startDate}", // start only text
	"editor.txtAvailabilityEndOnly": "Término da disponibilidade: {endDate}", // end only text
	"editor.txtAvailabilityNeither": "Sempre disponível", // always available text
	"editor.ungraded": "Não Avaliado", // State of score field when there is no score and no grade item, when creating/editing an activity
	"editor.inGrades": "Presente em Notas", // State of the grades field when there is a score, and an associated grade item
	"editor.notInGrades": "Ausente em Notas", // State of the grades field when there is a score, but no associated grade item
	"editor.addToGrades": "Adicionar às notas", // Menu item for adding grade association
	"editor.addAGrade": "Adicionar uma nota", //ARIA label to add a grade to the activity
	"editor.removeFromGrades": "Remover de Notas", // Menu item for removing grade association
	"editor.setUngraded": "Redefinir como Não Avaliado", // Menu item for setting the activity to ungraded
	"editor.scoreOutOf": "Pontuação de", // ARIA label for the score out of field, when creating/editing an activity
	"editor.emptyScoreOutOfError": "É preciso especificar um valor de pontos para as atividades em Notas", // Error message to inform user that the score out of value is a required field when a grade item is associated
	"editor.invalidScoreOutOfError": "O valor do campo Pontuação de deve ser superior ou igual a 0,01 e inferior ou igual a 9.999.999.999", // Error message when an invalid score out of value is entered
	"editor.loading": "Carregando…", // Message displayed while page is loading
	"editor.ok": "OK", // Text of dialog button to commit action
	"editor.cancel": "Cancelar", // Text of dialog button to cancel action
	"editor.ariaToolbarShortcutInstructions": "Pressione ALT+F10 para entrar na barra de ferramentas e ESC para sair dela.", // Instructions for screenreader users on how to enter and exit the html editor toolbar
	"editor.chooseFromGrades": "Escolher em notas", // Link text and dialog title for the edit grades dialog,
	"editor.editLinkExisting": "Editar ou vincular a existente", // New Link text and dialog title for the edit grades dialog,
	"editor.hdrRubrics": "Rubricas", //Header for the rubrics section
	"editor.startBeforeEndDate": "A data de início deve ser anterior à data final",
	"editor.dueBetweenStartEndDate": "O prazo deve ser posterior à data de início e anterior ou igual à data final",
	"editor.dueAfterStartDate": "O prazo deve ser posterior à data de início",
	"editor.dueBeforeEndDate": "O prazo deve ser anterior ou igual à data final",
	"editor.createAndLinkToNewGradeItem": "Criar e vincular a um novo item de nota", //Radio button text
	"editor.linkToExistingGradeItem": "Vincular a um item de nota existente", //Radio button text
	"editor.points": "Pontos: {points}", // Text label for displaying points of a grade
	"editor.noGradeItems": "Não há itens de nota existentes", // Reason why existing grade items cannot be linked in the choose grades dialog
	"editor.noGradeCreatePermission": "Você não tem permissão para criar um novo item de nota", // Reason why a new grade items cannot be created in the choose grades dialog
	"editor.competencies": "Objetivos de aprendizagem", //Text label for the competencies tool integration
	"editor.manageCompetencies": "Gerenciar objetivos de aprendizagem", //Button text to launch competencies tool dialog
	"editor.competenciesCount": "{count, plural, =1 {1 anexo} other {{count} anexos}}", //Label for number of associated competencies
	"editor.noLearningObjectives": "Nenhum objetivo de aprendizagem", //text label when there are no associated learning objectives
	"editor.competenciesCountSummary": "{count, plural, =1 {1 objetivo de aprendizagem} other {{count} objetivos de aprendizagem}}", // num release condition text
	"editor.unevaluatedCompetencies": "{count, plural, =1 {1 avaliação ausente} other {{count} avaliações ausentes}}", //Label for number of unevalated associated competencies
	"editor.btnClose": "Fechar", //Label for Close button
	"editor.btnCloseDialog": "Fechar esta caixa de diálogo", // close dialog button
	"editor.btnManageSpecialAccess": "Gerenciar acesso especial", // manage special access button
	"editor.saveSuccessful": "Salvo com êxito", // alert message after a successful save
	"editor.specialAccessRestrictedText": "Apenas usuários com acesso especial podem ver esta pasta", // restricted special access description
	"editor.specialAccessNotRestrictedText": "Os usuários podem fazer envios fora das datas normais de disponibilidade", // not restricted special access description
	"editor.specialAccessCount": "{count, plural, =1 {1 usuário} other {{count} usuários}} com acesso especial", // Label for number of special access users
	"editor.noUsersWithSpecialAccess": "Nenhum usuário", // text label when there are no users with special access
	"editor.specialAccessDialogTitle": "Gerenciar acesso especial", // Dialog title
	"editor.specialAccessHidden": "Oculta por acesso especial", // Warning label that the activity is restricted but is being hidden from all users by special access rules
	"editor.discardChangesTitle": "Descartar alterações?", // Discard Changes User Prompt
	"editor.discardChangesQuestion": "Tem certeza que deseja descartar suas alterações?", // Discard Changes User Prompt
	"editor.yesLabel": "Sim",
	"editor.noLabel": "Não",
	"editor.notificationEmailLabel": "E-mail de notificação", // Label for notification email input field
	"editor.invalidNotificationEmailError": "Informe um endereço de e-mail válido", // error shown on tooltip when notification email is invalid
	"editor.gradeOutOf": "Nota de", // ARIA label for the grade out of field, when creating/editing an activity
	"editor.inGradebook": "Inserida no livro de notas", // New state of the grades field when there is a score, and an associated grade item
	"editor.notInGradebook": "Não inserida no livro de notas", // New state of the grades field when there is a score, but no associated grade item
	"editor.addToGradebook": "Adicionar ao livro de notas", // New menu item for adding grade association

	"rubrics.btnAddRubric": "Adicionar rubrica", //text for add rubric button
	"rubrics.btnCreateNew": "Criar novo", //Text for create new dropdown
	"rubrics.hdrCreateRubric": "Criar rubrica", // Header for creating a new rubric
	"rubrics.btnDetach": "Desanexar", //Text for the button to confirm detaching a rubric
	"rubrics.btnAddExisting": "Adicionar existente", //Text for Add Existing dropdown
	"rubrics.hdrRubrics": "Rubricas", //Header for the rubrics section
	"rubrics.btnAttachRubric": "Anexar rubrica", //Button for the attach new rubric overlay
	"rubrics.btnCancel": "Cancelar", //Button for canceling out of the attach new rubric overlay
	"rubrics.txtAddExisting": "Adicionar existente", //Title for the attach rubrics dialog,
	"rubrics.txtNoRubricAdded": "Nenhuma rubrica adicionada", // rubric summary for no rubrics
	"rubrics.txtRubricsAdded": "{count, plural, =1 {1 rubrica adicionada} other {{count} rubricas adicionadas}}", // count of asoociated rubrics
	"rubrics.txtDeleteRubric": "Excluir rubrica", // Text for deleting rubric icon
	"rubrics.txtRubricAdded": "Rubrica adicionada", // Text for notifying screenreader rubric was added
	"rubrics.txtRubricRemoved": "Rubrica removida", // Text for notifying screenreader rubric was removed
	"rubrics.txtConfirmDetachRubric": "Depois que a rubrica for desanexada, todas as avaliações anteriores da rubrica na atividade serão excluídas. Confirmar a exclusão da rubrica?", //Text for the dialog to confirm detaching a rubric from an evaluated activity
	"rubrics.defaultScoringRubric": "Rubrica de pontuação padrão", // Sub heading for the default scoring rubric select dropdown
	"rubrics.noDefaultScoringRubricSelected": "Nenhum padrão selecionado", // option in default scoring rubric when no default scoring rubric selected

	"grades.points": "Pontos: {points}", // Text label for displaying points of a grade
	"grades.weight": "Peso: {weight}", // Text label for displaying weight of a grade
	"grades.gradeItem": "Item de nota", //ARIA label for grade-item picker when linking an activity to an existing grade item
	"grades.gradeUnits": "pontos", // unit label for GradeOutOf value (e.g. 10 points)
	"grades.chooseNewGradeItemCategory": "Escolher categoria de nota", // Label for add category button
	"grades.newGradeItemCategory": "Categoria de nota", // Label for selecting a category dropdown
	"grades.noGradeItemCategory": "Nenhuma categoria", // Category dropdown text for not selecting a category
	"grades.changeNewGradeTypeAndScheme": "Alterar tipo e esquema de notas", // Label for change type and scheme button
	"grades.newGradeType": "Tipo de nota", // Label for the grade type
	"grades.newGradeTypeNumeric": "Numérico", // Label for numeric grade type radio option
	"grades.newGradeTypeSelectbox": "Caixa de seleção", // Label for selectbox grade type radio option
	"grades.numericDescription": "Avalie usuários atribuindo um valor em um intervalo específico de pontos.", // Description of numeric grade type
	"grades.numericDescriptionExample": "Por exemplo: 8/10", // Example of numeric grade type
	"grades.selectboxDescription": "Avalie usuários selecionando o nível do esquema de notas que melhor corresponda aos acertos.", // Description of selectbox grade type
	"grades.selectboxDescriptionExample": "Por exemplo: \"Muito bom\" ou \"B+\"", // Example of selectbox grade type
	"grades.newGradeScheme": "Grade do esquema", // Label for the grade scheme
	"grades.defaultGradeScheme": "--Padrão-- ({schemeName})", // name of default grade scheme
	"grades.creatingNewNumericGradeItem": "Criar nova nota numérica {newGradeName}", // Aria text for new grade we are creating
	"grades.creatingNewSelectboxGradeItem": "Criar nova nota de caixa de seleção {newGradeName}", // Aria text for new grade we are creating
	"grades.linkingToGradeItem": "Vincular à nota existente {gradeName}", // Aria text for grade item we are linking to

	"attachments.addGoogleDriveLink": "Anexar arquivo do Google Drive", // Tooltip for a button that adds a link to a Google Drive file
	"attachments.addFile": "Carregamento de arquivo", // Tooltip for a button that opens a file upload dialog
	"attachments.addLink": "Anexar link da Web", // Tooltip for a button that adds a link to a URL
	"attachments.addOneDriveLink": "Anexar arquivo do OneDrive", // Tooltip for a button that adds a link to a OneDrive file
	"attachments.addQuicklink": "Anexar link a uma atividade existente", // Tooltip for a button that adds a link to an existing activity
	"attachments.back": "Voltar", // Text for a back button
	"attachments.closeDialog": "Fechar caixa de diálogo", // ARIA text for button to close dialog
	"attachments.recordAudio": "Gravar áudio", // Text for a button that opens a dialog to record audio
	"attachments.recordVideo": "Gravar vídeo", // Text for a button that opens a dialog to record video
	"attachments.save": "Salvar", // Text for a save button,
	"attachments.attach": "Anexar", // Text for Attach button to open attachment row
	"attachments.addGoogleDriveLinkMenu": "Google Drive", // Attach menu item text
	"attachments.addFileMenu": "Carregamento de arquivo", // Attach menu item text
	"attachments.addLinkMenu": "Link da Web", // Attach menu item text
	"attachments.addOneDriveLinkMenu": "OneDrive", // Attach menu item text
	"attachments.addQuicklinkMenu": "Atividade existente", // Attach menu item text

	"content.name": "Nome", // Text label for name input field
	"content.emptyNameField": "O nome é obrigatório.", // Error text that appears below name field when it is left empty
	"content.description": "Descrição", // Text label for description input field
	"content.pageContent": "Conteúdo da página", // Text label for page content input field (html files)
	"content.selectTemplate": "Selecione um modelo", // The label text for the subtle-button for selecting an html template
	"content.htmlTemplatesLoading": "Carregando…", // Message displayed while list of html templates is loading
	"content.noHtmlTemplates": "Não há modelos disponíveis", // Message displayed in dropdown when no html templates are found
	"content.defaultHtmlTemplateHeader": "Modelos de arquivo HTML", // The text to display as the default header for the html template select dropdown
	"content.browseForHtmlTemplate": "Procurar um modelo", // Text for button to browse for an html template
	"content.availabilityHeader": "Datas de disponibilidade", // availability header
	"content.saveError": "Seu item de conteúdo não foi salvo. Corrija os campos destacados em vermelho.", // Error message to inform the user that there was a problem saving the content item, instructing them to correct invalid fields
	"content.displayOptions": "Opções de visualização", // Text label for display options
	"content.addDueDate": "Adicionar prazo", // Text label for name input field
	"content.embedOnPage": "Incorporar à página", // Text label for link radio button
	"content.openNewTab": "Abrir em uma nova guia (recomendado)", // Text label for link radio button
	"content.openNewTabRecommendation": "Esta opção é recomendada para evitar problemas de autenticação em seu recurso.", // Text for the help icon that explains reason for recommending new tab option
	"content.openNewTabHelp": "O tempo na página não é controlado.", // Text for the help icon next to link radio button
	"content.link": "Link", //Text label for link input field
	"content.emptyLinkField": "O link é obrigatório.", //Error message shown on link tooltip when the link is empty
	"content.invalidLink": "Insira um URL válido.", //Error message shown on link tooltip when the link is not formatted correctly
	"content.notHttps": "Apenas links usando \"https\" podem ser incorporados.", //Error message shown on link tooltip when https is not used for embedded links
	"content.noEmbed": "Este site não pode ser incorporado.", //Error message shown on link tooltip when the link cannot be embedded
	"content.previewLabel": "Visualizar", // The label text for the link preview
	"content.openInNewWindow": "Abrir em uma nova janela", // The label text for the subtle-button for opening a LTI link in a new window
	"content.externalActivity": "Atividade externa", // The label text for the external activity section on the LTI link page
	"content.externalActivityOpened": "Abra a atividade em uma nova janela para visualizar o conteúdo.", // Text for displaying underneath the LTI link jump logo
	"content.externalActivityEmbeddedNotAllowed": "Esta atividade externa não é compatível com incorporação. Ela só pode ser visualizada em uma nova janela.", // Text that replaces the LTI display options if embedding is not allowed
	"content.confirmDialogTitle": "O conteúdo atual será excluído.", // The text for the title of the replace html template confirmation dialog
	"content.confirmDialogBody": "Tem certeza de que deseja substituir o conteúdo atual por este modelo?", // The text for the body of the replace html template confirmation dialog
	"content.confirmDialogActionOption": "Substituir", // The text for the confirmation action to replace content
	"content.confirmDialogCancelOption": "Cancelar", // The text for the cancel action to not replace content
	"content.useEmbeddedPlayer": "Usar o player integrado", // The text for using the embedded player
	"content.scormActivity": "Pacote de Modelo de referência do objeto de courseware compartilhável (SCORM)", // The label for the name of the SCORM package
	"content.lastEdited": "Última edição" // The date when the entity was last edited
};
