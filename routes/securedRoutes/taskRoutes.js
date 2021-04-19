const express = require("express");
const router = express.Router();
const tasks = require("../../database/models/unsorted_models");

router.route("/where").get((req, res) => {
  res.status(200).json({ location: "At task routes root." });
});

router.route("/detailed/:user_id").get(async (req, res) => {
  try {
    let user_id = req.params.user_id;
    let detailedTasks = await tasks.queryDetailedTasks(user_id);
    res.status(200).json(detailedTasks);
  } catch (err) {
    res
      .status(404)
      .json({ error: "Failed to get on route level.", details: err });
  }
});

router.route("/newTask").post(async (req, res) => {
  try {
    let { newTask } = req.body;
    let newTasks = await tasks.insertTask(newTask);
    res.status(200).json(newTasks);
  } catch (err) {
    res
      .status(503)
      .json({ error: "Failed to post on route level.", details: err });
  }
});

router.route("/taskChange/:user_id").put(async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const { task_id, putTask } = req.body;
    let updatedTasks = await tasks.updateTask(task_id, user_id, putTask);
    res.status(200).json(updatedTasks);
  } catch (err) {
    res
      .status(503)
      .json({ error: "Failed to post on route level", details: err });
  }
});

router.route("/taskRemove/:user_id/:task_id").delete(async (req, res) => {
  try {
      const user_id = req.params.user_id;
      const task_id = req.params.task_id;
      let shrunkAgenda = await tasks.deleteTask(task_id, user_id)
      res.status(200).json(shrunkAgenda)
  } catch (err) {
    res
      .status(503)
      .json({ error: "Failed to delete on route level", details: err });
  }
});

module.exports = router;
