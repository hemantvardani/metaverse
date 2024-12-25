import {z} from 'zod';

const UserSignUp= z.object({
    firstName:z.string(),
    lastName:z.string(),
    userName:z.string(),
    password:z.string(),
    // role : z.enum(ERole)
})