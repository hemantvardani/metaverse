import {z} from 'zod';
// import {ERole} from '../../shared-constants/src/enum';

export const userSignUpZ= z.object({
    firstName:z.string().nonempty(),
    lastName:z.string().nonempty(),
    userName:z.string().nonempty(),
    password:z.string().nonempty(),
    // role : z.nativeEnum(ERole).optional()
})
.required({
    firstName:true,
    lastName:true,
    userName:true,
    password:true
})