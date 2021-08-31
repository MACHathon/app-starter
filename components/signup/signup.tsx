import {
  CustomFields,
  FieldContainer,
  TypeReference,
} from "@commercetools/platform-sdk/dist/generated/models/type";
import React, { useState, useEffect } from "react";
import { AnonUserClient } from "../../packages/Commercetools/Clients/ApiClient";

interface SignUpProps {}

const SignUp: React.FC<SignUpProps> = ({}) => {
  const [parentEmail, setParentEmail] = React.useState<string>("");
  const [parentPassword, setParentPassword] = React.useState<string>("");
  const [parentName, setParentName] = React.useState<string>("");

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
      // Register Parent
      let parentResponse = await AnonUserClient.me()
        .signup()
        .post({
          body: {
            email: parentEmail,
            password: parentPassword,
            firstName: parentName,
            // Link the child
            companyName: `${username}-child@toyken.org`, // Should use a custom field but for times sake hacking it
          },
        })
        .execute();

      if (parentResponse.statusCode == 201) {
        console.log(parentResponse);

        // Register Child

        // Get an ID
        let latestUserId = await AnonUserClient.customObjects()
          .get({ queryArgs: { where: 'key="latestId"' } })
          .execute();

        let currentId = +latestUserId?.body?.results[0].value;
        let newId = "00" + currentId + 1;

        let response = await AnonUserClient.me()
          .signup()
          .post({
            body: {
              email: `${username}-child@toyken.org`,
              title: newId,
              password: password,
              firstName: username, // Should use a custom field but for times sake hacking it
            },
          })
          .execute();

        console.log(response);

        if (response.statusCode == 201) {
          setIsLoggedIn(true);
          setIsWaiting(false);
        } else {
          setIsWaiting(false);
          setIsError(true);
        }
      } else {
        setIsWaiting(false);
        setIsError(true);
      }
    })();
  };

  const handleParentNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setParentName(event.target.value);
  };

  const handleParentEmailChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setParentEmail(event.target.value);
  };

  const handleParentPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setParentPassword(event.target.value);
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
        <div className="w-1/4">
          <div className="mb-4">
            <label
              className="block text-grey-darker text-sm font-bold mb-2"
              htmlFor="name"
            >
              Your name (Parent)
            </label>
            <input
              className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
              id="name"
              onChange={handleParentNameChange}
              placeholder="Your Name"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-grey-darker text-sm font-bold mb-2"
              htmlFor="parentEmail"
            >
              Email address (Parent)
            </label>
            <input
              className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
              id="parentEmail"
              onChange={handleParentEmailChange}
              placeholder="Email address"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-grey-darker text-sm font-bold mb-2"
              htmlFor="parentPassword"
            >
              Password (Parent)
            </label>
            <input
              className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
              id="parentPassword"
              onChange={handleParentPasswordChange}
              placeholder="Password"
              type="password"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-grey-darker text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username for your child
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
              Choose a PIN number for your child
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
              onClick={handleSignUpClick}
            >
              Create account
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
