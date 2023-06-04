import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const { city } = event.context.params;
  const { make, minPrice, maxPrice } = getQuery(event);

  const filter = {
    city: city.toLowerCase().replace("%20", " "),
  };

  if (make) filter.make = make;

  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.gte = parseInt(minPrice);
    if (maxPrice) filter.price.lte = parseInt(maxPrice);
  }
  return await prisma.listing.findMany({
    where: filter,
  });
});
