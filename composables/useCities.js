export default async () => {
  const { capitalizeSentence } = useUtils();
  const { data, error } = await useFetch(`/api/cities`);

  if (error.value) {
    throw createError({ ...error.value });
  }

  data.value = data.value.map((name) => capitalizeSentence(name));

  return { data };
};
