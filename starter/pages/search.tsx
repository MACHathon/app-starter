import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  SearchBox,
  Hits,
  RefinementList,
} from "react-instantsearch-dom";

const searchClient = algoliasearch(
  "0E1KIME6XO",
  "2835d4eac134b9e056601f8140effc1b"
);

const Search: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Hello search!</title>
        <meta name="description" content="Starter" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Hello search</h1>
        <InstantSearch searchClient={searchClient} indexName="toykens">
          <SearchBox />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <p>Age range</p>
            <RefinementList attribute="facets.age-range" />
            <p>Brand</p>
            <RefinementList attribute="facets.brand" />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Hits />
          </div>
        </InstantSearch>

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

export default Search;
