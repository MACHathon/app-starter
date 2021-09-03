import {  LoggedInUserClient } from "../Clients/ApiClient";

export const assignItem = async (retailerCommercetoolsId: string, productId:string, sku: string) => {

  var product = await LoggedInUserClient.products().withId({ ID: productId}).get().execute();
  
  var updatedProduct = await LoggedInUserClient.products().withId({ ID: productId }).post( { body: {
    version: product.body.version, 
    actions: [
       {
         sku,
         action: "setAttribute",
         name: "assigned-to",
         value: retailerCommercetoolsId        
       }
     ]
   }}).execute();

   product = await LoggedInUserClient.products().withId({ ID: productId}).get().execute();

   LoggedInUserClient.products().withId({ ID: productId }).post( { body: {
    version: product.body.version, 
    actions: [
       {
         action: "publish",
         scope: "All"       
       }
     ]
   }}).execute();
};

export const markItemAsReceived = async (retailerCommercetoolsId: string, productId:string, sku: string) => {

  var product = await LoggedInUserClient.products().withId({ ID: productId}).get().execute();
  
  var updatedProduct = await LoggedInUserClient.products().withId({ ID: productId }).post( { body: {
    version: product.body.version, 
    actions: [
       {
         sku,
         action: "setAttribute",
         name: "received-by-retailer",
         value: true   
       }
     ]
   }}).execute();

   product = await LoggedInUserClient.products().withId({ ID: productId}).get().execute();

   LoggedInUserClient.products().withId({ ID: productId }).post( { body: {
    version: product.body.version, 
    actions: [
       {
         action: "publish",
         scope: "All"       
       }
     ]
   }}).execute();
};


