"use client";

import LogoSmall from "@components/logos/LogoSmall";
import ImportExportDataset from "./DatasetModal";
import CreateDashboardModal from "./DashboardModal";
import type { NavbarProps } from "@nextui-org/react";
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";

export default function Topbar(props: NavbarProps) {
  return (
    <Navbar
      {...props}
      classNames={{
        base: "py-4 sm:pl-16 lg:pl-16 backdrop-filter-none bg-transparent",
        wrapper: "px-0 w-full justify-center bg-transparent",
        item: "hidden md:flex",
      }}
      height="54px"
    >
      <NavbarContent
        className=" gap-7 rounded-full border-none bg-zinc-800 px-10 shadow-md shadow-gray-950 backdrop-blur-md backdrop-saturate-150"
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
      </NavbarContent>

      {/* Menu */}
      <NavbarMenu
        className="dark bg-stone-900 top-[calc(var(--navbar-height)/2)] h-fit mx-auto mt-16 max-h-[45vh] max-w-[60vw] rounded-3xl border-none shadow-lg backdrop-blur-lg"
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
          <CreateDashboardModal />
        </NavbarMenuItem>
        <NavbarMenuItem>
          <ImportExportDataset />
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
