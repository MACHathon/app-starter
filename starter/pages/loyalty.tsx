import type { NextPage } from "next";
import Head from "next/head";
import React, { useEffect } from "react";
import styles from "../styles/Home.module.css";

//import TalonOne from "talon_one";
const TalonOne = require("talon_one");

const Loyalty: NextPage<any> = () => {
  const defaultClient = TalonOne.ApiClient.instance;
  defaultClient.basePath = "https://valtech.europe-west1.talon.one";

  const api_key_v1 = defaultClient.authentications["api_key_v1"];
  api_key_v1.apiKey = process.env.NEXT_PUBLIC_TALONONE_API_KEY ?? "";
  api_key_v1.apiKeyPrefix = "ApiKey-v1";
  const integrationApi = new TalonOne.IntegrationApi();

  const [userLoyaltyInfo, setUserLoyaltyInfo] = React.useState<string>("");
  const customerId = "41c6e13b-f54c-43df-b65d-9d326e5954de";
  function getData() {
    return integrationApi.getCustomerInventory(customerId, {
      loyalty: true,
    });
  }

  useEffect(() => {
    getData().then((response: any) => {
      setUserLoyaltyInfo(JSON.stringify(response));
    });
  }, []);
  const incrementToykensClick = () => {
    integrationApi
      .updateCustomerProfileV2(
        customerId,
        {
          responseContent: ["customerProfile"],
        },
        { runRuleEngine: true }
      )
      .then((response: any) => {
        //todo - how do we increment points on demand?
        setUserLoyaltyInfo(JSON.stringify(response));
      });
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Hello loyalty!</title>
        <meta name="description" content="Starter" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Hello loyalty</h1>

        {userLoyaltyInfo}
        <button
          className="bg-green-600 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          onClick={incrementToykensClick}
        >
          Increment toykens
        </button>
      </main>
    </div>
  );
};

export default Loyalty;
