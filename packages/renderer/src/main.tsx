import React from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import "./styles/build.css";
import App from "./app";
import { HashRouter } from "react-router";

const container = document.getElementById("root");

const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <HashRouter>
      <main className="dark text-foreground h-fit min-h-screen">
        <App />
      </main>
    </HashRouter>
  </React.StrictMode>,
);
