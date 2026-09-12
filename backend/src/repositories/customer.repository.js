//import database
import db from "../config/database.js"
import AppError  from "../utils/AppError.js"

const createCustomer = async ({
    name, email, phone
}) => {

    const sql = `
    INSERT INTO customers(name, email, phone)
    VALUES (?, ?, ?)
    `
    try{
        const [result] = await db.execute(sql, [
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

const findCustomerByEmail = async (email) => {
    const sql = `
        SELECT id, name, email, phone
        FROM customers
        WHERE email = ?
    `
    const [rows] = await db.execute(sql, [email])
    return rows;
}


const getCustomers = async () => {
    const sql = `
        SELECT id, name, email, phone, is_vip, segment, status 
        FROM customers
        WHERE deleted_at IS NULL
    `

    const [rows] = await db.execute(sql)
    return rows
}

const getCustomerById = async (id) => {
    const sql = `
        SELECT id, name, email, phone, is_vip, segment, status, created_at, updated_at, deleted_at 
        FROM customers
        WHERE id = ?
    `
    const [rows] = await db.execute(sql, [id])
    return rows[0]
}

const updateCustomer = async ({id, name, email, phone}) => { 
    const sql = `
        UPDATE customers
        SET name = ?, email = ?, phone = ?, updated_at = NOW()
        where id = ?
        AND deleted_at IS NULL
    `
    try{
        const [result] = await db.execute(sql, [ 
            name, 
            email, 
            phone, 
            id
        ])

        return result
    }catch(err){
        if(err.code === "ER_DUP_ENTRY") throw new AppError("Email Sudah Digunakan", 400)
        throw err;
    }
    
}


// untuk update vip customer
const updateCustomerVip = async ({id, isVip}) => {
    const sql = `
        UPDATE customers
        SET is_vip = ?, updated_at = now()
        WHERE id = ?
        AND deleted_at IS NULL
    `

    const [result] = await db.execute(sql, [isVip, id])
    return result;
}


//untuk update segment customer
const updateCustomerSegment = async ({id, segment}) => {
    const sql = `
        UPDATE customers
        SET segment = ?, updated_at = now()
        WHERE id = ?
        AND deleted_at IS NULL
        `

        const [result] = await db.execute(sql, [segment, id])
        return result
}


//untuk update status customer
const updateCustomerStatus = async ({id, status}) => {
    const sql = `
        UPDATE customers
        SET status = ? , updated_at = now()
        WHERE id = ?
        AND deleted_at IS NULL 
        `

        const [result] = await db.execute(sql, [status, id])
        return result
}


const deleteCustomer = async (id) => {
    const sql = `
        UPDATE customers
        SET deleted_at = NOW()
        WHERE id = ?
        AND deleted_at IS NULL
    `

    const [result] = await db.execute(sql, [id])
    return result;
}


export default {
    createCustomer,
    findCustomerByEmail,
    getCustomers,
    getCustomerById,
    updateCustomer,
    updateCustomerVip,
    updateCustomerSegment,
    updateCustomerStatus,
    deleteCustomer
}