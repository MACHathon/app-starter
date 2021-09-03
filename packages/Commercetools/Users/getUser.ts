import { LoggedInUserClient } from "../Clients/ApiClient";


const getMeRequest = () => {
  return LoggedInUserClient.me()
  .get()
  .execute(); 
};

export const getMe = async () => {

  try {
    const response = await getMeRequest();
    if (!!response?.body?.id) {

      let userType = getUserType(response.body.companyName);
  
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
  } catch (e) {
    return null;
  } 
};

export const getUserType = (companyName:string | undefined) : UserType => {

    // Using company name as link to child (Parent acc) OR as Retailer business name (Retailer acc)
    // Yes.. this is a hack!
    if (!!companyName)
    {
        return companyName.indexOf('child') > -1 ? 'parent' : 'retailer'
    }

    return 'child';
}

type UserType = 'parent' | 'child' | 'retailer';

/*const literal: UserType  = 'child'
const method = (val: UserType) => {
  if (val === 'parent') ... // val is 'parent'
  else ... // val is 'bar'
}*/
