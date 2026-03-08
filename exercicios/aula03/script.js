const form = document.getElementById("emailForm")
const preview = document.getElementById("preview")
const historyList = document.getElementById("history")
const clearBtn = document.getElementById("clearBtn")
const loading = document.getElementById("loading")

const toInput = document.getElementById("to")
const ccInput = document.getElementById("cc")

const ccField = document.getElementById("ccField")
const bccField = document.getElementById("bccField")

function validarEmail(email){
const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
return regex.test(email)
}

function validarMultiplosEmails(emails){
if(!emails) return true
const lista = emails.split(',').map(e => e.trim())
return lista.every(validarEmail)
}

function atualizarPreview(){

const from = document.getElementById("from").value
const to = document.getElementById("to").value
const subject = document.getElementById("subject").value
const body = document.getElementById("body").value
const priority = document.getElementById("priority").value

let priorityClass = "priority-normal"

if(priority === "alta") priorityClass = "priority-alta"
if(priority === "baixa") priorityClass = "priority-baixa"

preview.innerHTML = `
<p><strong>De:</strong> ${from}</p>
<p><strong>Para:</strong> ${to}</p>
<p><strong>Assunto:</strong> ${subject}</p>
<p><strong>Prioridade:</strong> <span class="${priorityClass}">${priority}</span></p>
<hr>
<p>${body}</p>
`
}

function salvarEmail(emailData){

let historico = JSON.parse(localStorage.getItem("emailHistory") || "[]")

historico.unshift(emailData)

historico = historico.slice(0,10)

localStorage.setItem("emailHistory", JSON.stringify(historico))

carregarHistorico()
}

function carregarHistorico(){

historyList.innerHTML=""

const historico = JSON.parse(localStorage.getItem("emailHistory") || "[]")

historico.forEach((email,index)=>{

const li = document.createElement("li")

li.innerHTML=`
<strong>${email.subject}</strong><br>
Para: ${email.to}<br>
<button onclick="reenviarEmail(${index})">Reenviar</button>
<button onclick="deletarEmail(${index})">Deletar</button>
`

historyList.appendChild(li)

})
}

function deletarEmail(index){

let historico = JSON.parse(localStorage.getItem("emailHistory") || "[]")

historico.splice(index,1)

localStorage.setItem("emailHistory",JSON.stringify(historico))

carregarHistorico()
}

function reenviarEmail(index){

const historico = JSON.parse(localStorage.getItem("emailHistory") || "[]")

const email = historico[index]

document.getElementById("from").value = email.from
document.getElementById("to").value = email.to
document.getElementById("subject").value = email.subject
document.getElementById("body").value = email.body
document.getElementById("priority").value = email.priority

atualizarPreview()
}

function enviarEmail(emailData){

return new Promise(resolve=>{
setTimeout(()=>{
resolve({success:true})
},2000)
})
}

form.addEventListener("submit", async (e)=>{

e.preventDefault()

const from = document.getElementById("from").value
const to = document.getElementById("to").value

if(!validarEmail(from)){
alert("Email inválido")
return
}

if(!validarMultiplosEmails(to)){
alert("Destinatário inválido")
return
}

const emailData = {
from,
to,
subject: document.getElementById("subject").value,
body: document.getElementById("body").value,
priority: document.getElementById("priority").value
}

loading.classList.remove("hidden")

await enviarEmail(emailData)

loading.classList.add("hidden")

salvarEmail(emailData)

form.reset()
preview.innerHTML=""
})

clearBtn.addEventListener("click",()=>{
form.reset()
preview.innerHTML=""
})

toInput.addEventListener("input",()=>{
if(toInput.value.length>0){
ccField.classList.remove("hidden")
}else{
ccField.classList.add("hidden")
bccField.classList.add("hidden")
}
})

ccInput.addEventListener("input",()=>{
if(ccInput.value.length>0){
bccField.classList.remove("hidden")
} else {
bccField.classList.add("hidden")
}
});

form.addEventListener("input", atualizarPreview);

carregarHistorico();
