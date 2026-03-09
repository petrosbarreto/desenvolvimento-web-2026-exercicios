# 📝 Exercício Prático - Aula 02

## 🎯 Objetivo

Criar uma **página interativa** que demonstra requisições HTTP usando conceitos da Aula 2:
- Fetch API
- Métodos HTTP (GET, POST)
- Status Codes
- JSON
- Exibir dados dinamicamente

---

## 📋 Descrição do Exercício

Crie uma aplicação web que consome a API JSONPlaceholder e exibe:

### 1. Lista de Usuários (GET)
- Buscar usuários da API
- Exibir em cards ou tabela
- Mostrar: nome, email, cidade

### 2. Criar Post (POST)
- Formulário para criar novo post
- Campos: título, conteúdo
- Enviar via POST para API
- Exibir confirmação com status code

### 3. Informações da Requisição
- Exibir método usado
- Exibir URL da API
- Exibir status code da resposta
- Exibir tempo de resposta

---

## ✅ Requisitos Obrigatórios

### HTML
V [x] Estrutura semântica (header, main, section, footer)
V [x] Botão "Carregar Usuários"
V [x] Formulário com validação
- [x] Área para exibir resultados
V [x] Indicador de loading

### JavaScript
V [x] Fetch API (não usar jQuery ou Axios)
V [x] Função para GET (buscar usuários)
V [x] Função para POST (criar post)
V [x] Manipulação do DOM (criar elementos)
- [x] Tratamento de erros (try/catch)
- [x] Exibir status code

### CSS
V [x] Cards ou tabela estilizada
V [x] Botões com hover effect
V [x] Loading spinner/animação
- [x] Responsivo (mobile-friendly)

---

## 🎨 Estrutura de Arquivos

```
exercicios/aula02/
├── index.html
├── style.css
├── script.js
└── README.md
```

---

## 📝 Template Inicial

### index.html
```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Aula 02 - Requisições HTTP</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header>
    <h1>📡 Requisições HTTP - JSONPlaceholder API</h1>
  </header>

  <main>
    <section id="usuarios-section">
      <h2>Lista de Usuários</h2>
      <button id="btn-carregar">🔄 Carregar Usuários</button>
      <div id="loading" class="hidden">Carregando...</div>
      <div id="usuarios-container"></div>
    </section>

    <section id="post-section">
      <h2>Criar Novo Post</h2>
      <form id="form-post">
        <label for="titulo">Título:</label>
        <input type="text" id="titulo" required>
        
        <label for="conteudo">Conteúdo:</label>
        <textarea id="conteudo" required></textarea>
        
        <button type="submit">📤 Enviar Post</button>
      </form>
      <div id="post-resultado"></div>
    </section>

    <section id="info-section">
      <h2>Informações da Última Requisição</h2>
      <div id="requisicao-info">
        <p><strong>Método:</strong> <span id="info-metodo">-</span></p>
        <p><strong>URL:</strong> <span id="info-url">-</span></p>
        <p><strong>Status:</strong> <span id="info-status">-</span></p>
        <p><strong>Tempo:</strong> <span id="info-tempo">-</span></p>
      </div>
    </section>
  </main>

  <footer>
    <p>Aula 02 - Desenvolvimento Web 2026.1</p>
  </footer>

  <script src="script.js"></script>
</body>
</html>
```

### script.js (template)
```javascript
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
    // 2. Fazer requisição
    // 3. Processar resposta
    // 4. Exibir usuários
    // 5. Atualizar info da requisição
    
  } catch (error) {
    container.innerHTML = `<p class="error">Erro: ${error.message}</p>`;
  }
}

// Criar post
async function criarPost(event) {
  event.preventDefault();
  const startTime = Date.now();
  
  const titulo = document.getElementById('titulo').value;
  const conteudo = document.getElementById('conteudo').value;
  
  try {
    // TODO: Implementar fetch POST
    // 1. Enviar dados
    // 2. Processar resposta
    // 3. Exibir confirmação
    // 4. Limpar formulário
    // 5. Atualizar info da requisição
    
  } catch (error) {
    console.error('Erro:', error);
  }
}

// Atualizar informações da requisição
function atualizarInfo(metodo, url, status, tempo) {
  // TODO: Atualizar elementos HTML com as informações
}

// Event listeners
document.getElementById('btn-carregar').addEventListener('click', carregarUsuarios);
document.getElementById('form-post').addEventListener('submit', criarPost);
```

### style.css (base)
```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

header {
  text-align: center;
  padding: 20px 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 10px;
  margin-bottom: 30px;
}

section {
  margin: 30px 0;
  padding: 20px;
  background: #f5f5f5;
  border-radius: 10px;
}

button {
  /* TODO: Estilizar botões */
}

/* TODO: Adicionar mais estilos */
```

---

## 🤖 Validações Automáticas

### Estrutura (20 pontos)
- ✅ 3 arquivos (HTML, CSS, JS)
- ✅ HTML válido
- ✅ CSS externo linkado
- ✅ JS externo linkado

### JavaScript (40 pontos)
- ✅ Fetch API usado corretamente
- ✅ GET implementado
- ✅ POST implementado
- ✅ Tratamento de erros (try/catch)
- ✅ Manipulação DOM
- ✅ Exibe status code
- ✅ Sem erros no console

### Funcionalidade (30 pontos)
- ✅ Botão carrega usuários
- ✅ Usuários exibidos na tela
- ✅ Formulário funciona
- ✅ POST envia dados
- ✅ Info da requisição atualiza
- ✅ Loading funciona

### UI/UX (10 pontos)
- ✅ CSS bem aplicado
- ✅ Responsivo
- ✅ Loading visual
- ✅ Feedback ao usuário

---

## 💡 Dicas

### 1. Fetch GET Básico
```javascript
const response = await fetch('https://jsonplaceholder.typicode.com/users');
const data = await response.json();
console.log(data);
```

### 2. Fetch POST Básico
```javascript
const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    title: 'Título',
    body: 'Conteúdo',
    userId: 1
  })
});
const data = await response.json();
console.log(data);
```

### 3. Criar Card Dinamicamente
```javascript
const card = document.createElement('div');
card.className = 'user-card';
card.innerHTML = `
  <h3>${user.name}</h3>
  <p>Email: ${user.email}</p>
  <p>Cidade: ${user.address.city}</p>
`;
container.appendChild(card);
```

### 4. Calcular Tempo
```javascript
const startTime = Date.now();
// ... fazer requisição
const endTime = Date.now();
const tempo = endTime - startTime;
console.log(`Levou ${tempo}ms`);
```

---

## 🎯 Bônus (Opcional)

Ganhe pontos extras implementando:
- ✨ Filtro/busca de usuários (+5pts)
- ✨ Paginação (+5pts)
- ✨ Animações CSS (+5pts)
- ✨ Dark mode (+5pts)
- ✨ Cache de requisições (+10pts)

---

## ⏰ Prazo

**Data limite:** 01/03/2026 23:59

---

## 📚 Recursos

- [JSONPlaceholder API](https://jsonplaceholder.typicode.com/)
- [MDN - Fetch API](https://developer.mozilla.org/pt-BR/docs/Web/API/Fetch_API)
- [MDN - Async/Await](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Statements/async_function)
- [Slides da Aula 2](../../slides/aula02/)

---

## 📤 Como Entregar

```bash
git add exercicios/aula02/
git commit -m "feat(aula02): aplicação requisições HTTP"
git push
```

Abra PR: `[Aula 02] Seu Nome`

---

**Bom trabalho! 🚀**
