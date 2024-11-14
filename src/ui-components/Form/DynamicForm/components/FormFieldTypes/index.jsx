import { GetFormTemplateService as getTemplateService } from "../../../../../services";
import { Loader } from "../../../../Loader";

const FORM_FIELDS_URL = process.env.REACT_APP_FORM_COMPONENTS_URL;
export const FormFieldTypes = ({currentField, setFieldType}) => {
  const { template, loadingTemplate } = getTemplateService(`${FORM_FIELDS_URL}`);


  return (
    <>
      <div className={`${loadingTemplate ? '' : 'hidden'}`}><Loader /></div>
      <div className={`${loadingTemplate ? 'hidden' : ''}`}>
        <select defaultValue={currentField}
                className="w-[12.2rem] rounded-2xl"
                onChange={(e) => setFieldType(e.target.value) }>
          {
            template?.data?.map((field, idx) =>
              <option value={field?.componentName} key={idx}>{field?.displayName}</option>
            )
          }
        </select>
      </div>
    </>
  );
}