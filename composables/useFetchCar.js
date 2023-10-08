export default async (id) => {
  const route = useRoute();

  const { data, error } = await useFetch(`/api/car/${id}`, { method: "GET" });

  if (error.value) {
    throw createError({ ...error.value });
  }

  return { data };
};
