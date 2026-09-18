//import repository
import { boolean } from "zod"
import customerRepository from "../repositories/customer.repository.js"
import activityRepository from "../repositories/activity.repository.js"
import { transaction, commit, rollback } from "../config/transaction.js"
import AppError from "../utils/AppError.js"
import validateIdSchema from "../validations/vaildateId.js"

const createCustomer = async ({name, email, phone, currentUser}) => {
    //cari email apakah sudah digunakan
    const findEmail = await customerRepository.findCustomerByEmail(email)
    if(findEmail.length !== 0) throw new AppError("Email Sudah Digunakan", 400)
    
        //buat connection
    const connection = await transaction()

    try {
        
        const newCustomer = await customerRepository.createCustomer({
            name, 
            email, 
            phone
        }, connection)

        await activityRepository.createLog({
            company_id: currentUser.company_id,
            user_id: currentUser.id,
            actor_role: currentUser.role,
            event_type: "customer.created",
            entity_type: "customer",
            entity_id: newCustomer,
            description: `${currentUser.role} menambahkan customer baru`
        }, connection)
        
        await commit(connection)
        return newCustomer
    } catch (err) {
        await rollback(connection)

        throw err
    }finally{
        connection.release()
    }
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

//digunakan saat query parameter aktif untuk search,sort atau filter
const findCustomers = async ({search, status, segment, is_vip, sort, order, page, limit}) => {
    const isVip = is_vip === "true" ? true : is_vip === "false" ? false : undefined;
    
    const currentPage = Number(page) || 1
    const perLimit = Number(limit) || 10
    const offset = (Number(currentPage) - 1) * Number(perLimit)

    const [findAllCustomers, totalCustomer] = await Promise.all([
        customerRepository.findCustomers({
            search,
            status,
            segment,
            isVip,
            sort,
            order,
            limit: perLimit,
            offset: offset
        }),
        customerRepository.countCustomers({search, status, segment, isVip})
    ])
    const customers = findAllCustomers.map(customer => ({
        ...customer,
        is_vip: Boolean(customer.is_vip)
    }))
    const totalPages = totalCustomer === 0 ? 0 : Math.ceil(totalCustomer / perLimit)

    if(findAllCustomers.length === 0) throw new AppError("Data Tidak Ditemukan", 404)
    
    return {
        customers,
        pagination : {
            page,
            limit,
            totalCustomer,
            totalPages

        }
    }


}



const updateCustomer = async ({id, name, email, phone, currentUser}) => {
    //validasi id
    const validateId = validateIdSchema.safeParse({id})
    if(!validateId.success) throw new AppError(validateId.error.errors[0].message, 400)

    //cek email apakah sudah digunakan oleh customer lain
    const findEmail = await customerRepository.findCustomerByEmail(email)

    //jika email ditemukan, dan id tidak sama dengan idUpdate maka gagal
    if(findEmail.length !== 0 && findEmail[0].id !== Number(id)) throw new AppError("Email Sudah Digunakan", 400)
    
    const customer = await customerRepository.getCustomerById(id)

    if(!customer || customer.deleted_at !== null) throw new AppError("Customer tidak Ditemukan", 404)
    
    const connection = await transaction()
    try {
        const updateCus = await customerRepository.updateCustomer({
            id: Number(id),
            name: name,
            email: email,
            phone: phone
        }, connection)

        await activityRepository.createLog({
            company_id: currentUser.company_id,
            user_id: currentUser.id,
            actor_role: currentUser.role,
            event_type: "customer.updated",
            entity_type: "customer",
            entity_id: Number(id),
            description: `${currentUser.role} mengupdate customer`
        }, connection)

        await commit(connection)
        return updateCus
    } catch (err) {
        await rollback(connection)
        throw err
    }finally{
        connection.release()
    }
   
}

//update customer vip
const updateCustomerVip = async ({id, isVip, currentUser} ) => {
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

    const connection = await transaction()

    try {
        const updateCus = await customerRepository.updateCustomerVip({
            id: Number(id),
            isVip
        }, connection)

        await activityRepository.createLog({
            company_id: currentUser.company_id,
            user_id: currentUser.id,
            actor_role: currentUser.role,
            event_type: "customer.vip_updated",
            entity_type: "customer",
            entity_id: Number(id),
            description: `${currentUser.role} mengupdate customer vip`
        }, connection)

        if(updateCus.affectedRows === 0){
            throw new AppError(
                "Gagal Update Status VIP Customer",
                400
            )
        }
        
        await commit(connection)

        return {
            id: Number(id),
            isVip
        }

    } catch (err) {
        await rollback(connection)

        throw err
    }finally{
        connection.release()
    }

    
}

//untuk update segment customer
const updateCustomerSegment = async ({id, segment, currentUser}) => {
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
    
    const connection = await transaction()
    try {
        const updateCus = await customerRepository.updateCustomerSegment({
            id: Number(id),
            segment
        }, connection)

        await activityRepository.createLog({
            company_id: currentUser.company_id,
            user_id: currentUser.id,
            actor_role: currentUser.role,
            event_type: "customer.segment_updated",
            entity_type: "customer",
            entity_id: Number(id),
            description: `${currentUser.role} mengupdate customer segment`
        }, connection)

        if(updateCus.affectedRows === 0){
            throw new AppError(
                "Gagal Update Segment Customer",
                400
            )
        }

        await commit(connection)
        return {
            id: Number(id),
            segment
        }
        
    } catch (err) {
        await rollback(connection)
        throw err;
    }finally{
        connection.release()
    }
    
}


//untuk update status customer
const updateCustomerStatus = async ({id, status, currentUser}) => {
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

    const connection = await transaction()
    try {
        const updateCus = await customerRepository.updateCustomerStatus({
            id: Number(id),
            status
        }, connection)

        await activityRepository.createLog({
            company_id: currentUser.company_id,
            user_id: currentUser.id,
            actor_role: currentUser.role,
            event_type: "customer.status_updated",
            entity_type: "customer",
            entity_id: Number(id),
            description: `${currentUser.role} mengupadate customer status`
        }, connection)

        if(updateCus.affectedRows === 0){
            throw new AppError(
                "Gagal Update Status Customer",
                400
            )
        }
        
        await commit(connection)

        return {
            id: Number(id),
            status
        }
    } catch (err) {
        await rollback(connection)
        throw err;
    }finally{
        connection.release()
    }
    
}

const deleteCustomer = async (id, currentUser) => {
    //validasi id
    const validateId = validateIdSchema.safeParse({id})
    if(!validateId.success) throw new AppError(validateId.error.errors[0].message, 400)

    const customer = await customerRepository.getCustomerById(id)

    if(!customer) throw new AppError("Customer tidak Ditemukan", 404)
    
    if(customer.deleted_at !== null) throw new AppError("Customer Sudah Dihapus", 404)
    
    const connection = await transaction()
    try {
        const deleteCus = await customerRepository.deleteCustomer(id, connection)
        await activityRepository.createLog({
            company_id: currentUser.company_id,
            user_id: currentUser.id,
            actor_role: currentUser.role,
            event_type: "customer.deleted",
            entity_type: "customer",
            entity_id: Number(id),
            description: `${currentUser.role} menghapus customer`
        }, connection)
        await commit(connection)
        return deleteCus;
    } catch (err) {
        await rollback(connection)

        throw err
    }finally{
        connection.release()
    }
   
}



export default {
    createCustomer,
    getCustomerById,
    findCustomers,
    updateCustomer,
    updateCustomerVip,
    updateCustomerStatus,
    updateCustomerSegment,
    deleteCustomer
}