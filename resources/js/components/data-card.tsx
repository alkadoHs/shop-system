import React from "react";

interface CardProps {
  title: string;
  value: string | number;
  netValue: string | number;
  percentageChange: string;
  icon: React.ReactNode;
  percentageChangeDirection: "up" | "down";
  href?: string;
}

const DataCard: React.FC<CardProps> = ({
  title,
  value,
  netValue,
  percentageChange,
  icon,
  percentageChangeDirection,
  href = "#",
}) => {
  return (
    <a
      className="block p-4 md:p-5 relative bg-white hover:bg-gray-50 focus:outline-none focus:bg-gray-50 before:absolute before:top-0 before:start-0 before:w-full before:h-px md:before:w-px md:before:h-full before:bg-gray-200 before:first:bg-transparent dark:bg-neutral-900 dark:before:bg-neutral-800 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
      href={href}
    >
      <div className="flex md:flex flex-col lg:flex-row gap-y-3 gap-x-5">
        <div className="shrink-0 size-5 text-gray-400 dark:text-neutral-600">
          {icon}
        </div>
        <div className="grow">
          <p className="text-xs uppercase tracking-wide font-medium text-gray-800 dark:text-neutral-200">
            {title}
          </p>
          <h3 className="mt-1 text-xl sm:text-2xl font-semibold text-blue-600 dark:text-blue-500">
            {value}
          </h3>
          <div className="mt-1 flex justify-between items-center">
            <p className="text-sm text-gray-500 dark:text-neutral-500">
              NET{" "}
              <span className="font-semibold text-gray-800 dark:text-neutral-200">
                {netValue}
              </span>
            </p>
            <span className="ms-1 inline-flex items-center gap-1.5 py-1 px-2 rounded-md text-xs font-medium bg-gray-200 text-gray-800 dark:bg-neutral-800 dark:text-neutral-200">
              <svg
                className={`inline-block size-3 self-center ${
                  percentageChangeDirection === "up"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  d={
                    percentageChangeDirection === "up"
                      ? "M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"
                      : "M7.247 11.14l-4.796-5.481C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"
                  }
                />
              </svg>
              <span className="inline-block">{percentageChange}</span>
            </span>
          </div>
        </div>
      </div>
    </a>
  );
};

export default DataCard;
