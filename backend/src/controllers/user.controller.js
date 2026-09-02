import userService from "../services/user.service.js";
import apiResponse from "../utils/apiResponse.js";


const getUsers = async (req, res, next) => {
    try {
        const result = await userService.getUsers(req.query, req.user);
        return res.status(200).json(
            apiResponse.success("Data Ditemukan", result)
        )
    } catch (err) {
        next(err); 
    }
}

const findUserById = async (req, res, next) => {
    try {
        const result = await userService.findUserById(req.params.id, req.user);
        return res.status(200).json(
            apiResponse.success("Data Ditemukan", result)
        )
    } catch (err) {
        next(err)
    }
}

const updateStatus = async (req, res, next) => {
    try {
        const result = await userService.updateStatus({
                id: req.params.id,
                status: req.body.status,
                currentUser: req.user
            })
        return res.status(200).json(
            apiResponse.success("Update Status", result)
        )
    } catch (err) {
        next(err)
    }
}

const updateRole = async (req, res, next) => {
    try {
        const result = await userService.updateRole({
            id: req.params.id,
            role: req.body.role,
            currentUser: req.user
        })
        return res.status(200).json(
            apiResponse.success("Update Role", result)
        )
    } catch (err) {
        next(err)
    }
}

const softDelete = async (req, res, next) => {
    try {
        const result = await userService.softDelete({
            id: req.params.id,
            currentUser: req.user
        })
        return res.status(200).json(
            apiResponse.success("User Berhasil Dihapus", result)
        )
    } catch (err) {
        next(err)
    }
}

const createUser = async (req, res, next) => {
    try {
        const result = await userService.createUser(req.body, req.user);
        return res.status(201).json(
            apiResponse.success("User Berhasil Dibuat", result)
        )
    } catch (err) {
        next(err);
    }
}


export default {
    getUsers,
    findUserById,
    updateStatus,
    updateRole,
    softDelete,
    createUser,
}