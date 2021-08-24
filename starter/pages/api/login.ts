// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  // TODO - Obviously change to HTTP POST ;)
  var result = await loginClient
    .customerPasswordFlow(
      {
        username: req.query.username,
        password: req.query.password,
      },
      {
        disableRefreshToken: false,
      }
    )
    
    res.setHeader(
      'Set-Cookie',
      serialize('token', result.access_token, {
        path: '/',
        sameSite: 'lax',
        //httpOnly: true, // OK to expose to the client
        //secure: true    // TODO when we have HTTPS i.e is not dev
      }),
    );

    res.status(200).json(result);
}

const loginClient = new SdkAuth({
  host: 'https://auth.europe-west1.gcp.commercetools.com',
  "machathon-sbx",
  disableRefreshToken: false,
  credentials: {
    clientId: process.env.COMMERCE_TOOLS_ADMIN_CLIENT_ID,
    clientSecret: process.env.COMMERCE_TOOLS_ADMIN_CLIENT_SECRET
  },
  fetch,
});

