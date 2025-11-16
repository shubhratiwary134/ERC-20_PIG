import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import store from "./store/store.ts";
import { BrowserRouter, Route, Routes } from "react-router";
import PigRace from "./pages/PigRace.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Layout } from "./Layout.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={new QueryClient()}>
        <Provider store={store}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<App />} />
              <Route path="/pigRace" element={<PigRace />} />
            </Route>
          </Routes>
        </Provider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
