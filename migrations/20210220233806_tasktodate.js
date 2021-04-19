
exports.up = function(knex) {
  return knex.schema
    .createTable('COLORS', table =>{
        table.increments('color_id')
        table.string('color_name', 24)
        table.string('colorhex', 9)
        table.string('pallete_name', 24)
    })
    .createTable('USERS', table =>{
        table.increments('user_id')
        table.string('username', 24)
            .notNullable()
        table.string('hash')
            .notNullable()
        table.string('email')
            .unique()
            .notNullable()
    })
    .createTable('UNSORTED', table =>{
        table.increments('task_id')
        table.string('task_title', 42)
        table.string('task_description')
        table.boolean('complete')
        table.integer('color')
        table.foreign('color')
            .references('color_id')
            .inTable('COLORS')
        table.integer('user')
        table.foreign('user')
            .references('user_id')
            .inTable('USERS')
    })
    .createTable('SORTED', table =>{
        table.increments('agenda_id')
        table.string('date')
        table.string('agenda_title', 42)
        table.string('agenda_description')
        table.boolean('complete')
        table.integer('color')
        table.foreign('color')
            .references('color_id')
            .inTable('COLORS')
        table.integer('user')
        table.foreign('user')
            .references('user_id')
            .inTable('USERS')
    })
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('SORTED')
        .dropTableIfExists('UNSORTED')
        .dropTableIfExists('USERS')
        .dropTableIfExists('COLORS')
};
