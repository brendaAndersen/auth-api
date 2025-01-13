import { hash, compare } from "bcryptjs";

export async function hashPassword(password: string) : Promise<string>{
    return hash(password, 10);
}
// função que verifica se a senha está correta
export async function verifyPassword(password: string, hash: string) : Promise<boolean>{
    try {
       return await compare(password, hash);
    } catch (error) {
        console.error("Error comparing password:", error);
    return false;
    }
}