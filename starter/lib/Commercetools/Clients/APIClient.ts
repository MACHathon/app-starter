import { createAuthMiddlewareForClientCredentialsFlow } from '@commercetools/sdk-middleware-auth'
import { createHttpMiddleware } from '@commercetools/sdk-middleware-http'
import { createClient } from '@commercetools/sdk-client'
import {
  createApiBuilderFromCtpClient,
  ApiRoot,
} from '@commercetools/platform-sdk'
import fetch from 'node-fetch'

const projectKey = process.env.NEXT_PUBLIC_COMMERCE_TOOLS_PROJECT_KEY ?? ''

const authMiddleware = createAuthMiddlewareForClientCredentialsFlow({
  host: 'https://auth.europe-west1.gcp.commercetools.com',
  projectKey,
  credentials: {
    clientId: process.env.NEXT_PUBLIC_COMMERCE_TOOLS_CLIENT_ID,
    clientSecret: process.env.NEXT_PUBLIC_COMMERCE_TOOLS_CLIENT_SECRET
  },
  fetch,
})

const httpMiddleware = createHttpMiddleware({
  host: 'https://api.europe-west1.gcp.commercetools.com',
  fetch,
})

const ctpClient = createClient({
  middlewares: [authMiddleware, httpMiddleware],
})

export const client = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey: process.env.NEXT_PUBLIC_COMMERCE_TOOLS_PROJECT_KEY ?? '' })



  