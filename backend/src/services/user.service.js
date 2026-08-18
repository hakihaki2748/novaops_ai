import bcrypt from "bcrypt"
import userRepository from "../repositories/user.repository.js";
import activityRepository from "../repositories/activity.repository.js";
import { transaction, commit, rollback } from "../config/transaction.js";
import AppError from "../utils/AppError.js";
import { validatePasswordPolicy } from "../utils/passwordPolicy.js";


const getUsers = async (query, currentUser) => {
    
    //batasi page dan limit
    let page = Number(query.page) || 1
    let limit = Number(query.limit) || 10
    let activeOnly = query.activeOnly === "true" ? true : false;
    
    //validasi limit
    if(page < 1) page = 1;
    if(limit < 1 ) limit = 10;
    if(limit > 100 ) limit = 100;
    
    //panggil repository
    const users = await userRepository.findUsers({
        search: query.search,
        page,
        limit,
        sortBy: query.sortBy,
        sortOrder: query.sortOrder,
        activeOnly: activeOnly,
        currentRole: currentUser.role
    })

    return users;
};



const findUserById = async (id, currentUser) => {

        const targetUser = await userRepository.findUserById(id)

        if(!targetUser){
            throw new AppError("ID Tidak Ditemukan", 404);
        }

        if(currentUser.role !== "owner" && targetUser.role === "owner") {
            throw new AppError("Tidak Memiliki Akses", 403)
        }

        if(targetUser.role === "owner"  && Number(targetUser.id) !== Number(currentUser.id)){
            throw new AppError("Tidak Memiliki Akses", 403)
        }

        return targetUser;
   
};


const updateStatus = async ({id, status, currentUser}) => {
    //selain admin dan owner tidak boleh
    if(currentUser.role !== "owner" && currentUser.role !== "admin") throw new AppError("Tidak Memiliki Akses", 403);
    
    const connection = await transaction();
   
    try{

        const targetUser = await userRepository.findUserById(id, connection);

        if(!targetUser) throw new AppError("User Tidak Ditemukan", 404);

        //kecualikan target
        if(targetUser.role === "owner") throw new AppError("Tidak Memiliki Akses", 403)
        
        if(targetUser.role === "manager" && currentUser.role === "admin") throw new AppError("Tidak Memiliki Akses", 403)

        await userRepository.updateStatus(id, status, connection);

        await activityRepository.createLog({
            company_id: null,
            user_id: currentUser.id,
            actor_role: currentUser.role,
            event_type: "user.status_updated",
            entity_type: "user",
            entity_id: id,
            description: "merubah status user"
        }, connection)

        await commit(connection);
        return true;
    }catch(err){
        await rollback(connection);
        throw err;
    } finally {
        connection.release();
    }

};  

const updateRole = async ({id, role, currentUser}) => {
    
    //selain owner dan admin ditolak
    if(currentUser.role !== "owner" && currentUser.role !== "admin"){
        throw new AppError("Tidak Memiliki Akses", 403)
    }

    if(role === "owner") throw new AppError("Owner tidak Bisa di Ubah", 403)

    if(currentUser.role === "admin" && role === "manager") throw new AppError("Tidak Memiliki Akses", 403)
            
    const connection =  await transaction();

    try{
       
        const targetUser = await userRepository.findUserById(id, connection);

        if(!targetUser){
            throw new AppError("User Tidak Ditemukan", 404);
        }

        if(targetUser.role === "owner") throw new AppError("Tidak Memiliki Akses", 403)
        
        if(targetUser.role === "manager" && currentUser.role === "admin") throw new AppError("Tidak Memiliki Akses", 403)

        await userRepository.updateRole(id, role, connection);

        await activityRepository.createLog({
                company_id: null,
                user_id: currentUser.id,
                actor_role: currentUser.role,
                event_type: "user.role_updated",
                entity_type: "user",
                entity_id: id,
                description: "merubah role user"
            }, connection);

        await commit(connection);
        
        return true;

    }catch(err){
        await rollback(connection);
        throw err;
    }finally{
        connection.release();
    }
};


const createUser = async (payload, currentUser) => {

     //hanya owner dan admin yang bisa melakukan create
    if(currentUser.role !== "owner" && currentUser.role !== "admin"){
        throw new AppError("Tidak Memiliki Akses", 403)
    }

    //role owner tidak bisa dibuat
    if(payload.role === "owner"){
        throw new AppError("Role Owner Tidak Bisa Dibuat", 403)
    }

    //admin tidak boleh membuat role manager
    if(currentUser.role === "admin" && payload.role == "manager"){
        throw new AppError("Tidak Memiliki Akses", 403);
    }

    //password policy
    const policyPassword = validatePasswordPolicy(payload.password)
    
    if(!policyPassword.valid){
        throw new AppError(policyPassword.errors, 422)
    }
    //password hash
    const hashPassword = await bcrypt.hash(payload.password, 10)

    const connection = await transaction()

    

    try {

        //temukan email lalu cek apakah ada atau tidak
        const findEmail = await userRepository.findUserByEmail(payload.email, connection);
        
        //jika ada maka munculkan error
        if(findEmail){
            throw new AppError("Email Sudah Digunakan", 400)
        }

        const userId = await userRepository.createUser({
            name: payload.name,
            phone: payload.phone,
            email: payload.email,
            password: hashPassword,
            role: payload.role
        }, connection)
        
        await activityRepository.createLog({
            company_id: null,
            user_id: currentUser.id,
            actor_role: currentUser.role,
            event_type: "user.created",
            entity_type: "user",
            entity_id: userId,
            description: `${currentUser.role} menambahkan user baru`
        }, connection)

        await commit(connection)
        return userId;
    } catch (err) {
        await rollback(connection)
        throw err;
    }finally{
        connection.release();
    }
};

const softDelete = async ({id, currentUser}) => {
    //selain owner dan admin tidak boleh
    if(currentUser.role !== "owner" && currentUser.role !== "admin") throw new AppError("Tidak Memiliki Akses", 403)
    
    const connection = await transaction();

    try{
        const targetUser = await userRepository.findUserById(id, connection);

        //jika user tidak ada, 
        if (!targetUser) {
            throw new AppError("User Tidak Ditemukan", 404);
        }

        //owner tidak bisa dihapus
        if(targetUser.role === "owner"){
            throw new AppError("Owner Tidak Bisa di Hapus", 403);
        }

        //admin tidak bisa hapus manager
        if(currentUser.role === "admin" && targetUser.role === "manager") {
            throw new AppError("Tidak Memiliki Akses", 403)
        }


        await userRepository.softDelete(id, connection);
        
        await activityRepository.createLog({
            company_id: null,
            user_id: currentUser.id,
            actor_role: currentUser.role,
            event_type: "user.deleted",
            entity_type: "user",
            entity_id: id,
            description: `${currentUser.role} Mengahpus User`
        }, connection)

        await commit(connection)

    }catch(err){
        await rollback(connection);
        throw err;
    }finally{
        connection.release();
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