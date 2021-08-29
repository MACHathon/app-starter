import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import SignUp from "../components/signup/signup";

const Home: NextPage = () => {
  
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <Head>
        <title>Toykens!</title>
        <meta name="description" content="Toyken" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
      <h1 className="text-2xl font-normal leading-normal mt-0 mb-2 text-blueGray-800 pb-6">Create an account for your child</h1>
        <SignUp />
      </main>
    </div>
  );
};

export default Home;
