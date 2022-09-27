import { Routes, Route, Outlet, Link } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { SessionRoutes } from "./session.routes";

export function RootRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/session/*" element={<SessionRoutes/>}/>
    </Routes>
  )
}