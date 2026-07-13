import { InputText } from "../InputText";
import { useEffect, useState } from "react";

export const EditGroupPopUp = ({openGroup, groupName, updateGroupName, editControl}) => {
  const [editName, setEditName] = useState(groupName);

  const editGroupName = (value) => {
    if(value === undefined) return '';
    return value;
  }

  useEffect(() => {
    setEditName(groupName);
  }, [groupName]);

  return (
    <div
      className={`${openGroup ? '' : 'hidden'} flex absolute z-10 p-4 left-0 font-sans text-sm font-normal break-words whitespace-normal bg-surface border rounded-lg shadow-lg w-[60%] border-border text-text-secondary shadow-blue-gray-500/10 focus:outline-none data-[enter]:ease-out data-[leave]:ease-in`}>
      <InputText name={groupName}
                 value={editGroupName(editName)}
                 label={`Group Title`}
                 required={true}
                 onChange={(e) => updateGroupName(e.target.value)} />
      <button type="button"
              className="ml-4 bg-brand text-on-brand px-1 rounded-lg h-[3rem]"
              onClick={editControl}>
        Update
      </button>
    </div>
  );
}