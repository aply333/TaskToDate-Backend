const express = require("express");
const router = express.Router();
const agenda = require("../../database/models/sorted_models");

router.route("/where").get((req, res) => {
  res.status(200).json({ location: "At agenda routes root." });
});

router.route("/detailed/:user_id").get(async (req, res) => {
  try {
    let user_id = req.params.user_id;
    let detailedAgenda = await agenda.queryDetailedAgendas(user_id);
    res.status(200).json(detailedAgenda);
  } catch (err) {
    res.status(404).json({ error: "Route level error.", details: err });
  }
});

router.route("/newAgenda").post(async (req, res) => {
  try {
    let { newAgenda } = req.body;
    let newAgendas = await agenda.insertAgend(newAgenda);
    res.status(200).json(newAgendas);
  } catch (err) {
    res.status(503).json({ error: "Route level post error.", details: err });
  }
});

router.route("/agendaChange/:user_id").put(async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const { agenda_id, putAgenda } = req.body;
    let updatedAgenda = await agenda.updateAgenda(
      agenda_id,
      user_id,
      putAgenda
    );
    res.status(200).json(updatedAgenda);
  } catch (err) {
    res.status(503).json({ error: "Route level error", details: err });
  }
});

router.route("/agendaRemove/:user_id/:agenda_id").delete(async (req, res) => {
  try {
    let user_id = req.params.user_id;
    let agenda_id = req.params.agenda_id;
    const shrunkAgenda = await agenda.deleteAgenda(agenda_id, user_id);
    res.status(200).json(shrunkAgenda);
  } catch (err) {
    res.status(503).json({ error: "Route level error.", details: err });
  }
});

module.exports = router;
