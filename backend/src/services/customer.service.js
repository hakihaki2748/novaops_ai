//import repository
import customerRepository from "../repositories/customer.repository.js"
import AppError from "../utils/AppError.js"

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

    return getAllCustomers
}

const getCustomerById = async (id) => {
    //validasi id
    if(isNaN(id)) throw new AppError("ID Harus Angka", 400)
    
        //cari id customer
    const customer = await customerRepository.getCustomerById(id)

    if(!customer) throw new AppError("User tidak Ditemukan", 400)

    return customer;

}

const updateCustomer = async ({id, name, email, phone}) => {
    //validasi id
    if(isNaN(id)) throw new AppError("ID Harus Angka", 400)

    const customer = await customerRepository.getCustomerById(id)

    if(!customer) throw new AppError("User tidak Ditemukan", 404)
    
    const updateCus = await customerRepository.updateCustomer({
        id: Number(id),
        name: name,
        email: email,
        phone: phone
    })

    return updateCus
}

const deleteCustomer = async (id) => {
    //validasi id
    if(isNaN(id)) throw new AppError("ID Harus Angka", 400)

    const customer = await customerRepository.getCustomerById(id)

    if(!customer) throw new AppError("User tidak Ditemukan", 404)
    
    const deleteCus = await customerRepository.deleteCustomer(id)
    
    return deleteCus;
}


export default {
    createCustomer,
    getCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer
}