import { Text } from "../../Text";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { GetDocumentService as getLicenseMetrics } from "../../../services";
import { Loader } from "../../Loader";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const options= {
  plugins: {
    title: {
      display: false,
        text: ''
    },
  },
  responsive: true,
    interaction: {
    intersect: true,
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true
    }
  }
}

const REPORT_METRIC_URL = process.env.REACT_APP_DOCUMENTS_REPORT_METRICS_URL;
export const StackBarReport = () => {
  const { documents, isLoading } = getLicenseMetrics(REPORT_METRIC_URL);
  const report = documents?.data;
  const data = {
    labels: report?.monthlyReports?.map(month => month?.monthName?.substring(0, 3)),
    datasets: [
      {
        label: 'Licenses',
        data: report?.monthlyReports?.map(value => value?.license),
        backgroundColor: '#F5C517',
        stack: 'Stack 0',
      },
      {
        label: 'Applications',
        data: report?.monthlyReports?.map(value => value?.application),
        backgroundColor: '#557CF2',
        stack: 'Stack 0',
      },
    ]
  };

  return isLoading? (
    <div className="flex w-[60%] justify-center rounded-[5px] bg-white-a700 p-2.5 md:w-full md:px-5">
      <div className="mb-4 flex w-full flex-col gap-3.5">
        <div className="flex items-center justify-center sm:flex-col">
          <Loader />
        </div>
      </div>
    </div>
  ) : (
    <div className="flex w-[55%] justify-center rounded-[5px] bg-white-a700 p-2.5 md:w-full md:px-5">
      <div className="mb-4 flex w-full flex-col gap-3.5">
        <div className="flex items-center justify-center sm:flex-col">
          <Text as="p" className="text-[24px] font-light text-gray-600 md:text-[22px]">
            Reports
          </Text>
          <div className="flex flex-1 items-center justify-center gap-1 sm:self-stretch">
            <div className="flex flex-1 items-start justify-end px-1.5">
              <div className="h-[12px] w-[12px] rounded-md bg-amber-500" />
              <Text size="texts" as="p" className="ml-1 self-center text-[14px] font-normal text-gray-600">
                Licenses
              </Text>
            </div>
            <div className="h-[12px] w-[12px] self-start rounded-md bg-indigo-a200" />
            <Text size="texts" as="p" className="text-[14px] font-normal text-gray-600">
              Applications
            </Text>
          </div>
        </div>
        <div className={'h-[250px] items-center justify-center sm:flex-col'}>
          <div className="flex h-[250px] flex-col items-stretch ">
            <Bar data={data} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
}