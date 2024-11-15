import { TypeList } from "../TypeList";
import { TypeForm } from "../Form/TypeForm";
import { useState } from "react";
import { extractRowWithName } from "../../services";

export const TypeGroup = () => {
  const [selectedType, setSelectedType] = useState({});

  const updateType = (data, name) => {
    setSelectedType(extractRowWithName(data, name));
  }

  return (
    <div className="w-full bg-white-a700 flex gap-1">
      <div className="flex-auto w-[60%]">
        <TypeList updateType={updateType}/>
      </div>
      <div className="flex-auto w-[40%] border-solid border-l-gray-200">
        <TypeForm selectedType={selectedType}
                  isNew={Object.keys(selectedType).length === 0} />
      </div>
    </div>
  );
}