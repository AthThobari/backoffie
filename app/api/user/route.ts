import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
const jwt = require("jsonwebtoken");

// Middleware for access validation
//@ts-ignore
const accessValidation = (req) => {
    const authorization = req.headers.get('authorization');
    
    if (!authorization) {
        return NextResponse.json({
            message: "token is needed!"
        },{
            status: 401
        });
    }
    
    const token = authorization.split(' ')[1];

    console.log('ini adalah tokennya:',token)
    const secret = process.env.JWT_SECRET_ENV;
    console.log("secret:",secret)

    try {
        const jwtDecode = jwt.verify(token, secret);
        return { valid: true, payload: jwtDecode }; // return decoded token if valid
    } catch (error) {
        return NextResponse.json({
            message: "Unauthorized"
        },{
            status: 401
        });
    }
}

// GET handler with middleware
//@ts-ignore
export async function GET(req) {
    // Apply middleware for access validation
    const authResult = accessValidation(req);
    
    // If middleware returns a response (error case), return immediately
    if (authResult instanceof NextResponse) {
        return authResult;
    }

    // If access is valid, continue to get user data
    const user = await prisma.user.findMany();

    return NextResponse.json({
        success: true,
        message: "list data user",
        data: user
    }, {
        status: 200
    });
}
