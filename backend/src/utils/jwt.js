import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "mySecretJwt";

const generateToken = (payload) => {
    return jwt.sign(payload, SECRET_KEY, {
        expiresIn: "1h",
    });
}

const verifyToken = (token) => {
    return jwt.verify(token, SECRET_KEY)
};

export {
    generateToken,
    verifyToken,
}