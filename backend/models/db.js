import knex from 'knex';

const db = knex({
  client: 'sqlite3',
  connection: {
    filename: './ecommerce.db',
  },
  useNullAsDefault: true,
});

await db.schema.hasTable('users').then(exists => {
  if (!exists) {
    return db.schema.createTable('users', table => {
      table.increments('id').primary();
      table.string('username').unique();
      table.string('password');
    });
  }
});

await db.schema.hasTable('categories').then(exists => {
  if (!exists) {
    return db.schema.createTable('categories', table => {
      table.increments('id').primary();
      table.string('name');
      table.integer('itemCount');
      table.string('imageUrl');
    });
  }
});

export default db;
