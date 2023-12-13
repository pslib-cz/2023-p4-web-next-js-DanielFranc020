import { NextRequest } from "next/server";
import prisma from "../../../../lib/prisma";

export async function GET(req: NextRequest, { params }: { params: { id: string } }, res: Response) {
  try {
    const item = await prisma.inventoryItem.findUnique({
        where: {
          id: parseInt(params.id)
        },
      })

    return new Response(JSON.stringify(item), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  catch(e) {
    console.log(e);
    return new Response(
      JSON.stringify({
        message: "Internal Server Error",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}