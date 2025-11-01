import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const AutoBackRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    alert(location.pathname);
    alert(location.pathname);
    alert(location.pathname + location.search);
    alert(window.history[window.history.length]);
    window.history.back();
    // setTimeout(() => {
    //   if (window.history.length > 1) navigate(-1);
    //   else navigate("/", { replace: true });
    // }, 100); // short delay for smoother UX
  }, [navigate, location.pathname, location.search]);

  return (
    <div className="p-4 text-center text-gray-500">
      Redirecting you back...
    </div>
  );
};
