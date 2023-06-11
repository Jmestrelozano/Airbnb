import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

type Data = {
  message: string;
};

export async function POST(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    return NextResponse.json({
      message: "Exito",
      status: NextResponse.json({}).status,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Server Errror",
      status: NextResponse.json({}).status,
    });
  }
}
