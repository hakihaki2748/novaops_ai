import bcrypt from "bcrypt";
import authRepository from "../repositories/auth.repository.js";
import { generateToken } from "../utils/jwt.js";
import AppError from "../utils/AppError.js";


const login = async (data) => {
    const user = await authRepository.findUserByEmail(data.email); //jika menggunakan mysql harus dirubah
   // pengecekan sebelum di repository saat menggunakan mysql harus lebih baik
    if (!user) {
        throw new AppError("email atau password salah", 401);
    }

    if(user.status !== "active"){
        throw new AppError("Akun Tidak Aktif", 401);
    }


    const passCompare = await bcrypt.compare(data.password, user.password)

    if(!passCompare){
        throw new AppError("email atau password salah", 401);
    }

    const token = generateToken({
        id: user.id,
        role: user.role
    })

    return {
        user,
        token
    }

}

const register = async (data) => {
     
    const findUser = await authRepository.findUserByEmail(data.email);

    if(findUser){
        throw new AppError("email sudah digunakan")
    }
    
    //kita lakukan hashPassword sebelum didaftarkan
    const hashPassword = await bcrypt.hash(data.password, 10)

    const user = await authRepository.createUser({
        name: data.name,
        phone: data.phone,
        email: data.email,
        password: hashPassword
    })

    return user;
}


export default {
    login,
    register,
}

