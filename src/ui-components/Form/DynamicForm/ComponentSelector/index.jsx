import {
  InputCalendar,
  InputCurrency,
  InputEmail,
  InputMobile,
  InputNumber,
  InputText,
  InputTextArea
} from "../components";

export const ComponentSelector = ({ name, props }) => {
  const {fieldType, hints, label, required } = props;

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
  }
  else return null;
}