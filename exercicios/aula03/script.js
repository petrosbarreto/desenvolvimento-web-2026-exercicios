const emails = [
    {
        id: 1,
        title: "Assunto 1",
        content: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem ex sint ipsa aliquid quas quaerat! Repellendus iure ipsam, delectus incidunt voluptatem similique quis itaque alias numquam autem sit quisquam atque.",
        priority: 1
    },
    {
        id: 2,
        title: "Assunto 2",
        content: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem ex sint ipsa aliquid quas quaerat! Repellendus iure ipsam, delectus incidunt voluptatem similique quis itaque alias numquam autem sit quisquam atque.",
        priority: 2
    },
    {
        id: 3,
        title: "Assunto 3",
        content: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem ex sint ipsa aliquid quas quaerat! Repellendus iure ipsam, delectus incidunt voluptatem similique quis itaque alias numquam autem sit quisquam atque.",
        priority: 3
    },
    {
        id: 4,
        title: "Assunto 4",
        content: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem ex sint ipsa aliquid quas quaerat! Repellendus iure ipsam, delectus incidunt voluptatem similique quis itaque alias numquam autem sit quisquam atque.",
        priority: 1
    },
    {
        id: 5,
        title: "Assunto 5",
        content: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem ex sint ipsa aliquid quas quaerat! Repellendus iure ipsam, delectus incidunt voluptatem similique quis itaque alias numquam autem sit quisquam atque.",
        priority: 3
    },
    {
        id: 6,
        title: "Assunto 6",
        content: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem ex sint ipsa aliquid quas quaerat! Repellendus iure ipsam, delectus incidunt voluptatem similique quis itaque alias numquam autem sit quisquam atque.",
        priority: 1
    },
];

const priorityColors = {
    1: "bg-red-500",
    2: "bg-orange-500",
    3: "bg-green-500",
}

const getEmailTag = (email) => {
    const colorClass = priorityColors[email.priority];
    return `
        <section class="grid grid-cols-[90%_10%] items-center bg-sky-50 rounded-lg overflow-hidden" onclick="openClosePreview()" data-id="${email.id}">
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

const emailsContainer = document.querySelector("#emailsContainer");
const formArea = document.querySelector("#formArea");
const createEmailForm = document.querySelector("#createEmailForm");
const emailPreview = document.querySelector("#emailPreview");

emails.forEach(email => {
    emailsContainer.innerHTML += getEmailTag(email);
})

const openCreateEmail = () => {
    formArea.classList.toggle("createEmailClosed");
    formArea.classList.toggle("createEmailOpened");
}

const openClosePreview = () => {
    emailPreview.classList.toggle("previewOpened");
    emailPreview.classList.toggle("previewClosed");
}

createEmailForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const data = Object.fromEntries(new FormData(e.target));

    // Adicionar a validação de e-mail
    // Fazer o parse para tags HTML
    // Criar o loading
    // Salvar no localStorage

    e.target.reset();
})

// Criar função para abrir o preview
// Criar função para 
