import bcrypt from "bcrypt"

const hashPass = (text: string) => {
    const hashPassword = bcrypt.hashSync(text, 8);
    return hashPass
}


const comparePassword = (hashPass: string, password: string) => {
    const comparePass = bcrypt.compareSync(password, hashPass);
    return comparePass
}

export const passwordHelper = {
    hashPass, comparePassword
}