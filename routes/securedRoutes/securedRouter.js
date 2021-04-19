const express = require("express");
const router = express.Router()
const tasksRoutes = require("./taskRoutes");
const agendaRoutes = require("./agendaRoutes");
const accountRoutes = require("./accountRoutes");

router.route("/where").get((req, res) => {
    res.status(200).json({location: "At secured root."})
})

router.use("/tasks", tasksRoutes);
router.use("/agenda", agendaRoutes);
router.use("/account", accountRoutes);

module.exports = router;
