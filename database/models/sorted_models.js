const db = require('./dbConfig');

module.exports = {
    queryRawAgendas,
    queryDetailedAgendas,
    insertAgend,
    updateAgenda,
    deleteAgenda,
    userAgendaPurge,
}

function queryRawAgendas(user_id){
    const agendas = db("SORTED").where("user", user_id)
    return agendas
}

function queryDetailedAgendas(user_id){
    const agendas = db('SORTED')
        .join("COLORS", "color", "=", "COLORS.color_id")
        .select(
            "SORTED.agenda_id",
            "SORTED.agenda_title",
            "SORTED.agenda_description",
            "SORTED.date",
            "SORTED.color",
            "SORTED.complete",
            "COLORS.color_name"
        )
        .where("user", user_id)
    return agendas
}

async function insertAgend(newAgenda){
    try{
        await db("SORTED").insert({
            date: newAgenda.date,
            agenda_title: newAgenda.title,
            agenda_description: newAgenda.description,
            complete: false,
            color: newAgenda.color,
            user: newAgenda.user
        })
    } catch(err){
        return {ERROR: "Internal Model Error.", details: err}
    }
    return queryRawAgendas(newAgenda.user)
}

async function updateAgenda(agenda_id, user_id ,putAgenda){
    try{
        await db("SORTED").where({ agenda_id: agenda_id }).update(putAgenda)
        let updatedAgendas = await queryRawAgendas(user_id)
        return updatedAgendas
    } catch(err){
        return { ERROR: "Internal Model Error.", details: err}
    }
}

async function deleteAgenda(agenda_id, user_id){
    try{
        await db("SORTED").where({agenda_id: agenda_id}).del()
    }catch(err){
        return { ERROR: "Internal Model Error.", details: err }
    }
    return queryRawAgendas(user_id)
}

async function userAgendaPurge(user_id){
    try{
        await db("SORTED").where({user: user_id})
    }catch(err){
        return{ ERROR: "Internal model Error.", details: err}
    }
}