import { type ReactElement } from "react";
import { Divider } from "@nextui-org/react";
import Insights from "@features/dataset-features/components/insights";
import DynamicDashboardTable from "@components/tables/dynamic-table";

const datasets = [
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

export default function DsHome(): ReactElement {
  return (
    <div>
      {/* <Topbar /> */}
      <div className="flex flex-col w-full pl-28 pr-5">
        <Insights />
        <Divider className="my-4" />
        <DynamicDashboardTable data={datasets} />
      </div>
    </div>
  );
}
