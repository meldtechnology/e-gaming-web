import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/16/solid";

const NavList = () => {
  return (
    <ul className="my-2 flex gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <li className="p-1 font-medium">
        <Link to={`/app/documents/types`} className="flex items-center text-text-secondary transition-colors hover:text-brand">
          Category
        </Link>
      </li>
      <li className="p-1 font-medium">
        <Link to={`/app/documents/files`} className="flex items-center text-text-secondary transition-colors hover:text-brand">
          Revenue Head
        </Link>
      </li>
      <li className="p-1 font-medium">
        <Link to={`/app/applications`} className="flex items-center text-text-secondary transition-colors hover:text-brand">
          Applications
        </Link>
      </li>
    </ul>
  )
}

export const DocumentNavBar = () => {
  const [openNav, setOpenNav] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className="mx-auto max-w-screen-xl rounded-xl border border-border bg-surface px-6 py-3 text-text-primary">
      <div className="flex items-center justify-between">
        <span className="mr-4 py-1.5 font-semibold text-text-primary">
          Document
        </span>
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
