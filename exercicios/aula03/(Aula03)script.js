// Validar email
function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Validar múltiplos emails
function validarMultiplosEmails(emails) {
  const lista = emails.split(',').map(e => e.trim());
  return lista.every(validarEmail);
}

// Salvar no localStorage
function salvarEmail(emailData) {
  let historico = JSON.parse(localStorage.getItem('emailHistory') || '[]');
  historico.unshift(emailData);
  historico = historico.slice(0, 10); // Máximo 10
  localStorage.setItem('emailHistory', JSON.stringify(historico));
}

//envio
document.getElementById("enviarEmail").addEventListener("click", async()=> {

   const meuEmail = document.getElementById("meuEmail").value
   const email = document.getElementById("validarEmail").value
   const titulo = document.getElementById("titulo").value
   const conteudo = document.getElementById("conteudo").value
  const emailData ={
    meuEmail: meuEmail,
    email: email,
    titulo: titulo,
    conteudo: conteudo
    }
const respost = await enviarEmail(emailData)
if (respost.success){
    salvarEmail(emailData)
    mostrarhistorico()
    alert("enviado")
}})

// Simular envio
async function enviarEmail(emailData) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ success: true, messageId: Date.now() });
    }, 1000);
  });
}

// Preview em tempo real

  const meuEmail = document.getElementById("meuEmail").addEventListener( "input",atualizarPreview)
  const email = document.getElementById("validarEmail").addEventListener( "input",atualizarPreview)
  const titulo = document.getElementById("titulo").addEventListener( "input",atualizarPreview)
  const conteudo = document.getElementById("conteudo").addEventListener( "input",atualizarPreview)

function atualizarPreview() {
  // Pegar valores do form
   const meuEmail = document.getElementById("meuEmail").value
   const email = document.getElementById("validarEmail").value
   const titulo = document.getElementById("titulo").value
   const conteudo = document.getElementById("conteudo").value
   const preview = document.getElementById("preview")
  
  // Atualizar div preview
  preview.innerHTML=`
  <p> <strong> Email de: ${meuEmail}</strong>, <strong> para: </strong> ${email} </p>
  <p> <strong> Título: </strong> ${titulo} </p>
  <p> <strong> Conteúdo: </strong> ${quebradetexto(conteudo)}  </p>
  `}

  //Históricos de email
  function mostrarhistorico(){
    const historico = JSON.parse(localStorage.getItem("emailHistory") || "[]")
    const divhistorico = document.getElementById("historicoEmails")
    divhistorico.innerHTML = ""
    historico.forEach(element => {

    });
  }
  window.onload = mostrarhistorico

  // deletar
  function deletarEmail(index){
   let historico = JSON.parse(localStorage.getItem("emailHistory") || "[]")
   historico.splice(index,1);
   localStorage.setItem("emailHistory", JSON.stringify(historico));
   mostrarhistorico();
  }

  function quebradetexto(texto){
    let palavras = texto.split("/\s+/");
    let resultado = "";

    for(let i=0; i < palavras.length; i++){
      resultado += palavras[i] + " ";
      if((i + 1) % 10 === 0){
        resultado += "<br>";
      }
    }
    return resultado;
  }

  function mostrarhistorico(){
   const historico = JSON.parse(localStorage.getItem("emailHistory") || "[]");
   const divhistorico = document.getElementById("historicoEmails");
   localStorage.setItem("emailHistory", JSON.stringify(historico));
   divhistorico.innerHTML = "";

   historico.forEach((element, index) => {
    divhistorico.innerHTML += `
    <div class="emailItem">
      <p> <strong> Email de: ${element.meuEmail}</strong>, <strong> para: </strong> ${element.email} </p>
      <p> <strong> Título: </strong> ${element.titulo} </p>
      <p> <strong> Conteúdo: </strong> ${quebradetexto(element.conteudo)} </p>
      <button onclick="deletarEmail(${index})">DELETAR 🗑</button>
    </div>
    `
    
   });
  }