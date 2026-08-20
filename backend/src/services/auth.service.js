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
        user:  {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            status: user.status
        },

        token
    }

}


export default {
    login,
}

