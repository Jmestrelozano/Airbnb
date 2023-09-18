import { NextResponse } from "next/server";
export const runtime = 'edge'; // 'nodejs' is the default
export const preferredRegion = 'iad1';
import bcrypt from "bcrypt";

import prismadb from "../../db/prismadb";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, name, password } = body;

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prismadb.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    });

    return NextResponse.json({
      data: user,
      message: "Exitoso",
      status: NextResponse.json({}).status,
    });
  } catch (error) {
    return NextResponse.json({
      data: null,
      message: "Server Errror",
      status: NextResponse.json({}).status,
    });
  }
}
