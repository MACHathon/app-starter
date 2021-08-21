import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef, useState } from 'react';
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { client } from '../lib/Commercetools/Clients/APIClient';

const Home: NextPage = () => {

  useEffect(() => {

    client.products().get().execute().then((x) => {
        console.log(x);
    })
    
  }, []);  

  return (
    <div className={styles.container}>
      <Head>
        <title>Hello world!</title>
        <meta name="description" content="Starter" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Hello world</h1>

        <p className={styles.description}>
          Get started by editing{" "}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
          <div className="flex-shrink-0"></div>
          <div>
            <div className="text-xl font-medium text-black">Hello</div>
            <p className="text-gray-500">Tailwind</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
