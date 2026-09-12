//import repository
import customerRepository from "../repositories/customer.repository.js"
import AppError from "../utils/AppError.js"
import validateIdSchema from "../validations/vaildateId.js"

const createCustomer = async ({name, email, phone}) => {
    //cari email apakah sudah digunakan
    const findEmail = await customerRepository.findCustomerByEmail(email)
    if(findEmail.length !== 0) throw new AppError("Email Sudah Digunakan", 400)

    const newCustomer = await customerRepository.createCustomer({name, email, phone})

    return newCustomer
}

const getCustomers = async () => {
    const getAllCustomers = await customerRepository.getCustomers();

    if(getAllCustomers.length === 0) {
        throw new AppError("Data Kosong", 404)
        return getAllCustomers
    }

    //karena kita ingin merubah nilai is_vip menjadi boolean, maka kita lakukan maping

    return getAllCustomers.map(customers => ({
        ...customers,
        is_vip: Boolean(customers.is_vip)
    }))
}

const getCustomerById = async (id) => {
    //validasi id
    const validateId = validateIdSchema.safeParse({id})
    if(!validateId.success) throw new AppError(validateId.error.errors[0].message, 400)

    //cari id customer
    const customer = await customerRepository.getCustomerById(id)

    if(!customer || customer.deleted_at !== null) throw new AppError("Customer tidak Ditemukan", 404)

    //rubah nilai is_vip menjadi boolean
    customer.is_vip = Boolean(customer.is_vip)
    return customer;

}

const updateCustomer = async ({id, name, email, phone}) => {
    //validasi id
    const validateId = validateIdSchema.safeParse({id})
    if(!validateId.success) throw new AppError(validateId.error.errors[0].message, 400)

    //cek email apakah sudah digunakan oleh customer lain
    const findEmail = await customerRepository.findCustomerByEmail(email)
    console.log(findEmail)
    //juka email ditemukan, dan id tidak sama dengan idUpdate maka gagal
    if(findEmail.length !== 0 && findEmail[0].id !== Number(id)) throw new AppError("Email Sudah Digunakan", 400)
    
    //cek email findEmail apakah emailnya sama
    if(findEmail[0].email === email) throw new AppError("Email Sudah Digunakan", 400)
    const customer = await customerRepository.getCustomerById(id)

    if(!customer || customer.deleted_at !== null) throw new AppError("Customer tidak Ditemukan", 404)
    
    const updateCus = await customerRepository.updateCustomer({
        id: Number(id),
        name: name,
        email: email,
        phone: phone
    })

    return updateCus
}

//update customer vip
const updateCustomerVip = async ({id, isVip}) => {
    //validasi id
    const validateId = validateIdSchema.safeParse({id})

    if(!validateId.success){
        throw new AppError(
            validateId.error.errors[0].message,
            400
        )
    }

    const customer = await customerRepository.getCustomerById(id)

    if (!customer || customer.deleted_at !== null){
        throw new AppError(
            "Customer tidak Ditemukan",
            404
        )
    }

    const updateCus = await customerRepository.updateCustomerVip({
        id: Number(id),
        isVip
    })
    
    if(updateCus.affectedRows === 0){
        throw new AppError(
            "Gagal Update Status VIP Customer",
            400
        )
    }
    
    return {
        id: Number(id),
        isVip
    }
}

//untuk update segment customer
const updateCustomerSegment = async ({id, segment}) => {
    //validasi id
    const validateId = validateIdSchema.safeParse({id})

    if(!validateId.success){
        throw new AppError(
            validateId.error.errors[0].message,
            400
        )
    }
    
    const customer = await customerRepository.getCustomerById(id)

    if(!customer || customer.deleted_at !== null){
        throw new AppError(
            "Customer tidak Ditemukan",
            404
        )
    }
    
    const updateCus = await customerRepository.updateCustomerSegment({
        id: Number(id),
        segment
    })

    if(updateCus.affectedRows === 0){
        throw new AppError(
            "Gagal Update Segment Customer",
            400
        )
    }

    return {
        id: Number(id),
        segment
    }
}


//untuk update status customer
const updateCustomerStatus = async ({id, status}) => {
    //validasi id
    const validateId = validateIdSchema.safeParse({id})

    const customer = await customerRepository.getCustomerById(id)

    if(!customer || customer.deleted_at !== null){
        throw new AppError(
            "Customer tidak Ditemukan",
            404
        )
    }

    const updateCus = await customerRepository.updateCustomerStatus({
        id: Number(id),
        status
    })

    if(updateCus.affectedRows === 0){
        throw new AppError(
            "Gagal Update Status Customer",
            400
        )
    }

    return {
        id: Number(id),
        status
    }
}

const deleteCustomer = async (id) => {
    //validasi id
    const validateId = validateIdSchema.safeParse({id})
    if(!validateId.success) throw new AppError(validateId.error.errors[0].message, 400)

    const customer = await customerRepository.getCustomerById(id)

    if(!customer) throw new AppError("Customer tidak Ditemukan", 404)
    
    if(customer.deleted_at !== null) throw new AppError("Customer Sudah Dihapus", 404)
    
    const deleteCus = await customerRepository.deleteCustomer(id)
    
    return deleteCus;
}


export default {
    createCustomer,
    getCustomers,
    getCustomerById,
    updateCustomer,
    updateCustomerVip,
    updateCustomerStatus,
    updateCustomerSegment,
    deleteCustomer
}