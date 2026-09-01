//import database
import db from "../config/database.js"

const createCustomer = async ({
    name, email, phone
}) => {

    const sql = `
    INSERT INTO customers(name, email, phone)
    VALUES (?, ?, ?)
    `

    const [result] = await db.execute(sql, [
        name,
        email,
        phone
    ])

    return result.insertId;

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

export default {
    createCustomer,
    findCustomerByEmail,
}