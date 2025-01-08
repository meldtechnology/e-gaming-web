import {
  InputCalendar,
  InputCurrency,
  InputEmail,
  InputMobile,
  InputNumber,
  InputText,
  InputTextArea
} from "../components";
import { Checkbox, FormControlLabel, FormGroup, FormLabel, Radio, RadioGroup, Switch } from "@mui/material";
import { Ranking } from "../../../Ranking";
import FormControl from "@mui/material/FormControl";

export const ComponentSelector = ({ name, props }) => {
  const {fieldType, hints, label, options, required } = props;
  if(fieldType === 'input') {
    return <InputText name={name}
                      value=''
                      label={label}
                      placeHolderText={hints}
                      required={required}
                      onChange={(e)=> console.log(e.target.value)}
    />
  } else if(fieldType === 'email') {
    return <InputEmail name={name}
                      value=''
                      label={label}
                      placeHolderText={hints}
                      required={required}
                      onChange={(e)=> console.log(e.target.value)}
    />
  } else if(fieldType === 'numeric') {
    return <InputNumber name={name}
                      value=''
                      label={label}
                      placeHolderText={hints}
                      required={required}
                      onChange={(e)=> console.log(e.target.value)}
    />
  } else if(fieldType === 'mobile') {
    return <InputMobile name={name}
                      value=''
                      label={label}
                      placeHolderText={hints}
                      required={required}
                      onChange={(e)=> console.log(e.target.value)}
    />
  } else if(fieldType === 'currency') {
    return <InputCurrency name={name}
                      value=''
                      label={label}
                      placeHolderText={hints}
                      required={required}
                      onChange={(e)=> console.log(e.target.value)}
    />
  }else if(fieldType === 'textarea') {
    return <InputTextArea name={name}
                      value=''
                      label={label}
                      placeHolderText={hints}
                      required={required}
                      onChange={(e)=> console.log(e.target.value)}
    />
  } else if(fieldType === 'calendar') {
    return <InputCalendar name={name}
                      value=''
                      label={label}
                      placeHolderText={hints}
                      required={required}
                      onChange={(e)=> console.log(e.target.value)}
    />
  }else if(fieldType === 'yesno') {
    return (
      <div className="w-full min-w-[200px] mt-6">
        <FormControlLabel required control={<Switch />} label={label} />
        <p className="flex items-start mt-2 text-xs text-slate-400">
          <span className={`${required ? "" : "hidden"} pl-2 text-red-700 text-2xl`}>*</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-1.5">
            <path fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                  clipRule="evenodd" />
          </svg>
          {hints}
        </p>
      </div>
    )
  } else if (fieldType === "label") {
    return (
      <div className="w-full min-w-[200px] mt-6">
        <strong>{label}</strong>
        <p className="flex items-start mt-2 text-xs text-slate-400">
          <span className={`${required ? "" : "hidden"} pl-2 text-red-700 text-2xl`}>*</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-5 h-5 mr-1.5 ${hints?'':'hidden'}`}>
            <path fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                  clipRule="evenodd" />
          </svg>
          {hints}
        </p>
      </div>
    )
  }  else if (fieldType === "select") {
    return (
      <div className="w-full min-w-[200px] mt-6">
        <select defaultValue={''} className={'w-full'}>
          <option value={'Select One'}>Select One</option>
          {options?.map((option, idx)=> (
            <option value={option} key={idx}>{option}</option>
          ))}
        </select>
        <p className="flex items-start mt-2 text-xs text-slate-400">
          <span className={`${required ? "" : "hidden"} pl-2 text-red-700 text-2xl`}>*</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-5 h-5 mr-1.5 ${hints?'':'hidden'}`}>
            <path fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                  clipRule="evenodd" />
          </svg>
          {hints}
        </p>
      </div>
    )
  }   else if (fieldType === "rating") {
    return (
      <div className="w-full min-w-[200px] mt-6">
        <div className={'overflow-hidden'}>
          <Ranking />
        </div>
        <p className="flex items-start mt-2 text-xs text-slate-400">
          <span className={`${required ? "" : "hidden"} pl-2 text-red-700 text-2xl`}>*</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-5 h-5 mr-1.5 ${hints?'':'hidden'}`}>
            <path fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                  clipRule="evenodd" />
          </svg>
          {hints}
        </p>
      </div>
    )
  }   else if (fieldType === "radiobtn") {
    return (
      <div className="w-full min-w-[200px] mt-6">
        <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label">{label}</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            {options?.map((option, idx) => (
              <FormControlLabel key={idx} value={option} control={<Radio />} label={option} />
            ))}
          </RadioGroup>
        </FormControl>
        <p className="flex items-start mt-2 text-xs text-slate-400">
          <span className={`${required ? "" : "hidden"} pl-2 text-red-700 text-2xl`}>*</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-5 h-5 mr-1.5 ${hints?'':'hidden'}`}>
            <path fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                  clipRule="evenodd" />
          </svg>
          {hints}
        </p>
      </div>
    )
  } else if (fieldType === "checkbtn") {
    return (
      <div className="w-full min-w-[200px] mt-6">
        <div>{label}</div>
        <FormGroup>
          {options?.map((option, idx) => (
            <FormControlLabel key={idx} control={<Checkbox />} label={option} />
          ))}
        </FormGroup>
        <p className="flex items-start mt-2 text-xs text-slate-400">
          <span className={`${required ? "" : "hidden"} pl-2 text-red-700 text-2xl`}>*</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-5 h-5 mr-1.5 ${hints?'':'hidden'}`}>
            <path fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                  clipRule="evenodd" />
          </svg>
          {hints}
        </p>
      </div>
    )
  } else return null;
}