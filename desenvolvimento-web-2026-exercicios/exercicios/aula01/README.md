# 📝 Exercício Prático - Aula 01

## 🎯 Objetivo

Criar sua primeira página web usando os conceitos aprendidos na Aula 1:
- Estrutura HTML básica
- Uso do DevTools
- Tags essenciais
- Boas práticas

---

## 📋 Descrição do Exercício

Crie uma **página de apresentação pessoal** com as seguintes seções:

### 1. Cabeçalho
- Nome completo em `<h1>`
- Profissão/Curso em `<h2>`
- Foto sua (pode ser avatar) com `alt` descritivo

### 2. Sobre Mim
- Parágrafo (`<p>`) falando sobre você
- Lista (`<ul>`) com 3 hobbies
- Lista (`<ol>`) com 3 objetivos profissionais

### 3. Habilidades
- Tabela (`<table>`) com suas habilidades técnicas
- Colunas: Habilidade | Nível (Iniciante/Intermediário/Avançado)
- Mínimo 5 habilidades

### 4. Contato
- Links para redes sociais (se tiver)
- Email (pode ser fictício)
- GitHub (se tiver)

### 5. Rodapé
- Seu nome
- Ano atual
- "Feito com ❤️ no curso de Desenvolvimento Web"

---

## ✅ Requisitos Obrigatórios

### HTML
- [x] `<!DOCTYPE html>` no início
- [x] Tag `<html>` com atributo `lang="pt-BR"`
- [x] `<head>` com:
  - [x] `<meta charset="UTF-8">`
  - [x] `<meta name="viewport" ...>` (responsividade)
  - [x] `<title>` descritivo
- [x] `<body>` com todo conteúdo
- [x] Tags semânticas: `<header>`, `<main>`, `<section>`, `<footer>`
- [x] Todos os elementos fechados corretamente
- [x] Imagem com atributo `alt`
- [x] Links com `href` válidos

### Estrutura de Arquivos
```
exercicios/aula01/
├── index.html        # Seu código aqui
└── README.md         # (não modificar)
```

---

## 🎨 CSS (Opcional)

Você pode adicionar CSS inline no `<head>` se quiser:

```html
<style>
  body {
    font-family: Arial, sans-serif;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  /* Seus estilos... */
</style>
```

**Nota:** CSS detalhado será em aulas futuras!

---

## 📝 Exemplo de Estrutura

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>João Silva - Desenvolvedor Web</title>
</head>
<body>
  <header>
    <h1>João Silva</h1>
    <h2>Estudante de Análise e Desenvolvimento de Sistemas</h2>
    <img src="https://via.placeholder.com/150" alt="Foto de João Silva">
  </header>

  <main>
    <section>
      <h2>Sobre Mim</h2>
      <p>
        Olá! Sou estudante de ADS na UNINASSAU e estou aprendendo desenvolvimento web.
        Apaixonado por tecnologia e sempre em busca de novos desafios.
      </p>

      <h3>Hobbies</h3>
      <ul>
        <li>Jogar videogame</li>
        <li>Ler sobre tecnologia</li>
        <li>Praticar esportes</li>
      </ul>

      <h3>Objetivos Profissionais</h3>
      <ol>
        <li>Tornar-me desenvolvedor full-stack</li>
        <li>Trabalhar em uma startup de tecnologia</li>
        <li>Contribuir com projetos open source</li>
      </ol>
    </section>

    <section>
      <h2>Habilidades Técnicas</h2>
      <table>
        <thead>
          <tr>
            <th>Habilidade</th>
            <th>Nível</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>HTML</td>
            <td>Iniciante</td>
          </tr>
          <tr>
            <td>CSS</td>
            <td>Iniciante</td>
          </tr>
          <tr>
            <td>JavaScript</td>
            <td>Iniciante</td>
          </tr>
          <tr>
            <td>Git</td>
            <td>Iniciante</td>
          </tr>
          <tr>
            <td>Python</td>
            <td>Intermediário</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section>
      <h2>Contato</h2>
      <ul>
        <li>Email: <a href="mailto:joao@example.com">joao@example.com</a></li>
        <li>GitHub: <a href="https://github.com/joaosilva" target="_blank">@joaosilva</a></li>
        <li>LinkedIn: <a href="https://linkedin.com/in/joaosilva" target="_blank">João Silva</a></li>
      </ul>
    </section>
  </main>

  <footer>
    <p>&copy; 2026 João Silva. Feito com ❤️ no curso de Desenvolvimento Web.</p>
  </footer>
</body>
</html>
```

---

## 🤖 Validações Automáticas

O bot verificará:

### Estrutura (40 pontos)
- ✅ DOCTYPE correto
- ✅ Tags semânticas usadas
- ✅ Hierarquia de headings correta
- ✅ Todos elementos fechados

### Conteúdo (30 pontos)
- ✅ Todas seções presentes
- ✅ Listas (ul e ol) funcionais
- ✅ Tabela com thead e tbody
- ✅ Links funcionais

### Boas Práticas (20 pontos)
- ✅ Imagem com alt
- ✅ Lang="pt-BR"
- ✅ Meta tags presentes
- ✅ Indentação consistente

### Criatividade (10 pontos)
- ✅ Conteúdo original (não copiado)
- ✅ Esforço extra (CSS, emojis, etc)

---

## 📤 Como Entregar

1. Edite o arquivo `index.html` nesta pasta
2. Commit:
   ```bash
   git add exercicios/aula01/index.html
   git commit -m "feat(aula01): página de apresentação pessoal"
   git push
   ```
3. Abra Pull Request com título: `[Aula 01] Seu Nome`
4. Aguarde validação do bot

---

## ⏰ Prazo

**Data limite:** 22/02/2026 23:59

**Penalização por atraso:**
- Até 2 dias: -10 pontos
- Até 5 dias: -20 pontos
- Mais de 5 dias: não aceito (faça de qualquer forma para praticar)

---

## 💡 Dicas

1. **Use o DevTools** para inspecionar o exemplo e entender a estrutura
2. **Valide seu HTML** em: https://validator.w3.org/#validate_by_input
3. **Teste localmente** abrindo index.html no navegador
4. **Seja criativo** mas mantenha a estrutura pedida
5. **Não copie** - o bot detecta similaridade!

---

## 📚 Recursos

- [MDN - HTML Básico](https://developer.mozilla.org/pt-BR/docs/Learn/Getting_started_with_the_web/HTML_basics)
- [W3Schools - HTML](https://www.w3schools.com/html/)
- [Slides da Aula 1](../../slides/aula01/)

---

## ❓ Dúvidas?

Abra uma Issue com tag `dúvida` e título `[Aula 01] Sua dúvida`

---

**Bom trabalho! 🚀**
