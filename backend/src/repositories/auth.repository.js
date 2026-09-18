import db from "../config/database.js";

const findUserByEmail = async(email) => {
    const query = `
    SELECT id, name, email, password, role, status, company_id
    FROM users 
    WHERE email = ?
    `;

    const [users] = await db.execute(query, [email]);

    return users[0] || null;
}

export default {
    findUserByEmail,
}