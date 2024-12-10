import { getItem } from "../../../services";
import { useNavigate } from "react-router-dom";
import { ReviewForm } from "../../../ui-components/ReviewForm";

export const DocumentReviewer = () => {
  const fileObject = JSON.parse(getItem('revApp'));
  const navigate = useNavigate();
  console.log(fileObject);

  const closeForm = () => {
    navigate('/app/applications')
  }
  return (<ReviewForm onClick={closeForm} fileData={[fileObject]} /> );
}