import { Routes, Route, Outlet, Link, Navigate } from "react-router-dom";
import { isLogged } from "../connections/session.connection";
import { HomePage } from "../pages/HomePage";
import { SessionRoutes } from "./session.routes";

function AuthRoutes() {

  if (!isLogged()) return <Navigate to="/session/login"/>
  
  return (
    <Routes>
      <Route path="/folders/:parentFolder" element={<HomePage/>}/>
      <Route path="/" element={<HomePage/>}/>
    </Routes>
  )
}

export function RootRoutes() {
  return (
    <Routes>
      <Route path="/session/*" element={<SessionRoutes/>}/>
      <Route path="/*" element={<AuthRoutes/>}/>
    </Routes>
  )
}