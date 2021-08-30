/** @type {import('next').NextConfig} */

const env = require('@next/env');

env.loadEnvConfig('.');

const config = {
  publicRuntimeConfig: {
    commercetools: {
      apiHost: 'https://api.europe-west1.gcp.commercetools.com',
      authHost: 'https://auth.europe-west1.gcp.commercetools.com',
      projectKey: process.env.COMMERCE_TOOLS_PROJECT_KEY,
      credentials: {
        // Note: commercetools ID + Secret are expected to be available client-side
        clientId: process.env.COMMERCE_TOOLS_CLIENT_ID,
        clientSecret: process.env.COMMERCE_TOOLS_CLIENT_SECRET,
      }
    },
  },
};

module.exports = {
  config
}
