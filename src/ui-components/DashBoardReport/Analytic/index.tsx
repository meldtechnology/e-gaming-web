
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import type { ChartOptions } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { formatCompactNumber } from "../../../services/formatAmount";

ChartJS.register(ArcElement, Tooltip, Legend);

const options: ChartOptions<"doughnut"> = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '62%',
  spacing: 4,
  plugins: { legend: { display: false } },
}

const SERIES = [
  { label: "Total Paid", color: "#2f6bff", dot: "bg-brand" },
  { label: "Total Unpaid", color: "#94a3b8", dot: "bg-text-muted" },
  { label: "Total Overdue", color: "#f59e0b", dot: "bg-warning" },
];

export const Analytic = ({metric = [0, 0, 0], license}: { metric?: number[]; license?: number | string }) => {
  const dataDonut = {
    labels: SERIES.map((s) => s.label),
    datasets: [
      {
        data: metric,
        backgroundColor: SERIES.map((s) => s.color),
        borderColor: "transparent",
        borderWidth: 2,
        dataVisibility: new Array(metric.length).fill(true),
      },
    ],
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative h-[200px] w-[200px] content-center">
        <Doughnut data={dataDonut} options={options} />
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-text-primary">{license ?? 0}</span>
          <span className="text-xs font-medium uppercase tracking-wide text-text-secondary">Licenses</span>
        </div>
      </div>
      <div className="grid w-full grid-cols-3 gap-3 sm:grid-cols-1">
        {SERIES.map((series, index) => (
          <div key={series.label} className="rounded-xl bg-surface-muted p-3">
            <p className="text-sm text-text-secondary">{series.label}</p>
            <div className="mt-1 flex items-center gap-2">
              <span className={`h-2 w-2 rounded-full ${series.dot}`} />
              <span className="text-base font-bold text-text-primary">₦ {formatCompactNumber(metric[index])}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
