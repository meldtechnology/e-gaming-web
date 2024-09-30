import { Dashboard } from "../../pages/Dashboard";
import { Users } from "../../pages/Users";
import { NewUser } from "../../pages/Users/NewUser";


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
      case '_new': return <NewUser />;
      default: return <Dashboard />
    }

}