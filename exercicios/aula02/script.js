console.log("JS funcionando");

const API_URL = 'https://jsonplaceholder.typicode.com';

async function carregarUsuarios() {
  const startTime = Date.now();
  const loading = document.getElementById('loading');
  const container = document.getElementById('usuarios-container');
  const url = `${API_URL}/users`;

  try {
    loading.classList.remove('hidden');
    container.innerHTML = '';

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const usuarios = await response.json();

    usuarios.forEach(user => {
      const card = document.createElement('div');
      card.className = 'user-card';
      card.innerHTML = `
        <h3>${user.name}</h3>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Cidade:</strong> ${user.address.city}</p>
      `;
      container.appendChild(card);
    });

    const endTime = Date.now();
    atualizarInfo('GET', url, response.status, endTime - startTime);

  } catch (error) {
    container.innerHTML = `<p class="error">❌ Erro: ${error.message}</p>`;
  } finally {
    loading.classList.add('hidden');
  }
}

async function criarPost(event) {
  event.preventDefault();
  const startTime = Date.now();

  const titulo = document.getElementById('titulo').value;
  const conteudo = document.getElementById('conteudo').value;
  const resultado = document.getElementById('post-resultado');
  const url = `${API_URL}/posts`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: titulo,
        body: conteudo,
        userId: 1
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();

    resultado.innerHTML = `
      <div class="success">
        ✅ Post criado com sucesso!<br>
        ID: ${data.id}<br>
        Status: ${response.status}
      </div>
    `;

    event.target.reset();

    const endTime = Date.now();
    atualizarInfo('POST', url, response.status, endTime - startTime);

  } catch (error) {
    resultado.innerHTML = `<p class="error">❌ Erro: ${error.message}</p>`;
  }
}

function atualizarInfo(metodo, url, status, tempo) {
  document.getElementById('info-metodo').textContent = metodo;
  document.getElementById('info-url').textContent = url;
  document.getElementById('info-status').textContent = `${status} ${getStatusText(status)}`;
  document.getElementById('info-tempo').textContent = `${tempo}ms`;
}

function getStatusText(code) {
  const statusTexts = {
    200: 'OK',
    201: 'Created',
    400: 'Bad Request',
    404: 'Not Found',
    500: 'Internal Server Error'
  };
  return statusTexts[code] || '';
}

document.getElementById('btn-carregar').addEventListener('click', carregarUsuarios);
document.getElementById('form-post').addEventListener('submit', criarPost);