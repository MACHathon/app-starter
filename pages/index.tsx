import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Login from "../components/login/login";
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
        <h1 className="text-2xl font-normal leading-normal mt-0 mb-2 text-blueGray-800 pb-2">Child Login</h1>
        <Login />
        {/* <div>
          <a href="/register" className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-indigo-600 bg-indigo-200 uppercase last:mr-0 mr-1 mt-6">Register</a>
        </div> */}
      </main>
    </div>
  );
};

export default Home;
