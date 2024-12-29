import { NextUIProvider } from "@nextui-org/react";
import { AnimatePresence, motion } from "framer-motion";
import { Route, Routes, useLocation } from "react-router";
import Login from "@routes/auth/Login";
import { sidebarItems } from "@components/sidebar/SidebarItems";
import Sidebar from "@components/sidebar/Sidebar";
import Home from "./routes/home";
import DsHome from "./routes/datasets/ds-home";
import Topbar from "@components/topbar/topbar";

export default function App() {
  const location = useLocation();
  return (
    <NextUIProvider>
      {location.pathname !== "/" && (
        <div>
          <Topbar />
          <Sidebar items={sidebarItems} />
        </div>
      )}
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Login />} />
            <Route path="/home/" element={<Home />} />
            <Route path="/datasets/" element={<DsHome />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </NextUIProvider>
  );
}
