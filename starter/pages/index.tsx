import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import {
  AnonUserClient,
  LoggedInUserClient,
} from "../lib/Commercetools/Clients/APIClient";
import Login from "../components/login/login";

const Home: NextPage = () => {
  
  // Sign up to do
  // useEffect(() => {
  //   AnonUserClient.me()
  //     .signup()
  //     .post({ body: { email: "dave@daveleigh.xyz", password: "password" } })
  //     .execute()
  //     .then((x) => {
  //       console.log(x);
  //     });
  // }, []);

  // Once logged in..
  // LoggedInUserClient
  //   .me()
  //   .get()
  //   .execute()
  //   .then((x) => {
  //     console.log(x);
  //   });


  return (
    <div className={styles.container}>
      <Head>
        <title>Hello world!</title>
        <meta name="description" content="Starter" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Login />
      </main>
    </div>
  );
};

export default Home;
