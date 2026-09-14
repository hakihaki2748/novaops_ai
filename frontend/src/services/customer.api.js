//import konfigurasi axios
import api from "./api"

//parameter berisi nilai yang diperoleh dari endpoin/url
const getCustomers = (params) => {
    return api.get("/customers", {
        params,
    });
};

const getCustomersById = (id) => {
    return api.get(`/customers/${id}`)
}

const createCustomer = (payload) => {
    return api.post("/customers", payload)
}

const updateCustomer = (id, payload) => {
    return api.patch(`/customers/${id}`)
}

const updateCustomerVip = (id, isVip) => {
    return api.patch(`/customers/${id}`, {
        isVip,
    })
}

const updateCustomerSegment = (id, segment) => {
    return api.patch(`/customers/${id}`, {
        segment,
    })
}

const updateCustomerStatus = (id, status) => {
    return api.patch(`/customers/${id}`, {
        status,
    })
}

const deleteCustomer = (id) => {
    return api.delete(`/customers/${id}`)
}

export {
    getCustomers,
    getCustomersById,
    createCustomer,
    updateCustomer,
    updateCustomerVip,
    updateCustomerSegment,
    updateCustomerStatus,
    deleteCustomer
};