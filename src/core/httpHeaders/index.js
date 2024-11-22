import { getItem,  } from "../../services";

export const headerConfig = () => {
  const objectToken = getItem('at');
  const config = {
    headers: {
      Authorization: `${(objectToken)? "Bearer " + objectToken : '' }`,
      Accept: 'application/json'
    }
  };

  return { config };
}

