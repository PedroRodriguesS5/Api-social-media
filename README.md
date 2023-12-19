## O que o usuário pode fazer:

### First View

- Fazer login ;
- Se cadastrar ;

Update page Info User Views

- Atualizar o nome de usuário e nome;
- ver os seus dados de perfil;
- mudar a foto de usuário;
- Colocar numero de telefone, email, gênero, website, biography

Home page User Views

- ver os posts;
    - Ver comentários de uma postagem;
    - Ver quantidade de curtidas;
- Curtir posts;
- Comentar em postagens;
- Postar fotos;

---

## O que o usuário não pode fazer

- Curtir comentários;
- Pesquisar usuários ou postagens;
- Ver a localização da postagem;
- Ver quem curtiu as postagens;
- Comentar um comentários;
- Redefinir a senha;

---

## Endpoints

- Login → Post;

Dados Enviados:

- E-mail;
- Password

Dados Retornados:

- Sucesso/ Erro;

Objetivos gerais:

- Validar username e senha;
- Buscar o usuário no DB;
- Verificar a autenticação da senha;
- Gerar o token para o usuário poder acessar as informações  e páginas que precisam do token

---

- Cadastro → Post;

Dados Enviados:

- username;
- Senha;

Dados Retornados:

- Sucesso/ Erro;

Objetivos gerais:

- Salvar as informações passadas pelo usuário no DB;
- Verificar se o username ja existe;
- criptografar a senha do usuário;

---

### Endpoint de perfil

- Dados do usuários  → GET:

Dados Enviados:

- Token

Dados Retornados:

- URL da foto;
- Nome;
- E-mail;
- username;
- biografia;
- website;
- telefone;
- gênero

Objetivos Gerais:

- Validar o token de autenticação;
- Buscar os dados do usuário com autenticação do token;
- Retornar os dados do usuário;.\

---

- Dados do usuário → Put;

Dados Enviados:

- Token

Dados Retornados:

- URL da foto;
- Nome;
- E-mail;
- username;
- biografia;
- website;
- telefone;
- gênero
- Dados Atualizados;

Objetivos Gerais:

- Validar  o token do usuário;
- Buscar o cadastro do usuário com a autenticação do token;
- Exigir ao menos uma alteração;
- Criptografar a senha caso seja informada;
- Verificar o e-mail e username caso já exista no banco de dados;
- Atualizar o registro do usuário no DB;
- Sucesso /Erro;

---

## Endpoints home Page

- Posts → GET

Dados Enviados:

- Token;
- Offset;

Dados Retornados:

- Postagens []
    - id postagem
    - Usuários;
    - Condição se foi curtido pelo usuário
        - URL da foto;
        - username;
        - é perfil oficial;
    - Foto []
    - Quantidade de Curtidas;
    - Comentários []
        - Username;
        - texto
    - Data da postagem;
    
    Objetivos Gerais:
    
    - Validar o token
    - Buscar o cadastro do usuário com a autenticação do token;
    - Retornar as postagens dos outros usuários;
    

---

## Endpoints like - POST

Dados Retornados:

- Token;
- id da postagem;
- Texto da postagem;
- Array de imagens;

Dados Enviados:

- Sucesso/erro;

Objetivos Gerais: 

- Validar o token;
- Buscar o cadastro do usuário com a autenticação do token;
- Exigir ao menos uma foto no array;
- Cadastrar postagem para o usuário logado;
- Cadastro das fotos da postagem;
- Sucesso / erro;

---

## Endpoints like - POST

Dados Retornados:

- Token
- id da postagem

Dados Enviados:

- Sucesso/erro;

Objetivos Gerais: 

- Validar o token;
- Buscar o cadastro do usuário com a autenticação do token;
- Sucesso / erro;

Objetivos  Gerais :

- Validar o token;
- Buscar o cadastro do usuário com a autenticação do token;
- Buscar o cadastro da  postagem com o id informado;
- Verificar se o usuário já curtiu a postagem;
- Cadastrar a curtida;
- Sucesso/ erro;

---

## Endpoints disLike- POST

Dados Retornados:

- Token
- id da postagem;

Dados Enviados:

- Sucesso/erro;

Objetivos gerais:

- Validar o token;
- Buscar o cadastro do usuário com a autenticação do token;
- Buscar o cadastro da  postagem com o id informado;
- Verificar se o usuário já curtiu a postagem;
- Descadastrar a curtida;
- Sucesso/ erro;

---

## Endpoints Comentario- POST

Dados Retornados:

- Token
- id da postagem;
- Texto comentário;

Dados Enviados:

- Sucesso/erro;

Objetivos Gerais:

- Validar o token;
- Buscar o cadastro do usuário com a autenticação do token;
- Validar o texto;
- Buscar a postagem pelo id informado;
- Cadastrar comentário;
- Sucesso / Erro;