export function validatePasswordPolicy (password){

    let valid = true
    const errors = []

    // minimum 12
    // maximum 100
    if(password.length < 12 || password.length > 100){
        valid = false,
        errors.push("Karakter kurang dari 12 atau lebih dari 100 digit")
    };
    
    // uppercase
    if(!/[A-Z]/.test(password)){
            valid= false,
            errors.push("Minimal ada 1 Huruf Kapital")
    
    };

    // lowercase
    if (!/[a-z]/.test(password)){
            valid = false,
            errors.push("Minimal ada 1 Huruf Kecil")
    };

    // number
    if(!/[0-9]/.test(password)){
        valid = false
        errors.push("Minimal ada 1 Angka")
    };
    
    // symbol
    if(!/[^A-Za-z0-9]/.test(password)){
        valid = false
        errors.push("Minimal ada 1 Symbol")
    }

    return {
        valid,
        errors
    }
}