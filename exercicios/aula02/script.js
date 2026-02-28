const API_URL = 'https://jsonplaceholder.typicode.com';

// 1. Carregar usuários (GET)
async function carregarUsuarios() {
  const startTime = Date.now();
  const loading = document.getElementById('loading');
  const container = document.getElementById('usuarios-container');
  
  try {
    // Mostrar loading e limpar container
    loading.classList.remove('hidden');
    container.innerHTML = '';
    
    // Fazer requisição GET
    const response = await fetch(`${API_URL}/users`);
    
    // Verificar se a resposta é ok (status 200-299)
    if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
    
    const usuarios = await response.json();
    
    // Exibir usuários dinamicamente
    usuarios.forEach(user => {
      const card = document.createElement('div');
      card.className = 'user-card';
      card.innerHTML = `
        <h3>👤 ${user.name}</h3>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Cidade:</strong> ${user.address.city}</p>
      `;
      container.appendChild(card);
    });
    
    // Atualizar informações da requisição
    const endTime = Date.now();
    atualizarInfo('GET', `${API_URL}/users`, response.status, endTime - startTime);
    
  } catch (error) {
    container.innerHTML = `<p class="error">❌ Erro ao carregar: ${error.message}</p>`;
  } finally {
    // Esconder loading independente de sucesso ou erro
    loading.classList.add('hidden');
  }
}

// 2. Criar post (POST)
async function criarPost(event) {
  event.preventDefault(); // Impede o recarregamento da página
  const startTime = Date.now();
  
  const titulo = document.getElementById('titulo').value;
  const conteudo = document.getElementById('conteudo').value;
  const resultado = document.getElementById('post-resultado');
  
  try {
    // Fazer requisição POST
    const response = await fetch(`${API_URL}/posts`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json; charset=UTF-8' 
      },
      body: JSON.stringify({
        title: titulo,
        body: conteudo,
        userId: 1
      })
    });

    if (!response.ok) throw new Error(`Erro ao postar: ${response.status}`);
    
    const data = await response.json();
    
    // Exibir confirmação
    resultado.innerHTML = `
      <div class="success">
        ✅ Post criado com sucesso!<br>
        <strong>ID do Post:</strong> ${data.id}<br>
        <strong>Status:</strong> ${response.status}
      </div>
    `;
    
    // Limpar formulário
    event.target.reset();
    
    // Atualizar info
    const endTime = Date.now();
    atualizarInfo('POST', `${API_URL}/posts`, response.status, endTime - startTime);
    
  } catch (error) {
    resultado.innerHTML = `<p class="error">❌ Erro: ${error.message}</p>`;
  }
}

// 3. Atualizar painel de informações
function atualizarInfo(metodo, url, status, tempo) {
  document.getElementById('info-metodo').textContent = metodo;
  document.getElementById('info-url').textContent = url;
  document.getElementById('info-status').textContent = `${status} ${getStatusText(status)}`;
  document.getElementById('info-tempo').textContent = `${tempo}ms`;
}

// Helper: obter texto amigável do status code
function getStatusText(code) {
  const statusTexts = {
    200: 'OK',
    201: 'Created',
    400: 'Bad Request',
    404: 'Not Found',
    500: 'Internal Server Error'
  };
  return statusTexts[code] || 'Unknown';
}

// Event listeners
document.getElementById('btn-carregar').addEventListener('click', carregarUsuarios);
document.getElementById('form-post').addEventListener('submit', criarPost);