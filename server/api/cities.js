import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const listings = await prisma.listing.findMany();

  const uniqueCities = Array.from(
    new Set(listings.map((listing) => listing.city))
  );

  return uniqueCities;
});
