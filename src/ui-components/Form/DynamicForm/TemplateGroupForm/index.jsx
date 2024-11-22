import { useEffect, useState } from "react";
import { ComponentSelector } from "../ComponentSelector";
import { createGroup, createFormField } from "../../../../services/model";
import { EditFieldPopUp } from "../components";
import { ProgressButton } from "../../component/ProgressButton";
import { extractGroupWithId } from "../../../../services/extractRow";
import { EditGroupPopUp } from "../components/EditGroupPopUp";

export const TemplateGroupForm = ({templateForm, saveTemplate, saving}) => {
  const [container, setContainer] = useState([]);
  const [openGroup, setOpenGroup] = useState('');
  const [openField, setOpenField] = useState('');
  const [groupName, setGroupName] = useState('');
  const [groupId, setGroupId] = useState('');
  const [fieldSelected, setFieldSelected] = useState({});

  const openModal = (selectedGroup) => {
    setOpenGroup(selectedGroup);
    setGroupId(selectedGroup);
  }

  const openPopUp = (selectedGroup, selectedField) => {
    setOpenField(selectedField?.name);
    setFieldSelected(selectedField);
  }

  const closePopUp = () => {
    setOpenField('');
    setFieldSelected({});
  }

  const updateGroup = () => {
    setContainer([...container, createGroup()]);
  }

  const deleteGroup = (selectedGroup) => {
    setContainer(container.filter(item => item.groupId !== selectedGroup));
  }

  const deleteField = (selectedGroup, selectedField) => {
    // update the container
    setContainer( container.filter(item => {
      if(item.groupId === selectedGroup) {
        item.formControls = item?.formControls?.filter(fc => fc.name !== selectedField);
      }
      return item;
      })
    );
  }

  const updateField = () => {
    setOpenField('');
    setFieldSelected({});
  }

  const addField = (group) => {
    // Match the group chosen by its group id
    const selectedGroup = container.filter(item => (item.groupId === group));
    // Extract out the form controls in the group
    const foundGroup = extractGroupWithId(container, group);
    // Update the form controls with the new one
    selectedGroup[0].formControls = [...foundGroup?.formControls, createFormField()];
    // update the container
    setContainer(container.filter(item => {
      if(item.groupId === selectedGroup.groupId) { item = selectedGroup; }
      return item;
    }));
  }

  const editControl = () => {
    setContainer(container.filter(item => {
      if(item.groupId === groupId) { item.headerTitle = groupName; }
      return item;
    }));
    setGroupName('');
    setOpenGroup('');
  }

  useEffect(() => {
    setContainer([...templateForm]);
  }, [templateForm]);

  return (
    <>
      <div className='bg-gray-100 p-3 items-end overflow-hidden'>
        <button type="button"
                className={`${saving ? 'hidden' : ''} bg-gray-900_01 text-white-a700 rounded-xl p-2 float-right `}
                onClick={()=> saveTemplate(container)}
        >
          Save Template
        </button>
        <ProgressButton saving={saving} position="float-right" />`
      </div>

      {container?.map((comp, index) => (
        <div key={index} className="mb-4 pb-4">
          <span className="font-bold text-blue-600 text-2xl mb-2 mt-6">
            {comp?.headerTitle}
          </span>
          <EditGroupPopUp openGroup={openGroup === comp.groupId}
                          groupName={groupName}
                          updateGroupName={setGroupName}
                          editControl={editControl} />
          <span className="float-right py-4 overflow-hidden block ">
            <button type="button"
                    className="mr-2 bg-blue_gray-900 p-1 rounded-b-xl rounded-t-xl"
                    onClick={()=> addField(comp.groupId)}>
              <svg xmlns="http://www.w3.org/2000/svg"
                   viewBox="0 0 448 512"
                   fill="#FFFFFF"
                   className="w-4 h-4">
                <path
                  d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
              </svg>
            </button>
            <button type="button"
                    onClick={()=>openModal(comp.groupId)}
                    className="mr-2">
              <svg xmlns="http://www.w3.org/2000/svg"
                   viewBox="0 0 512 512"
                   fill="#90A4AE"
                   className="w-4 h-4">
                <path
                  d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" />
              </svg>
            </button>
            <button type="button"
                    onClick={() => deleteGroup(comp.groupId)}>
              <svg xmlns="http://www.w3.org/2000/svg"
                   viewBox="0 0 448 512"
                   fill="#FE0000"
                   className="w-4 h-4">
                <path
                  d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0L284.2 0c12.1 0 23.2 6.8 28.6 17.7L320 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 7.2-14.3zM32 128l384 0 0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zm96 64c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16z" />
              </svg>
            </button>
          </span>
          <hr className="mt-6" />
          {
            comp?.formControls.map((field, index1) => (
              <div key={index1} >
              <div className="flex flex-row gap-3">
                <div className="w-[90%]">
                  <ComponentSelector name={field?.name} props={field} />
                </div>
                <div className="w-[10%] pt-4 ">
                  <button type="button"
                          onClick={() => openPopUp(comp.groupId, field)}
                          className="mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 512 512"
                         fill="#90A4AE"
                         className="w-4 h-4">
                      <path
                        d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" />
                    </svg>
                  </button>
                  <button type="button"
                          onClick={() => deleteField(comp.groupId, field?.name)}>
                    <svg xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 448 512"
                         fill="#FE0000"
                         className="w-4 h-4">
                      <path
                        d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0L284.2 0c12.1 0 23.2 6.8 28.6 17.7L320 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 7.2-14.3zM32 128l384 0 0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zm96 64c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16z" />
                    </svg>
                  </button>
                </div>
              </div>
            <EditFieldPopUp openEdit={openField === field.name} field={fieldSelected} update={updateField} close={closePopUp} />
            </div>
            ))}
        </div>
      ))}
      <button type="button"
              className="w-full block bg-blue_gray-900 text-white-a700 p-2 mt-8 border-r-2"
              onClick={updateGroup}>
        Add Group
      </button>
    </>
  );
}