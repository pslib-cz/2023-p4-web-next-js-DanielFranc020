import prisma from "../../../lib/prisma";

export async function GET(req: Request, res: Response) {
  try {
    const items = await prisma.InventoryItem.findMany({
      select: {
        id: true,
        serial_number: true,
        name: true,
        createdAt: true,
        count: true
      },
    });
    return new Response(JSON.stringify(items), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  catch(e) {
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

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json()
    console.log(body.name, body.count, body.serial_number)
    if (!body.name || !body.count || !body.serial_number) {
      return new Response(
        JSON.stringify({
          message: "All inputs must be filled",
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
    const user = await prisma.InventoryItem.create({
      data: {
        name: body.name,
        serial_number: body.serial_number,
        count: body.count
      },
    });
    return new Response(JSON.stringify(user), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  catch(e) {
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

// export async function DELETE(req: Request, res: Response) {
//   try {
//     const body = await req.json()
//     const device = await prisma.device.delete({
//       where: { id: body.id}
//     });
//     return new Response(
//       JSON.stringify({
//         message: "Device deleted: " + body.id,
//       }),
//       {
//         status: 200,
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//   }
//   catch {
//     return new Response(
//       JSON.stringify({
//         message: "Internal Server Error",
//       }),
//       {
//         status: 500,
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//   }
// }