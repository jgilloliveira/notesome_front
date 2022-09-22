import { Routes, Route, Outlet, Link } from "react-router-dom";
import { SessionRoutes } from "./session.routes";

export function RootRoutes() {
  return (
    <Routes>
      <Route path="/session/*" element={<SessionRoutes/>}/>
    </Routes>
  )
}