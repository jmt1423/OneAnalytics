import DynamicDashboardTable from "@components/tables/dynamic-table";
import { type ReactElement } from "react";

const data = [
  {
    id: 1,
    name: "Sales Overview",
    description: "Monthly sales performance metrics and trends.",
    status: "completed",
  },
  {
    id: 2,
    name: "Customer Insights",
    description: "Demographics and purchase behaviors analysis.",
    status: "stale",
  },
  {
    id: 3,
    name: "Marketing ROI",
    description: "Return on investment for recent campaigns.",
    status: "completed",
  },
  {
    id: 4,
    name: "Website Traffic",
    description: "Analysis of traffic sources and user behavior.",
    status: "ongoing",
  },
  {
    id: 5,
    name: "Website Traffic",
    description: "Analysis of traffic sources and user behavior.",
    status: "ongoing",
  },
  {
    id: 6,
    name: "Website Traffic",
    description: "Analysis of traffic sources and user behavior.",
    status: "ongoing",
  },
];
const data2 = [
  {
    id: 1,
    name: "Customer Demographics",
    description: "Detailed data on customer age, gender, location, and income.",
  },
  {
    id: 2,
    name: "Product Sales Data",
    description: "Historical sales data segmented by product categories.",
  },
  {
    id: 3,
    name: "Marketing Campaign Data",
    description:
      "Performance metrics from past and ongoing marketing campaigns.",
  },
  {
    id: 4,
    name: "Marketing Campaign Data",
    description:
      "Performance metrics from past and ongoing marketing campaigns.",
  },
  {
    id: 5,
    name: "Marketing Campaign Data",
    description:
      "Performance metrics from past and ongoing marketing campaigns.",
  },
  {
    id: 6,
    name: "Marketing Campaign Data",
    description:
      "Performance metrics from past and ongoing marketing campaigns.",
  },
];

export default function Home(): ReactElement {
  return (
    <div>
      <div className="grid pl-24 pr-4 grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h1 className="font-bold text-lg mb-4 text-left">Dashboards</h1>
          <DynamicDashboardTable data={data} />
        </div>
        <div>
          <h1 className="font-bold text-lg mb-4 text-left">Datasets</h1>
          <DynamicDashboardTable data={data2} />
        </div>
      </div>
    </div>
  );
}
