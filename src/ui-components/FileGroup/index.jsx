import { useState } from "react";
import { extractRowWithName } from "../../services";
import { FileList } from "../FileList";
import { FileForm } from "../Form";

export const FileGroup = () => {
  const [selectedFile, setSelectedFile] = useState({});

  const updateFile = (data, name) => {
    setSelectedFile(extractRowWithName(data, name));
  }

  const refreshPage = () => {
    console.log('Reload');
  }

  return (
    <div className="w-full bg-white-a700 flex gap-1">
      <div className="flex-auto w-[65%]">
        <FileList updateFile={updateFile} />
      </div>
      <div className="flex-auto w-[35%] border-solid border-l-gray-200">
        <FileForm selectedFile={selectedFile}
               isNew={Object.keys(selectedFile).length === 0} />
      </div>
    </div>
  );
}