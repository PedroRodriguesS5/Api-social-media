CREATE TABLE usuario(
    id serial primary key,
    nome text,
    foto text,
    username text not null unique,
    email text unique,
    site text,
    bio text,
    telefone text,
    genero text,
    verified boolean default false,
    password text not null
);

CREATE TABLE postagens(
	id serial primary key,
    usuario_id int not null references usuario(id),
    data timestamptz default now(),
    texto text
);

CREATE TABLE postagem_foto(
	id serial primary key,
    postagem_id int not null references postagens(id),
    img text not null
);

CREATE TABLE postagem_comentarios(
	id serial primary key,
    texto text not null,
    data timestamptz default now(),
    usuario_id int not null references usuario(id),
    postagem_id int not null references postagens(id)
);

CREATE TABLE postagem_curtidas(
	usuario_id int not null references usuario(id),
    postagem_id int not null references postagens(id),
    data timestamptz default now()
);

