import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./pages/Home/index.tsx";
import { GlobalStyle } from "./global.ts";
import { Plan } from "./pages/Plan/index.tsx";
import { BiblePlanProvider } from "./contexts/BiblePlanContext.tsx";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/plan",
    element: <Plan />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GlobalStyle />
    <BiblePlanProvider>
      <RouterProvider router={router} />
    </BiblePlanProvider>
    <Analytics />
    <SpeedInsights />
  </React.StrictMode>
);
