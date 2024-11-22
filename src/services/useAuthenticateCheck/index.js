import { useNavigate } from "react-router-dom";

export const useAuthenticateCheck = (error) => {
  const navigate = useNavigate();
  if(error && error?.status === 401) navigate('/logout');
  else return error;
}