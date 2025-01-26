import { useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { FormControlLabel, FormGroup, Radio, RadioGroup } from "@mui/material";
import { GenerateReport } from "../../../../services/reportServices/GenerateReport";
import { checkPermission } from "../../../../services/autorization";

const PAYMENT_REPORT_URL = process.env.REACT_APP_PAYMENT_REPORT_URL;
export const FormSection = ({isLoading, setDownloadLink}) => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [filter, setFilter] = useState('');
  const [filterPath, setFilterPath] = useState('');
  const [status, setStatus] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [error, setError] = useState('');

  const { generate } = GenerateReport(`${PAYMENT_REPORT_URL}${filterPath}?from=${start}&to=${end}&sortIn=DESC${filter}`);

  const requestGeneration = () => {
    if(from.length === 0) {
      setError('Invalid Start Date');
      return;
    }else if(to.length === 0) {
      setError('Invalid End Date');
      return;
    }
    const differenceInTime = new Date(to).getTime()
      - new Date(from).getTime();
    const dateRangeDays
      = Math.round(differenceInTime / (1000 * 3600 * 24));
    if(dateRangeDays > 60) {
      setError('You cannot select more than 60 days of a report!');
      return;
    }
    setError('');
    generateReport();
  }

  const generateReport = async () => {
    setError('');
    isLoading(true);
    const result = await generate(null);
    if(result?.error !== undefined){
      setError(result?.error?.data?.userMessage);
    }
    else {
      let url = window.URL.createObjectURL(new Blob([result?.data], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Report.pdf');
      setDownloadLink(link);
    }
    isLoading(false);
  }

  const setDate = (selectedDate) => {
    if(selectedDate !== undefined || selectedDate === '') {
      selectedDate = new Date(selectedDate);
      selectedDate.setTime(selectedDate.getTime() - new Date().getTimezoneOffset()*60*1000);
      return selectedDate.toISOString().split('T')[0];
    }
    return '';
  }

  useEffect(() => {
    const buildFilter = () => {
      let statusBuilder = "&status=" + status;
      setFilter(statusBuilder);
    }
    if(status.length > 0) {
      setFilterPath('/status');
      buildFilter();
    } else {
      setFilterPath('')
    }
  }, [status]);

  return checkPermission('CAN_GENERATE_REPORT') === '' ? (
    <>
      <div className="relative flex flex-col rounded-xl bg-transparent pb-10 mt-4 mb-10 ml-4">
        <h4 className="block text-xl font-medium text-slate-800">
          Select Payment Date Range
        </h4>
        <div className="relative flex rounded-xl bg-transparent mt-4 mb-5 ml-4">
          <>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker label={'Start Date'}
                            name={from}
                            onChange={(e) => {
                              setFrom(e.toISOString());
                              setStart(setDate(e.toISOString()));
                            }}
                            required={true}
                            className={`w-[100%]`} />
              </DemoContainer>
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker label={'End Date'}
                            name={to}
                            onChange={(e) => {
                              setTo(e.toISOString());
                              setEnd(setDate(e.toISOString()));
                            }}
                            required={true}
                            className={`w-[100%]`} />
              </DemoContainer>
            </LocalizationProvider>
          </>
        </div>
        <div className="relative flex gap-2 rounded-xl bg-transparent mt-4 mb-5 ml-4">
          <div className={'text-gray-900_01 font-bold'}>
            Payment Status Filter:
          </div>
          <FormGroup>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue=""
              name="radio-buttons-group"
            >
              <FormControlLabel name={'pending'}
                                onChange={(e)=> setStatus(e.target.value)}
                                control={<Radio />} value={'PENDING'} label={'PENDING'} />
              <FormControlLabel name={'failed'}
                                onChange={(e)=> setStatus(e.target.value)}
                                control={<Radio />}  value={'FAILED'} label={'FAILED'} /><
              FormControlLabel name={'paid'}
                               onChange={(e)=> setStatus(e.target.value)}
                               control={<Radio />}  value={'PAID'} label={'PAID'} />
            </RadioGroup>
          </FormGroup>
        </div>
        <div className={"w-full overflow-hidden border-solid border-t-2 border-t-black-900_01 pt-4"}>
          <button type={'button'}
                  onClick={requestGeneration}
                  className={` ${checkPermission('CAN_GENERATE_REPORT')} bg-gray-950 text-amber-100 p-6 rounded-[10px] float-right`}>
            Generate Report
          </button>
        </div>
        <div
          className={`${error ? '' : 'hidden'} mt-4 p-4 text-center bg-red-200 rounded-[10px] text-red-700 border-red-700 border-2`}>
          {error}
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="mr-11 mt-[26px] block justify-items-center gap-5 md:mr-0 md:flex-col">
        <div className={'mt-8 p-4 text-center text-[2.1rem] text-red-600 font-bold'}>
          Access Denied! - You do not have sufficient access to view the screen
        </div>
        <div className={'w-[70%] h-[]70%'}>
          <img src={'/images/enugu_logo2.png'} alt={'Enugu_logo'} className={'w-full h-full'} />
        </div>
      </div>
    </>
  );
}