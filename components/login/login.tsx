import React, { useState, useEffect } from "react";
import { getCategories } from "../../packages/Commercetools/Categories/getCategories";
import {
  AnonUserClient,
  LoggedInUserClient,
} from "../../packages/Commercetools/Clients/ApiClient";
import { assignItem } from "../../packages/Commercetools/Items/assignItemToRetailer";
import { createItem } from "../../packages/Commercetools/Items/createItem";
import { createRetailer } from "../../packages/Commercetools/Users/createUser";
import { getMe } from "../../packages/Commercetools/Users/getUser";

interface LoginProps {}

const Login: React.FC<LoginProps> = ({}) => {
  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [isWaiting, setIsWaiting] = React.useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);
  const [isError, setIsError] = React.useState<boolean>(false);

  useEffect(() => {
    (async () => {
      
      /*** TESTING ALL THE API CALLS TO CT ***/ 

      var me = await getMe();

      console.log("me");
      console.log(me);

      if (!!me) {        
        setIsLoggedIn(true);
        setIsWaiting(false);
      } else {
        setIsWaiting(false);
      }

      var categories = await getCategories();
      console.log(categories);

      if (me?.userType == 'child') {
        let createdItem = await createItem(categories[1].id, "Daves Barbie Stickers", me.id as string, "5-8", "Used - good", "Barbie");
        console.log("Created Item: " + createdItem.body.id);
      }

      //createRetailer("dave-retailer@gmail.com", "password", "Dave Retailer", "BS30 6EL", "UK");

      if (me?.userType == 'retailer') {
        // Product ID, SKU
        assignItem(me.commerceToolsId,  "0902b7ad-7c3c-4351-99e2-3b290f9a9e53", "00661-daves-barbie-stickers");
        console.log("Assigned Item to Retailer");
      }
    })();
  }, []);

  

  const handleLoginClick = () => {
    (async () => {
      const rawResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}/api/login`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        }
      );

      if (rawResponse.status != 200) {
        setIsError(true);
      } else {
        const content = await rawResponse.json();

        if (!!content?.access_token) {
          setIsLoggedIn(true);
          setIsWaiting(false);
        }
      }
    })();
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <>
      {isWaiting ? (
        <h1>Loading spinner here...</h1>
      ) : isLoggedIn ? (
        <h1>Logged in</h1>
      ) : (
        <div className="w-1/4">
          <div className="">
            <div className="mb-4">
              <label
                className="block text-grey-darker text-sm font-bold mb-2"
                htmlFor="username"
              >
                Your ID
              </label>
              <input
                className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
                id="username"
                onChange={handleUsernameChange}
                placeholder="Username"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-grey-darker text-sm font-bold mb-2"
                htmlFor="password"
              >
                Your PIN number
              </label>
              <input
                className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
                id="password"
                onChange={handlePasswordChange}
                placeholder="PIN"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="w-full bg-green-600 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                onClick={handleLoginClick}
              >
                Login
              </button>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-red-600 pt-2 inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker">
                {isError ? <div>Invalid credentials</div> : null}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
