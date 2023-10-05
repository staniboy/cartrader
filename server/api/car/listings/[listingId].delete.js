import { serverSupabaseUser, serverSupabaseClient } from "#supabase/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event);

  if (!user.id) {
    throw createError({ statusCode: 401, statusMessage: "Not Authorized!" });
  }

  const { listingId } = event.context.params;

  const listing = await prisma.listing.findFirst({
    where: {
      id: parseInt(listingId),
    },
  });

  serverSupabaseClient(event)
    .storage.from("images")
    .remove([`${listing.image}`]);

  return prisma.listing.delete({
    where: {
      id: parseInt(listingId),
    },
  });
});
