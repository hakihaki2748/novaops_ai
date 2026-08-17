export function validatePassword (password){
    //role
    // minimum 12
    if(typeof password !== "string"){
        return {
            valid: false,
            message: "Password harus String"
        }
    };

    // maximum 100
    if(password.length < 12 && password.length > 100){
        return {
            valid: false,
            message: "Carachter Antara 12 dan 100 Digit"
        }
    };
    
    // uppercase
    if(!/[A-Z]/.test(password)){
        return {
            valid: false,
            message: "Minimal ada 1 Huruf Kapital"
        }
    };

    // lowercase
    if (!/[a-z]/.test(password)){
        return {
            valid: false,
            message: "Minimal ada 1 Huruf Kecil"
        }
    };

    // number
    if(!/[0-9]/.test(password)){
        return {
            valid: false,
            message: "Minimal ada 1 Angka"
        }
    };
    
    // symbol
    if(!/[^A-Za-z0-9]/.test(password)){
        return {
            valid: false,
            message: "Minimal ada 1 Symbol"
        }
    }

    return {
        valid: true,
        message: null
    }
}