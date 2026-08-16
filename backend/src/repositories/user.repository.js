import db from "../config/database.js";

// const findAll = async () => {
//     const query = `
//     SELECT * FROM users;
//     `
//     const [users] = await db.execute(query)
//     return users;
// }


//whitelist kolom yang boleh digunakan untuk sorting
    const allowedSort = new Set([
        "id", 
        "name",
        "email",
        "role"
    ]);

//mengambil data berdasarkan filter,paginasi dan sortir
const findUsers = async ({
    search, page, limit, sortBy, sortOrder, activeOnly, currentRole
}) => {

    const offset = (page - 1) * limit;

    let sql = `
    SELECT id, name, email, role, status
    FROM users
    WHERE 1
    `
    //buat variabel untuk menampung nilai params dinamis
    const params = []

    //saat search dilakukan
    if(search){
        sql += ` AND (name LIKE ? OR email LIKE ?)`;
        params.push(`%${search}%`, `%${search}%`)
    }

    //hanya user yang active
    if (activeOnly){
        sql += ` AND status = ?`;
        params.push("active")
    }

    //saat membuat kondisi role khusus, manager tidak boleh melihat owner
    if (currentRole !== "owner"){
        sql += ` AND role <> ?`;
        params.push("owner")
    }


    //kita pilih filter berdasarkan apa
    if(!allowedSort.has(sortBy)){
        sortBy = "id"
    }

    //kita pilih urutan filternya bagaimana- apakah dari kecil ke besar atau urut sesuai alphabet
    sortOrder = String(sortOrder)?.toUpperCase() === "DESC" ? "DESC" : "ASC"

    sql += ` ORDER BY ${sortBy} ${sortOrder} `
    sql += ` LIMIT ? OFFSET ?`

    params.push(limit, offset)

    const [result] = await db.execute(sql, params)
    return result;
}

const findUserById = async (id, connection = db ) => {
    const sql = `
    SELECT id, name, email, phone, role, status FROM users
    WHERE id = ?;
    `
    const [user] = await connection.execute(sql, [id])
    return user[0];
}

const updateStatus = async (id, status, connection ) => {
    const sql = `
    UPDATE users
    SET status = ?
    WHERE id = ?;
    `
    const [result] = await connection.execute(sql, [status, id])

    return result;
}

const updateRole = async (id, role, connection ) => {
    const sql = `
    UPDATE users
    SET role = ?
    WHERE id = ?;
    `
    const [result] = await connection.execute(sql, [role, id])
    return result;
}


const createUser = async (data, connection ) => {
    const sql = `
    INSERT INTO users 
    (name, phone, email, password)
    VALUES (?, ?, ?, ?)
    `
    const [result] = await connection.execute(sql, [
        data.name,
        data.phone,
        data.email,
        data.password,
    ])
    return result.insertId;
}

const softDelete = async (id, connection ) => {
    const sql =`
    UPDATE users
    SET status = ?,
        deleted_at = NOW()
    WHERE id = ?
    `
    const [result] = await connection.execute(sql, ['inactive', id])
    return result;
}



export default {
    // findAll,
    findUsers,
    findUserById,
    updateStatus,
    updateRole,
    softDelete,
    createUser,
}