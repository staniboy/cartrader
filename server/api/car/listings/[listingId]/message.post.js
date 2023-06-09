import { useValidation } from "~/composables/useValidation";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const { message: validation } = useValidation();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const listingId = parseInt(event.context.params.listingId);

  const value = await validation.validate(body).catch((error) => {
    throw createError({
      statusCode: 412,
      message: error.message,
    });
  });

  return await prisma.message.create({
    data: { ...value, listingId: listingId },
  });
});
