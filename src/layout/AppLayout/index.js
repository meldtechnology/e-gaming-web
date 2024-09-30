import { LeftSidebar } from "../../components/LeftSidebar";
import { useLocation, useParams } from "react-router-dom";
import { PagesRoute } from "../PagesRoute";

const AppLayout = () => {
    const location = useLocation();
    const params = useParams();
    const currentPage = location.pathname.substring(location.pathname.lastIndexOf('app/') + 4);
    return (
      <div className="w-full bg-gray-300">
        <div className="flex items-start gap-[24px]">
          <LeftSidebar />
          <div className="flex-1">
            <PagesRoute page={currentPage} params={params} />
          </div>
        </div>
      </div>
    );
}

export default AppLayout;