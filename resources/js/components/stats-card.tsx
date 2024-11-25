import { ChartPie } from "lucide-react";
import React from "react";

interface StatsCardProps {
  label: string;
  icon?: React.ReactNode;
  content: string | number;
}

const StatsCard: React.FC<StatsCardProps> = ({ label, icon, content }) => {
  return (
    <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-800">
      <div className="p-4 md:p-5 flex gap-x-4">
        {/* Icon Section */}
        <div className="shrink-0 flex justify-center items-center w-[46px] h-[46px] bg-secondary rounded-lg">
          {icon || (
            <ChartPie />
          )}
        </div>

        {/* Content Section */}
        <div className="grow">
          <div className="flex items-center gap-x-2">
            <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-neutral-500">
              {label}
            </p>
          </div>
          <div className="mt-1 flex items-center gap-x-2">
            <h3 className="text-xl font-medium text-gray-800 dark:text-neutral-200">
              {content}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
