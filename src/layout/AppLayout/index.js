import { LeftSidebar } from "../../ui-components/LeftSidebar";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
    return (
      <div className="min-h-screen w-full bg-surface-muted text-text-primary">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-surface focus:px-4 focus:py-2 focus:text-text-primary focus:shadow-e2"
        >
          Skip to main content
        </a>
        <div className="flex items-start">
          <LeftSidebar />
          <main
            id="main-content"
            className="min-h-screen w-full flex-1 px-4 py-6 md:px-5 lg:px-8"
            tabIndex={-1}
          >
            <div className="mx-auto w-full max-w-[1440px]">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    );
}

export default AppLayout;
