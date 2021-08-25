// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";
import SdkAuth from "@commercetools/sdk-auth";

type Data = {
  data: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.body.username && req.body.password) {
    
    try {
      var result = await loginClient.customerPasswordFlow(
        {
          username: req.body.username ?? "a",
          password: req.body.password ?? "b",
        },
        {
          disableRefreshToken: false,
        }
      );
  
      res.setHeader(
        "Set-Cookie",
        serialize("token", result.access_token, {
          path: "/",
          sameSite: "lax",
          //httpOnly: true, // OK to expose to the client
          //secure: true    // TODO when we have HTTPS i.e is not dev
        })
      );
      res.status(200).json(result);
    } catch (e) {
      res.status(401).json({ data: "Unauthorized" });
    }
   
  } else {
    res.status(400).json({ data: "Invalid Username or Password" });
  }
}

const loginClient = new SdkAuth({
  host: "https://auth.europe-west1.gcp.commercetools.com",
  projectKey: "machathon-sbx",
  disableRefreshToken: false,
  credentials: {
    clientId: process.env.COMMERCE_TOOLS_ADMIN_CLIENT_ID,
    clientSecret: process.env.COMMERCE_TOOLS_ADMIN_CLIENT_SECRET,
  },
  fetch,
});
