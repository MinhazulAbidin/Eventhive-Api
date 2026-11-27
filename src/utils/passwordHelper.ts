import bcrypt from "bcrypt"

export const hashPass = (text: string) => {
    const hashPassword = bcrypt.hashSync(text, 8);
    return hashPass
}


export const comparePassword = (hashPass: string, password: string) => {
    const comparePass = bcrypt.compareSync(password, hashPass);
    return comparePass
}