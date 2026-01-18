import { useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { GenerateReport } from "../../../services/reportServices/GenerateReport";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { checkPermission } from "../../../services/autorization";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";

const APPLICATION_REPORT_URL = process.env.REACT_APP_V2_APPLICATION_REPORT_URL;
// const APPLICATION_REPORT_URL = process.env.REACT_APP_APPLICATION_REPORT_URL;
export const FormSection = ({isLoading, setDownloadLink, setReportType}) => {
  const [format, setFormat] = useState('PDF');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [filter, setFilter] = useState('');
  const [filterPath, setFilterPath] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');
  const [pending, setPending] = useState(false);
  const [review, setReview] = useState(false);
  const [approve, setApprove] = useState(false);
  const [decline, setDecline] = useState(false);
  const [issue, setIssue] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [error, setError] = useState('');

  const { generate } = GenerateReport(`${APPLICATION_REPORT_URL}${filterPath}?reportType=${format}&from=${start}&to=${end}&sortIn=DESC${filter}`);

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
      const TYPE =  format === 'CSV' ? 'text/csv' : 'application/pdf';
      const REPORT_NAME =  'Report' + (format === 'CSV' ? '.csv' : '.pdf');
      let url = window.URL.createObjectURL(new Blob([result?.data], { type: TYPE }));
      // url = url.replaceAll("http", "https"); // Dev and Prod
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', REPORT_NAME);
      setDownloadLink(link);
      setReportType(REPORT_NAME);
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
    const buildParams = () => {
      let filterBuilder = '';

      if(pending) filterBuilder +=  'PENDING,';
      if(review) filterBuilder += 'REVIEW,';
      if(approve) filterBuilder += 'APPROVE,';
      if(decline) filterBuilder += 'DECLINE,';
      if(issue) filterBuilder += 'ISSUED,';
      const index = filterBuilder.lastIndexOf(',');

      return filterBuilder.substring(0, index);
    }

    const buildFilter = () => {
      let status = "&status=" + selectedFilter;
      setFilter(status.replaceAll(',', '%2C'));
    }
    if(pending || review || approve || decline || issue) {
      setSelectedFilter(buildParams());
      setFilterPath('/filter');
      setIsPaid(false);
      buildFilter();
    } else {
      setFilterPath('')
    }
    if(isPaid) {
      setPending(false);
      setReview(false);
      setApprove(false);
      setDecline(false);
      setIssue(false);
      setSelectedFilter("PAID");
      setFilterPath('/payment');
      buildFilter();
    }
  }, [pending, approve, decline, review, issue, selectedFilter, isPaid]);

  return checkPermission('CAN_GENERATE_REPORT') === '' ? (
    <>
      <div className="relative flex flex-col rounded-xl bg-transparent pb-10 mt-4 mb-10 ml-4">
        <h4 className="block text-xl font-medium text-slate-800">
          Select Date Range
        </h4>
        <div className="relative flex rounded-xl bg-transparent mt-4 mb-5 ml-4">
          <>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker label={"Start Date"}
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
              <DemoContainer components={["DatePicker"]}>
                <DatePicker label={"End Date"}
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
          <div className={"text-gray-900_01 font-bold"}>
            Application Status Filter:
          </div>
          <FormGroup>
            <FormControlLabel name={"pending"}
                              onChange={(e) => setPending(!pending)}
                              control={<Checkbox checked={pending} value={"PENDING"} />} label={"PENDING"} />
            <FormControlLabel name={"review"}
                              onChange={(e) => setReview(!review)}
                              control={<Checkbox checked={review} value={"REVIEW"} />} label={"REVIEWED"} /><
            FormControlLabel name={"approve"}
                             onChange={(e) => setApprove(!approve)}
                             control={<Checkbox checked={approve} value={"APPROVE"} />} label={"APPROVED"} />
            <FormControlLabel name={"decline"}
                              onChange={(e) => setDecline(!decline)}
                              control={<Checkbox checked={decline} value={"DECLINE"} />} label={"DECLINED"} />
            <FormControlLabel name={"issue"}
                              onChange={(e) => setIssue(!issue)}
                              control={<Checkbox checked={issue} value={"ISSUED"} />} label={"ISSUED"} />
          </FormGroup>
        </div>
        <div className={"relative flex gap-2 rounded-xl bg-transparent mt-4 mb-5 ml-4"}>
          <div className={"text-gray-900_01 font-bold"}>
            Application Paid Status:
          </div>
          <FormGroup>
            <FormControlLabel name={"isPaid"}
                              onChange={(e) => setIsPaid(!isPaid)}
                              control={<Checkbox checked={isPaid} value={"PAID"} />} label={"PAID"} />
          </FormGroup>
        </div>
        <div className={"w-full overflow-hidden border-solid border-t-2 border-t-black-900_01 pt-4"}>
          <ButtonGroup variant="contained" aria-label="Seconday button group" className={'!ml-6'}>
            <Button onClick={() => setFormat('PDF')}>PDF Format</Button>
            <Button onClick={() => setFormat('CSV')}>CSV Format</Button>
          </ButtonGroup>
          <button type={"button"}
                  onClick={requestGeneration}
                  className={` ${checkPermission("CAN_GENERATE_REPORT")} bg-gray-950 text-amber-100 p-6 rounded-[10px] float-right`}>
            Generate {format} Report
          </button>
        </div>
        <div
          className={`${error ? "" : "hidden"} mt-4 p-4 text-center bg-red-200 rounded-[10px] text-red-700 border-red-700 border-2`}>
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