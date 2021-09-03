import {  LoggedInUserClient } from "../Clients/ApiClient";

export const getInventory = async (retailerCommercetoolsId: string) => {

  return await LoggedInUserClient.productProjections().search().get( { queryArgs : { markMatchingVariants: false, filter: 'variants.attributes.assigned-to:"a2f74fcd-7cbc-45f6-b790-e3322bf554f3"'} }).execute();
};
