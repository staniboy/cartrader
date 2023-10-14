import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const messageId = parseInt(event.context.params.messageId);

  return prisma.message.delete({
    where: {
      id: parseInt(messageId),
    },
  });
});
