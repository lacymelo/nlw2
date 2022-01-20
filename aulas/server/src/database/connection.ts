import knex from "knex";
import path from 'path';

//migrations: controlam as versões do banco de dados

const db = knex({
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'database.sqlite')
    },

    //passo null para campos não preenchidos (não obrigatórios)
    useNullAsDefault: true,
});

export default db;