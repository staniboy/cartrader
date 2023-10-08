export default async (city, params) => {
  const route = useRoute();

  const { data, error, refresh } = await useFetch(`/api/cars/${city}`, {
    method: "GET",
    params: { ...params },
  });

  if (error.value) {
    throw createError({
      ...error.value,
    });
  }

  return { data, refresh };
};
