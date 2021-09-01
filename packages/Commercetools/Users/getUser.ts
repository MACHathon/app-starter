import { LoggedInUserClient } from "../Clients/ApiClient";

const getMeRequest = () => {
  return LoggedInUserClient.me()
  .get()
  .execute();
 
};

export const getMe = async () => {
  const response = await getMeRequest();

  if (!!response?.body?.id) {

    let userType = getUserType(response.body.email);

    return {
        email: response.body.email,
        userId: response.body.firstName,
        commerceToolsId: response.body.id,
        id: response.body.title,
        userType: userType,
        linkedChild: userType == 'parent' ? response.body.companyName : null
    }
  }

  return null;
};

export const getUserType = (email:string) : UserType => {
    if (email.indexOf('child') > -1) return 'child';
    if (email.indexOf('parent') > -1) return 'parent';
    return 'retailer';
}

type UserType = 'parent' | 'child' | 'retailer';

/*const literal: UserType  = 'child'
const method = (val: UserType) => {
  if (val === 'parent') ... // val is 'parent'
  else ... // val is 'bar'
}*/
