const getCurrentUser = () => {
    try{
        const user  = localStorage.getItem("user")

        if(!user){
            return null
        }

        return JSON.parse(user)
    }catch(err){
        console.error("Gagal Membaca User", err)
        return null
    }
}

const clearCurrentUser = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
}

export { getCurrentUser, clearCurrentUser }
