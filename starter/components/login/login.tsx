import React, { useState, useEffect } from "react";
import { LoggedInUserClient } from "../../lib/Commercetools/Clients/APIClient";

interface LoginProps {}

const Login: React.FC<LoginProps> = ({}) => {
  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [isWaiting, setIsWaiting] = React.useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);
  const [isError, setIsError] = React.useState<boolean>(false);

  useEffect(() => {
    LoggedInUserClient.me()
      .get()
      .execute()
      .then((response: any) => {
        if (!!response?.body?.id) {
          console.log(response);
          setIsLoggedIn(true);
          setIsWaiting(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setIsWaiting(false);
      });
  }, []);

  const handleLoginClick = () => {
    (async () => {
      const rawResponse = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

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
        <div>
          <p>dave@daveleigh.xyz</p>
          <p>password</p>
          <input onChange={handleUsernameChange} placeholder="Username" />
          <input
            onChange={handlePasswordChange}
            type="password"
            placeholder="Password"
          />
          <button onClick={handleLoginClick}>Login</button>
          {isError ? <div>Invalid credentials</div> : null}
        </div>
      )}
    </>
  );
};

export default Login;
