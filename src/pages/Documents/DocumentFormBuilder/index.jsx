import { getItem } from "../../../services";
import { useNavigate } from "react-router-dom";
import { FormBuilder } from "../../../ui-components/FormBuilder";

export const DocumentFormBuilder = () => {
  const fileObject = JSON.parse(getItem('rhData'));
  const navigate = useNavigate();

  const closeForm = () => {
    navigate('/app/documents/files')
  }
  return (<FormBuilder onClick={closeForm} fileData={[fileObject]} /> );
}
