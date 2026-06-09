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

- **CircleCI:** executa lint e verificação de tipos TypeScript a cada push.
- **EAS Build (Expo Application Services):** compila o APK Android na nuvem do Expo após todas as verificações passarem.

Cada integrante é responsável por um job do pipeline, commitado na sua própria branch via Pull Request.

---

## 🤖 Uso de IA

O grupo utilizou ferramentas de IA como apoio ao longo do desenvolvimento. O uso foi transparente e supervisionado: todo código gerado foi revisado, testado e adaptado pelo grupo antes de ser integrado ao projeto.

### Modelos utilizados

- **Claude (Anthropic):** via Claude Code (extensão no VS Code)
- **ChatGPT (OpenAI):** via interface web
- **Codex (OpenAI):** via ChatGPT (extensão do VS Code)

### Para que foram usados

- Geração de testes unitários com mocks para React Native
- Configuração do pipeline CircleCI + EAS Build
- Debugging de erros de configuração (ESLint, TypeScript, dependências Expo)
- Refatoração de componentes e hooks
- Revisão de código e sugestões de melhoria

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
**Rastreabilidade:** PR #1 (`feat: implementado fluxo de onboarding, gestão de membros e configurações`) -> sem teste automatizado

**Como** novo usuário, **quero** criar uma república ou entrar em uma existente via código de convite **para** que eu possa me integrar ao sistema com o papel correto de administrador ou morador.
- **Given** (Dado que) o usuário abre o aplicativo pela primeira vez e acessa o fluxo de onboarding.
- **When** (Quando) ele escolhe "Fundar República" e insere um nome, ou "Entrar numa Vila" e insere o código de convite.
- **Then** (Então) o administrador é direcionado à tela de sucesso com o código gerado; o morador é redirecionado diretamente ao Mural da Casa.

---

### 📜 Conto 6: O Códice do Herói (Perfil)
**Prioridade:** Média | **Status:** Entregue (parcial: perfil exibe dados do contexto global, nome fixo ainda não editável com persistência)
**Rastreabilidade:** PR #6 (`feat: adiciona tela Perfil`) -> sem teste automatizado

**Como** morador, **quero** visualizar meu perfil com nível, rúpias totais e conquistas desbloqueadas **para** que eu acompanhe minha evolução na república e sinta que minhas contribuições são reconhecidas.
- **Given** (Dado que) o morador acessa a aba "Perfil".
- **When** (Quando) a tela é carregada.
- **Then** (Então) o sistema exibe o nível calculado a partir das rúpias acumuladas, a barra de progresso para o próximo nível e os badges desbloqueados conforme o nível atingido.

---

## 🗂️ Metodologia de Desenvolvimento

O grupo adotou uma abordagem **Kanban informal**, sem sprints fixos ou cerimônias de Scrum. A escolha foi motivada pela natureza assíncrona do trabalho acadêmico: cada integrante contribuía conforme sua disponibilidade, e o progresso era contínuo em vez de dividido em iterações fechadas.

### Papéis e Responsabilidades

Não adotamos papéis formais (PO, Scrum Master, QA dedicado). A divisão emergiu organicamente conforme as habilidades e afinidades de cada membro:

| Integrante | Contribuição principal |
|---|---|
| Eduardo Bertozzi | Idealizador do projeto, arquitetura (Context API, AsyncStorage), telas de onboarding e gestão de membros, job CI `eas-build-android` |
| Gabriel Morass | Estrutura do pipeline CircleCI, testes das telas de despesas e missões, documentação técnica |
| Guilherme Almeida | Melhorias na tela principal (index.tsx), testes de missões e despesas, job CI `lint` |
| Rafael Braga | Layout de navegação (HUD/tabs), testes do _layout, job CI `type-check` |
| Daniele Letícia | Tela de ranking, testes unitários do ranking |
| Samile Barbosa | Tela de perfil |

### Ferramentas e Cadência

- **Comunicação:** WhatsApp para decisões rápidas e alinhamentos entre os membros.
- **Versionamento:** GitHub com uma branch por integrante e PRs obrigatórios para merge no main.
- **CI/CD:** CircleCI com 1 job por integrante, adicionados incrementalmente via Pull Request.
- **Revisão de código:** Pull Requests com ao menos 1 aprovação antes do merge.

### Definição de Pronto (DoD)

Uma contribuição era considerada pronta quando:
1. O código estava commitado na branch do integrante com mensagem descritiva.
2. Um Pull Request foi aberto para a branch `main`.
3. Os testes passavam localmente (quando aplicável ao tipo de contribuição).
4. Ao menos um outro membro revisou o PR antes do merge.

### Métricas do Projeto

| Métrica | Valor |
|---|---|
| Pull Requests mergeados | 20 |
| Branches ativas | 6 (uma por integrante) |
| Testes unitários | 36 (6 suites) |
| Jobs de CI/CD | 4 (lint, type-check, install, eas-build) |
| Cobertura de statements | 91,6% |

---

## 🔄 Dinâmica de Desenvolvimento

### Como as tarefas foram divididas

Cada integrante assumiu espontaneamente a responsabilidade por uma ou mais partes do aplicativo. As decisões técnicas centrais, como a escolha do Context API sobre Redux, o uso do Expo Router em vez de React Navigation manual e a adoção do CircleCI no lugar do GitHub Actions (proibido pelo enunciado), foram discutidas em grupo via WhatsApp.

### Fluxo de branches e commits

Adotamos um fluxo simples e direto:

```
branch pessoal -> commit -> Pull Request -> revisão -> merge no main
```

- Cada integrante trabalhava exclusivamente em sua branch (nomeada com seu apelido).
- Alguns membros seguiram Conventional Commits (`feat:`, `test:`, `ci:`, `docs:`); outros usaram mensagens livres.
- PRs eram abertos para cada contribuição significativa, garantindo rastreabilidade.

### Principal desafio

O maior bloqueio foi **sincronizar o trabalho de 6 pessoas com disponibilidades diferentes**. Sem sprints com datas fixas, algumas entregas aguardavam enquanto outras estavam prontas há dias. Um exemplo concreto: o `RepContext` (estado global do app) foi criado pelo Eduardo antes de estar totalmente documentado, o que dificultou o trabalho inicial dos demais membros para consumir o contexto em seus próprios componentes e testes.

### Conflitos e resolução

Tivemos conflitos de merge quando membros modificaram áreas próximas do código simultaneamente. O commit `chore: resolve merge conflict in README.md` (PR #16) registra um desses casos, resolvido manualmente preservando as contribuições de ambos os lados.

### Lições aprendidas

- **Definir um backlog antes de começar:** a divisão emergencial funcionou, mas um backlog formal desde o início teria evitado sobreposições e retrabalho.
- **Padronizar commits desde o dia 1:** a mistura de estilos de mensagem dificulta a leitura do histórico e a geração automática de changelogs.
- **Criar o job de CI para testes antes de escrever os testes:** os testes foram escritos sem feedback automático do CI, o que atrasou a identificação de problemas de ambiente.
- **Documentar o estado global logo no início:** o `RepContext` era a peça central do app, mas a falta de documentação inicial gerou retrabalho para os membros que o consumiram depois.

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

---

## 👥 Integrantes

## 👥 Integrantes

| Nome | GitHub |
|------|--------|
| Eduardo Bertozzi | [@EduBertozzi](https://github.com/EduBertozzi) |
| Gabriel Morass | [@gabrielmorass](https://github.com/gabrielmorass) |
| Guilherme Almeida | [@guialmm](https://github.com/guialmm) |
| Rafael | [@rafaelbrx](https://github.com/rafaelbrx) |
| Daniele | [@danieleleticia](https://github.com/danieleleticia) |
| Samile | [@samilebarb](https://github.com/samilebarb) |
