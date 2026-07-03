import { type HTMLAttributes, type ComponentType, type SVGProps } from "react";
import {
  BanknotesIcon,
  CreditCardIcon,
  UserGroupIcon,
  DocumentCheckIcon,
} from "@heroicons/react/24/outline";

type Metric = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
  href: string;
  accent: string;
  prefix?: string;
};

const METRICS: Metric[] = [
  { icon: BanknotesIcon, label: "Total Revenue", href: "/app/applications", accent: "bg-brand-soft text-brand", prefix: "₦ " },
  { icon: CreditCardIcon, label: "Total Payments", href: "/app/applications", accent: "bg-success-soft text-success" },
  { icon: UserGroupIcon, label: "Total Operators", href: "/app/applications", accent: "bg-warning-soft text-warning" },
  { icon: DocumentCheckIcon, label: "Total Licenses", href: "/app/applications", accent: "bg-info-soft text-info" },
];

type HeaderProps = HTMLAttributes<HTMLElement> & {
  metrics: Array<string | number | undefined>;
};

export default function Header({ metrics, className = "", ...props }: HeaderProps) {
  return (
    <header {...props} className={`${className} flex flex-col gap-6`}>
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-text-primary">Dashboard</h1>
        <p className="mt-1 text-sm text-text-secondary">Overview of revenue, payments, operators and licenses.</p>
      </div>
      <div className="grid grid-cols-4 gap-4 md:grid-cols-2 sm:grid-cols-1">
        {METRICS.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <a
              key={metric.label}
              href={metric.href}
              className="group flex items-center gap-4 rounded-2xl border border-border bg-surface p-4 shadow-e1 transition-all hover:-translate-y-0.5 hover:shadow-e2"
            >
              <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${metric.accent}`}>
                <Icon className="h-6 w-6" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-xl font-bold text-text-primary">
                  {metric.prefix ?? ""}
                  {metrics[index] ?? 0}
                </p>
                <p className="truncate text-sm text-text-secondary">{metric.label}</p>
              </div>
            </a>
          );
        })}
      </div>
    </header>
  );
}
