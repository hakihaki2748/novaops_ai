import api from "./api";

//buat bberapa function lalu di export
const getUser = (id) => api.get(`/users/${id}`);


const updateStatus = (id, status) => {
    return api.patch(`/users/${id}`, {
        id: id,
        status: status
    })
}

const updateRole = (id, role) => {
    return api.patch(`/users/${id}/role`, {
        id: id,
        role: role,
    })
}

const getLogs = (id) => {
    return api.get(`/users/${id}/logs`)
}

const restoreUser = (id) => api.patch(`/users/${id}/restore`)


export {
    getUser, updateStatus, updateRole, getLogs, restoreUser
}