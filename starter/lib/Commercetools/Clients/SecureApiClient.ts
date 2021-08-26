import {
    createAuthMiddlewareForClientCredentialsFlow
  } from "@commercetools/sdk-middleware-auth";
  import { createHttpMiddleware } from "@commercetools/sdk-middleware-http";
  import { createClient } from "@commercetools/sdk-client";
  import { createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";
  import fetch from "node-fetch";

const projectKey = process.env.NEXT_PUBLIC_COMMERCE_TOOLS_PROJECT_KEY ?? '';

const authMiddleware = createAuthMiddlewareForClientCredentialsFlow({
  host: "https://auth.europe-west1.gcp.commercetools.com",
  projectKey,
  credentials: {
    clientId: process.env.COMMERCE_TOOLS_ADMIN_CLIENT_ID,
    clientSecret: process.env.COMMERCE_TOOLS_ADMIN_CLIENT_SECRET,
  },
  fetch,
});

const httpMiddleware = createHttpMiddleware({
  host: "https://api.europe-west1.gcp.commercetools.com",
  fetch,
});

const client = createClient({
  middlewares: [authMiddleware, httpMiddleware],
});

export const SecureApiClient = createApiBuilderFromCtpClient(
    client
).withProjectKey({
  projectKey: process.env.NEXT_PUBLIC_COMMERCE_TOOLS_PROJECT_KEY ?? '',
});