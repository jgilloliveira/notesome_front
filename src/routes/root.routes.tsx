import { Routes, Route, Outlet, Link, Navigate } from "react-router-dom";
import { isLogged } from "../connections/session.connection";
import { DeletedsPage } from "../pages/DeletedsPage";
import { FavoritesPage } from "../pages/FavoritesPage";
import { HomePage } from "../pages/HomePage";
import { SessionRoutes } from "./session.routes";

function AuthRoutes() {

  if (!isLogged()) return <Navigate to="/session/login"/>
  
  return (
    <Routes>
      <Route path="/folders/:parentFolder" element={<HomePage/>}/>
      <Route path="/favorites" element={<FavoritesPage/>}/>
      <Route path="/deleteds" element={<DeletedsPage/>}/>
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