
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface Tab {
  id: string;
  label: string;
}

interface ProfileTabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (tabId: string) => void;
}

const ProfileTabs = ({ tabs, activeTab, onChange }: ProfileTabsProps) => {
  return (
    <div className="border-b border-thrift-lightgray">
      <div className="flex overflow-x-auto scrollbar-none">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              "px-5 py-3 font-medium text-sm whitespace-nowrap transition-all",
              activeTab === tab.id
                ? "text-thrift-charcoal border-b-2 border-thrift-sage"
                : "text-thrift-charcoal/70 hover:text-thrift-charcoal"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProfileTabs;
