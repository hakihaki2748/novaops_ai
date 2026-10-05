import db from "../config/database.js";

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
    SELECT u.id, u.name, u.email, u.role, u.status, u.company_id, c.company_name, u.created_at, u.updated_at
    FROM users u
    LEFT JOIN companies c ON u.company_id = c.id
    WHERE 1 
    AND u.deleted_at IS NULL
    `
    //buat variabel untuk menampung nilai params dinamis
    const params = []

    //saat search dilakukan
    if(search){
        sql += ` AND (u.name LIKE ? OR u.email LIKE ?)`;
        params.push(`%${search}%`, `%${search}%`)
    }

    //hanya user yang active
    if (activeOnly){
        sql += ` AND u.status = ?`;
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
    sql += ` LIMIT ${limit} OFFSET ${offset}`

    const [result] = await db.execute(sql, params)
    return result;
}

const findUserById = async (id, connection = db ) => {
    const sql = `
    SELECT u.id, u.name, u.email, u.phone, u.role, u.status, u.company_id, c.company_name, u.created_at, u.updated_at
    FROM users u
    LEFT JOIN companies c ON u.company_id = c.id
    WHERE u.id = ?
    AND u.deleted_at IS NULL;
    `
    const [user] = await connection.execute(sql, [id])
    return user[0];
}

const findUserByEmail = async (email, connection = db) => {
    const sql = `
    SELECT id, name, email, phone, role, status FROM users
    WHERE email = ?;
    `
    const [user] = await connection.execute(sql, [email])
    return user[0]
}

const countUsers = async ({
    search, activeOnly, currentRole
}) => {

    let sql = `
    SELECT COUNT(*) AS total
    FROM users
    WHERE 1 
    AND deleted_at IS NULL
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

    const [result] = await db.execute(sql, params)
    return result[0].total;
}



const updateUser = async ({id, company_id, name, email, phone}, connection = db) => { 
    const sql = `
        UPDATE users
        SET name = ?, email = ?, phone = ?, updated_at = NOW()
        where id = ?
        AND company_id = ?
        AND deleted_at IS NULL
    `
    try{
        const [result] = await connection.execute(sql, [
             
            name, 
            email, 
            phone, 
            id,
            company_id
        ])

        return result
    }catch(err){
        if(err.code === "ER_DUP_ENTRY") throw new AppError("Email Sudah Digunakan", 400)
        throw err;
    }
    
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


const createUser = async ({ company_id, name, phone, email, password, role }, connection ) => {
    const sql = `
    INSERT INTO users 
    (company_id, name, phone, email, password, role )
    VALUES (?, ?, ?, ?, ?, ?)
    `
    const [result] = await connection.execute(sql, [
        company_id,
        name,
        phone,
        email,
        password,
        role
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
    findUserByEmail,
    findUsers,
    findUserById,
    countUsers,
    updateUser,
    updateStatus,
    updateRole,
    softDelete,
    createUser,
}