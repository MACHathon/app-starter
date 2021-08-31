// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";
import SdkAuth from "@commercetools/sdk-auth";
import { SecureApiClient } from "../../packages/Commercetools/Clients/SecureApiClient";

type Data = {
  data: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  if (req.body.username && req.body.password) {
    // Get email address from username - Probably not ideal but its a hackathon :)
    var response = await SecureApiClient.customers()
      .get({ queryArgs: { where: `firstName = "${req.body.username}"` } })
      .execute();
      
      if (response.statusCode == 200) {
        if (response.body.results.length > 0) {
          let emailAddress = response.body.results[0].email;

          try {
            var result = await loginClient.customerPasswordFlow(
              {
                username: emailAddress,
                password: req.body.password ?? '',
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
        } 
        else {
          res.status(400).json({ data: "Invalid Username or Pin" });
        }
      } 
      else {
        res.status(400).json({ data: "Invalid Username or Pin" });       
      } 
    }
    else {
      res.status(400).json({ data: "Invalid Username or Pin" });
   }
}

const loginClient = new SdkAuth({
  host: "https://auth.europe-west1.gcp.commercetools.com",
  projectKey: process.env.NEXT_PUBLIC_COMMERCE_TOOLS_PROJECT_KEY,
  disableRefreshToken: false,
  credentials: {
    clientId: process.env.COMMERCE_TOOLS_ADMIN_CLIENT_ID,
    clientSecret: process.env.COMMERCE_TOOLS_ADMIN_CLIENT_SECRET,
  },
  fetch,
});

  // Hack to create a custom object quickly
  /*
  SecureApiClient.customObjects().post({body: { container: "child_meta_data", key: "latestId", value: "0066"}}).execute() 
  .then((response: any) => {
   console.log(response);
  }); */
