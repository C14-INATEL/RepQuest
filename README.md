# 🛡️ RepQuest: The Legend of Santa Rita

> **"It's dangerous to go alone! Take this... and manage your República."**

O **RepQuest** é um sistema de gerenciamento de repúblicas estudantis desenvolvido com uma interface mística baseada na tecnologia **Zonai** de _The Legend of Zelda: Tears of the Kingdom_. O projeto foi criado para transformar tarefas domésticas e despesas em uma verdadeira jornada épica para os estudantes do **Inatel**.

---

## 📱 O Projeto

Desenvolvido pelo grupo da disciplina C14 — Engenharia de Software do Inatel, unindo design imersivo (UI/UX) com uma arquitetura de software sólida em **React Native** e **Expo**.

### 🏛️ Funcionalidades

- **Mural da Casa (Quests):** Registro de tarefas diárias que recompensam os moradores com Rúpias.
- **Tesouro da República (Despesas):** Gerenciamento de débitos e tributos (aluguel, luz, internet) com saldo integrado.
- **Altar de Hyrule (Ranking):** Pódio dinâmico que destaca os heróis mais ativos da república.
- **Códice do Herói (Perfil):** Registro pessoal de nível, conquistas e link direto para o portfólio no GitHub.
- **Onboarding:** Fluxo de entrada com seleção de papel (admin/membro), criação e ingresso em repúblicas via código de convite.
- **Gestão de Membros:** Painel administrativo para gerenciar os moradores da república.

---

## 🛠️ Tecnologias Utilizadas

- **React Native & Expo (SDK 54):** Base para desenvolvimento mobile multiplataforma.
- **TypeScript:** Tipagem estática e segurança no código.
- **Context API + AsyncStorage:** Gerenciamento de estado global com persistência local.
- **Expo Router:** Navegação baseada em arquivos (file-based routing).
- **Jest + React Native Testing Library:** Testes unitários automatizados.
- **CircleCI + EAS Build:** Pipeline de CI/CD com build Android na nuvem.
- **Expo-Font & Audio:** Fonte HyliaSerif e efeitos sonoros clássicos.

---

## ⚡ Como Rodar

1. Clone o repositório:

   ```bash
   git clone https://github.com/C14-INATEL/RepQuest.git
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Inicie o servidor do Expo:

   ```bash
   npx expo start
   ```

4. Escaneie o QR Code com o aplicativo **Expo Go** (Android ou iOS).

---

## 🧪 Testes

O projeto utiliza **Jest** com **React Native Testing Library**. São 36 testes unitários cobrindo as telas principais, contexto global e hooks.

```bash
# Rodar todos os testes
npm test

# Rodar com relatório de cobertura
npm test -- --coverage

# Rodar em modo watch (durante o desenvolvimento)
npm run test:watch
```

---

## 🔁 CI/CD

O pipeline é composto por duas ferramentas:

- **CircleCI** — executa lint, verificação de tipos TypeScript, testes unitários e relatório de cobertura a cada push.
- **EAS Build (Expo Application Services)** — compila o APK Android na nuvem do Expo após todas as verificações passarem.

Cada integrante é responsável por um job do pipeline, commitado na sua própria branch via Pull Request.

---

## 🤖 Uso de IA

O grupo utilizou ferramentas de IA como apoio ao longo do desenvolvimento. O uso foi transparente e supervisionado — todo código gerado foi revisado, testado e adaptado pelo grupo antes de ser integrado ao projeto.

### Modelos utilizados

- **Claude (Anthropic)** — via Claude Code (extensão no VS Code)
- **ChatGPT (OpenAI)** — via interface web
- **Codex (OpenAI)** — via ChatGPT (extensão do VS Code)

### Para que foram usados

- Geração de testes unitários com mocks para React Native
- Configuração do pipeline CircleCI + EAS Build
- Debugging de erros de configuração (ESLint, TypeScript, dependências Expo)
- Refatoração de componentes e hooks
- Revisão de código e sugestões de melhoria

### Exemplos reais de prompts utilizados

**Prompt 1 — Configuração do pipeline:**
> "vamos fazer um pipeline ci/cd com EXPO EAS Build, sem github actions, com 1 job por integrante"

Resposta aceita com ajustes: foi criado o `.circleci/config.yml` com o job base `install-dependencies` e o `eas.json` com os perfis `development`, `preview` e `production`. O grupo optou por CircleCI no lugar de Jenkins por não exigir infraestrutura própria.

**Prompt 2 — Correção do ambiente de testes:**
> "o que está acontecendo nos testes? o jest aparece sublinhado de vermelho"

Resposta aceita: identificado que o ESLint não reconhecia os globais do Jest. Corrigido adicionando `globals.jest` ao `eslint.config.js` e criando `__tests__/tsconfig.json` com `"types": ["jest"]`.

**Prompt 3 — Geração de testes unitários:**
> "crie testes unitários para a tela de despesas cobrindo: renderização, cálculo do total, pagamento de despesa, validação de formulário e criação de nova despesa"

Resposta ajustada: os testes gerados foram revisados e adaptados para usar os mocks corretos do contexto (`RepContext`) e das dependências nativas. Alguns casos de teste foram reescritos manualmente para refletir melhor o comportamento real da tela.

**Prompt 4 — Debugging de dependências:**
> "o expo doctor está dando erro de versão nos pacotes expo-linking e expo-web-browser"

Resposta aceita com ajuste: a IA sugeriu atualizar os pacotes, mas a atualização causou conflito de peer dependency com `react@19.1.0`. A solução adotada foi manter as versões anteriores e adicionar `expo.install.exclude` no `package.json`.

### Dinâmica de uso

A IA foi usada majoritariamente de forma individual por cada integrante em suas próprias branches, principalmente para geração de testes e resolução de erros pontuais. Em alguns momentos foi usada em conjunto durante reuniões do grupo para decisões de arquitetura e configuração do pipeline.

### O que não foi feito por IA

- Definição do tema e conceito do app (Zelda/repúblicas estudantis)
- Arquitetura de navegação e estrutura de pastas
- Design visual das telas (cores Zonai, layout, gamificação)
- Lógica de negócio do contexto global (`RepContext`)
- Fluxo de onboarding e gestão de membros
- Decisão de quais testes eram relevantes ao domínio

---

## 👥 Integrantes

| Nome | GitHub |
|------|--------|
| Eduardo Bertozzi | [@EduBertozzi](https://github.com/EduBertozzi) |
| Gabriel Morass | [@gabrielmorass](https://github.com/gabrielmorass) |
| Guilherme Almeida | [@guialmm](https://github.com/guialmm) |
| Rafael | — |
| Daniele | — |
| Samile | — |
