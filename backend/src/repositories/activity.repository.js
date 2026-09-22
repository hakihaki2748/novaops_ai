//import database
import db from "../config/database.js";


//findUserByid
const findUserById = async (id, connection = db ) => {
    const sql = `
    SELECT id, name, email, phone, role, status FROM users
    WHERE id = ?
    `
    const [user] = await connection.execute(sql, [id])
    return user[0];
}

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
const findEntityLogs = async ({ company_id, entity_type, entity_id },connection = db) => {
    //buat sql
    const sql = `
        SELECT id, company_id, actor_role, event_type, entity_type, entity_id, description, created_at
        FROM activity_logs
        WHERE company_id = ?
        AND entity_type = ?
        AND entity_id = ?
        ORDER BY created_at DESC, id DESC
        `;

    //kita lakukan destructuring array
    const [result] = await connection.execute(sql, [company_id, entity_type, entity_id])

    return result;
}


export default {
    findUserById,
    createLog,
    findEntityLogs,
}