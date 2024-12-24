import DashboardTable from "@features/tables/Searchable";
import Topbar from "@components/topbar/Topbar";
import { type ReactElement } from "react";
import DatasetTable from "@features/tables/SearchableSmall";

export default function Home(): ReactElement {
  return (
    <div>
      <Topbar />
      <div className="grid pl-24 pr-4 grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h1 className="font-bold text-lg mb-4 text-left">Dashboards</h1>
          <DashboardTable />
        </div>
        <div>
          <h1 className="font-bold text-lg mb-4 text-left">Datasets</h1>
          <DatasetTable />
        </div>
      </div>
    </div>
  );
}
