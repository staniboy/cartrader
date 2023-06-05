import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const id = parseInt(event.context.params.id);
  const car = await prisma.listing.findUnique({
    where: {
      id: id,
    },
  });
  if (!car) {
    throw createError({
      statusCode: 404,
      statusMessage: `Car with ID ${id} does not exist.`,
    });
  }
  return car;
});
