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

## Gabriel Morass
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

## Guilherme Almeida

**Prompt 1 — Criação de testes com mocks para despesas:**
> "me ajude a criar um teste em Jest para a tela de despesas usando mocks. O teste deve ficar em `_tests_/despesas.test.tsx` e também ajustar a tela de ranking em `app/(tabs)/ranking.tsx` para suportar o novo comportamento de despesas"

Resposta aceita com ajustes: foram criados testes utilizando mocks para contexto e dependências da tela de despesas. Também foram feitas adaptações na tela de ranking para compatibilidade com o novo fluxo de despesas. Alguns mocks precisaram ser refinados manualmente para refletir corretamente o comportamento esperado da aplicação.

**Prompt 2 — Cobertura de testes para a tela de missões:**
> "me instrua a adicionar cobertura de testes Jest para a tela de missões. Preciso que você crie/atualize `_tests_/index.test.tsx`, configure `jest.config.js` e `jest.setup.ts`, e ajuste o `package.json` para rodar o Jest corretamente"

Resposta aceita: foram adicionadas configurações de ambiente para execução dos testes com Jest, incluindo ajustes no `jest.config.js`, `jest.setup.ts` e scripts do `package.json`. Também foi criada cobertura inicial de testes para a tela de missões em `_tests_/index.test.tsx`.

**Prompt 3 — Melhorias na tela principal:**
> "me ajude a melhorar a tela principal do app no arquivo `app/(tabs)/index.tsx`, adicionando as alterações de interface e comportamento necessárias para a nova versão"

Resposta aceita com ajustes: a IA auxiliou na reorganização da interface e na implementação de melhorias visuais e comportamentais da tela principal. Parte das alterações foi refinada manualmente para manter consistência com o restante da aplicação e adequação ao layout final definido pelo grupo.

## Eduardo Bertozzi

**Prompt 1 — Estrutura inicial do app:**
> "Preciso criar a estrutura inicial de um app de gerenciamento de repúblicas estudantis em React Native com Expo. Quais telas e contextos de estado global eu deveria considerar desde o início?"

Resposta aceita com ajustes: a IA sugeriu uma estrutura com Context API para estado global, telas separadas por funcionalidade e AsyncStorage para persistência. A estrutura foi adaptada ao tema Zelda e às necessidades específicas do grupo.

**Prompt 2 — Escolha do CI/CD para Expo:**
> "Quais são as diferenças entre usar EAS Build com CircleCI e outras alternativas para um projeto Expo React Native? Qual é mais recomendado para um app em estágio de desenvolvimento acadêmico?"

Resposta aceita: a IA explicou as vantagens do EAS Build integrado ao CircleCI — sem necessidade de infraestrutura própria, com suporte nativo ao ecossistema Expo. O grupo adotou essa combinação para o pipeline da NP2.

**Prompt 3 — Boas práticas com Expo Router:**
> "Estou desenvolvendo um app em React Native com Expo. Quais são as melhores práticas para estruturar a navegação entre telas usando expo-router?"

Resposta aceita com ajustes: a IA sugeriu o uso de layouts aninhados com `_layout.tsx` e navegação por tabs. A estrutura foi aplicada e adaptada ao fluxo de onboarding e às abas principais do RepQuest.

## Rafael Braga
**Prompt 1 - Pair Programming testes com mock**
> "Atue como Engenheiro Sênior especializado em Testes e QA. Você fará pair programming comigo para desenvolver testes utilizando mock para testar as funcionalidades do `_layout.tsx`. Gere uma estrutura genérica para eu entender como implementar exatamente o que preciso testar e depois seguimos com a execução, se der algum erro te envio e você auxilia a corrigir."

Resposta aceita: Não entregou código pronto e realmente atuou como um sênior auxiliando a desenvolver os testes corretamente.

**Prompt 2 - Estrutura e aperfeiçoamento da narrativa**
> "Preciso adicionar ao README.md histórias de usuário do meu projeto. Estruture uma seção para isso respeitando: Given/When/Then. Se atente ao tema do projeto, gostaria de uma narrativa de fantasia para combinar com a descrição. Adicione a seguinte história de usuário, as outras serão implementadas posteriormente: *Como* usuário do aplicativo, *quero* utilizar uma barra de navegação para transitar entre as páginas principais *para* que eu possa acessar as ferramentas com experiência fluida e feedbacks."

Resposta aceita com ajustes: a IA além da estrutura criou outras histórias de uso genéricas que não eram adequadas ao projeto. 

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

## 📖 As Crônicas da República (Histórias de Usuário)

As jornadas de nossos heróis foram mapeadas através das seguintes narrativas e critérios de aceitação:

### 📜 Conto 1: A Navegação Dimensional
**Como** usuário do aplicativo, **quero** utilizar uma barra de navegação para transitar entre as páginas principais **para** que eu possa acessar as ferramentas com experiência fluida e feedbacks.
- **Given** (Dado que) o aventureiro está com o aplicativo aberto na interface principal.
- **When** (Quando) ele toca em um dos ícones sagrados na barra de navegação inferior.
- **Then** (Então) o sistema exibe a relíquia (página) correspondente com uma transição suave, alterando o estado visual do ícone para indicar a aba ativa.

---

## 👥 Integrantes

| Nome | GitHub |
|------|--------|
| Eduardo Bertozzi | [@EduBertozzi](https://github.com/EduBertozzi) |
| Gabriel Morass | [@gabrielmorass](https://github.com/gabrielmorass) |
| Guilherme Almeida | [@guialmm](https://github.com/guialmm) |
| Rafael | [@rafaelbrx](https://github.com/rafaelbrx) |
| Daniele | [@danieleleticia](https://github.com/danieleleticia) |
| Samile | [@samilebarb](https://github.com/samilebarb) |
