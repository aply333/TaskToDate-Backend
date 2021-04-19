
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('UNSORTED').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('UNSORTED').insert([
        {
          task_title: "Groceries",
          task_description: "Got to go get food or go hungry.",
          complete: false,
          color: 1,
          user: 1
        },
        {
          task_title: "Taxes",
          task_description: "Uh-oh better do correctly.",
          complete: false,
          color: 2,
          user: 1
        },
        {
          task_title: "Write Code",
          task_description: "Keep those skills sharp.",
          complete: false,
          color: 3,
          user: 1
        },
        {
          task_title: "Groceries",
          task_description: "Got to go get food or go hungry.",
          complete: false,
          color: 1,
          user: 2
        },
        {
          task_title: "Pay Bills",
          task_description: "But I wanna keep my money.",
          complete: false,
          color: 2,
          user: 2
        },
        {
          task_title: "Write Book",
          task_description: "Got storries to tell.",
          complete: false,
          color: 2,
          user: 2
        },
        {
          task_title: "Groceries",
          task_description: "Got to go get food or go hungry.",
          complete: false,
          color: 1,
          user: 3
        },
        {
          task_title: "Taxes",
          task_description: "Uh-oh better do correctly.",
          complete: false,
          color: 2,
          user: 3
        },
        {
          task_title: "Write Code",
          task_description: "Keep those skills sharp.",
          complete: false,
          color: 2,
          user: 3
        },        
      ]);
    });
};
