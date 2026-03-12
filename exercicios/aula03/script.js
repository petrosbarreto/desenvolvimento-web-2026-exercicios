let emails = [];

const emailsContainer = document.querySelector("#emailsContainer");
const formAreaMobile = document.querySelector("#formAreaMobile");
const emailPreview = document.querySelector("#emailPreview");
const textPreviewMobile = document.querySelector("#textPreviewMobile");
const textPreviewDesktop = document.querySelector("#textPreviewDesktop");
const createEmailFormDesktop = document.querySelector("#createEmailFormDesktop");
const createEmailFormMobile = document.querySelector("#createEmailFormMobile");
const buttonBold = document.querySelector("#buttonBold");
const buttonItalic = document.querySelector("#buttonItalic");
const loadingContainer = document.querySelector("#loadingContainer");

const priorityBgColors = {
    1: "bg-red-500",
    2: "bg-orange-500",
    3: "bg-green-500",
}

const priorityBorderColors = {
    1: "border-color-high",
    2: "border-color-normal",
    3: "border-color-low",
}

function getStorageEmails() {
    let storageEmails = JSON.parse(localStorage.getItem('storageEmails') || '[]');
    emails = storageEmails;
}

function getEmailTag(email) {
    const colorClass = priorityBgColors[email.priority];
    return `
        <section class="grid grid-cols-[90%_10%] items-center bg-sky-50 rounded-lg overflow-hidden" onclick="openClosePreview(event)" data-id="${email.id}">
            <div class="min-w-0 mr-5 pl-3 py-2">
                <div>${email.title}</div>
                <div class="truncate">
                    ${email.content}
                </div>
            </div>
            <div class="${colorClass} h-full" id="emailPriority"></div>
        </section>
`;
}

function getModal(msg, type) {
    return `
        <section id="modal" class="absolute shadow-md shadow-gray-900 ${type === "error" ? "bg-red-500" : "bg-green-500"} text-white font-bold rounded-xl p-5 top-5 right-5 flex justify-between items-center w-3/4 lg:w-2/12">
            ${msg}
            <button class="" type="button" aria-label="Fechar visualização de e-mail" onclick="closeModal()">
                <i class="fa-solid fa-xmark text-2xl"></i>
            </button>
        </section>
    `
}

function renderEmailList(emailList) {
    emailsContainer.innerHTML = "";
    emailList.forEach(email => {
        emailsContainer.innerHTML += getEmailTag(email);
    })
}

function clearForm() {
    createEmailFormDesktop.reset();
    createEmailFormMobile.reset();
}

function searchEmailByName(e) {
    const value = e.target.value.toLowerCase();
    const filteredEmails = emails.filter(email => 
        email.title.toLowerCase().includes(value)
    );
    
    renderEmailList(filteredEmails);
}

function openCreateEmail () {
    formAreaMobile.classList.toggle("createEmailClosed");
    formAreaMobile.classList.toggle("createEmailOpened");
}

function openClosePreview(e) {
    console.log(emails)
    if(e) {
        const section = e.currentTarget;
        const emailData = emails.filter(email => email.id == section.dataset.id)[0];
        emailPreview.querySelector("#emailPreviewTitle").innerHTML = emailData.title;
        emailPreview.querySelector("#emailPreviewSender").innerHTML = emailData.sender;
        emailPreview.querySelector("#emailPreviewReceiver").innerHTML = emailData.receiver.join(", ");
        emailPreview.querySelector("#emailPreviewContent").innerHTML = emailData.content;
        emailPreview.querySelector("#emailContentContainer").classList.add(priorityBorderColors[emailData.priority])
    } else {
        const emailContentContainer = emailPreview.querySelector("#emailContentContainer");
        const classes = [...emailContentContainer.classList];
        emailContentContainer.classList.remove(classes.find(c => c.startsWith("border-color")))
    }
    emailPreview.classList.toggle("previewOpened");
    emailPreview.classList.toggle("previewClosed");
}

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function closeModal() {
    const modal = document.querySelector("#modal");
    modal.remove();
}

async function submitFunction(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    data.content = stringToTags(data.content);
    data.receiver = data.receiver.split(", ");
    try {
        for(let key in data) {
            if(!data[key]) {
                throw new Error("Todos os campos devem ser preenchidos");
            } 
        }
        
        if(!validateEmail(data.sender)) {
            throw new Error("O e-mail é inválido");
        }
        
        data.receiver.forEach(email => {
            if(!validateEmail(email)) {
                throw new Error("Um ou mais e-mails de destinatário são inválidos");
            }
        });

        loadingContainer.classList.replace("hidden", "flex");
        await sendEmail(data);
        loadingContainer.classList.replace("flex", "hidden");
        getStorageEmails();
        renderEmailList(emails);
        openCreateEmail();

        e.target.reset();
        textPreviewMobile.innerHTML = "";
        document.querySelector("main").insertAdjacentHTML("beforeend", getModal("E-mail enviado com sucesso", "success"));
    } catch(err) {
        document.querySelector("main").insertAdjacentHTML("beforeend", getModal(err.message, "error"));
    }
}

function saveEmail(emailData) {
    console.log("aqui2")
    let storageEmails = JSON.parse(localStorage.getItem('storageEmails') || '[]');
    if(storageEmails.length > 0) {
        emailData.id = storageEmails[0].id + 1;
    } else {
        emailData.id = 0;
    }
    console.log("aqui3")
    storageEmails.unshift(emailData);
    storageEmails = storageEmails.slice(0, 10);
    localStorage.setItem('storageEmails', JSON.stringify(storageEmails));
}

async function sendEmail(emailData) {
    console.log("aqui")
    saveEmail(emailData);
    return new Promise(resol => {
        setTimeout(() => {
            resol({ success: true, messageId: Date.now() });
        }, 5000);
    });
}

function stringToTags(value) {
    return value
        .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
        .replace(/__(.*?)__/g, "<i>$1</i>");
}

function updatePreview(event) {
    let value = event.target.value;
    textPreviewMobile.innerHTML = stringToTags(value);
    textPreviewDesktop.innerHTML = stringToTags(value);
}

getStorageEmails();
renderEmailList(emails);