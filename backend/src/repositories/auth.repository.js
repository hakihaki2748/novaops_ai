import db from "../config/database.js";

const findUserByEmail = async(email) => {
    const query = `
    SELECT id, name, email, password, role, status
    FROM users 
    WHERE email = ?
    `;

    const [users] = await db.execute(query, [email]);

    return users[0] || null;
}


const createUser = async(data) => {
    // input ke database
    const query = `
        INSERT INTO users
        (name, phone, email, password)
        VALUES (?, ?, ?, ?)
        `;
    
    const [result] = await db.execute(query, [
        data.name,
        data.phone,
        data.email,
        data.password
    ])

    return result.insertId;
}

export default {
    findUserByEmail,
    createUser,
}