import { Dashboard } from "../../pages/Dashboard";
import { Users } from "../../pages/Users";
import { NewUser } from "../../pages/Users/NewUser";
import { EditUser } from "../../pages/Users/EditUser";
import { Profile } from "../../pages/Users/Profile";


export const PagesRoute = ({ page, params }) => {
  const parse = (originalPath) => {
    if(originalPath.includes('/')) {
      if(originalPath.split('/').length === 2){
        return (Object.keys(params).length > 0) ?
          originalPath.substring(0, originalPath.indexOf('/')) :
          originalPath.substring(originalPath.indexOf('/') + 1);
      }
      return originalPath.substring(0, originalPath.indexOf('/'))
        .concat(originalPath.substring(originalPath.indexOf('/') + 1))
    }
    return originalPath;
  }

    switch (parse(page)) {
      case 'dashboard': return <Dashboard />;
      case 'users': return <Users />;
      case 'profile': return <Profile />;
      case '_new': return <NewUser />;
      case '_edit': return <EditUser />;
      default: return <Dashboard />
    }

}