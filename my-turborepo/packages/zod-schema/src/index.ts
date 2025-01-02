import {z} from 'zod';
import { userLoginPassword } from "@repo/shared-constants/dist/regex"
// import {ERole} from '../../shared-constants/src/enum';

export const userSignUpZ= z.object({
    firstName:z.string().nonempty(),
    lastName:z.string().nonempty(),
    userName:z.string().nonempty(),
    password:z.string().nonempty().min(8,{message:"Password should be of atleast 8 length."}).regex(userLoginPassword, {message:"Password should have atleast 1 upper case and 1 lower case letter. Also, 1 special and 1 number."}),
    // role : z.nativeEnum(ERole).optional()
})
.required({
    firstName:true,
    lastName:true,
    userName:true,
    password:true
})