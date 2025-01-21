import { Link } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";


const NavList = () => {
  return (
    <ul className="my-2 flex gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <li className="p-1 font-medium">
        <Link to={`/app/reports/R_1786101`} className="flex items-center hover:text-blue-500 transition-colors">
          Payment
        </Link>
      </li>
      <li className="p-1 font-medium">
        <Link to={`/app/reports/R_1786100`} className="flex items-center hover:text-blue-500 transition-colors">
          Applications
        </Link>
      </li>
    </ul>
  )
}

export const ReportNavBar = () => {
  const [openNav, setOpenNav] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
      <div className="mx-auto bg-blue_gray-900 text-white-a700 max-w-screen-xl px-6 py-3">
        <div className="flex items-center justify-between !text-blue-gray-900 text-white">
          <Link
            to="#"
            variant="h6"
            className="mr-4 cursor-pointer py-1.5"
          >
            Report
          </Link>
          <div className={`hidden ${(width > 1024) ? 'lg:block' : ''}`}>
            <NavList />
          </div>
          <button
            className={`${(width <= 1024) ? '' : 'lg:hidden'} ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent`}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <XMarkIcon className="h-6 w-6" strokeWidth={2} />
            ) : (
              <Bars3Icon className="h-6 w-6" strokeWidth={2} />
            )}
          </button>
        </div>
        <div className={`${openNav? '': 'hidden'}`}>
          <NavList />
        </div>
      </div>
  );
}