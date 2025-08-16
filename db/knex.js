import knex from 'knex';

const connectedKnex = knex({
    client: "sqlite3",
    connection: {
        filename: "budgetsapp3.db"
    },
    useNullAsDefault : true
})

export default connectedKnex;