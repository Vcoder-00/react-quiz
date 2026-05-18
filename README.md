# React Quiz App 🧠

Uma aplicação interativa de Quiz desenvolvida em React, focada em fidelidade de design (UI/UX), gerenciamento dinâmico de estado entre rotas e persistência de dados local.

---

## 🚀 Tecnologias Utilizadas

*   **React** (com TypeScript)
*   **React Router DOM** (Gerenciamento de rotas e histórico)
*   **Tailwind CSS** (Estilização baseada no guia visual)
*   **Vite** (Ambiente de desenvolvimento rápido)

---

## 🎯 Requisitos Implementados

### 1. Fidelidade ao Design (UI/UX)
*   **Guia Visual:** Interface totalmente adaptada e ajustada seguindo os padrões definidos no protótipo do Figma.
*   **Tema Personalizado:** Consistência visual utilizando estritamente as cores de identidade da aplicação em todos os componentes:
    *   `quiz-purple`
    *   `quiz-yellow`
    *   `quiz-dark`

### 2. Gerenciamento de Rotas e Estado Dinâmico
*   **Fluxo de Dados:** Ao responder a última pergunta na tela de Quiz, os dados de desempenho são consolidados e enviados para a rota `/resultado` de forma segura através do objeto `state` da função `navigate`.
*   **Consumo de Estado:** A tela de resultados extrai as informações do hook `useLocation().state` para exibir:
    *   Quantidade total de acertos.
    *   Quantidade total de erros.
*   **Feedback ao Usuário:** Exibição de uma mensagem motivacional dinâmica gerada com base na porcentagem de aproveitamento do aluno.

### 3. Persistência com LocalStorage
*   **Dados Dinâmicos:** Substituição de dados estáticos (mockados) por um fluxo de leitura dinâmico.
*   **Ciclo de Vida:** Utilização do hook `useEffect` na tela de Quiz para buscar as questões armazenadas no navegador sob a chave `@quiz_questions` logo no carregamento da página.

---

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/Vcoder-00/react-quiz.git](https://github.com/Vcoder-00/react-quiz.git)
   cd react-quiz
1. Instale as dependências:
   ```bash
   npm install
1. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
