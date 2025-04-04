import { Dashboard } from "../../pages/Dashboard";
import { Users } from "../../pages/Users";
import { NewUser } from "../../pages/Users/NewUser";
import { EditUser } from "../../pages/Users/EditUser";
import { Profile } from "../../pages/Users/Profile";
import { Documents } from "../../pages/Documents";
import { Types } from "../../pages/Documents/Types";
import { Files } from "../../pages/Documents/Files";
import { DocumentFormBuilder } from "../../pages/Documents/DocumentFormBuilder";
import { DocumentReviewer } from "../../pages/Documents/DocumentReviewer";
import { License } from "../../pages/Documents/License";
import { LicenseForm } from "../../ui-components/LicenseForm";
import { Report } from "../../pages/report/Report";
import { ReportApplication } from "../../ui-components/ReportApplication";
import { ReportPayment } from "../../ui-components/ReportPayment";
import { QRCodeMaker } from "../../ui-components/QRCodeMaker";
import { AddAttachment } from "../../ui-components/Form/AddAttachment";


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
      case 'documents': return <Types />;
      case 'applications': return <Documents />;
      case 'licenses': return <License />;
      case 'T_46042b50': return <Types />;
      case 'F_322f9837': return <Files />;
      case 'F_D5N2M19': return <DocumentFormBuilder />;
      case 'F_EAD5665': return <AddAttachment />;
      case 'R_SHFB95GH': return <DocumentReviewer />;
      case 'L_10O9I78': return <LicenseForm />;
      case 'L_10O9I00': return <QRCodeMaker />;
      case 'reports': return <Report />;
      case 'R_1786100': return <ReportApplication />;
      case 'R_1786101': return <ReportPayment />;
      default: return <Dashboard />
    }

}