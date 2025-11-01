import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const AutoBackRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    alert(location.pathname);
    // setTimeout(() => {
    //   if (window.history.length > 1) navigate(-1);
    //   else navigate("/", { replace: true });
    // }, 100); // short delay for smoother UX
  }, [navigate, location.pathname]);

  return (
    <div className="p-4 text-center text-gray-500">
      Redirecting you back...
    </div>
  );
};
