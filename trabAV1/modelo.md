Parte 1: Documentação do Pré-Projeto Web (Padrão ABNT)
(Aviso aos alunos: Configurar o editor com Fonte Arial ou Times New Roman tamanho 12, espaçamento 1,5, margens de 3cm superior/esquerda e 2cm inferior/direita. Estrutura pré-textual obrigatória: Capa, Folha de Rosto, Resumo e Sumário).

1. Contexto sobre o Projeto e Problema
Contexto: A organização de eventos locais e meetups geralmente sofre com ferramentas fragmentadas: formulários soltos para receber propostas de palestras (Call for Papers), planilhas para montar a grade e sites estáticos que não atualizam a agenda em tempo real para os participantes.

Justificativa: O projeto visa unificar a experiência, criando um portal onde a comunidade possa interagir diretamente com o evento antes, durante e depois da sua realização.

Objetivo: Desenvolver uma aplicação web responsiva (Single Page Application - SPA) que gerencie o ciclo de vida de um evento, desde a submissão de temas até a exibição interativa da grade.

2. Engenharia de Requisitos e Casos de Uso
Em web, é fundamental que os alunos pensem na experiência do usuário (UX) e na separação de papéis.

Atores Principais: Participante, Palestrante, Administrador (Organizador).

Caso de Uso (UC01 - Submeter e Votar em Palestra):

Ator: Palestrante / Participante.

Fluxo Principal: O usuário faz login usando autenticação social (ex: Google ou GitHub). Como palestrante, preenche um formulário dinâmico com título e resumo da palestra. A submissão vai para um mural público onde outros participantes podem clicar em um botão de "Gostei" para votar, atualizando o contador em tempo real sem recarregar a página.

3. Diagramas (Focados em Web)
Para projetos web interativos, os alunos devem mapear como o navegador conversa com o servidor:

Diagrama de Casos de Uso: Mapeamento clássico das ações de cada tipo de usuário no portal.

Diagrama de Entidade-Relacionamento (MER/DER): Estrutura do banco de dados (ex: Tabelas de Usuarios, Eventos, Palestras, Votos).

Diagrama de Sequência ou Arquitetura Web: Muito importante aqui. Deve mostrar o fluxo: O cliente (Navegador/React) faz uma requisição HTTP REST, a API (Node.js/Java) processa, consulta o Banco de Dados e devolve um JSON para o cliente renderizar a tela.

4. Interface e Telas (Protótipos de Alta Fidelidade)
A interatividade deve ficar clara no desenho das telas.

Tela 1: Landing Page Dinâmica: Hero section com contagem regressiva para o evento e um mural de palestras com botões de interatividade (votos/likes).

Tela 2: Dashboard do Administrador: Uma tela com funcionalidade Drag-and-Drop (arrastar e soltar) onde o organizador puxa as palestras aprovadas para os horários da grade do evento.

Nota: Exigir que os alunos mostrem a versão Mobile (responsividade) e Desktop de pelo menos uma tela.

5. Tecnologias Utilizadas
Os alunos precisam justificar o stack com mentalidade de engenharia de software moderna:

Front-end: React.js, Vue.js ou Angular. Justificativa: Permitem criar interfaces reativas onde componentes (como um contador de votos) atualizam instantaneamente sem o refresh da página. Uso de Tailwind CSS ou Bootstrap para responsividade.

Back-end: Node.js (Express), Python (FastAPI) ou Java (Spring Boot) para expor uma API RESTful leve e rápida.

Banco de Dados: PostgreSQL (relacional) ou MongoDB (NoSQL, ideal para JSONs flexíveis).

Infraestrutura/Hospedagem: Vercel ou Netlify para o front-end (deploy contínuo) e Render ou Railway para a API, demonstrando conhecimento básico de nuvem.

Parte 2: Apresentação Executiva (Pitch de 15 Minutos)
Para a apresentação, oriente os alunos a fugirem de slides lendo blocos de código. O foco é vender o valor da aplicação e demonstrar que ela funciona fluidamente no navegador.

1. O Problema (0 a 3 minutos)

Slide 1: Capa, nome do projeto web e equipe.

Slide 2 (O Cenário Real): "Quem aqui já tentou achar o horário de uma palestra em um PDF estático no celular durante um evento? É frustrante. A informação muda e o site não acompanha."

2. A Solução e Arquitetura (3 a 8 minutos)

Slide 3 (A Proposta): Um hub interativo, responsivo e em tempo real.

Slide 4 (A Engenharia por trás): Apresentar o diagrama de arquitetura web. Mostrar claramente a separação entre o Front-end (o que roda no navegador do usuário) e o Back-end (o servidor e a regra de negócio).

Slide 5 (O Stack): Logotipos das tecnologias escolhidas, explicando rapidamente o motivo (Ex: "Escolhemos React pela componentização e facilidade em gerenciar o estado da aplicação").

3. O Produto (8 a 13 minutos) - A Demonstração (Showtime)

Slide 6 e 7 (Telas e Interatividade): Este é o momento crucial. Os alunos devem focar em mostrar a interatividade. "Observem como, ao clicar em 'Votar na Palestra', a requisição é enviada para a nossa API e o contador atualiza imediatamente na tela, usando gerenciamento de estado."

Slide 8 (Responsividade): Mostrar como a aplicação se adapta perfeitamente à tela de um smartphone.

4. Fechamento e Próximos Passos (13 a 15 minutos)

Slide 9 (Diferenciais técnicos): Citar pontos extras alcançados, como uso de rotas protegidas (autenticação JWT) ou cache.

Slide 10: Perguntas da banca.
