import knex from 'knex'

const connection = knex({
    client: "mysql",
    connection:{
        host: "127.0.0.1",
        port: 3306,
        user: "professor",
        password: "senhaForte123!",
        database: "atores",
        multipleStatements: true
    }
})

export default connection