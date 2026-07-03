import { env } from "../../../config/env";
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
import { useState } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { getCurrentYear } from "../../../services/unitTens";
import { EmptyState } from "../../primitives";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const options = {
  plugins: {
    title: { display: false, text: '' },
    legend: { display: false },
  },
  responsive: true,
  maintainAspectRatio: false,
  interaction: { intersect: true },
  scales: {
    x: { stacked: true, grid: { display: false } },
    y: { stacked: true, grid: { color: "rgba(148,163,184,0.18)" } },
  },
};

const LICENSE_COLOR = "#f59e0b";
const APPLICATION_COLOR = "#2f6bff";

const REPORT_METRIC_URL = env.DOCUMENTS_REPORT_METRICS_URL;
export const StackBarReport = () => {
  const [year, setYear] = useState(getCurrentYear());
  const { documents, isLoading }
    = getLicenseMetrics(`${REPORT_METRIC_URL}?from=${year}-01-01&to=${year}-12-31` ) as {
      documents?: { data?: { monthlyReports?: Array<{ monthName?: string; license?: number; application?: number }> } };
      isLoading?: boolean;
    };
  const report = documents?.data;
  const monthlyReports = report?.monthlyReports ?? [];
  const data = {
    labels: monthlyReports.map(month => month?.monthName?.substring(0, 3)),
    datasets: [
      {
        label: 'Licenses',
        data: monthlyReports.map(value => value?.license),
        backgroundColor: LICENSE_COLOR,
        borderRadius: 6,
        stack: 'Stack 0',
      },
      {
        label: 'Applications',
        data: monthlyReports.map(value => value?.application),
        backgroundColor: APPLICATION_COLOR,
        borderRadius: 6,
        stack: 'Stack 0',
      },
    ]
  };

  return (
    <div className="flex w-full flex-col rounded-2xl border border-border bg-surface p-5 shadow-e1">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-text-primary">Reports</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-sm text-text-secondary">
              <span className="h-2.5 w-2.5 rounded-sm bg-warning" /> Licenses
            </span>
            <span className="flex items-center gap-1.5 text-sm text-text-secondary">
              <span className="h-2.5 w-2.5 rounded-sm bg-brand" /> Applications
            </span>
          </div>
          <FormControl size="small">
            <Select
              labelId="report-year-label"
              id="report-year"
              name={'year'}
              value={year}
              onChange={(e) => setYear(e.target.value)}
              variant={'outlined'}
            >
              {[...Array(15).keys()]?.map((option, idx) => (
                <MenuItem key={idx} value={2024 + option}>{2024 + option}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
      {isLoading ? (
        <div className="flex h-[280px] items-center justify-center">
          <Loader w={'w-8'} h={'h-8'} />
        </div>
      ) : monthlyReports.length ? (
        <div className="h-[280px]">
          <Bar data={data} options={options} />
        </div>
      ) : (
        <EmptyState title="No report data is available" />
      )}
    </div>
  );
}
