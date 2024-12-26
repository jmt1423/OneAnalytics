import LogoSmall from "@components/logos/LogoSmall";
// import ImportExportDataset from "../home/dataset-modal";
// import CreateDashboardModal from "../home/dashboard-modal";
import CreateDatabaseModal from "./database-modal";
import {
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import React from "react";

const CreateDashboardModal = React.lazy(
  () => import("../home/dashboard-modal"),
);
const ImportExportDataset = React.lazy(() => import("../home/dataset-modal"));

export default function DatasetsNav() {
  return (
    <div>
      <NavbarContent
        className="min-h-14 gap-7 rounded-full border-none bg-zinc-800 px-10 shadow-md shadow-gray-950 backdrop-blur-md backdrop-saturate-150"
        justify="center"
      >
        {/* Toggle */}
        <NavbarMenuToggle className="text-default-400 md:hidden" />

        {/* Items */}
        <NavbarItem>
          <LogoSmall />
        </NavbarItem>
        <NavbarItem>
          <CreateDashboardModal />
        </NavbarItem>
        <NavbarItem>
          <ImportExportDataset />
        </NavbarItem>
        <NavbarItem>
          <CreateDatabaseModal />
        </NavbarItem>
      </NavbarContent>

      {/* Menu */}
      <NavbarMenu
        className="dark bg-stone-900 top-[calc(var(--navbar-height)/2)] h-fit pb-3 mx-auto mt-16 max-h-[45vh] max-w-[60vw] rounded-3xl border-none shadow-lg backdrop-blur-lg"
        motionProps={{
          initial: { opacity: 0, y: -20 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -20 },
          transition: {
            ease: "easeInOut",
            duration: 0.2,
          },
        }}
      >
        <NavbarMenuItem>
          <div>modal item 1</div>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <div>modal item 2</div>
        </NavbarMenuItem>
      </NavbarMenu>
    </div>
  );
}
