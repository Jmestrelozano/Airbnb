import qs from "query-string";

export function buildCategoryQueryUrl(
  paramsString: string | null,
  label: string,
  currentCategory: string | null
) {
  const currentQuery = paramsString ? qs.parse(paramsString) : {};

  const updatedQuery: Record<string, string | undefined> = {
    ...currentQuery,
    category: label,
  };

  if (currentCategory === label) {
    delete updatedQuery.category;
  }

  return qs.stringifyUrl(
    {
      url: "/",
      query: updatedQuery,
    },
    { skipNull: true }
  );
}
