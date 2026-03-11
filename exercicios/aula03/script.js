//Pega os elementos do HTML para utilizar no JS
//Formulario
const de = document.getElementById('campoDe');
const para = document.getElementById('campoPara');
const cc = document.getElementById('campoCc');
const bcc = document.getElementById('campoBcc');
const assunto = document.getElementById('campoAssunto');
const msg = document.getElementById('campoMsg');
const prio = document.getElementById('campoPrio');

// Preview
const caixaPreview = document.getElementById('caixaPreview');

// Botões
const enviar = document.getElementById('botaoEnviar');
const limpar = document.getElementById('botaoLimpar');
const deletar = document.getElementById('botaoDeletar');

//Histórico
const listaHistorico = document.getElementById('listaHistorico');

//Status
const status = document.getElementById('status');

// Validar email - Verifica se ele tem o formato nome@email.com
function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Validar múltiplos emails
function validarMultiplosEmails(emails) {
  const lista = emails.split(',').map(e => e.trim());
  return lista.every(validarEmail);
}

// Simular envio - Delay de 2 segundos
async function enviarEmail(emailData) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ success: true, messageId: Date.now() });
    }, 2000);
  });
}

// Preview em tempo real
function atualizarPreview() {
  // Pegar valores do form
  // Atualizar div preview

    // Definição de prioridade
    let classPrio = "";
    if(prio.value === "Alta"){
        classPrio = "prio-alta";
    }else if(prio.value === "Baixa"){
        classPrio = "prio-baixa";
    }else{
        classPrio = "prio-normal";
    }

  caixaPreview.innerHTML =
    //Concatenação - Monta o email visuamente
    `<p>De: ${de.value}</p>
    <p>Para: ${para.value}</p>
    <p>Cc: ${cc.value}</p>
    <p>Bcc: ${bcc.value}</p>
    <p>Assunto: ${assunto.value}</p>
    <p>Mensagem: ${msg.value}</p>
    <p>Prioridade: <span class="${classPrio}"> ${prio.value} </span></p>`;
}

//Atualiza preview enquanto digita
de.addEventListener("input", atualizarPreview);
para.addEventListener("input", atualizarPreview);
cc.addEventListener("input", atualizarPreview);
bcc.addEventListener("input", atualizarPreview);
assunto.addEventListener("input", atualizarPreview);
msg.addEventListener("input", atualizarPreview);
prio.addEventListener("change", atualizarPreview);

// Cria o objeto do email
function dados(){
    return{
        de: de.value,
        para: para.value,
        cc: cc.value,
        bcc: bcc.value,
        assunto: assunto.value,
        msg: msg.value,
        prio: prio.value,
        data: new Date().toLocaleString()
    }
}

// Salvar no localStorage
function salvarEmail(emailData) {
  let historico = JSON.parse(localStorage.getItem('emailHistory') || '[]');
  historico.unshift(emailData);
  historico = historico.slice(0, 10); // Máximo 10
  localStorage.setItem('emailHistory', JSON.stringify(historico));
}

// Mostrar histórico
function historico(){
    const historico = JSON.parse(localStorage.getItem('emailHistory') || '[]');
    listaHistorico.innerHTML = "";
    historico.forEach (email => {
        const div = document.createElement ("div");
        div.innerHTML=
        `Assunto: ${email.assunto}<br>
        Para: ${email.para}<br>
        Data: ${email.data}<br>
        Prioridade:${email.prio}<br>
        `;

        listaHistorico.appendChild(div);

        //Espaço entre os emails enviado
        div.style.margin="8px";
    });
}

//Botão de enviar
enviar.addEventListener("click", async function(){
    const emailData = dados();
    if(!validarEmail(emailData.de)){
        alert("Email inválido");
        return;
    }

    if(!validarMultiplosEmails(emailData.para)){
        alert("Email inválido");
        return;
    }

    //Mostra a mensagem "enviando..."
    status.style.display = "block";
    const resultado = await enviarEmail(emailData);
    //Mensagem de enviando desaparece novamente
    status.style.display ="none"

    if(resultado.success){
        salvarEmail(emailData);
        historico();
        alert("Email enviado!");
    }
});

//Botão de limpar
limpar.addEventListener("click", async function(){
    de.value = "";
    para.value ="";
    cc.value ="";
    bcc.value ="";
    assunto.value="";
    msg.value ="";
    prio.value = "normal";
});

//Botão de deletar
deletar.addEventListener("click", async function(){
    localStorage.removeItem("emailHistory");
    listaHistorico.innerHTML=""
});

historico();
