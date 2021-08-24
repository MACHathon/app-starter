import {
  createAuthMiddlewareForClientCredentialsFlow,
  createAuthMiddlewareWithExistingToken,
} from "@commercetools/sdk-middleware-auth";
import { createHttpMiddleware } from "@commercetools/sdk-middleware-http";
import { createClient } from "@commercetools/sdk-client";
import { createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";
import fetch from "node-fetch";
import cookie from "cookie";
import { TokenInfo } from "@commercetools/sdk-auth";

const projectKey = process.env.NEXT_PUBLIC_COMMERCE_TOOLS_PROJECT_KEY ?? "";

const authMiddleware = createAuthMiddlewareForClientCredentialsFlow({
  host: "https://auth.europe-west1.gcp.commercetools.com",
  projectKey,
  credentials: {
    clientId: "o04rLcoBXPc01VY3JH_1oc8V",
    clientSecret: "7PGH7wsAOasZmtqtezT-Ef556IsJcJOU",
  },
  fetch,
});

const httpMiddleware = createHttpMiddleware({
  host: "https://api.europe-west1.gcp.commercetools.com",
  fetch,
});

const anonClient = createClient({
  middlewares: [authMiddleware, httpMiddleware],
});

export const AnonUserClient = createApiBuilderFromCtpClient(
  anonClient
).withProjectKey({
  projectKey: process.env.NEXT_PUBLIC_COMMERCE_TOOLS_PROJECT_KEY ?? "",
});

const getToken: TokenInfo | null = () => {
  if (process.browser) {
    const cookieValue = cookie.parse(document.cookie)["token"];

    console.log(cookieValue);

    return cookieValue as TokenInfo;
  }

  return null;
};

const tokenMiddleware = createAuthMiddlewareWithExistingToken(
  `Bearer ${getToken()}`,
  {
    host: "https://auth.europe-west1.gcp.commercetools.com",
    projectKey,
    credentials: {
      clientId: process.env.NEXT_PUBLIC_COMMERCE_TOOLS_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_COMMERCE_TOOLS_CLIENT_SECRET,
    },
    fetch,
    force: true,
  }
);

const loggedInUserClient = createClient({
  middlewares: [tokenMiddleware, httpMiddleware],
});

export const LoggedInUserClient = createApiBuilderFromCtpClient(
  loggedInUserClient
).withProjectKey({
  projectKey: process.env.NEXT_PUBLIC_COMMERCE_TOOLS_PROJECT_KEY ?? "",
});
