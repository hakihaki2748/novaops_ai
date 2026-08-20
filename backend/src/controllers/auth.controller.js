import authService from "../services/auth.service.js"
import apiResponse from "../utils/apiResponse.js";

const login = async (req, res, next) => {
    try {
        const result = await authService.login(req.body);
        res.status(200).json(
            apiResponse.success("Login Berhasil", result)
         );
    } catch (err) {
        next(err)
    }
}

export  default {
    login,
};