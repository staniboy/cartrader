import { useValidation } from "~/composables/useValidation";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const { listing: listingValidation } = useValidation();

  const body = await readBody(event);
  let listing;
  await listingValidation
    .validate(body)
    .catch((error) => {
      throw createError({
        statusCode: 412,
        message: error.message,
      });
    })
    .then(async (result) => {
      await prisma.listing
        .create({
          data: {
            ...result,
            city: result.city.toLowerCase(),
            features: result.features
              ? result.features
                  .split(",")
                  .map((item) => item.trim())
                  .filter((item) => item !== "")
              : undefined,
          },
        })
        .then((value) => (listing = value));
    });
  return listing;
});
