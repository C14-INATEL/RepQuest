# 🛡️ RepQuest: The Legend of Santa Rita

> **"It's dangerous to go alone! Take this... and manage your República."**

O **RepQuest** é um sistema de gerenciamento de repúblicas estudantis desenvolvido com uma interface mística baseada na tecnologia **Zonai** de _The Legend of Zelda: Tears of the Kingdom_. O projeto foi criado para transformar tarefas domésticas e despesas em uma verdadeira jornada épica para os estudantes do **Inatel**.

---

## 📱 O Projeto

Desenvolvido pelo grupo da disciplina C14: Engenharia de Software do Inatel, unindo design imersivo (UI/UX) com uma arquitetura de software sólida em **React Native** e **Expo**.

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

O projeto utiliza **Jest** com **React Native Testing Library**. São mais de 83 testes unitários cobrindo as telas principais, contexto global, hooks e fluxos de navegação.

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

- **CircleCI:** executa lint, verificacao de tipos TypeScript, auditoria de seguranca e testes unitarios a cada push, com 1 job por integrante.
- **EAS Build (Expo Application Services):** compila o APK Android na nuvem do Expo apos todas as verificacoes passarem.

Cada integrante é responsável por um job do pipeline, commitado na sua própria branch via Pull Request.

---

## 🤖 Uso de IA

O grupo utilizou ferramentas de IA como apoio ao longo do desenvolvimento. O uso foi transparente e supervisionado: todo código gerado foi revisado, testado e adaptado pelo grupo antes de ser integrado ao projeto.

### Modelos utilizados

- **Claude (Anthropic):** via Claude Code (extensão no VS Code)
- **ChatGPT (OpenAI):** via interface web
- **Codex (OpenAI):** via ChatGPT (extensão do VS Code)

### Exemplos reais de prompts utilizados

## Gabriel Morass
**Prompt 1: Configuração do pipeline**
> "vamos fazer um pipeline ci/cd com EXPO EAS Build, sem github actions, com 1 job por integrante"

Resposta aceita com ajustes: foi criado o `.circleci/config.yml` com o job base `install-dependencies` e o `eas.json` com os perfis `development`, `preview` e `production`. O grupo optou por CircleCI no lugar de Jenkins por não exigir infraestrutura própria.

**Prompt 2: Correção do ambiente de testes**
> "o que está acontecendo nos testes? o jest aparece sublinhado de vermelho"

Resposta aceita: identificado que o ESLint não reconhecia os globais do Jest. Corrigido adicionando `globals.jest` ao `eslint.config.js` e criando `__tests__/tsconfig.json` com `"types": ["jest"]`.

**Prompt 3: Geração de testes unitários**
> "crie testes unitários para a tela de despesas cobrindo: renderização, cálculo do total, pagamento de despesa, validação de formulário e criação de nova despesa"

Resposta ajustada: os testes gerados foram revisados e adaptados para usar os mocks corretos do contexto (`RepContext`) e das dependências nativas. Alguns casos de teste foram reescritos manualmente para refletir melhor o comportamento real da tela.

**Prompt 4: Debugging de dependências**
> "o expo doctor está dando erro de versão nos pacotes expo-linking e expo-web-browser"

Resposta aceita com ajuste: a IA sugeriu atualizar os pacotes, mas a atualização causou conflito de peer dependency com `react@19.1.0`. A solução adotada foi manter as versões anteriores e adicionar `expo.install.exclude` no `package.json`.

## Guilherme Almeida

**Prompt 1: Criação de testes com mocks para despesas**
> "me ajude a criar um teste em Jest para a tela de despesas usando mocks. O teste deve ficar em `_tests_/despesas.test.tsx` e também ajustar a tela de ranking em `app/(tabs)/ranking.tsx` para suportar o novo comportamento de despesas"

Resposta aceita com ajustes: foram criados testes utilizando mocks para contexto e dependências da tela de despesas. Também foram feitas adaptações na tela de ranking para compatibilidade com o novo fluxo de despesas. Alguns mocks precisaram ser refinados manualmente para refletir corretamente o comportamento esperado da aplicação.

**Prompt 2: Cobertura de testes para a tela de missões**
> "me instrua a adicionar cobertura de testes Jest para a tela de missões. Preciso que você crie/atualize `_tests_/index.test.tsx`, configure `jest.config.js` e `jest.setup.ts`, e ajuste o `package.json` para rodar o Jest corretamente"

Resposta aceita: foram adicionadas configurações de ambiente para execução dos testes com Jest, incluindo ajustes no `jest.config.js`, `jest.setup.ts` e scripts do `package.json`. Também foi criada cobertura inicial de testes para a tela de missões em `_tests_/index.test.tsx`.

**Prompt 3: Melhorias na tela principal**
> "me ajude a melhorar a tela principal do app no arquivo `app/(tabs)/index.tsx`, adicionando as alterações de interface e comportamento necessárias para a nova versão"

Resposta aceita com ajustes: a IA auxiliou na reorganização da interface e na implementação de melhorias visuais e comportamentais da tela principal. Parte das alterações foi refinada manualmente para manter consistência com o restante da aplicação e adequação ao layout final definido pelo grupo.

## Eduardo Bertozzi

**Prompt 1: Estrutura inicial do app**
> "Preciso criar a estrutura inicial de um app de gerenciamento de repúblicas estudantis em React Native com Expo. Quais telas e contextos de estado global eu deveria considerar desde o início?"

Resposta aceita com ajustes: a IA sugeriu uma estrutura com Context API para estado global, telas separadas por funcionalidade e AsyncStorage para persistência. A estrutura foi adaptada ao tema Zelda e às necessidades específicas do grupo.

**Prompt 2: Escolha do CI/CD para Expo**
> "Quais são as diferenças entre usar EAS Build com CircleCI e outras alternativas para um projeto Expo React Native? Qual é mais recomendado para um app em estágio de desenvolvimento acadêmico?"

Resposta aceita: a IA explicou as vantagens do EAS Build integrado ao CircleCI, sem necessidade de infraestrutura própria e com suporte nativo ao ecossistema Expo. O grupo adotou essa combinação para o pipeline da NP2.

**Prompt 3: Boas práticas com Expo Router**
> "Estou desenvolvendo um app em React Native com Expo. Quais são as melhores práticas para estruturar a navegação entre telas usando expo-router?"

Resposta aceita com ajustes: a IA sugeriu o uso de layouts aninhados com `_layout.tsx` e navegação por tabs. A estrutura foi aplicada e adaptada ao fluxo de onboarding e às abas principais do RepQuest.

## Rafael Braga
**Prompt 1 - Pair Programming testes com mock**
> "Atue como Engenheiro Sênior especializado em Testes e QA. Você fará pair programming comigo para desenvolver testes utilizando mock para testar as funcionalidades do `_layout.tsx`. Gere uma estrutura genérica para eu entender como implementar exatamente o que preciso testar e depois seguimos com a execução, se der algum erro te envio e você auxilia a corrigir."

Resposta aceita: Não entregou código pronto e realmente atuou como um sênior auxiliando a desenvolver os testes corretamente.

**Prompt 2 - Estrutura e aperfeiçoamento da narrativa**
> "Preciso adicionar ao README.md histórias de usuário do meu projeto. Estruture uma seção para isso respeitando: Given/When/Then. Se atente ao tema do projeto, gostaria de uma narrativa de fantasia para combinar com a descrição. Adicione a seguinte história de usuário, as outras serão implementadas posteriormente: *Como* usuário do aplicativo, *quero* utilizar uma barra de navegação para transitar entre as páginas principais *para* que eu possa acessar as ferramentas com experiência fluida e feedbacks."

Resposta aceita com ajustes: a IA além da estrutura criou outras histórias de uso genéricas que não eram adequadas ao projeto. 

**Prompt 3 - Pair Programming branch coverage**
> "Atue como um Engenheiro de Software Sênior e um Especialista em Testes Automatizados. A partir de agora, nós vamos fazer uma sessão de pair programming. Acabei de receber um feedback do meu time indicando que a branch coverage do meu componente está baixa. Meu objetivo é atingir, se possível, 100% de coverage nesse arquivo: `_layout.tsx`. Encaminharei os testes que já tenho: `_layout.test.tsx` e gere o relatório de coverage atual. A partir do relatório iniciamos a sessão, oriente para os pontos que faltam testes, mas não refatore o código de vez."

Resposta aceita: Não entregou código pronto e realmente atuou como um sênior auxiliando a cobrir ~100% da branch.

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
**Prioridade:** Alta | **Status:** Entregue
**Rastreabilidade:** PR #7 (`feat(tabs): adiciona layout`) -> PR #9 (`test: adiciona testes unitários para o Layout`) -> [`__tests__/_layout.test.tsx`](__tests__/_layout.test.tsx)

**Como** usuário do aplicativo, **quero** utilizar uma barra de navegação para transitar entre as páginas principais **para** que eu possa acessar as ferramentas com experiência fluida e feedbacks.
- **Given** (Dado que) o aventureiro está com o aplicativo aberto na interface principal.
- **When** (Quando) ele toca em um dos ícones sagrados na barra de navegação inferior.
- **Then** (Então) o sistema exibe a relíquia (página) correspondente com uma transição suave, alterando o estado visual do ícone para indicar a aba ativa.

---

### 📜 Conto 2: O Mural das Quests
**Prioridade:** Alta | **Status:** Entregue
**Rastreabilidade:** PR #4 (`Adiciona página de despesas`) -> PR #10 (`test: adiciona testes unitarios para a pagina despesas`) -> [`__tests__/index.test.tsx`](__tests__/index.test.tsx)

**Como** morador da república, **quero** visualizar e completar tarefas registradas no mural da casa **para** que eu receba rúpias como recompensa e meu progresso seja reconhecido pelo grupo.
- **Given** (Dado que) o morador acessa a aba "Mural da Casa" e há missões ativas.
- **When** (Quando) ele toca no botão de completar uma missão.
- **Then** (Então) a missão é removida da lista, o saldo de rúpias é atualizado automaticamente e uma notificação de recompensa é exibida com o valor ganho.

---

### 📜 Conto 3: O Tesouro da República
**Prioridade:** Alta | **Status:** Entregue
**Rastreabilidade:** PR #4 (`Adiciona página de despesas`) -> PR #13 (`test: aplica mocks nos testes unitarios da pagina de despesas`) -> [`__tests__/despesas.test.tsx`](__tests__/despesas.test.tsx)

**Como** morador da república, **quero** registrar e visualizar as despesas compartilhadas **para** que todos os moradores saibam quanto devem e o controle financeiro da casa seja transparente.
- **Given** (Dado que) o morador acessa a aba "Despesas".
- **When** (Quando) ele registra uma nova despesa com descrição e valor.
- **Then** (Então) a despesa aparece na lista, o total geral é recalculado e o saldo de rúpias do morador é descontado proporcionalmente.

---

### 📜 Conto 4: O Altar de Hyrule
**Prioridade:** Média | **Status:** Entregue
**Rastreabilidade:** PR #5 (`Adicionando alteração na pasta tabs, ranking.tsx`) -> PR #11 (`test: implementa testes unitários de ordenação, empate, exibição e loading na tela de Ranking`) -> [`__tests__/ranking.test.tsx`](__tests__/ranking.test.tsx)

**Como** morador da república, **quero** visualizar um ranking dos moradores ordenado por rúpias acumuladas **para** que haja uma competição saudável e me sinta motivado a completar mais tarefas.
- **Given** (Dado que) o morador acessa a aba "Ranking".
- **When** (Quando) a tela carrega os dados dos moradores.
- **Then** (Então) os moradores são exibidos em ordem decrescente de rúpias, com o primeiro lugar recebendo destaque visual de troféu e cor dourada.

---

### 📜 Conto 5: A Jornada do Herói (Onboarding)
**Prioridade:** Alta | **Status:** Entregue (parcial: código de convite exibido, validação real não implementada)
**Rastreabilidade:** PR #1 (`feat: implementado fluxo de onboarding, gestão de membros e configurações`) -> fluxo validado manualmente

**Como** novo usuário, **quero** criar uma república ou entrar em uma existente via código de convite **para** que eu possa me integrar ao sistema com o papel correto de administrador ou morador.
- **Given** (Dado que) o usuário abre o aplicativo pela primeira vez e acessa o fluxo de onboarding.
- **When** (Quando) ele escolhe "Fundar República" e insere um nome, ou "Entrar numa Vila" e insere o código de convite.
- **Then** (Então) o administrador é direcionado à tela de sucesso com o código gerado; o morador é redirecionado diretamente ao Mural da Casa.

---

### 📜 Conto 6: O Códice do Herói (Perfil)
**Prioridade:** Média | **Status:** Entregue
**Rastreabilidade:** PR #6 (`feat: adiciona tela Perfil`) -> PR #22 (`refactor: torna nome e avatar dinamicos`) -> PR #23 e PR #28 -> [`__tests__/perfil.test.tsx`](__tests__/perfil.test.tsx)

**Como** morador, **quero** visualizar meu perfil com nível, rúpias totais e conquistas desbloqueadas **para** que eu acompanhe minha evolução na república e sinta que minhas contribuições são reconhecidas.
- **Given** (Dado que) o morador acessa a aba "Perfil".
- **When** (Quando) a tela é carregada.
- **Then** (Então) o sistema exibe o nome e avatar do usuario carregados do contexto global, o nível calculado a partir das rúpias acumuladas, a barra de progresso para o próximo nível e os badges desbloqueados conforme o nível atingido.

---

### 📜 Conto 7: O Painel do Patriarca (Gestão de Membros)
**Prioridade:** Média | **Status:** Entregue
**Rastreabilidade:** PR #1 (`feat: implementado fluxo de onboarding, gestão de membros`) -> PR #24 (`test: adiciona testes unitarios para tela de GestaoMembros`) -> [`__tests__/gestao-membros.test.tsx`](__tests__/gestao-membros.test.tsx)

**Como** administrador da república, **quero** visualizar todos os moradores e remover membros que saíram **para** que a lista esteja sempre atualizada e o código de convite seja controlado.
- **Given** (Dado que) o administrador acessa o painel de gestão de membros.
- **When** (Quando) ele pressiona o botão de expulsar ao lado de um morador.
- **Then** (Então) um alerta de confirmação é exibido e, ao confirmar, o morador é removido da lista imediatamente sem necessidade de recarregar a tela.

---

### 📜 Conto 8: A Forja da Identidade (Editar Perfil)
**Prioridade:** Média | **Status:** Entregue
**Rastreabilidade:** PR #22 (`refactor: torna nome e avatar dinamicos`) -> PR #24 (`test: adiciona testes unitarios para tela de EditarPerfil`) -> [`__tests__/editar-perfil.test.tsx`](__tests__/editar-perfil.test.tsx)

**Como** morador, **quero** editar meu nome e avatar **para** que minha identidade na república reflita quem eu sou e seja reconhecida por todos os outros moradores em todas as telas.
- **Given** (Dado que) o morador acessa a tela de edição de perfil.
- **When** (Quando) ele altera o nome no campo de texto, seleciona um novo avatar e pressiona "GRAVAR NA PEDRA".
- **Then** (Então) o nome e o avatar são atualizados no contexto global e persistidos via AsyncStorage, refletindo imediatamente no ranking, no perfil e na gestão de membros.

---

## 🗂️ Metodologia de Desenvolvimento

O grupo adotou uma abordagem **Kanban informal**, sem sprints fixos ou cerimônias de Scrum. A escolha foi motivada pela natureza assíncrona do trabalho acadêmico: cada integrante contribuía conforme sua disponibilidade, e o progresso era contínuo em vez de dividido em iterações fechadas.

### Kanban na Pratica

O GitHub funcionou como nosso quadro Kanban. Cada Pull Request representava uma tarefa passando pelos estados:

```
Em desenvolvimento (branch pessoal)  -->  Em revisao (PR aberto)  -->  Concluido (mergeado no main)
```

A evolucao incremental do pipeline e a evidencia mais clara do Kanban em acao: cada job foi uma tarefa independente que passou exatamente por esses tres estados, entregue via PR individual sem bloquear o trabalho dos outros membros.

| PR | Quem | Tarefa entregue |
|---|---|---|
| #16 | Gabriel | Job base `install-dependencies` + estrutura do CircleCI |
| #17 | Gabriel | `eas.json` com perfis de build Android |
| #19 | Samile | Job `security-audit` |
| #20 | Guilherme | Job `lint` |
| #26 | Rafael | Job `type-check` |
| #30 | Daniele | Job `run-tests` |
| #35 | Gabriel | Fix EACCES + TypeScript + audit level |
| #37 | Gabriel | Job `eas-build-android` funcional com EXPO_TOKEN correto |

### Papeis e Responsabilidades

Nao adotamos papeis formais (PO, Scrum Master, QA dedicado). A divisao emergiu organicamente conforme as habilidades e afinidades de cada membro:

| Integrante | Contribuicao principal |
|---|---|
| Eduardo Bertozzi | Idealizador do projeto, arquitetura (Context API, AsyncStorage), telas de onboarding e gestao de membros, job CI `eas-build-android` |
| Gabriel Morass | Estrutura do pipeline CircleCI, testes de 6 telas, refactoring do RepContext, documentacao tecnica |
| Guilherme Almeida | Melhorias na tela principal (index.tsx), testes de missoes e despesas, job CI `lint` |
| Rafael Braga | Layout de navegacao (HUD/tabs), testes do _layout com 100% de cobertura, job CI `type-check` |
| Daniele Leticia | Tela de ranking, testes unitarios do ranking, job CI `run-tests` |
| Samile Barbosa | Tela de perfil, testes unitarios do perfil, job CI `security-audit` |

### Tomada de Decisao

As decisoes tecnicas centrais foram discutidas em grupo via WhatsApp. Exemplos:

- **Context API vs Redux:** Redux foi descartado por exigir boilerplate desproporcional para a complexidade do estado do app. Context API nativa resolve sem dependencia extra. Decisao tomada pelo Eduardo na estrutura inicial do projeto.
- **CircleCI vs GitHub Actions:** GitHub Actions foi descartado por ser proibido pelo enunciado. CircleCI foi escolhido por nao exigir servidor proprio e ter suporte nativo ao Expo. Decisao tomada pelo Gabriel ao configurar o pipeline.
- **AsyncStorage vs SQLite:** os dados do app sao simples (numeros e arrays JSON). SQLite seria desproporcional para esse volume e estrutura. AsyncStorage resolve com uma API mais simples e sem configuracao nativa adicional.
- **EAS Build com `--no-wait` vs aguardar o build:** o build Android leva 15-25 minutos. Aguardar no pipeline bloquearia todos os PRs do grupo durante esse tempo e consumiria o plano gratuito do CircleCI. A decisao foi usar `--no-wait` para disparar o build e retornar imediatamente, acompanhando o resultado no painel do expo.dev. O objetivo do job e provar que a configuracao esta correta (token, credenciais, eas.json) — nao compilar em tempo real a cada PR. Decisao tomada pelo Gabriel no PR #37.

### Ferramentas e Cadencia

- **Comunicacao:** WhatsApp para decisoes rapidas e alinhamentos entre os membros.
- **Versionamento:** GitHub com uma branch por integrante e PRs obrigatorios para merge no main.
- **CI/CD:** CircleCI com 1 job por integrante, adicionados incrementalmente via Pull Request.
- **Revisao de codigo:** Pull Requests com ao menos 1 aprovacao antes do merge.

### Definicao de Pronto (DoD)

Uma contribuicao era considerada pronta quando:
1. O codigo estava commitado na branch do integrante com mensagem descritiva.
2. Um Pull Request foi aberto para a branch `main`.
3. Os testes passavam localmente (quando aplicavel ao tipo de contribuicao).
4. Ao menos um outro membro revisou o PR antes do merge.

Na pratica, o criterio de testes foi aplicado rigorosamente para commits de codigo. Commits de documentacao e CI foram revisados semanticamente, sem exigir execucao de testes.

**Exemplo concreto:** o PR #35 foi aberto com 3 commits corrigindo erros de TypeScript e o nivel do security-audit. O PR so foi mergeado depois que o pipeline verde confirmou que todos os jobs passavam — nenhum membro aprovou manualmente sem essa evidencia automatica.

### Metricas do Projeto

| Metrica | Valor |
|---|---|
| Pull Requests mergeados | 39 |
| Branches ativas | 6 (uma por integrante) |
| Testes unitarios | 83 (10 suites) |
| Jobs de CI/CD | 6 (install, lint, type-check, security-audit, run-tests, eas-build) |
| Cobertura de statements | 91% |
| Historias de usuario | 8 (com Given/When/Then e rastreabilidade) |
| Commits no main | 123+ |

---

## 🔄 Dinâmica de Desenvolvimento

### Principal desafio

O maior bloqueio foi sincronizar o trabalho de 6 pessoas com disponibilidades diferentes. Sem sprints com datas fixas, algumas entregas aguardavam enquanto outras estavam prontas há dias. Um exemplo concreto: o `RepContext` foi criado pelo Eduardo antes de estar documentado, o que dificultou os outros membros para consumir o contexto em seus componentes e testes. Cada um teve que descobrir a API do contexto lendo o código.

### Conflitos e resolução

Tivemos dois conflitos de merge significativos ao longo do projeto:

**Conflito 1 (PR #16):** Dois membros modificaram o README simultaneamente em branches separadas. Resolvido manualmente preservando as contribuições dos dois lados.

**Conflito 2 (PR #31):** A branch da Daniele tinha a versão antiga do `ranking.tsx` com nome hardcoded (`Eduardo Bertozzi`), enquanto o main já tinha o refactoring com `nomeUsuario` dinâmico do PR #22. O conflito gerou marcadores `<<<<<<< HEAD` no arquivo que quebraram os testes com `SyntaxError`. Resolvido mantendo a versão dinâmica e descartando o nome fixo.

A lição prática: atualizar a branch com o main (`git pull origin main`) antes de abrir qualquer PR teria evitado o segundo conflito.

**Conflito 3 — Autenticação do EAS Build (PRs #35, #37):** o job `eas-build-android` falhava com "The bearer token is invalid" mesmo com o token correto configurado no CircleCI. A investigação durou 3 dias e incluiu trocar o token, verificar permissões da conta e testar diferentes formatos. A causa raiz foi inesperada: o bloco `environment: EXPO_TOKEN: $EXPO_TOKEN` no YAML do CircleCI passa o valor literal da string `$EXPO_TOKEN` ao processo, em vez do valor da variável configurada no painel. Removendo o bloco inteiro, o step herda a variável do projeto automaticamente. A lição: ler a documentação de escopo de variáveis de ambiente da ferramenta de CI antes de assumir que a sintaxe funciona como em bash.

### Lições aprendidas

- **Documentar a API do estado global logo no início:** o `RepContext` era a peça central do app, mas a falta de documentação inicial gerou retrabalho. Cada membro teve que descobrir as funções (`ganharRupes`, `gastarRupes`, `setMissoesGlobal`) lendo o código — retrabalho que um README interno ou comentário JSDoc teria evitado. Evidencia: PR #22 precisou atualizar 4 telas de uma vez porque todas consumiam o contexto de formas inconsistentes.
- **Criar o job de CI para testes antes de escrever os testes:** os testes existiam localmente por semanas antes de rodarem automaticamente no CI (job `run-tests` adicionado no PR #30). Problemas de ambiente (ESLint sem globais do Jest, TypeScript sem tipos do Jest) foram identificados com atraso — corrigidos nos PRs #34 e #35.
- **Padronizar Conventional Commits desde o dia 1:** os primeiros commits do projeto usavam mensagens livres (`"Adicionando alteração na pasta tabs"`, `"Atualiza index.tsx"`). A partir do PR #16 o grupo adotou `feat:`, `fix:`, `ci:`, `docs:`, `test:`, `refactor:`. A diferenca na legibilidade do historico e visivel no `git log`.
- **Atualizar a branch com o main antes de abrir PR:** o conflito do `ranking.tsx` (PR #31) teria sido evitado com um `git pull origin main` antes do PR. Depois desse incidente o grupo adotou isso como parte informal do processo antes de qualquer abertura de PR.

---

## 🔧 Refactoring

Ao longo do projeto foram identificados e aplicados refactorings com evidência direta no histórico de commits e PRs:

### 1. Substituição de renderização real por mocks nos testes (Gabriel, PR #13)
**Commit:** `test: aplica mocks nos testes unitarios da pagina de despesas`

Os testes iniciais de despesas instanciavam o `RepProvider` real e dependiam do AsyncStorage. A refatoração substituiu o contexto real por um mock via `jest.mock('../contexts/RepContext')`.

**Motivação:** testes unitários devem ser isolados de dependências externas. Sem mock, qualquer mudança no `RepContext` quebrava testes da tela de despesas sem nenhuma relação com ela, gerando falsa segurança e acoplamento desnecessário.

### 2. Correção de qualidade das asserções de teste (Gabriel, PR #14)
**Commit:** `test: corrige 6 problemas de qualidade nos testes de despesas`

Foram corrigidos 6 problemas identificados em revisão: asserções fracas (`toBeTruthy` substituído por `toEqual` e `toHaveBeenCalledWith`), testes com dependência de ordem de execução e um caso que sempre passava por erro no setup do mock.

**Motivação:** asserções vagas dão falsa segurança. Um teste que sempre passa não testa nada. A refatoração garante que os testes falhem precisamente quando o comportamento real mudar.

### 3. Migração de estado local para Context API global (Eduardo)
**Commit:** `feat: implementando sistema Zonai com Context API e AsyncStorage`

A versão inicial gerenciava rúpias e missões com `useState` local em cada tela. A refatoração criou o `RepContext` com estado global persistido via AsyncStorage, consumido por todas as telas via `useRep()`.

**Motivação:** com 4 telas que precisam do mesmo estado, o prop drilling seria inviável e propenso a inconsistências. O Context API elimina a duplicação e garante que todas as telas sempre exibem o mesmo estado.

### 4. Reorganização modular do pipeline CI (Gabriel, PRs #16 e #17)
**Commit:** `ci: configura pipeline CircleCI + EAS Build e corrige ambiente de testes`

O pipeline foi reestruturado de um job único (`install-dependencies`) para uma arquitetura onde cada membro adiciona seu próprio job via PR, com dependências explícitas entre jobs no `workflow`.

**Motivação:** um pipeline monolítico não permitia contribuições independentes. A arquitetura modular deixa claro quem é responsável por cada etapa e facilita adicionar novos jobs sem conflito entre branches.

### 5. Componentização e melhoria da tela principal (Guilherme, PR #8)
**Commit:** `Atualiza index.tsx (melhorias na tela principal)`

A tela de missões foi refatorada para separar a lógica de negócio da renderização, integrar o `CardDeMissao` como componente reutilizável e adicionar `LayoutAnimation` para transições suaves ao completar missões.

**Motivação:** a versão anterior misturava lógica de UI com lógica de negócio na mesma função. A separação melhora a legibilidade, facilita os testes unitários e torna o `CardDeMissao` reutilizável em outras partes do app.

### 6. Migração de identidade do usuário de hardcoded para Context API (Gabriel, PR #22)
**Commit:** `refactor: torna nome e avatar do usuario dinamicos via RepContext`

O nome `Eduardo Bertozzi` e o avatar `user-astronaut` estavam escritos diretamente no código de quatro telas diferentes: `ranking.tsx`, `perfil.tsx`, `editar-perfil.tsx` e `gestao-membros.tsx`. A refatoração moveu esses dados para o `RepContext`, com persistência via AsyncStorage usando as chaves `@RepQuest:nome` e `@RepQuest:avatar`.

**Motivação:** dados hardcoded tornam o app monousuário e geram inconsistências: alterar o nome em uma tela não refletia nas outras. Com o contexto global, qualquer mudança no perfil propaga automaticamente para todas as telas que consomem `useRep()`.

### 7. Substituição de API depreciada Clipboard por Share (Gabriel, PR #22)
**Commit:** `refactor: torna nome e avatar do usuario dinamicos via RepContext`

A tela de gestão de membros usava `Clipboard` do `react-native` para copiar o código de convite. Essa API foi removida do React Native na versão 0.81.5 usada pelo projeto. A refatoração substituiu por `Share.share()`, que abre o painel nativo de compartilhamento do sistema operacional.

**Motivação:** além da correção técnica necessária (Clipboard removido causaria erro em runtime), `Share` oferece UX superior: o usuário pode copiar, enviar via WhatsApp, e-mail ou qualquer outro app sem sair do RepQuest.

### 8. Expansão da cobertura de branches do layout de navegação (Rafael, PR #26)
**Commit:** `test(layout): adiciona novos testes para garantir maior branch coverage`

Os testes do `_layout.tsx` cobriam apenas o caminho principal de renderização. A refatoração dos testes adicionou casos para branches não cobertos: estado de aba ativa vs inativa, plataforma iOS vs Android (altura do tabBar), hover state do TabButton e accessibilityState indefinido.

**Motivação:** branch coverage de 45% significa que metade das decisões condicionais do componente nunca eram exercidas pelos testes. Com a expansão para 100%, qualquer quebra em qualquer condição do layout é detectada automaticamente no CI.

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
