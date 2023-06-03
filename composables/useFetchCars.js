export default async (city, params) => {
  const route = useRoute();

  const { data, error, refresh } = await useFetch(`/api/cars/${city}`, {
    params: { ...params },
  });

  if (error.value) {
    throw createError({
      ...error.value,
      statusMessage: "Unable to fetch cars",
    });
  }

  return { data, refresh };
};
