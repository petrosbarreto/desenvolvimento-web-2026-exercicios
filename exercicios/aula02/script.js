const API_URL = 'https://jsonplaceholder.typicode.com';

// ATUALIZAR INFORMAÇÕES NA TELA
function atualizarInfo(metodo, url, status, tempo) {
  document.getElementById('info-metodo').textContent = metodo;
  document.getElementById('info-url').textContent = url;
  document.getElementById('info-status').textContent = status;
  document.getElementById('info-tempo').textContent = tempo + " ms";
}

// CARREGAR USUÁRIOS (GET)
async function carregarUsuarios() {
  const startTime = Date.now();

  const loading = document.getElementById('loading');
  const botao = document.getElementById('btn-carregar');
  const tbody = document.querySelector('#usuarios-tabela tbody');

  try {
    loading.classList.remove('hidden');
    botao.disabled = true;
    tbody.innerHTML = '';

    const url = `${API_URL}/users`;
    const response = await fetch(url);

    const endTime = Date.now();
    const tempo = endTime - startTime;

    if (!response.ok) {
      throw new Error(`Erro HTTP ${response.status}`);
    }

    const usuarios = await response.json();

    usuarios.forEach(user => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.address.city}</td>
        <td>${user.company.name}</td>
      `;
      tbody.appendChild(tr);
    });

    atualizarInfo("GET", url, response.status, tempo);

  } catch (error) {
    console.error(error);
  } finally {
    loading.classList.add('hidden');
    botao.disabled = false;
  }
}

// CRIAR POST (POST)
async function criarPost(event) {
  event.preventDefault();

  const startTime = Date.now();

  const titulo = document.getElementById('titulo').value.trim();
  const conteudo = document.getElementById('conteudo').value.trim();
  const resultado = document.getElementById('post-resultado');

  if (!titulo || !conteudo) {
    resultado.innerHTML = `<div class="error">Preencha todos os campos.</div>`;
    return;
  }

  try {
    const url = `${API_URL}/posts`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: titulo,
        body: conteudo,
        userId: 1
      })
    });

    const endTime = Date.now();
    const tempo = endTime - startTime;

    if (!response.ok) {
      throw new Error(`Erro HTTP ${response.status}`);
    }

    const data = await response.json();

    resultado.innerHTML = `
      <div class="success">
        Post criado com sucesso! <br>
        ID: ${data.id} <br>
        Status: ${response.status}
      </div>
    `;

    atualizarInfo("POST", url, response.status, tempo);

    document.getElementById('form-post').reset();

  } catch (error) {
    resultado.innerHTML = `<div class="error">${error.message}</div>`;
  }
}

// EVENTOS
document.getElementById('btn-carregar')
  .addEventListener('click', carregarUsuarios);

document.getElementById('form-post')
  .addEventListener('submit', criarPost);