import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const { userId } = event.context.params;

  return prisma.listing.findMany({
    where: {
      userId: userId,
    },
    select: {
      image: true,
      id: true,
      model: true,
      make: true,
      price: true,
    },
  });
});
