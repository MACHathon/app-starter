import {
  CustomFields,
  FieldContainer,
  TypeReference,
} from "@commercetools/platform-sdk/dist/generated/models/type";
import React, { useState, useEffect } from "react";
import { AnonUserClient } from "../../lib/Commercetools/Clients/ApiClient";

interface SignUpProps {}

const SignUp: React.FC<SignUpProps> = ({}) => {
  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [isWaiting, setIsWaiting] = React.useState<boolean>(false);
  const [signUpcomplete, setIsLoggedIn] = React.useState<boolean>(false);
  const [isError, setIsError] = React.useState<boolean>(false);

  // useEffect(() => {
  //   LoggedInUserClient.me()
  //     .get()
  //     .execute()
  //     .then((response: any) => {
  //       if (!!response?.body?.id) {
  //         console.log(response);
  //         setIsLoggedIn(true);
  //         setIsWaiting(false);
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setIsWaiting(false);
  //     });
  // }, []);

  const handleSignUpClick = () => {
    (async () => {
      
      // This didn't work, I suspect because we need to set up the custom field on the customer first.

      // let customData: FieldContainer = [{ username }];

      // let typeRef: TypeReference = {
      //   id: "username",
      //   typeId: "type",
      // };

      // var customField: CustomFields = {
      //   fields: customData,
      //   type: typeRef,
      // };

      let response = await AnonUserClient.me()
        .signup()
        .post({
          body: {
            email: `${username}@toyken.org`,
            password: password,
            firstName: username, // Using first name as username as other fields don't seem to be avaiable in CustomerDraft
          },
        })
        .execute();

      if (response.statusCode == 201) {
        setIsLoggedIn(true);
        setIsWaiting(false);
      } else {
        setIsWaiting(false);
        setIsError(true);
      }

      console.log(response);
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
      ) : signUpcomplete ? (
        <h1>Success!</h1>
      ) : (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
          <div className="mb-4">
            <label
              className="block text-grey-darker text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
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
              Pin #
            </label>
            <input
              className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
              id="password"
              onChange={handlePasswordChange}
              placeholder="PIN"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-green-600 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
              onClick={handleSignUpClick}
            >
              Sign Up
            </button>
            <p className="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker">
              {isError ? <div>Error...</div> : null}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default SignUp;
