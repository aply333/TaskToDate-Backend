const bcrypt = require('bcryptjs');

const user0hash = bcrypt.hashSync('user0hash', 12);
const user1hash = bcrypt.hashSync('user1hash', 12);
const user2hash = bcrypt.hashSync('user2hash', 12);

// Note for testing: changeing password | postPassChange or bingo
//                 : changeing email    | postChange@man.com

exports.seed = function(knex) {
  return knex('USERS').truncate()
    .then(function () {
      return knex('USERS').insert([
        {
          username: 'testUser0',
          hash: user0hash,
          email: 'testUser0@test.com'
        },
        {
          username: 'testUser1',
          hash: user1hash,
          email: 'testUser1@test.com'
        },
        {
          username: 'testUser2',
          hash: user2hash,
          email: 'testUser2@test.com'
        }
      ]);
    });
};
