import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { GenerateReport } from "../../../services/reportServices/GenerateReport";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";

const APPLICATION_REPORT_URL = process.env.REACT_APP_APPLICATION_REPORT_URL;
export const FormSection = ({isLoading, setDownloadLink}) => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [filter, setFilter] = useState('');
  const [filterPath, setFilterPath] = useState('');
  const [selectedFilter, setSelectedFilter] = useState([]);
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [error, setError] = useState('');

  const { generate } = GenerateReport(`${APPLICATION_REPORT_URL}${filterPath}?from=${start}&to=${end}&sortIn=DESC${filter}`);

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
    setStart(from.split('T')[0]);
    setEnd(to.split('T')[0]);
    // (selectedFilter.length > 0)? setFilterPath('/filter') : setFilterPath('');
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
      const url = window.URL.createObjectURL(new Blob([result?.data], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Report.pdf');
      setDownloadLink(link);
    }
    isLoading(false);
  }

  const addRemoveFilter = (value) => {
    const index = selectedFilter.findIndex(item => item === value);
    if(index > -1) {
      setSelectedFilter(selectedFilter.splice(index, 1));
    }else {
      setSelectedFilter([...selectedFilter, value]);
    }
    (selectedFilter.length > 0)? setFilterPath('/filter') : setFilterPath('');
    buildFilter();
  }

  const buildFilter = () => {
    let status = "&status=";
    selectedFilter.map(item => status = status.concat(item, ","));
    console.log(status);
    console.log(status.substring(0, status.length -1));
    setFilter(status.substring(0, status.length -1).replaceAll(',', '%2C'));

  }

  const setDate = (selectedDate) => {
    return (selectedDate === undefined || selectedDate.length === 0)?
      '' : selectedDate.split('T')[0];
  }

  return (
    <>
      <div className="relative flex flex-col rounded-xl bg-transparent pb-10 mt-4 mb-10 ml-4">
        <h4 className="block text-xl font-medium text-slate-800">
          Select Date Range
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
            {/*<span className={'font-bold size-[1.0rem]'}> - </span>*/}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker label={'End Date'}
                            name={from}
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
            Application Status Filter:
          </div>
          <FormGroup>
              <FormControlLabel name={'pending'}
                                onChange={(e)=> addRemoveFilter(e.target.value)}
                                control={<Checkbox value={'PENDING'} />} label={'PENDING'} />
            <FormControlLabel name={'review'}
                                onChange={(e)=> addRemoveFilter(e.target.value)}
                                control={<Checkbox value={'REVIEW'} />} label={'REVIEWED'} /><
            FormControlLabel name={'approve'}
                                onChange={(e)=> addRemoveFilter(e.target.value)}
                                control={<Checkbox value={'APPROVE'} />} label={'APPROVED'} />
            <FormControlLabel name={'decline'}
                                onChange={(e)=> addRemoveFilter(e.target.value)}
                                control={<Checkbox value={'DECLINE'} />} label={'DECLINED'} />
            <FormControlLabel name={'issue'}
                                onChange={(e)=> addRemoveFilter(e.target.value)}
                                control={<Checkbox value={'ISSUED'} />} label={'ISSUED'} />
          </FormGroup>
        </div>
        <div className={'w-full overflow-hidden border-solid border-t-2 border-t-black-900_01 pt-4'}>
          <button type={'button'}
                  onClick={requestGeneration}
                  className={'bg-gray-950 text-amber-100 p-6 rounded-[10px] float-right'}>Generate Report
          </button>
        </div>
        <div
          className={`${error ? '' : 'hidden'} mt-4 p-4 text-center bg-red-200 rounded-[10px] text-red-700 border-red-700 border-2`}>
          {error}
        </div>
      </div>
    </>
  );
}