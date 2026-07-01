import { LeftSidebar } from "../../ui-components/LeftSidebar";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
    return (
      <div className="w-full bg-gray-300">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white-a700 focus:px-4 focus:py-2 focus:text-black-900_01"
        >
          Skip to main content
        </a>
        <div className="flex items-start gap-[24px]">
          <LeftSidebar />
          <main id="main-content" className="flex-1" tabIndex={-1}>
            <Outlet />
          </main>
        </div>
      </div>
    );
}

export default AppLayout;
