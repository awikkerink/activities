/* eslint quotes: 0 */

export default {
	"name": "Nome", // Label for the name field when creating/editing an activity
	"quizSaveError": "Seu questionário não foi salvo. Corrija os campos destacados.", // Error message to inform the user that there was a problem saving the quiz, instructing them to correct invalid fields
	"hdrAvailability": "Datas de disponibilidade e condições", // availability header
	"hdrTimingAndDisplay": "Tempo e tela", // timing/display accordion header
	"subHdrTimingTools": "Tempo", // Title for timing tools
	"manageTiming": "Gerenciar tempo", // Label for button to launch timing dialog
	"hdrAttemptsAndCompletion": "Tentativas e conclusões", //attempts/completion accordion header
	"subHdrPagingTools": "Paginação", // Title for paging tools
	"subHdrShuffleQuiz": "Embaralhar o questionário",// Title for shuffle quiz tool(s)
	"subHdrDisplayTools": "Exibir", // Title for display tools
	"shuffleDescription": "Embaralhar perguntas e seções do questionário. Não é colocado em cascata nas subseções.", // description for question shuffling behavior
	"shuffleSummary": "Embaralhar as perguntas", // summary text for shuffle quiz questions
	"hintsToolDescription": "Permitir dicas", // decription for hints tool
	"hintsAllowedSummary": "Dicas permitidas", // summary text when hints are enabled,
	"passwordLabel": "Senha", // Label for the quiz password text input field
	"passwordSummary": "Protegido por senha", // summary text when quiz has a password
	"disableRightClickDescription": "Desativar clique com o botão direito", // description for disable right click
	"disableRightClickSummary": "Cliques com o botão direito desativados", // summary text when right clicks are disabled
	"preventMovingBackwardsDescription": "Impedir retorno às páginas anteriores",
	"disablePagerAndAlertsDescription": "Desativar e-mail, pagers e alertas no Brightspace", // description for blocking communications / disable pager and alerts during a quiz
	"disablePagerAndAlertsSummary": "Alertas e comunicações bloqueadas", // summary text when communications / pager and alerts are disabled
	"emailNotificationSummary": "Notificação de tentativa por e-mail", // summary for email notification
	"preventMovingBackwardsSummary": "Limitações de paginação", // summary for prevent moving backwards checkbox
	"dividerHeader": "Perguntas", // The header that is displayed on the divider
	"previewLabel": "Visualizar", // The label text for the preview button
	"hdrReleaseConditions": "Condições de liberação", // release conditions heading
	"hlpReleaseConditions": "Os usuários não conseguem acessar nem visualizar o questionário, a menos que atendam às condições de liberação.", // release conditions help
	"hdrEvaluationAndFeedback": "Avaliação e feedback", // evaluation/feedback accordion header
	"subHdrAutomaticGrades": "Nota automática", // Title for automatic grade tool
	"autoSetGradedDescription": "Permitir que a tentativa seja definida imediatamente mediante a conclusão", // description for automatic grade checkbox
	"autoSetGradedSummary": "Nota automática", // summary for auto set graded checkbox
	"passwordDescription": "Apenas usuários que inserirem a senha terão acesso para gravar o questionário.", // description for password input
	"hlpSubmissionNotificationEmail": "Digite um e-mail ou vários e-mails separados por vírgula para receber notificações quando a tentativa de realização do teste estiver em andamento.", // description for email notification input
	"autoSetGradedAccessibleHelpText": "Obter ajuda sobre – Nota automática", // accessible help text for autoSetGraded question mark button
	"autoSetGradedHelpDialogTitle": "Informação: nota automática", // title that appears when the autoSetGraded help dialog is rendered
	"autoSetGradedHelpDialogConfirmationText": "OK", // copy that appears on the autoSetGraded help dialog confirmation button
	"autoSetGradedHelpDialogParagraph1": "Quando a configuração está ativada, os usuários poderão ver a pontuação assim que enviarem a tentativa. A pontuação exibida é apenas aquela que o sistema pode avaliar automaticamente.", // content for paragraph 1 of autoSetGraded help dialog
	"autoSetGradedHelpDialogParagraph2": "A configuração deve ser ativada para que as notas sejam enviadas automaticamente ao livro de notas e para que a visualização de envio padrão seja liberada a usuários assim que eles concluírem uma tentativa.", // content for paragraph 2 of autoSetGraded help dialog
	"autoSetGradedHelpDialogParagraph3": "Nota: as perguntas de resposta por escrito serão marcadas como 0 até serem avaliadas manualmente.", // content for paragraph 3 of autoSetGraded help dialog
	"disableAlertsHelpDialogTitle": "Informação: desativar e-mail, pagers e alertas no Brightspace", // title that appears when the disable alerts help dialog is rendered
	"disableAlertsHelpDialogContent": "Se você ativar a opção, os alunos não poderão acessar o e-mail do Brightspace, o pager ou os alertas se tiverem uma tentativa de realização do teste em andamento.", // content that appears when the disable alerts help dialog is rendered
	"disableAlertsHelpDialogConfirmationText": "OK", // copy that appears on the disable alerts help dialog confirmation button
	"disableAlertsAccessibleHelpText": "Obter ajuda sobre – Desativar e-mail, pagers e alertas no Brightspace", // accessible help text for disable alerts question mark button
	"disableRightClickAccessibleHelpText": "Obter ajuda sobre – Desativar clique com o botão direito", // accessible help text for disable right click question mark button
	"disableRightClickHelpDialogTitle": "Informação: desativar clique com o botão direito", // title that appears when the disable right click help dialog is rendered
	"disableRightClickHelpDialogParagraph1": "Esse recurso proíbe que os alunos imprimam perguntas do questionário clicando com o botão direito do mouse em uma pergunta enquanto uma tentativa está em andamento. Mas os alunos ainda poderão fazer a captura de tela do questionário por meio de outras tecnologias fora do navegador.", // content for paragraph 1 of disable right click help dialog
	"disableRightClickHelpDialogParagraph2": "Determinados fluxos de trabalho de acessibilidade serão bloqueados porque o aluno não pode copiar e colar o texto da pergunta.", // content for paragraph 2 of disable right click help dialog
	"disableRightClickHelpDialogConfirmationText": "OK", // copy that appears on the disable right click help dialog confirmation button
	"manageTimingDialogConfirmationText": "OK", // copy that appears on the Timing dialog confirmation button
	"manageTimingDialogCancelText": "Cancelar", // copy that appears on the Timing dialog cancel button
	"description": "Descrição", // Description label for the Description text input box,
	"btnOpenIpRestrictionDialog": "Gerenciar restrições de IP", // Button text for opening IP restriction dialog
	"hdrIpRestrictionDialog": "Restrições de IP (IPv4)", // timing/display accordion header
	"ipRestrictionLabel": "Restrições de IP", // Label for IP restrictions editor
	"minutesLabel": "minuto(s)",  // label for Timing dialog time limit input slot
	"minutesBeforeFlaggedLabel": "minuto(s) antes de ser marcado como limite de tempo excedido", // label for Timing dialog grace period input slot
	"extendedDeadlineLabel": "Prazo prorrogado",  // label for timing dialog - extended deadline select
	"extendedDeadlineInputLabel": "minuto(s) após o fim do período de carência",  //label for Timing dialog extended deadline select slot
	"subHdrExceededTimeLimitBehaviour": "Comportamento mediante limite de tempo excedido", // Title for submission late type options,
	"exceededTimeLimitBehaviourPrefix": "Depois do período de carência, marcar a tentativa de realização do teste como limite de tempo excedido e", // label for submission label type options
	"showClockLabel": "Será exibida antes que o teste seja iniciado", // Label for show clock checkbox
	"showClockTitle": "Mostrar relógio", // Title for show clock
	"manageAttemptsDialogConfirmationText": "OK", // copy that appears on the Attempts dialog confirmation button
	"manageAttemptsDialogCancelText": "Cancelar", // copy that appears on the Attempts dialog cancel button
	"subHdrAttemptsTools": "Tentativas", // Title for attempts tools
	"manageAttempts": "Gerenciar tentativas", // Label for button to launch attempts dialog
	"textIsDisplayedPart1": "Os campos não podem ser desativados na nova experiência de criação de questionário.", // First sentence of alert warning that text fields will be visible
	"textIsDisplayedSingularPart2": "O campo {field} aparece para os alunos quando o questionário é salvo.", // Second sentence of alert warning that text fields will be visible, when there is only one field
	"introMovedToDescription": "Os questionários não possuem mais introduções. O conteúdo do campo Introdução agora aparece no campo Descrição.", // Alert warning that existing quiz introduction has been removed and that the text in the introduction has been put into the quiz description
	"attemptsAllowed": "Tentativas permitidas", // Title for Attempts Allowed select in Attempts dialog
	"quizAttemptsAllowedSummary": "{numAttemptsAllowed, plural, =1 {1 tentativa permitida} other {{numAttemptsAllowed} tentativas permitidas}}", //
	"overallGradeCalculation": "Cálculo da nota geral", // Title for Overall Grade Calculation select in Attempts dialog
	"retakeIncorrectQuestionsOnly": "Refazer apenas perguntas incorretas", // Title for RIO checkbox in Attempts dialog
	"rioCheckboxLabel": "Em novas tentativas, permitir apenas respostas a perguntas incorretas anteriores", // Label for RIO checkbox in Attempts dialog
	"btnAttemptConditions": "Condições de tentativa", // Label for Attempt Conditions button in Attempts dialog
	"rioAccessibileHelpText": "Obter ajuda sobre – Refazer apenas incorretas", // accessible help text for RIO question mark button
	"rioDialogTitle": "Informação: refazer apenas perguntas incorretas", // Title for RIO help dialog
	"rioDialogParagraph": "Quando essa configuração é selecionada, os alunos que tentarem responder a um questionário mais de uma vez só poderão responder a perguntas que estavam incorretas na tentativa anterior. Se você estiver usando a avaliação automática, as perguntas de resposta por escrito serão marcadas como 0 e incluídas em tentativas futuras até que sejam avaliadas manualmente.", // content for RIO dialog
	"rioDialogConfirmationText": "OK", // copy that appears on the RIO help dialog confirmation button
	"ipRestrictionDialogDescription": "Somente alunos provenientes de endereços IP que atendam às restrições definidas podem preencher o questionário.", // guidelines for IP restrictions dialog
	"btnIpRestrictionsDialogAdd": "Adicionar", // text for IP restrictions dialog "Add" button
	"btnIpRestrictionsDialogBtnCancel": "Cancelar", // text for IP restrictions dialog "Cancel" button
	"ipRestrictionsDialogAddNewRange": "Intervalo IP", // text for IP restrictions dialog "Add new IP range" button
	"ipRestrictionsTableStartRangeHdr": "Início do intervalo IP", // text for IP restrictions table header start
	"ipRestrictionsTableEndRangeHdr": "Fim do intervalo IP", // text for IP restrictions table header end
	"ipRestrictionsTableDeleteRangeHdr": "Excluir", // text for IP restrictions table header delete
	"ipRestrictionsValidationError": "Formato de endereço IP inválido. Corrigir campos destacados. Exemplo de endereço IP: 155.55.5.15.", // error message for invalid IP addresses
	"ipRestrictions500Error": "Algo deu errado. Tente novamente.", // error message for IP restrictions 500 response
	"ipRestrictionsHelpTxtConfirmation": "OK", // confirmation text on IP restrictions help dialog
	"hdrIpRestrictionsHelpDialog": "Informação: restrições de IP (IPv4)", // timing/display accordion header
	"hdrIpRestrictionsHelpDialogP1": "Para especificar um intervalo de endereços IP aceitos, digite quatro conjuntos de valores que variam de 0 a 255, separados por um ponto nos campos início do intervalo IP e fim do intervalo IP, respectivamente.", // IP restrictions help dialog paragraph 1
	"hdrIpRestrictionsHelpDialogP2": "Exemplo de endereço IP: 155.55.5.15", // IP restrictions help dialog paragraph 2
	"hdrIpRestrictionsHelpDialogP3": "Para incluir um endereço IP individual aceito, especifique apenas o valor inicial do intervalo IP.", // IP restrictions help dialog paragraph 3
	"hdrIpRestrictionsHelpDialogP4": "Observação: o valor inicial do intervalo IP deve ser menor que o valor final do intervalo IP.", // IP restrictions help dialog paragraph 4
	"ipRestrictionsAccessibileHelpText": "Obter ajuda sobre – Restrições de IP", // accessible help text for IP restrictions question mark button
	"attemptConditions": "Condições de tentativa", // Header for Attempts Conditions section in Attempts dialog
	"attemptConditionsParagraph1": "Para que um aluno se qualifique para outra tentativa, defina um valor percentual mínimo e/ou máximo entre 0 e 100 que deve ter sido obtido na tentativa anterior.", // content for paragraph1 on the Attempts dialog Attempts Condition section
	"attemptConditionsParagraph2": "Se um campo mínimo ou máximo estiver em branco, não haverá um limite aplicado a essa parte do intervalo de tentativas.", // content for paragragh2 on the Attempts dialog Attempts Condition section
	"attemptConditionsRangePrefixText1": "Na tentativa {index}:", // prefix text 1 for Attempt Conditions range editor on Attempts dialog
	"attemptConditionsRangePrefixText2": "os alunos devem atingir entre", // prefix text 2 for Attempt Conditions range editor on Attempts dialog
	"attemptConditionsRangeSuffixText1": "para liberar", //suffix text 1 for Attempts Conditions range editor on Attempts dialog
	"attemptConditionsRangeSuffixText2": "Tentativa {next}", // suffix text 2 for Attempts Condition range editor on Attempts dialog
	"minLabel": "Mínimo:", // label for Min input on Attempts Conditions range editor on Attempts Dialog
	"maxLabel": "Máximo:", // label for Max input on Attempts Conditions range editor on Attempts Dialog
	"andRangeText": "e", // copy on Attempts Condition range editor on Attempts Dialog
	"percentageRangeText": "%", // copy on Attempts Condition range editor on Attempts Dialog
	"ipRestrictionsSummary": "Restrições de IP", // summary to be displayed when a quiz has ip restrictions
	"ipRestrictionsInnerSummary" : "{count, plural, =1 {1 restrição} other {{count} restrições}}", // summary to be displayed when accordion is expanded
	"quizTimingValidationError": "O tempo não pode ser alterado, corrija os campos destacados.", // Appears in error alert when validation fails in Manage Timing dialog
	"quizTimingServerError": "Algo deu errado. Tente novamente.", // Timing save server error alert message
	"quizTimingRecommendedSummary": "Limite de tempo recomendado ({numMinutes, plural, =1 {1 minuto} other {{numMinutes} minutos}})", // Recommended time limit (x minute) or (x minutes).
	"quizTimingEnforcedSummary": "Limite de tempo aplicado ({numMinutes, plural, =1 {1 minuto} other {{numMinutes} minutos}})", // Enforced time limit(x minute) or (x minutes).
	"ipRestrictionsDuplicateError": "Endereço inicial de intervalo IP duplicado. Cada valor inicial de intervalo IP deve ser exclusivo.", // Error for duplicate IP
	"ipRestrictionsRangeError": "Intervalo de endereços IP fornecido inválido. Verifique se os intervalos estão formatados corretamente.", // Error for invalid IP ranges
	"quizAttemptsValidationError": "As tentativas não podem ser alteradas, corrija os campos destacados.", // Appears in error alert when validation fails in Manage Attempts dialog
	"totalPoints": "Total de pontos {scoreOutOf}", // Total points text that appears on quiz editor above list of questions
	"subHdrHeaderFooter": "Cabeçalho e rodapé", // Header and Footer accordion header
	"manageHeaderFooterButton": "Gerenciar cabeçalho e rodapé", // Label for button to launch Header and Footer dialog
	"headerFooterDialogTitle": "Cabeçalho e rodapé",
	"manageHeaderFooterDialogAddText": "Adicionar", // Label for Add button for header and footer dialog
	"manageHeaderFooterDialogCancelText": "Cancelar", // Label for Cancel button header and footer dialog
	"headerLabel": "Cabeçalho", // Label for the header text box
	"headerDialogText": "O cabeçalho e o rodapé do questionário ficarão visíveis para os alunos nas partes superior e inferior do questionário, respectivamente.", // Header and Footer dialog text
	"header": "Cabeçalho", // Header label for the header text box.
	"headerAdded": "Cabeçalho adicionado", // Header added summary text for Timing and Display accordion.
	"footerAdded": "Rodapé adicionado", // Footer added summary text for Timing and Display accordion.
	"headerAndFooterAdded": "Cabeçalho e rodapé adicionados", // Header and footer added text for Timing and Display accordion.
	"footer": "Rodapé", // Footer lable for the footer text box.
	"footerLabel": "Rodapé", // Label for the footer text box.
	"headerAndFooter": "Cabeçalho e rodapé adicionados", // Header and footer summary text for closed accordion
	"createNewLabel": "Criar novo", // Label for button to open menu for adding new items to the quiz.
	"addExistingLabel": "Adicionar existente", // Label for button to open menu for adding pre-existing items to the quiz.
	"addQuestionsLabel": "Nova pergunta" // Label for button to open menu for adding new questions to the quiz.
};
