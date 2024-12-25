import { type ReactElement } from "react";

export default function Insights(): ReactElement {
  return (
    <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
      {/* Active Connections */}
      <div className="flex flex-col">
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
          Active Connections
        </span>
        <span className="text-lg font-semibold text-gray-700 dark:text-gray-200">
          5
        </span>
      </div>

      {/* Total Rows */}
      <div className="flex flex-col">
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
          Total Rows
        </span>
        <span className="text-lg font-semibold text-gray-700 dark:text-gray-200">
          12,345
        </span>
      </div>

      {/* Total Tables */}
      <div className="flex flex-col">
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
          Total Tables
        </span>
        <span className="text-lg font-semibold text-gray-700 dark:text-gray-200">
          10
        </span>
      </div>

      {/* Missing Indexes */}
      <div className="flex flex-col">
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
          Missing Indexes
        </span>
        <span className="text-lg font-semibold text-red-600">3</span>
      </div>

      {/* Orphaned Rows */}
      <div className="flex flex-col">
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
          Orphaned Rows
        </span>
        <span className="text-lg font-semibold text-yellow-500">45</span>
      </div>

      {/* Database Size */}
      <div className="flex flex-col">
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
          Database Size
        </span>
        <span className="text-lg font-semibold text-gray-700 dark:text-gray-200">
          5.3 MB
        </span>
      </div>
    </div>
  );
}
