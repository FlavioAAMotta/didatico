import * as bcrypt from 'bcryptjs'

export const hash = async (text: string): Promise<string> => {
    const rounds = Number(process.env.BCRYPT_COST);
    const salt = await bcrypt.genSalt(rounds);
    const cypherText = await bcrypt.hash(text, salt);
    return cypherText;
}

export const compare = async (text: string, hash: string) => {
    const result = await bcrypt.compare(text, hash);
    return result;
}