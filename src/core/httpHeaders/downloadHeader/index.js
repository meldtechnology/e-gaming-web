import { getItem,  } from "../../../services";

export const headerConfig = () => {
  const objectToken = getItem('at');
  const config = {
    responseType: 'blob',
    headers: {
      Authorization: `${(objectToken)? "Bearer " + objectToken : '' }`,
      Accept: 'application/octet-stream'
    }
  };

  return { config };
}