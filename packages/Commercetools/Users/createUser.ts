import { AnonUserClient } from "../Clients/ApiClient";

// Note for the Hackathon we won't store
// - Business Type (Charity) OR
// - Charity number
// However we do still have this data in the form.. it's just for show

export const createRetailer = (
  email: string,
  password: string,
  companyName: string,
  postCode: string,
  country: string
) => {
  return AnonUserClient.me()
    .signup()
    .post({
      body: {
        email,
        password,
        companyName,
        addresses: [
          {
            postalCode: postCode,
            country,
          },
        ],
      },
    })
    .execute();
};

export const createParent = (
  email: string,
  password: string,
  parentName: string,
  linkedChildUsername: string
) => {
  return AnonUserClient.me()
    .signup()
    .post({
      body: {
        email,
        password,
        firstName: parentName,
        // Link the child
        companyName: `${linkedChildUsername}-child@toyken.org`, // Should use a custom field but for times sake hacking it
      },
    })
    .execute();
};

export const createChild = async (
  childUsername: string,
  pin: string
) => {
  let latestUserId = await AnonUserClient.customObjects()
    .get({ queryArgs: { where: 'key="latestId"' } })
    .execute();

  let currentId = +latestUserId?.body?.results[0].value;
  let newId = "00" + currentId + 1;

  return AnonUserClient.me()
    .signup()
    .post({
      body: {
        email: `${childUsername}-child@toyken.org`,
        title: newId,
        password: pin,
        firstName: childUsername, // Should use a custom field but for times sake hacking it
      },
    })
    .execute();
};
