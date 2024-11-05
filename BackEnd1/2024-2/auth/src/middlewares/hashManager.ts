import * as bcrypt from 'bcryptjs';

export const hash = async (s: string): Promise<string> => {
    const rounds = Number(process.env.BCRYPT_COST);
    const salt = await bcrypt.genSalt(rounds);
    const cypherText = await bcrypt.hash(s, salt);
    return cypherText;
}

export const compare = async (s: string, hash: string) => {
    const result = await bcrypt.compare(s, hash);
    return result;
}