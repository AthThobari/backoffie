import { NextResponse } from "next/server";
import prisma from "@/prisma/client";

const bcrypt = require("bcryptjs")

//@ts-ignore
export async function POST(req) {
    const { name, email, password, no_tlpn} = await req.json()
//@ts-ignore
    const validateEmail = await prisma.user.findUnique({ where: {
        email
     }})
    if(validateEmail) {
        return NextResponse.json({message: "Email already exist!"})
    }

    const hashPassword = await bcrypt.hash(password, 12)
    //@ts-ignore
    const resAdd = await prisma.user.create({data: {
        name,
        email,
        password: hashPassword,
        no_tlpn: no_tlpn
    }});
    await prisma.$disconnect();
    return NextResponse.json({
        message: "register data successfully!",
        data: resAdd,
    })

}