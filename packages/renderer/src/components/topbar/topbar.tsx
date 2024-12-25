"use client";

import type { NavbarProps } from "@nextui-org/react";
import { Navbar } from "@nextui-org/react";
import { useLocation } from "react-router";
import navbarConfig from "./navbarConfig";

export default function Topbar(props: NavbarProps) {
  const location = useLocation();

  const NavbarContent = navbarConfig[location.pathname];

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
      {NavbarContent}
    </Navbar>
  );
}
