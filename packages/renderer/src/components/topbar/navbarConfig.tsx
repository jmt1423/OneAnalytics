import { ReactNode } from "react";
import HomeNav from "./home/home-nav";
import DatasetsNav from "./datasets/dataset-nav";

const navbarConfig: Record<string, ReactNode> = {
  "/home": <HomeNav />,
  "/datasets": <DatasetsNav />,
};
export default navbarConfig;
