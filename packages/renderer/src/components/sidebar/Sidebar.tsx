import { Icon } from "@iconify/react";
import { cn } from "@nextui-org/react";
import { Tooltip } from "@nextui-org/react";
import { Link, useLocation } from "react-router";
import { SidebarType } from "./types";

interface SidebarProps {
  items: SidebarType[];
  className?: string;
}
const Sidebar = ({ items, className }: SidebarProps) => {
  const location = useLocation();

  return (
    <div
      className={cn(
        "fixed left-4 top-1/2 transform -translate-y-1/2 h-[90vh] w-16 bg-zinc-800/60 text-white shadow-lg rounded-2xl flex flex-col items-center justify-center",
        className || "",
      )}
    >
      <div className="flex flex-col items-center justify-center gap-4 py-4 h-full w-full">
        {items.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <div
              key={item.key}
              className="w-full flex items-center justify-center h-12"
            >
              <Tooltip
                content={item.title}
                placement="right"
                className="z-50 text-black"
              >
                <Link to={item.href}>
                  <Icon
                    className={cn(
                      "text-default-500",
                      isActive && "text-primary",
                    )}
                    icon={item.icon}
                    width={24}
                  />
                </Link>
              </Tooltip>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
