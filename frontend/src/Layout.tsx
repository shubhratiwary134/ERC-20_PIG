import { Outlet } from "react-router";
import { useEagerConnect } from "./customHooks/useEagerConnect";

export const Layout = () => {
  useEagerConnect();

  return (
    <div className="app-container">
      // The outlet will render the matched child route component in my case App
      or PigRace
      <Outlet />
    </div>
  );
};
