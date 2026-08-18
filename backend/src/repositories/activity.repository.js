//import database
import db from "../config/database.js";

//buat function createLog
const createLog = async ({
    company_id,
    user_id,
    actor_role,
    event_type,
    entity_type,
    entity_id,
    description

}, connection = db) => {
    
    //buat sql
    const sql = `
        INSERT INTO activity_logs 
        (
            company_id,
            user_id,
            actor_role,
            event_type,
            entity_type,
            entity_id,
            description
        ) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
        ;
    `

    //lakukan destructuring saat exekusi sql
    const [result] = await connection.execute(sql, [
        company_id,
        user_id,
        actor_role,
        event_type,
        entity_type,
        entity_id,
        description,
    ])

    return result.insertId;

}

//buat function findUserLogs
const findUserLogs = async ({ entity_type, entity_id },connection = db) => {
    //buat sql
    const sql = `
        SELECT *
        FROM activity_logs
        WHERE entity_type = ?
        AND entity_id = ?
        ORDER BY created_at DESC
        `;

    //kita lakukan destructuring array
    const [result] = await connection.execute(sql, [entity_type, entity_id])

    return result;
}


export default {
    findUser,
    createLog,
    findUserLogs,
}