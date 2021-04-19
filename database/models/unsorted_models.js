const db = require("./dbConfig");

module.exports = {
  queryRawTasks,
  queryDetailedTasks,
  insertTask,
  updateTask,
  deleteTask,
  userTaskPurge,
};

function queryRawTasks(user_id) {
  const tasks = db("UNSORTED").where("user", user_id);
  return tasks;
}

function queryDetailedTasks(user_id) {
  const tasks = db("UNSORTED")
    .join("COLORS", "color", "=", "COLORS.color_id")
    .select(
      "UNSORTED.task_id",
      "UNSORTED.task_title",
      "UNSORTED.task_description",
      "UNSORTED.color",
      "UNSORTED.complete",
      "COLORS.color_name"
    )
    .where("user", user_id);
  return tasks;
}

async function insertTask(newTask) {
  try {
    await db("UNSORTED").insert({
      task_title: newTask.title,
      task_description: newTask.description,
      complete: false,
      color: newTask.color,
      user: newTask.user,
    });
  } catch (err) {
    return { ERROR: "Internal Model Error.", details: err };
  }
  return queryDetailedTasks(newTask.user);
}

async function updateTask(task_id, user_id, putTask) {
  try {
    await db("UNSORTED").where({ task_id: task_id }).update(putTask);
    let updatedTasks = await queryRawTasks(user_id);
    return updatedTasks;
  } catch (err) {
    return { ERROR: "Internal Model Error.", details: err };
  }
}

async function deleteTask(task_id, user_id) {
  try {
    await db("UNSORTED").where({ task_id: task_id }).del();
  } catch (err) {
    return { ERROR: "Internal Model Error.", details: err };
  }
  return queryRawTasks(user_id);
}

async function userTaskPurge(user_id) {
  try{
    await db("Unsorted").where({user: user_id}).del();
  }catch(err){
    return { ERROR: "Internal Model Error.", details: err}
  }
}
