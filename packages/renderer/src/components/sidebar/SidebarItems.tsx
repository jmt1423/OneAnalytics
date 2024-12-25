import { SidebarType } from "./types";

export const sidebarItems: SidebarType[] = [
  {
    key: "home",
    href: "/home",
    icon: "solar:home-2-linear",
    title: "Home",
  },
  {
    key: "projects",
    href: "/projects",
    icon: "solar:folder-2-linear",
    title: "Projects",
  },
  {
    key: "dashboards",
    href: "/dashboards",
    icon: "solar:graph-linear",
    title: "Dashboards",
  },
  {
    key: "Datasets",
    href: "/datasets",
    icon: "solar:database-outline",
    title: "Datasets",
  },
  {
    key: "tasks",
    href: "/tasks",
    icon: "solar:checklist-minimalistic-outline",
    title: "Tasks",
  },
  {
    key: "settings",
    href: "/settings",
    icon: "solar:settings-outline",
    title: "Settings",
  },
  {
    key: "logout",
    href: "/",
    icon: "solar:login-3-linear",
    title: "Logout",
  },
];
