import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const listingId = parseInt(event.context.params.listingId);

  return prisma.message.findMany({
    where: {
      listingId: listingId,
    },
  });
});
