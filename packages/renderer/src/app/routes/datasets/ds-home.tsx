import { type ReactElement } from "react";
import DatasetHomeTable from "@features/dataset-features/components/table";
import { Divider } from "@nextui-org/react";
import Insights from "@features/dataset-features/components/insights";

export default function DsHome(): ReactElement {
  return (
    <div>
      {/* <Topbar /> */}
      <div className="flex flex-col w-full pl-28 pr-5">
        <Insights />
        <Divider className="my-4" />
        <DatasetHomeTable />
      </div>
    </div>
  );
}
