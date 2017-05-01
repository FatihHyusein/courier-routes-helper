export function up(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('users', (table) => {
            table.increments();
            table.timestamps();
            table.string('username').unique();
            table.string('password');
        }),

        knex.schema.createTable('authTokens', (table) => {
            table.increments();
            table.timestamps();
            table.string('username').unique();
            table.string('token');
        }),
    ]);
}

export function down(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('users'),
        knex.schema.dropTable('authTokens')
    ]);
}
