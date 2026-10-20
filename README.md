# Login System

## Sobre o projeto

O **Login System** é uma aplicação web desenvolvida para demonstrar um sistema de cadastro e autenticação de usuários.

O projeto permite realizar cadastro, login e validações de usuários, utilizando **HTML, CSS, JavaScript, Node.js e Express**. As senhas são protegidas com criptografia e a autenticação utiliza **JSON Web Token (JWT)**.

A aplicação também possui **tema claro e escuro**, sistema de notificações por **modal de mensagens**, armazenamento dos usuários em arquivo JSON e uma página inicial após o login.

**Curso de Ciências de Dados**

---

## Análise de dados — Login System Analytics

Além do sistema de cadastro e autenticação descrito neste README, o repositório contém a etapa de análise de dados do projeto **Login System Analytics**, que utiliza dados públicos sobre turmas das Escolas do Futuro de Goiás. As seções abaixo documentam essa parte do projeto sem remover as informações e instruções originais do sistema de login.

### 1. Apresentação

O projeto reúne uma aplicação web de login/cadastro e uma análise exploratória de dados educacionais. A análise organiza informações sobre turmas, vagas e matrículas das Escolas do Futuro de Goiás e apresenta indicadores que podem ser consultados em um dashboard. O objetivo é transformar uma base tabular em informações mais claras para acompanhamento e planejamento.

### 2. Problema investigado

A oferta de turmas, vagas e matrículas não está facilmente organizada para comparação entre escolas, cursos, categorias e anos. O projeto investiga como esses registros se distribuem e como variam ao longo do tempo, destacando diferenças que merecem ser examinadas com mais contexto.

**Pergunta principal:** Como as turmas, as vagas e as matrículas dos cursos das Escolas do Futuro de Goiás estão distribuídas entre escolas, categorias e cursos, e como essa distribuição varia ao longo do tempo?

### 3. Objetivos

**Objetivo geral**

Analisar os registros de turmas das Escolas do Futuro de Goiás e apresentar os principais indicadores em gráficos e em um dashboard de fácil consulta.

**Objetivos específicos**

- Coletar e organizar os dados públicos disponibilizados em arquivos CSV.
- Verificar a estrutura da base, os tipos de dados, valores ausentes e possíveis duplicidades.
- Padronizar campos e preparar uma base tratada para análise.
- Comparar vagas e matrículas por escola, curso, categoria e modalidade.
- Analisar a evolução anual das matrículas no período definido para o estudo.
- Criar gráficos e indicadores para comunicar os resultados.
- Registrar as limitações da base e evitar conclusões que os dados não permitem sustentar.

### 4. Fonte dos dados

- **Instituição responsável:** Secretaria de Estado de Ciência, Tecnologia e Inovação de Goiás (SECTI-GO), por meio do Portal de Dados Abertos do Estado de Goiás.
- **Base:** Turmas das Escolas do Futuro — SECTI, com dados provenientes do Sistema de Gerenciamento Acadêmico das Escolas do Futuro (SIGA).
- **Link:** https://dadosabertos.go.gov.br/dataset/turmas-escolas-do-futuro
- **Período analisado no dashboard:** 2022 a 2025.
- **Formato:** arquivos CSV, separados por ponto e vírgula (`;`).
- **Arquivos do projeto:** `data/dados_original.csv` e `data/dados_tratados.csv`.

A página oficial da base pode receber atualizações. Os resultados descritos neste README correspondem ao recorte e aos arquivos usados nesta versão do projeto, não necessariamente à versão mais recente publicada pelo portal.

### 5. Tecnologias utilizadas

**Análise de dados**

- **Python:** linguagem utilizada nos notebooks de análise.
- **Pandas:** leitura, organização, tratamento, agrupamento e cálculo de indicadores.
- **Matplotlib:** criação de visualizações gráficas.
- **Jupyter Notebook:** documentação e execução das etapas analíticas.
- **CSV e JSON:** armazenamento dos dados tratados e dos dados preparados para o dashboard.

**Aplicação web**

- **HTML5 e CSS3:** estrutura e aparência das páginas.
- **JavaScript:** validações e interações no navegador.
- **Node.js e Express:** servidor e API.
- **bcryptjs:** geração e verificação de hashes de senhas.
- **JSON Web Token (JWT):** token retornado após o login.
- **fs-extra:** leitura e gravação do arquivo JSON de usuários.

### 6. Etapas da análise

1. **Coleta:** obtenção da base pública de turmas das Escolas do Futuro de Goiás.
2. **Diagnóstico:** inspeção das colunas, formatos, tipos de dados, valores ausentes e possíveis duplicidades.
3. **Tratamento:** padronização de campos, conversão de datas e valores numéricos e geração do arquivo tratado.
4. **Análise exploratória:** cálculo de totais, médias, medianas, distribuição e agrupamentos por escola, curso, modalidade e ano.
5. **Visualização:** elaboração de gráficos para facilitar a comparação dos indicadores.
6. **Comunicação:** seleção dos principais insights e organização da mensagem central (Big Idea) para orientar a leitura do dashboard.

Os notebooks relacionados estão na pasta `analysis/`. Materiais complementares, registros das etapas e documentos de storytelling estão na pasta `docs/`.

### 7. Principais descobertas

No recorte de 2022 a 2025 documentado nos materiais de storytelling, os principais resultados são:

- Foram considerados **3.125 registros** e identificadas **1.908 turmas únicas**.
- Foram registradas **70.543 vagas** e **66.092 matrículas**, correspondendo a uma taxa agregada de ocupação de **93,69%**.
- Entre os cursos destacados, **Pacote Office** somou **2.594 matrículas** e **Pilotagem de Drone (VANT)** somou **2.577**.
- A escola **EM ARTES BASILEU FRANÇA** registrou **30.177 matrículas**, enquanto **LUIZ RASSI** registrou **10.322** no recorte consolidado descrito na narrativa do projeto.
- As matrículas registradas por ano foram: **17.154 em 2022**, **20.546 em 2023**, **12.465 em 2024** e **15.927 em 2025**. O total de 2025 ficou 7,15% abaixo de 2022, embora tenha crescido 27,77% em relação a 2024.
- A mediana de matrículas por registro de turma foi **21**, com valores entre **0 e 80**.

Esses números descrevem os registros analisados. As diferenças observadas não demonstram, por si só, as causas da concentração ou das variações anuais. Para interpretar os resultados, é necessário considerar o contexto de cada escola, curso e período.

### 8. Big Idea

**A ocupação geral das vagas é elevada, mas as matrículas não se distribuem igualmente entre cursos e escolas; por isso, o planejamento deve considerar o volume geral, as diferenças entre unidades e a evolução anual, investigando os motivos antes de decidir mudanças.**

O dashboard deve ser usado como instrumento inicial de acompanhamento e discussão, ajudando a identificar perguntas e pontos que merecem investigação adicional — não como prova isolada de demanda ou de necessidade de recursos.

### 9. Como executar

#### Executar a aplicação web

É necessário ter uma versão compatível do **Node.js** e o **npm** instalados.

1. Baixe ou clone o repositório.
2. Abra um terminal na pasta raiz do projeto.
3. Instale as dependências:

   ```bash
   npm install
   ```

4. Inicie o servidor:

   ```bash
   npm start
   ```

5. Acesse `http://localhost:3001` no navegador.

O servidor serve os arquivos do front-end, disponibiliza as rotas de autenticação em `/api` e expõe o arquivo de dados do dashboard em `/data/dados_dashboard.json`.

#### Executar os notebooks de análise

1. Abra a pasta `analysis/` no Jupyter Notebook ou envie os notebooks para o Google Colab.
2. Disponibilize os arquivos CSV necessários no ambiente de execução.
3. Execute as células dos notebooks na ordem apresentada.
4. Confira os caminhos dos arquivos usados nas células e ajuste-os se estiver executando fora da estrutura original do projeto.

Os arquivos `data/dados_original.csv` e `data/dados_tratados.csv` são cópias de referência incluídas no repositório. Para reproduzir exatamente os resultados, utilize os arquivos e o recorte temporal correspondentes à análise documentada.

### 10. Limitações

- A base representa os registros disponíveis e não inclui todas as informações necessárias para explicar as diferenças entre escolas, cursos e anos.
- Não há, nesse conjunto, dados populacionais, demanda potencial, capacidade física das unidades, divulgação dos cursos ou critérios de abertura que permitam explicar os resultados.
- Nos arquivos de referência analisados, foram identificados **502 valores ausentes** em `data_fim` e **502** em `matriculas_aptas`, além de **10** em `carga_horaria` na base completa. Valores ausentes não devem ser interpretados automaticamente como ausência de matrículas.
- A taxa agregada de ocupação é calculada pela relação entre matrículas e vagas; alguns registros ou cursos podem ultrapassar 100% e precisam ser conferidos individualmente.
- Totais de matrículas não equivalem necessariamente à quantidade de pessoas únicas, pois uma pessoa pode estar associada a mais de uma turma.
- A análise descreve padrões e diferenças, mas não comprova relações de causa e efeito.
- O recorte apresentado no dashboard vai de 2022 a 2025 e não deve ser interpretado como uma análise completa de 2026.
- A aplicação web é um projeto acadêmico/demonstrativo. O armazenamento de usuários em arquivo JSON e a configuração atual do JWT não devem ser considerados suficientes para uso em produção sem revisão de segurança e configuração de segredos por variáveis de ambiente.

---

## Funcionalidades

- Cadastro de usuários
- Login de usuários
- Validação de formulários
- Validação de confirmação de senha
- Verificação de e-mail já cadastrado
- Criptografia de senhas
- Validação de e-mail e senha no login
- Autenticação utilizando JWT
- Armazenamento dos usuários em arquivo JSON
- Armazenamento do token de autenticação no navegador
- Botão **Sair** para remover o token armazenado
- Redirecionamento para a página de login após sair
- Tema claro
- Tema escuro
- Sistema de notificações
- Modal reutilizável para mensagens de sucesso e erro
- Mensagem de aviso quando o servidor estiver indisponível
- API REST
- Integração entre Front-End e Back-End

---

## Tecnologias

### Front-End

- HTML5
- CSS3
- JavaScript
- Google Fonts

### Back-End

- Node.js
- Express
- CORS
- bcryptjs
- JSON Web Token (JWT)
- fs-extra
- JSON para armazenamento dos usuários

---

## Estrutura do projeto

```text
Projeto_Login_System/
│
├── backend/
│   ├── database/
│   │   └── users.json
│   │
│   └── routers/
│       └── auth.js
│
├── frontend/
│   ├── CSS/
│   │   ├── style_register.css
│   │   └── styleDark.css
│   │
│   ├── JS/
│   │   ├── continuar.txt
│   │   ├── home.js
│   │   ├── login.js
│   │   ├── modal.js
│   │   ├── register.js
│   │   ├── script.js
│   │   └── theme.js
│   │
│   ├── home.html
│   ├── index.html
│   └── register.html
│
├── node_modules/
│
├── .gitignore
├── Atividades_de_Fixacao.txt
├── explicacao_ferramenta.txt
├── package-lock.json
├── package.json
├── README.md
└── server.js
```

---

## Organização das principais pastas

### `frontend/`

Contém os arquivos responsáveis pela interface da aplicação.

- `index.html` — página de login.
- `register.html` — página de cadastro.
- `home.html` — página inicial após o login.
- `CSS/` — arquivos responsáveis pela estilização das páginas.
- `JS/` — arquivos JavaScript responsáveis pelas funcionalidades da aplicação.

### `backend/`

Contém os arquivos responsáveis pelo servidor, pela API e pela autenticação.

- `database/users.json` — arquivo utilizado para armazenar os dados dos usuários.
- `routers/auth.js` — contém as rotas relacionadas ao cadastro e ao login.

### `server.js`

Responsável por iniciar o servidor Node.js/Express, configurar os recursos necessários e disponibilizar a aplicação.

---

# Como executar

## 1. Clonar o repositório

Clone o projeto utilizando o Git:

```bash
git clone URL_DO_REPOSITORIO
```

> Substitua `URL_DO_REPOSITORIO` pela URL do repositório do projeto no GitHub.

## 2. Entrar na pasta do projeto

```bash
cd Projeto_Login_System
```

## 3. Instalar as dependências

Execute:

```bash
npm install
```

Esse comando instala as dependências definidas no arquivo `package.json`.

## 4. Iniciar o servidor

Execute:

```bash
npm start
```

O servidor utiliza a porta:

```text
3001
```

## 5. Acessar a aplicação

Depois de iniciar o servidor, abra o navegador e acesse:

```text
http://localhost:3001
```

A página de login será carregada.

---

## Sistema de notificações e modal

O projeto possui um sistema de modal reutilizável localizado em:

```text
frontend/JS/modal.js
```

O modal substitui o uso do `alert()` tradicional do navegador e apresenta mensagens de forma padronizada.

As principais mensagens utilizadas são:

- **Cadastro realizado:** "Cadastro realizado com sucesso!"
- **E-mail já cadastrado:** "Email já cadastrado."
- **Senhas diferentes:** "As senhas não coincidem!"
- **Login realizado:** "Login realizado com sucesso."
- **E-mail inexistente:** "Email não cadastrado."
- **Senha incorreta:** "Senha inválida."
- **Servidor indisponível:** mensagem informando que não foi possível conectar ao servidor.

O modal possui:

- Título
- Mensagem
- Botão para fechar/confirmar
- Estilo visual para mensagens de sucesso
- Estilo visual para mensagens de erro
- Cores adaptadas ao tema claro ou escuro

---

## Autenticação

Após um login realizado com sucesso, o sistema recebe um **token JWT** do servidor.

Esse token é armazenado no `localStorage` do navegador para manter a autenticação durante a utilização da aplicação.

O botão **Sair** remove o token armazenado:

```javascript
localStorage.removeItem("token");
```

Depois disso, o usuário é redirecionado para a página de login.

---

## Temas

A aplicação possui dois temas:

- 🌙 Tema escuro
- ☀️ Tema claro

A alteração do tema é controlada pelo arquivo:

```text
frontend/JS/theme.js
```

Os estilos dos temas estão definidos nos arquivos CSS.

O sistema de modal também acompanha o tema selecionado, alterando as cores do fundo, textos e elementos visuais de acordo com o tema da página.

---

## Tratamento de servidor indisponível

As páginas de login e cadastro possuem tratamento de erro para situações em que o servidor não esteja disponível.

Quando não é possível estabelecer conexão com a API, o sistema apresenta uma mensagem utilizando o modal, evitando que o usuário receba apenas um erro no console ou uma mensagem padrão do navegador.

---

# Como utilizar

1. Acesse a página de cadastro em `register.html`.
2. Crie um usuário informando nome, e-mail, senha e confirmação da senha.
3. Após o cadastro, retorne para a página de login.
4. Informe o e-mail e a senha cadastrados.
5. Realize o login.
6. Após a autenticação, o sistema armazena o token JWT e direciona o usuário para a página principal.
7. Na página principal, utilize as funcionalidades disponíveis.
8. Utilize o botão de alteração de tema para alternar entre o modo claro e o modo escuro.
9. Para encerrar a sessão, utilize o botão **Sair**. O token será removido do navegador e o usuário retornará para a página de login.

---

# Demonstração visual

Esta seção apresenta as principais telas e funcionalidades visuais do projeto.
Todas as capturas de tela utilizadas nesta seção estão armazenadas na pasta:

docs/imagens/

### Tela de login

![Tela de Login](docs/imagens/login_escuro.jpeg)

Página utilizada para realizar a autenticação do usuário.

### Tela de cadastro

![Tela de Cadastro](docs/imagens/cadastro_escuro.jpeg)

Página utilizada para criar uma nova conta de usuário.

### Tema dark

![Tema Dark](docs/imagens/login_escuro.jpeg)
![Tema Dark](docs/imagens/cadastro_escuro.jpeg)

Exemplo da aplicação utilizando o tema escuro.

### Tema light

![Tema Light](docs/imagens/login_claro.jpeg)
![Tema Light](docs/imagens/cadastro_claro.jpeg)

Exemplo da aplicação utilizando o tema claro.

### Modal de sucesso

![Modal de Sucesso](docs/imagens/cadastro_realizado_sucesso.jpeg)

Exemplo de mensagem apresentada quando uma operação é realizada com sucesso.

### Modal de erro

![Modal de Erro](docs/imagens/preencher_todos_os_campos.jpeg)

Exemplo de mensagem apresentada quando ocorre algum erro ou validação não atendida.

### Página home

![Página Home](docs/imagens/acesso_no_sistema.jpeg)

Página principal apresentada após o login realizado com sucesso.

---

## Fluxo da aplicação

```text
                    ┌──────────────────┐
                    │   index.html     │
                    │   Página Login   │
                    └────────┬─────────┘
                             │
                  ┌──────────┴──────────┐
                  │                     │
                Login               Cadastro
                  │                     │
                  ▼                     ▼
          ┌──────────────┐      ┌──────────────┐
          │  API Login   │      │ API Cadastro │
          └──────┬───────┘      └──────┬───────┘
                 │                     │
                 ▼                     ▼
          ┌──────────────┐      ┌──────────────┐
          │    JWT       │      │  users.json  │
          └──────┬───────┘      └──────────────┘
                 │
                 ▼
          ┌──────────────┐
          │  home.html   │
          │ Página inicial│
          └──────┬───────┘
                 │
                 ▼
              [ Sair ]
                 │
                 ▼
          Remove o token
                 │
                 ▼
            index.html
```

---

## API REST

O Back-End disponibiliza rotas para realizar as operações de autenticação e cadastro.

As requisições são realizadas pelo Front-End utilizando `fetch()` e comunicação no formato JSON.

O servidor da aplicação é executado localmente na porta:

```text
3001
```

---

## Autor

**Carlos Henrique Duarte**

**Curso Técnico em Ciências de Dados**  
**Escola do Futuro Paulo Renato de Souza**  
**Professor: Heraclides Mourão**

---

## Observações

Para utilizar o sistema corretamente, o servidor Node.js deve estar em execução.

Caso o servidor esteja desligado ou indisponível, as páginas de login e cadastro apresentam uma mensagem de erro através do modal.

O diretório `node_modules/` contém as dependências instaladas pelo npm e não precisa ser versionado no Git quando estiver configurado no `.gitignore`.
