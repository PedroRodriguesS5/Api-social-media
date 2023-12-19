import knex from 'knex';

const knexConnection = knex({
    client: 'pg',
    connection: {
        host: 'localhost',
        port: 5432,
        user: 'postgres',
        password: 'Macaco584@',
        database: 'mini_insta'
    }
});

export { knexConnection };