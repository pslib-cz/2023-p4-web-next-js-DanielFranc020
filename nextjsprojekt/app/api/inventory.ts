// pages/api/inventory.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '../../src/generated/client';
const prisma = new PrismaClient()

export default async function handler(

  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const items = await prisma.inventoryItem.findMany();
    res.status(200).json(items);
  } else if (req.method === 'POST') {
    const { itemName, quantity } = req.body;
    const newItem = await prisma.inventoryItem.create({
      data: {
        itemName,
        quantity,
      },
    });
    res.status(201).json(newItem);
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
