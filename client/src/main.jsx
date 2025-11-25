import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { NuqsAdapter } from "nuqs/adapters/react";

import "./index.css";
import App from "./App";
import QueryProvider from "./context/query-provider";
import { Toaster } from "./components/ui/toaster";
import { Provider } from "@radix-ui/react-tooltip";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryProvider>
      <BrowserRouter>
        <NuqsAdapter>
          <App />
        </NuqsAdapter>
      </BrowserRouter>
      <Toaster />
    </QueryProvider>
  </StrictMode>
);
