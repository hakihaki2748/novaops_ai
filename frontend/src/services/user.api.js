import api from "./api";

//buat bberapa function lalu di export

const getUsers = (params) => {
    return api.get("/users", {
        params,
    })
}

const getUserById = (id) => {
    return api.get(`/users/${id}`)
}

const createUser = (payload) => {
    return api.post("/users", payload)
}

const updateStatus = (id, status) => {
    return api.patch(`/users/${id}/status`, {
        status,
    })
}

const updateRole = (id, role) => {
    return api.patch(`/users/${id}/role`, {
        role,
    })
}

const deleteUser = (id) => {
    return api.delete(`/users/${id}`)
}

export {
    getUsers, getUserById, updateStatus, updateRole, deleteUser,
}