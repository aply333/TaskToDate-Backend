
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('SORTED').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('SORTED').insert([
        {
          date: "02-25-2021",
          agenda_title: "Gotta see the doc",
          agenda_description: "I bunged my head, ouch!",
          complete: false,
          color: 1,
          user:1
        },
        {
          date: "03-10-2021",
          agenda_title: "Concert",
          agenda_description: "Gotta rock out.",
          complete: false,
          color: 2,
          user:1
        },
        {
          date: "04-15-2021",
          agenda_title: "Club Meeting",
          agenda_description: "Groups zoom meeting, for reasons.",
          complete: false,
          color: 3,
          user:1
        },
        {
          date: "02-25-2021",
          agenda_title: "Gotta see the doc",
          agenda_description: "I bunged my head, ouch!",
          complete: false,
          color: 1,
          user:2
        },
        {
          date: "03-10-2021",
          agenda_title: "Concert",
          agenda_description: "Gotta rock out.",
          complete: false,
          color: 2,
          user:2
        },
        {
          date: "04-15-2021",
          agenda_title: "Club Meeting",
          agenda_description: "Groups zoom meeting, for reasons.",
          complete: false,
          color: 3,
          user:2
        },
        {
          date: "02-25-2021",
          agenda_title: "Gotta see the doc",
          agenda_description: "I bunged my head, ouch!",
          complete: false,
          color: 1,
          user:3
        },
        {
          date: "03-10-2021",
          agenda_title: "Concert",
          agenda_description: "Gotta rock out.",
          complete: false,
          color: 2,
          user:3
        },
        {
          date: "04-15-2021",
          agenda_title: "Club Meeting",
          agenda_description: "Groups zoom meeting, for reasons.",
          complete: false,
          color: 3,
          user:3
        },
      ]);
    });
};
