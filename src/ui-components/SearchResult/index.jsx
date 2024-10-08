import { Loader } from "../Loader";
import { Link } from "react-router-dom";

export const SearchResult = ({ value, users, loading }) => {
  if (loading) return ( <Loader /> );
  return (
    <div id="dropdown-menu"
         className={`${(Object.keys(value).length === 0) ? 'hidden' : ''} relative right-0 mt-2 p-1 space-y-1 `}>
      <ul
        className="absolute w-full inline-block rounded-md shadow-lg bg-white-a700 ring-1 ring-black ring-opacity-100% bg-opacity-0 p-1 space-y-1">
        {users?.data?.results?.map((d, index) => (
            <li key={`search-${index}`}
                className="flex my-2 hover:bg-[#88a6e7] hover:bg-opacity-25">
              <Link
                to={`/app/users/profile`}
                className="flex"
              >
                <img src={d?.profile?.profilePicture} alt={'Profile'}
                     className="w-8 h-8 rounded-3xl mr-2" />
                <span className="w-full text-justify pt-2">
                {`${d?.profile?.firstName} ${d?.profile?.lastName}`}
              </span>
              </Link>
            </li>
          )
        )}
      </ul>
    </div>
  );
};