import TextField from "@mui/material/TextField";
import {
  Checkbox,
  FormControlLabel, FormGroup,
  FormLabel,
  InputLabel,
  Radio,
  RadioGroup,
  Rating,
  Switch,
  TextareaAutosize
} from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import FormControl from "@mui/material/FormControl";
import Select from '@mui/material/Select';
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';


export const Selector = ({fieldType, formik, name, label, required, options, isError, errMsg, inValid, valid}) => {
  const adornmentCountry = (type) => (
    <div className="inline-flex items-center">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 32 32" className="m-2">
        <path fill="#fff" d="M10 4H22V28H10z"></path>
        <path d="M5,4h6V28H5c-2.208,0-4-1.792-4-4V8c0-2.208,1.792-4,4-4Z" fill="#3b8655"></path>
        <path d="M25,4h6V28h-6c-2.208,0-4-1.792-4-4V8c0-2.208,1.792-4,4-4Z"
              transform="rotate(180 26 16)"
              fill="#3b8655"></path>
        <path
          d="M27,4H5c-2.209,0-4,1.791-4,4V24c0,2.209,1.791,4,4,4H27c2.209,0,4-1.791,4-4V8c0-2.209-1.791-4-4-4Zm3,20c0,1.654-1.346,3-3,3H5c-1.654,0-3-1.346-3-3V8c0-1.654,1.346-3,3-3H27c1.654,0,3,1.346,3,3V24Z"
          opacity=".15"></path>
        <path d="M27,5H5c-1.657,0-3,1.343-3,3v1c0-1.657,1.343-3,3-3H27c1.657,0,3,1.343,3,3v-1c0-1.657-1.343-3-3-3Z"
              fill="#fff" opacity=".2">
        </path>
      </svg>
      {type}
    </div>
  );

  if (fieldType === "input") return (
    <>
      <TextField name={name}
                 type="text"
                 label={label}
                 onChange={formik.handleChange}
                 required={required}
                 onInvalid={(e) => inValid(e, errMsg)}
                 onInput={valid}
                 className={`w-[100%]`}
      />
      <div className={`${required ? "" : "hidden"}`}>
                      <span
                        className={`text-red-700 ${(isError && formik.getFieldProps(name).value === undefined) ? "" : "hidden"}`}>
                      {label} must be provided
                    </span>
      </div>
    </>
  );
  if (fieldType === "email") return (
    <>
      <TextField name={name}
                 type="email"
                 label={label}
                 onChange={formik.handleChange}
                 required={required}
                 onInvalid={(e) => inValid(e, errMsg)}
                 onInput={valid}
                 className={`w-[100%]`}
      />
      <div className={`${required ? "" : "hidden"}`}>
                      <span
                        className={`text-red-700 ${(isError && formik.getFieldProps(name).value === undefined) ? "" : "hidden"}`}>
                      {label} must be provided
                    </span>
      </div>
    </>
  );
  if (fieldType === "numeric") return (
    <>
      <TextField name={name}
                 type="number"
                 label={label}
                 onChange={formik.handleChange}
                 required={required}
                 onInvalid={(e) => inValid(e, errMsg)}
                 onInput={valid}
                 className={`w-[100%]`}
      />
      <div className={`${required ? "" : "hidden"}`}>
                      <span
                        className={`text-red-700 ${(isError && formik.getFieldProps(name).value === undefined) ? "" : "hidden"}`}>
                      {label} must be provided
                    </span>
      </div>
    </>
  );
  if (fieldType === "textarea") return (
    <>
      <TextareaAutosize
        maxRows={"10"}
        minRows={"5"}
        name={name}
        placeholder={label}
        onChange={formik.handleChange}
        required={required}
        onInvalid={(e) => inValid(e, errMsg)}
        onInput={valid}
        className={`w-[100%]`}
      />
      <div className={`${required?'':'hidden'}`}>
                      <span className={`text-red-700 ${(isError && formik.getFieldProps(name).value === undefined)? "" : "hidden"}`}>
                      {label} must be provided
                    </span>
      </div>
    </>
  )
  if(fieldType === 'radiobtn') return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">{label}</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        // name="row-radio-buttons-group"
        name={name}
        onChange={formik.handleChange}
        required={required}
        // onInvalid={(e) => inValid(e, errMsg)}
        // onInput={valid}
      >
        {options?.map((option, idx) => (
          <FormControlLabel key={idx} value={option} control={<Radio />} label={option} />
        ))}
      </RadioGroup>
      <div className={`${required?'':'hidden'}`}>
                      <span className={`text-red-700 ${(isError && formik.getFieldProps(name).value === undefined)? "" : "hidden"}`}>
                      {label} must be provided
                    </span>
      </div>
    </FormControl>
  )
  if(fieldType === 'rating') return (
    <>
      <FormLabel id="demo-radio-buttons-group-label">{label} <span
        className={`${required ? "" : "hidden"} text-red-700`}>*</span></FormLabel>
      <Rating name={name}
              defaultValue={0}
              precision={0.5}
              size="large"
              onChange={formik.handleChange}
      />
      <div className={`${required?'':'hidden'}`}>
                      <span className={`text-red-700 ${(isError && formik.getFieldProps(name).value === undefined)? "" : "hidden"}`}>
                      {label} must be provided
                    </span>
      </div>
    </>
  )
  if(fieldType === 'select') return (
    <>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label} <span
          className={`${required ? "" : "hidden"} text-red-700`}>*</span></InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name={name}
          label={label}
          defaultValue={''}
          onChange={formik.handleChange}
          required={required}
          // onInvalid={(e) => inValid(e, errMsg)}
          // onInput={valid}
          className={`w-[100%]`}
          variant={'filled'} >
          {options?.map((option, idx) => (
            <MenuItem key={idx} value={option}>{option}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <div className={`${required?'':'hidden'}`}>
        <span className={`text-red-700 ${(isError && formik.getFieldProps(name).value === undefined)? "" : "hidden"}`}>
          {label} must be provided
        </span>
      </div>
    </>
  )
  if(fieldType === 'currency') return (
    <>
      <FormControl fullWidth sx={{ m: 1 }}>
        <InputLabel htmlFor="outlined-adornment-amount">{label}</InputLabel>
        <OutlinedInput
          id="outlined-adornment-amount"
          startAdornment={<InputAdornment position="start">{adornmentCountry('NGN')}</InputAdornment>}
          label={label}
          name={name}
          onChange={formik.handleChange}
          required={required}
          onInvalid={(e) => inValid(e, errMsg)}
          onInput={valid}
          className={`w-[100%]`}
        />
      </FormControl>
      <div className={`${required ? "" : "hidden"}`}>
        <span className={`text-red-700 ${(isError && formik.getFieldProps(name).value === undefined) ? "" : "hidden"}`}>
          {label} must be provided
        </span>
      </div>
    </>
  )
  if (fieldType === "yesno") return (
    <>
      <FormGroup>
        <FormControlLabel required={required} control={<Switch />}
                          label={label}
                          name={name}
                          onChange={formik.handleChange}
                          onInvalid={(e) => inValid(e, errMsg)}
                          onInput={valid} />
      </FormGroup>
      <div className={`${required ? "" : "hidden"}`}>
                      <span
                        className={`text-red-700 ${(isError && formik.getFieldProps(name).value === undefined) ? "" : "hidden"}`}>
                      {label} must be provided
                    </span>
      </div>
    </>
  );
  if (fieldType === "mobile") return (
    <>
      <FormControl fullWidth sx={{ m: 1 }}>
        <InputLabel htmlFor="outlined-adornment-weight">{label}</InputLabel>
        <OutlinedInput
          id="outlined-adornment-weight"
          startAdornment={<InputAdornment position="start">{adornmentCountry('234')}</InputAdornment>}
          aria-describedby="outlined-weight-helper-text"
          inputProps={{
            "aria-label": "mobile"
          }}
          name={name}
          label={label}
          onChange={formik.handleChange}
          required={required}
          onInvalid={(e) => inValid(e, errMsg)}
          onInput={valid}
          className={`w-[100%]`}
        />
      </FormControl>
      <div className={`${required ? "" : "hidden"}`}>
                      <span className={`text-red-700 ${(isError && formik.getFieldProps(name).value === undefined)? "" : "hidden"}`}>
                      {label} must be provided
                    </span>
      </div>
    </>
  )
  if (fieldType === "calendar") return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']}>
          <DatePicker label={label}
                      name={name}
                      onChange={(e)=> formik.setFieldValue(name, e.format("YYYY-MM-D"))}
                      required={required}
                      onInvalid={(e) => inValid(e, errMsg)}
                      onInput={valid}
                      className={`w-[100%]`} />
        </DemoContainer>
      </LocalizationProvider>
      <div className={`${required ? "" : "hidden"}`}>
                      <span
                        className={`text-red-700 ${(isError && formik.getFieldProps(name).value === undefined) ? "" : "hidden"}`}>
                      {label} must be provided
                    </span>
      </div>
    </>
  );
  if (fieldType === "checkbtn") return (
    <>
      <div>{label} <span className={`${required? '' :'hidden'} text-red-700`}>*</span></div>
      <FormGroup>
        {options?.map((option, idx) => (
          <FormControlLabel key={idx}
                            name={name}
                            onChange={formik.handleChange}
                            // onInvalid={(e) => inValid(e, errMsg)}
                            // onInput={valid}
                            control={<Checkbox value={option} />} label={option} />
        ))}
      </FormGroup>
      <div className={`${required ? "" : "hidden"}`}>
                      <span
                        className={`text-red-700 ${(isError && formik.getFieldProps(name).value === undefined) ? "" : "hidden"}`}>
                      {label} must be provided
                    </span>
      </div>
    </>
  );
}