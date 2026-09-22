//import database
import db from "../config/database.js"
import AppError  from "../utils/AppError.js"

const createCustomer = async ({
    company_id, name, email, phone
}, connection = db) => {

    const sql = `
    INSERT INTO customers(company_id, name, email, phone)
    VALUES (?, ?, ?, ?)
    `
    try{
        const [result] = await connection.execute(sql, [
            company_id,
            name,
            email,
            phone
        ])

        return result.insertId;

    }catch(err){
        if(err.code === "ER_DUP_ENTRY") throw new AppError("Email Sudah Digunakan", 400)
        throw err;
    }
    
}

const findCustomerByEmail = async (email, connection = db) => {
    const sql = `
        SELECT id, company_id, name, email, phone
        FROM customers
        WHERE email = ?
    `
    const [rows] = await connection.execute(sql, [email])
    return rows;
}

const getCustomerById = async (id, company_id, connection = db) => {
    const sql = `
        SELECT id, company_id, name, email, phone, is_vip, segment, status, created_at, updated_at, deleted_at 
        FROM customers
        WHERE id = ?
        AND company_id = ?
    `
    const [rows] = await connection.execute(sql, [id, company_id])
    return rows[0]
}

//ini untuk sort,filter,search dan pagination
const findCustomers = async ({company_id, search, status, segment, isVip, sort, order, limit, offset}) => {

    let sql = `
        SELECT
            id,
            company_id,
            name,
            email,
            phone,
            is_vip,
            segment,
            status,
            created_at,
            updated_at
        FROM customers
        WHERE company_id = ?
        AND deleted_at IS NULL
    `;

    const params = [company_id];
    const safelimit = Number.isInteger(Number(limit)) ? Number(limit) : 10
    const safeOffset = Number.isInteger(Number(offset)) ? Number(offset) : 0
    if (search) {
        sql += `
            AND (
                name LIKE ?
                OR email LIKE ?
                OR phone LIKE ?
            )
        `;

        const searchValue = `%${search}%`;

        params.push(
            searchValue,
            searchValue,
            searchValue
        );
    }

    if (status) {
        sql += ` 
            AND status = ?
        `;
        params.push(status);
    }

    if (segment) {
        sql += ` 
            AND segment = ?
        `;
        params.push(segment);
    }

    if (isVip !== undefined) {
        sql += `
            AND is_vip = ?
        `;
        params.push(isVip);
    }

    sql += `
        ORDER BY ${sort} ${order} 
        LIMIT ${safelimit} OFFSET ${safeOffset}
    `;
    // params.push(limit, offset)

    const [rows] = await db.execute(sql, params);

    return rows;
};



const updateCustomer = async ({id, company_id, name, email, phone}, connection = db) => { 
    const sql = `
        UPDATE customers
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


// untuk update vip customer
const updateCustomerVip = async ({id, company_id, isVip}, connection = db) => {
    const sql = `
        UPDATE customers
        SET is_vip = ?, updated_at = now()
        WHERE id = ?
        AND company_id = ?
        AND deleted_at IS NULL
    `

    const [result] = await connection.execute(sql, [isVip, id, company_id])
    return result;
}


//untuk update segment customer
const updateCustomerSegment = async ({id, company_id, segment}, connection = db) => {
    const sql = `
        UPDATE customers
        SET segment = ?, updated_at = now()
        WHERE id = ?
        AND company_id = ?
        AND deleted_at IS NULL
        `

        const [result] = await connection.execute(sql, [segment, id, company_id])
        return result
}


//untuk update status customer
const updateCustomerStatus = async ({id, company_id, status}, connection = db) => {
    const sql = `
        UPDATE customers
        SET status = ? , updated_at = now()
        WHERE id = ?
        AND company_id = ?
        AND deleted_at IS NULL 
        `

        const [result] = await connection.execute(sql, [status, id, company_id])
        return result
}


const deleteCustomer = async (id, company_id, connection = db) => {
    const sql = `
        UPDATE customers
        SET deleted_at = NOW()
        WHERE id = ?
        AND company_id = ?
        AND deleted_at IS NULL
    `

    const [result] = await connection.execute(sql, [id, company_id])
    return result;
}

//untuk menghitung total data yang ditampilkan
const countCustomers = async ({company_id, search, status, segment, isVip}) => {
    let sql = `
        SELECT COUNT(*) AS total
        FROM customers
        WHERE company_id = ?
        AND deleted_at IS NULL
    `;
    
    //untuk menampung nilai
    const params = [company_id];

    if(search){
        sql += `
            AND (
                name LIKE ? OR
                email LIKE ? OR
                phone LIKE ?
            )
        `;

        const searchValue = `%${search}%`

        params.push(searchValue, searchValue, searchValue)
    }

    //jika status
    if(status){
        sql += `
            AND status = ?
        `
        params.push(status);
    }

    //jika segment yg dicari
    if(segment){
        sql += `
            AND segment = ?
        `
        params.push(segment)
    }

    //jika berdasarkan vip
    if(isVip !== undefined){
        sql += `
            AND is_vip = ?
        `

        params.push(isVip)
    }

    const [rows] = await db.execute(sql, params)
    return Number(rows[0].total)
}

export default {
    createCustomer,
    findCustomerByEmail,
    getCustomerById,
    findCustomers,
    updateCustomer,
    updateCustomerVip,
    updateCustomerSegment,
    updateCustomerStatus,
    deleteCustomer,
    countCustomers
}