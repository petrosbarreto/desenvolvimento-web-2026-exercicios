const form = document.getElementById("emailForm")
const preview = document.getElementById("previewContent")
const historyDiv = document.getElementById("history")
const statusDiv = document.getElementById("status")

function validarEmail(email){

const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

return regex.test(email)

}

function validarMultiplosEmails(emails){

if(!emails) return true

const lista = emails.split(",").map(e=>e.trim())

return lista.every(validarEmail)

}

function atualizarPreview(){

const subject = document.getElementById("subject").value
const body = document.getElementById("body").value
const from = document.getElementById("from").value
const to = document.getElementById("to").value

preview.innerHTML = `
<strong>De:</strong> ${from}<br>
<strong>Para:</strong> ${to}<br>
<h3>${subject}</h3>
<p>${body}</p>
`

}

document.querySelectorAll("input, textarea, select")
.forEach(el=>el.addEventListener("input", atualizarPreview))

async function enviarEmail(data){

return new Promise(resolve=>{

setTimeout(()=>{

resolve({success:true})

},2000)

})

}

function salvarEmail(email){

let historico = JSON.parse(localStorage.getItem("emailHistory")) || []

historico.unshift(email)

historico = historico.slice(0,10)

localStorage.setItem("emailHistory", JSON.stringify(historico))

}

function carregarHistorico(){

let historico = JSON.parse(localStorage.getItem("emailHistory")) || []

historyDiv.innerHTML = ""

historico.forEach((email,index)=>{

const div = document.createElement("div")

div.className = `emailItem priority-${email.priority}`

div.innerHTML = `
<strong>${email.subject}</strong><br>
${email.body}<br>
<small>De: ${email.from}</small><br>
<button class="deleteBtn" onclick="deletarEmail(${index})">Deletar</button>
`

historyDiv.appendChild(div)

})

}

function deletarEmail(index){

let historico = JSON.parse(localStorage.getItem("emailHistory")) || []

historico.splice(index,1)

localStorage.setItem("emailHistory", JSON.stringify(historico))

carregarHistorico()

}

form.addEventListener("submit", async function(e){

e.preventDefault()

const from = document.getElementById("from").value
const to = document.getElementById("to").value
const cc = document.getElementById("cc").value
const bcc = document.getElementById("bcc").value
const subject = document.getElementById("subject").value
const body = document.getElementById("body").value
const priority = document.getElementById("priority").value

if(!validarEmail(from)){

alert("Email do remetente inválido")

return

}

if(!validarMultiplosEmails(to)){

alert("Email de destinatário inválido")

return

}

statusDiv.innerText = "Enviando..."

const emailData = {
from,to,cc,bcc,subject,body,priority
}

await enviarEmail(emailData)

statusDiv.innerText = "Email enviado!"

salvarEmail(emailData)

carregarHistorico()

form.reset()

preview.innerHTML = ""

})

carregarHistorico()