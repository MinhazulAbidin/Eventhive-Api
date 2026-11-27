import { AppError } from "../../errors/app-errors";
import { authRepository } from "./auth.repository";
import { jwtHelpers } from "../../utils/jwt-helper";
import { passwordHelper } from "../../utils/passwordHelper";
import type { IUser } from "./auth.interface";

const signUpIntoDb = async (payload: IUser) => {
    const { name, email, password, role } = payload;

    const hashPass = passwordHelper.hashPass(password);

    const result = await authRepository.createUser(
        name,
        email,
        hashPass,
        role ?? "attendee"
    );

    return result;
};

const loginUser = async (email: string, password: string) => {
    const user = await authRepository.findUserByEmail(email);

    if (!user || !passwordHelper.comparePassword(user.password, password)) {
        throw new AppError("Invalid email or password", 401);
    }

    const tokenPayload = { id: user.id, role: user.role };
    const token = jwtHelpers.tokenGenerate(tokenPayload);

    return {
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    };
};

export const authService = {
    signUpIntoDb,
    loginUser
};