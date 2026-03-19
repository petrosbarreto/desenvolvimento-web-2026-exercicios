// 1. Seleção de Elementos (usando seus IDs do HTML)
const form = document.querySelector('.email-form'); // Seleção pela classe do seu form
const inputFrom = document.getElementById('from');
const inputTo = document.getElementById('to');
const inputSubject = document.getElementById('subject');
const inputBody = document.getElementById('body');
const selectPriority = document.getElementById('priority');

// Elementos do Preview
const preview = {
    from: document.getElementById('p-from'),
    to: document.getElementById('p-to'),
    subject: document.getElementById('p-subject'),
    body: document.getElementById('p-body'),
    tag: document.getElementById('p-tag')
};

const historyList = document.getElementById('historyList');
const loading = document.getElementById('loadingOverlay');

// 2. Funções de Validação
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email.trim());
}

function validarMultiplosEmails(emails) {
    if (!emails) return false;
    // Divide por vírgula e verifica cada um
    return emails.split(',').every(e => validarEmail(e.trim()));
}

// 3. Atualizar Preview em Tempo Real
function atualizarPreview() {
    preview.from.innerText = inputFrom.value || '...';
    preview.to.innerText = inputTo.value || '...';
    preview.subject.innerText = inputSubject.value || 'Assunto do E-mail';
    preview.body.innerText = inputBody.value || 'Sua mensagem aparecerá aqui.';

    const prio = selectPriority.value;
    preview.tag.innerText = prio.charAt(0).toUpperCase() + prio.slice(1); // Deixa a primeira letra maiúscula

    // Adiciona uma classe de cor baseada na prioridade (para você usar no CSS)
    preview.tag.className = `prio-tag ${prio}`;
}

// Escuta qualquer digitação no formulário para atualizar o preview
form.addEventListener('input', atualizarPreview);

// 4. Simulação de Envio
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Captura os dados atuais
    const emailData = {
        from: inputFrom.value,
        to: inputTo.value,
        subject: inputSubject.value,
        body: inputBody.value,
        priority: selectPriority.value,
        date: new Date().toLocaleString('pt-BR')
    };

    // Validações
    if (!validarEmail(emailData.from)) {
        return alert("O e-mail do remetente não é válido.");
    }
    if (!validarMultiplosEmails(emailData.to)) {
        return alert("Um ou mais e-mails de destino são inválidos. Separe-os por vírgula.");
    }

    // Mostra o loading
    loading.classList.remove('hidden');

    // Simula o delay de 2 segundos (Async/Await)
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Salva e limpa
    salvarNoLocalStorage(emailData);
    renderizarHistorico();

    loading.classList.add('hidden');
    form.reset();
    atualizarPreview(); // Volta o preview para o estado inicial
    alert("E-mail enviado com sucesso!");
});

// 5. Gestão do LocalStorage
function salvarNoLocalStorage(email) {
    let historico = JSON.parse(localStorage.getItem('emailHistory') || '[]');
    historico.unshift(email); // Adiciona no início da lista
    historico = historico.slice(0, 10); // Mantém apenas os 10 últimos
    localStorage.setItem('emailHistory', JSON.stringify(historico));
}

function renderizarHistorico() {
    const historico = JSON.parse(localStorage.getItem('emailHistory') || '[]');

    historyList.innerHTML = ''; // Limpa a lista antes de desenhar

    historico.forEach((email, index) => {
        const item = document.createElement('div');
        item.className = `history-item ${email.priority}`;
        item.innerHTML = `
            <div class="history-content">
                <strong>${email.subject}</strong>
                <p>Para: ${email.to}</p>
                <small>${email.date} - Prioridade: ${email.priority}</small>
            </div>
            <div class="history-actions">
                <button onclick="excluirEmail(${index})">Deletar</button>
                <button onclick="reenviarEmail(${index})">Reenviar</button>
            </div>
        `;
        historyList.appendChild(item);
    });
}

// 6. Funções de Ação do Histórico
window.excluirEmail = (index) => {
    let historico = JSON.parse(localStorage.getItem('emailHistory'));
    historico.splice(index, 1);
    localStorage.setItem('emailHistory', JSON.stringify(historico));
    renderizarHistorico();
};

window.reenviarEmail = (index) => {
    const historico = JSON.parse(localStorage.getItem('emailHistory'));
    const email = historico[index];

    // Preenche o form com os dados antigos
    inputTo.value = email.to;
    inputSubject.value = `ENC: ${email.subject}`;
    inputBody.value = email.body;

    window.scrollTo({ top: 0, behavior: 'smooth' });
    atualizarPreview();
};

// Inicializa o histórico ao carregar a página
renderizarHistorico();