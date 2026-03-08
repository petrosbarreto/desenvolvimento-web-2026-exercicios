//  Validar email 
function validarEmail(email) { // Declara uma função chamada validarEmail, que recebe email de parametro
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  //Cria uma expressão regular (regex) para verificar se o formato do email é válido
  return regex.test(email); // Usa o método .test() da regex para verificar se o email corresponde ao formato esperado, ai voltta true ou false
}

//  Validar varios emails 
function validarMultiplosEmails(emails) { // Função que valida vários emails de uma vez
  const lista = emails.split(',').map(e => e.trim()); // split(',') separa a string usando vírgula
  return lista.every(validarEmail);  //  every() verifica se todos os itens da lista passam no teste
}

//  Salvar 
function salvarEmail(emailData) { // Função responsável por salvar o email no localStorage do navegador
  let historico = JSON.parse(localStorage.getItem('emailHistory') || '[]');   // localStorage.getItem('emailHistory') tenta pegar o histórico salvo
  historico.unshift(emailData);  // unshift() adiciona o novo email no começo do array
  historico = historico.slice(0, 10);   // slice(0,10) pega apenas os primeiros 10 itens
  localStorage.setItem('emailHistory', JSON.stringify(historico));  // Salva o array novamente no localStorage
}

// Simula envio
async function enviarEmail(emailData) { // Função assíncrona que simula o envio de um email
  return new Promise(resolve => {  // Cria uma Promise que será resolvida após um tempo
    setTimeout(() => {  // setTimeout executa uma função após um tempo
      resolve({ success: true, messageId: Date.now() });  // resolve() finaliza a Promise
    }, 2000);  // Espera 2000 milissegundos, que é 2 segundos
  });
}

// Preview em tempo real 
function atualizarPreview() { // Declara a função responsável por atualizar a prévia do email


  const de = document.getElementById("de").value;// Pega o valor digitado no campo "De"
  const para = document.getElementById("para").value; // Pega o valor digitado no campo "Para"
  const cc = document.getElementById("cc").value;// Pega o valor digitado no campo "Cc"
  const bcc = document.getElementById("bcc").value;  // Pega o valor digitado no campo "Bcc"
  const assunto = document.getElementById("assunto").value;  // Pega o valor digitado no campo "Assunto"
  const corpo = document.getElementById("corpo").value;  // Pega o texto digitado no textar do corpo do email
  const prioridade = document.getElementById("prioridade").value;  // Pega o valor selecionado no campo de prioridade (alta, normal ou baixa)

  const preview = document.getElementById("previewEmail");  // Seleciona a div onde a prévia do email será exibida

  const classePrioridade = "prioridade-" + prioridade;  // Cria o nome da classe CSS de prioridade dinamicamente


  preview.innerHTML = `
    <div class="email-preview">
      <p><strong>De:</strong> ${de}</p>
      <p><strong>Para:</strong> ${para}</p>
      <p><strong>Cc:</strong> ${cc}</p>
      <p><strong>Bcc:</strong> ${bcc}</p>
      <p><strong>Assunto:</strong> ${assunto}</p>
      <p class="${classePrioridade}">
        Prioridade: ${prioridade}
      </p>
      <hr>
      <p>${corpo}</p>
    </div>
  `;
}

// carrega historico
function carregarHistorico() {

  const historicoDiv = document.getElementById("historico"); // Seleciona a div do HTML onde os emails do histórico serão exibidos
  const historico = JSON.parse(localStorage.getItem("emailHistory") || "[]");  // Pega os emails armazenados no localStorage

  historicoDiv.innerHTML = "";  // Limpa o conteúdo atual da div

  historico.forEach((email, index) => { // Percorre todos os emails do histórico

    const div = document.createElement("div");  // Cria um novo elemento div no HTML
    div.className = "email-item";  // Define a classe CSS do elemento para aplicar estilo

    // Define o conteúdo HTML da div 
    div.innerHTML = `
      <p><strong>Para:</strong> ${email.para}</p>
      <p><strong>Assunto:</strong> ${email.assunto}</p>
      <button onclick="reenviarEmail(${index})">Reenviar</button>
      <button onclick="deletarEmail(${index})">Deletar</button>
    `;

    historicoDiv.appendChild(div);  // Adiciona a div criada dentro da área de histórico da página

  });

}

// função de reenviar 
function reenviarEmail(index){

  const historico = JSON.parse(localStorage.getItem("emailHistory") || "[]");// Pega o histórico salvo no localStorage
  const email = historico[index]; // Pega o email específico baseado na posição (index)

  document.getElementById("de").value = email.de;  // Preenche o campo "De" com o valor salvo
  document.getElementById("para").value = email.para; // Preenche o campo "Para" com o valor salvo
  document.getElementById("cc").value = email.cc; // Preenche o campo "Cc" com o valor salvo
  document.getElementById("bcc").value = email.bcc; // Preenche o campo "Bcc" com o valor salvo
  document.getElementById("assunto").value = email.assunto; // Preenche o campo "Assunto" com o valor salvo
  document.getElementById("corpo").value = email.corpo; // Preenche o campo "Corpo" com o valor salvo
  document.getElementById("prioridade").value = email.prioridade; // Preenche o campo "Prioridade" com o valor salvo

  atualizarPreview(); // Atualiza a prévia para mostrar os dados carregados

}

// deleta email
function deletarEmail(index){
 
  let historico = JSON.parse(localStorage.getItem("emailHistory") || "[]"); // Pega o histórico salvo no localstorage


  historico.splice(index,1);  // Remove 1 item do array na posição indicada pelo index

  localStorage.setItem("emailHistory", JSON.stringify(historico));  // Salva novamente o histórico atualizado no localstorage

  carregarHistorico();  // Recarrega a lista de emails na tela

}



// Botão de limpar
document.getElementById("limpar").addEventListener("click", function(){
// Adiciona um evento de clique ao botão "limpar"
  document.getElementById("emailForm").reset();
// Limpa todos os campos do formulário
  atualizarPreview();
  // Atualiza a prévia do email para refletir os campos vazios
});

//Atualiza o preview no ato de digitar 
document.querySelectorAll("input, textarea, select") // Seleciona todos os campos de formulário
.forEach(el => {  // Percorre cada campo encontrado

  el.addEventListener("input", atualizarPreview);
});  // Sempre que o usuário digitar ou alterar o campo,
  // a função atualizarPreview será executada

// ---------- Inicialização ----------
carregarHistorico(); // Carrega os emails salvos no localStorage
atualizarPreview(); // Gera a prévia inicial do email


// envio do formulario
document.getElementById("emailForm").addEventListener("submit", async function(e){

  e.preventDefault(); // Impede que o formulário recarregue a página

  const de = document.getElementById("de").value;  // Pega o valor do campo De

  const para = document.getElementById("para").value; // Pega o valor do campo Para
  const cc = document.getElementById("cc").value;   // Pega o valor do campo Cc
  const bcc = document.getElementById("bcc").value; // Pega o valor do campo Bcc
  const assunto = document.getElementById("assunto").value; // Pega o valor do campo Assunto
  const corpo = document.getElementById("corpo").value; // Pega o valor do campo Corpo
  const prioridade = document.getElementById("prioridade").value; // Pega o valor do campo Prioridade

  const status = document.getElementById("status");  // Seleciona a div que mostra mensagens de status

  //verificações de validade:
  if(!validarEmail(de)){
    status.innerHTML = "Email do remetente inválido";  
    return;
  }

  if(!validarMultiplosEmails(para)){
    status.innerHTML = "Emails do campo Para inválidos";
    return;
  }

  if(!validarMultiplosEmails(cc)){
    status.innerHTML = "Emails do Cc inválidos";
    return;
  }

  if(!validarMultiplosEmails(bcc)){
    status.innerHTML = "Emails do Bcc inválidos";
    return;
  }

  status.innerHTML = `<span class="spinner"></span> Enviando...`; // Mostra um spinner indicando que o envio está acontecendo

  const emailData = {de, para, cc, bcc, assunto, corpo, prioridade};  // Cria um objeto com todos os dados do email

  const resposta = await enviarEmail(emailData);   // Chama a função que simula o envio

  if(resposta.success){

    status.innerHTML = "Email enviado com sucesso";
// Mostra mensagem de sucesso
    salvarEmail(emailData);
    // Salva o email no localStorage

    carregarHistorico();
    // Atualiza a lista de emails exibida na tela

  }

});