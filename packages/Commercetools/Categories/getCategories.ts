import { AnonUserClient } from "../Clients/ApiClient";

const getCategoriesQuery = () => {
  return AnonUserClient.categories().get().execute();
};

export const getCategories = async () => {
  const result = await getCategoriesQuery();

  let categories = result?.body?.results
    .filter((i: { ancestors: string | any[] }) => i.ancestors.length)
    .map((cat: { name: any; id: any }) => ({
      name: cat.name,
      id: cat.id,
    }));

  return categories;
};
