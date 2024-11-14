import { TemplateGroupForm } from "../TemplateGroupForm";

export const TemplateForm = ({data, saveTemplate, saving}) => {
  if(data === undefined) data = [];
  return (
    <div className="w-full h-full p-2">
      <TemplateGroupForm templateForm={[...data]}
                         saveTemplate={saveTemplate}
                         saving={saving} />
    </div>
  );
}