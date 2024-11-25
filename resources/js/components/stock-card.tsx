import React from "react";

interface StockCardProps {
  title: string;
  value: string;
  growthRate: string;
  growthRatePositive: boolean;
  icon?: React.ReactNode;
  link: string;
  linkText: string;
}

const StockCard: React.FC<StockCardProps> = ({
  title,
  value,
  growthRate,
  growthRatePositive,
  icon,
  link,
  linkText,
}) => {
  return (
    <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-800">
      <div className="p-4 md:p-5 flex justify-between gap-x-3">
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-neutral-500">
            {title}
          </p>
          <div className="mt-1 flex items-center gap-x-2">
            <h3 className="text-xl sm:text-2xl font-medium text-gray-800 dark:text-neutral-200">
              {value}
            </h3>
            <span
              className={`flex items-center gap-x-1 text-lg ${
                growthRatePositive ? "text-green-600" : "text-red-600"
              }`}
            >
              <svg
                className="inline-block size-5 self-center"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {growthRatePositive ? (
                  <>
                    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                    <polyline points="16 7 22 7 22 13" />
                  </>
                ) : (
                  <>
                    <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" />
                    <polyline points="16 17 22 17 22 11" />
                  </>
                )}
              </svg>
              {growthRate}
            </span>
          </div>
        </div>
        <div className="shrink-0 flex justify-center items-center size-[46px] bg-blue-600 text-white rounded-full dark:bg-blue-900 dark:text-blue-200">
          {icon}
        </div>
      </div>
      <a
        className="py-3 px-4 md:px-5 inline-flex justify-between items-center text-sm text-gray-600 border-t border-gray-200 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 rounded-b-xl dark:border-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
        href={link}
      >
        {linkText}
        <svg
          className="shrink-0 size-4"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </a>
    </div>
  );
};

export default StockCard;
