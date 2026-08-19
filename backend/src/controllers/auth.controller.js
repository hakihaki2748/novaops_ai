import authService from "../services/auth.service.js"
import apiResponse from "../utils/apiResponse.js";

const login = async (req, res) => {
    try {
        const result = await authService.login(req.body);
        res.status(200).json(
            apiResponse.success("Login Berhasil", result)
         );
    } catch (err) {
        res.status(400).json(
            apiResponse.error(err.message)
        );
    }
}

const register = async (req, res) => {
    try {

        const result = await authService.register(req.body);

        res.status(200).json(
            apiResponse.success("Register Berhasil", result)
        )
    } catch (err) {
        res.status(400).json(
            apiResponse.error(err.message)
        );
    }
}




export  default {
    login,
    register,
};