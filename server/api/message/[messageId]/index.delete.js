import { PrismaClient } from "@prisma/client";
import { serverSupabaseUser } from "#supabase/server";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event);

  if (!user.id) {
    throw createError({ statusCode: 401, statusMessage: "Not Authorized!" });
  }

  const messageId = parseInt(event.context.params.messageId);
  const message = await prisma.message.findFirst({
    where: {
      id: parseInt(messageId),
    },
  });

  const listing = await prisma.listing.findFirstOrThrow({
    where: {
      id: message.listingId,
      userId: user.id,
    },
  });

  if (!listing) {
    throw createError({ statusCode: 403, statusMessage: "Access Denied!" });
  }

  return prisma.message.delete({
    where: {
      id: parseInt(messageId),
    },
  });
});
