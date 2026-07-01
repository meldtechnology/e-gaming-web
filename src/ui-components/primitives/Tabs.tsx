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
    <div className="flex gap-2 border-b border-gray-300" role="tablist">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          role="tab"
          aria-selected={activeTab === tab.id}
          aria-controls={`${tab.id}-panel`}
          disabled={tab.disabled}
          className={`px-4 py-2 text-sm font-bold border-b-2 transition-all disabled:pointer-events-none disabled:opacity-50 ${activeTab === tab.id ? "border-gray-900 text-gray-900" : "border-transparent text-gray-600"}`}
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
