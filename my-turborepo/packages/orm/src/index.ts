import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

const action= async()=>{

    try{
        console.log("count",await prisma.user.findMany());
        await prisma.user.create({ data:{firstName:"hemant",
            lastName:"Vardani",
            pwdHash :"sfs",
            userName:"hemant1720"}})
        console.log("count",await prisma.user.findMany());
    }catch(err){
        console.log(err);
    } finally{
        await prisma.$disconnect()
    }
}

// action();