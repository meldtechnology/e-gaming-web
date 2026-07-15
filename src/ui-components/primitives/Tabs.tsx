import { type ReactNode } from "react";

export type TabItem = {
  id: string;
  label: ReactNode;
  panel: ReactNode;
  disabled?: boolean;
};

export type TabsProps = {
  tabs: TabItem[];
  activeTab: string;
  onChange: (tab: string) => void;
  className?: string;
};

export const Tabs = ({ tabs, activeTab, onChange, className = "" }: TabsProps) => (
  <div className={className}>
    <div className="flex gap-1 border-b border-border" role="tablist">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          role="tab"
          aria-selected={activeTab === tab.id}
          aria-controls={`${tab.id}-panel`}
          disabled={tab.disabled}
          className={`-mb-px px-4 py-2.5 text-sm font-semibold border-b-2 transition-colors disabled:pointer-events-none disabled:opacity-50 ${activeTab === tab.id ? "border-brand text-brand" : "border-transparent text-text-secondary hover:text-text-primary hover:border-border-strong"}`}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
    {tabs.map((tab) => (
      <div key={tab.id} id={`${tab.id}-panel`} role="tabpanel" hidden={activeTab !== tab.id}>
        {activeTab === tab.id ? tab.panel : null}
      </div>
    ))}
  </div>
);
