// function that returns a hash, once a string is passed on to it
import bcrypt from "bcryptjs";

export async function hash (str, round){
    const salt = await bcrypt.genSalt(round)
    return await bcrypt.hash(str, salt)
}