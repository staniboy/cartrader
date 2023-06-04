import { PrismaClient } from "@prisma/client";
import Joi from "joi";

const prisma = new PrismaClient();

const validation = Joi.object({
  email: Joi.string().email({ maxDomainSegments: 2 }).required(),
  phone: Joi.string()
    .pattern(/^[0-9]+$/)
    .required(),
  name: Joi.string().required(),
  message: Joi.string().min(20).required(),
});

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const listingId = parseInt(event.context.params.listingId);
  const { value, error } = validation.validate(body);

  if (error) {
    throw createError({
      statusCode: 412,
      message: error.message,
    });
  }
  return await prisma.message.create({
    data: { ...value, listingId },
  });
});
