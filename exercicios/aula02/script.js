// TODO: Implemente as funções abaixo

const API_URL = 'https://jsonplaceholder.typicode.com';

// Carregar usuários
async function carregarUsuarios() {
  const startTime = Date.now();
  const loading = document.getElementById('loading');
  const container = document.getElementById('usuarios-container');
  
  try {
    // TODO: Implementar fetch GET
    // 1. Mostrar loading
    loading.classList.remove('hidden');
    container.innerHTML = '';
    
    // 2. Fazer requisição
    // const response = await fetch(`${API_URL}/users`);
    
    // 3. Verificar status
    // if (!response.ok) throw new Error(`HTTP ${response.status}`);
    
    // 4. Processar resposta
    // const usuarios = await response.json();
    
    // 5. Exibir usuários
    // usuarios.forEach(user => {
    //   const card = document.createElement('div');
    //   card.className = 'user-card';
    //   card.innerHTML = `...`;
    //   container.appendChild(card);
    // });
    
    // 6. Esconder loading
    loading.classList.add('hidden');
    
    // 7. Atualizar info
    const endTime = Date.now();
    // atualizarInfo('GET', `${API_URL}/users`, response.status, endTime - startTime);
    
  } catch (error) {
    loading.classList.add('hidden');
    container.innerHTML = `<p class="error">❌ Erro: ${error.message}</p>`;
  }
}

// Criar post
async function criarPost(event) {
  event.preventDefault();
  const startTime = Date.now();
  
  const titulo = document.getElementById('titulo').value;
  const conteudo = document.getElementById('conteudo').value;
  const resultado = document.getElementById('post-resultado');
  
  try {
    // TODO: Implementar fetch POST
    // 1. Fazer requisição POST
    // const response = await fetch(`${API_URL}/posts`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     title: titulo,
    //     body: conteudo,
    //     userId: 1
    //   })
    // });
    
    // 2. Processar resposta
    // const data = await response.json();
    
    // 3. Exibir confirmação
    // resultado.innerHTML = `
    //   <div class="success">
    //     ✅ Post criado com sucesso!<br>
    //     ID: ${data.id}<br>
    //     Status: ${response.status}
    //   </div>
    // `;
    
    // 4. Limpar formulário
    // event.target.reset();
    
    // 5. Atualizar info
    const endTime = Date.now();
    // atualizarInfo('POST', `${API_URL}/posts`, response.status, endTime - startTime);
    
  } catch (error) {
    resultado.innerHTML = `<p class="error">❌ Erro: ${error.message}</p>`;
  }
}

// Atualizar informações da requisição
function atualizarInfo(metodo, url, status, tempo) {
  document.getElementById('info-metodo').textContent = metodo;
  document.getElementById('info-url').textContent = url;
  document.getElementById('info-status').textContent = `${status} ${getStatusText(status)}`;
  document.getElementById('info-tempo').textContent = `${tempo}ms`;
}

// Helper: obter texto do status code
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

// Event listeners
document.getElementById('btn-carregar').addEventListener('click', carregarUsuarios);
document.getElementById('form-post').addEventListener('submit', criarPost);
