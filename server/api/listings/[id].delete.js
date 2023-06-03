import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const { id: listingId } = event.context.params;

  return prisma.listing.delete({
    where: {
      id: parseInt(listingId),
    },
  });
});
