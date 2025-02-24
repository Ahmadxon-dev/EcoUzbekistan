import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Button} from "@/components/ui/button.jsx";
import {Route, Routes, useLocation} from "react-router-dom";
import HomePage from "@/components/pages/HomePage.jsx";
import StatisticsPage from "@/components/pages/StatisticsPage.jsx";
import InspectorLoginPage from "@/components/pages/InspectorLoginPage.jsx";
import EachStatisticsPage from "@/components/pages/EachStatisticsPage.jsx";
import AddPage from "@/components/pages/AddPage.jsx";
import InspectorNotificationsPage from "@/components/pages/InspectorNotificationsPage.jsx";
import InspectorStatisticsPage from "@/components/pages/InspectorStatisticsPage.jsx";
import EachInspectorStatisticsPage from "@/components/pages/EachInspectorStatisticsPage.jsx";
import AdminStatisticsPage from "@/components/pages/AdminStatisticsPage.jsx";
import InspectorListPage from "@/components/pages/InspectorListPage.jsx";
import Navbar from "@/components/Navbar.jsx";
import Navbar2 from "@/components/Navbar2.jsx";

function App() {
    const {pathname} = useLocation()
  return (
    <>
        {pathname==="/" ? <Navbar/> : <Navbar2 />}
      <Routes>
          <Route path={"/"} element={<HomePage />} />
          <Route path={"/statistics"} element={<StatisticsPage />} />
          <Route path={"/inspector"} element={<InspectorLoginPage />} />
          <Route path={"/statistics/:id"} element={<EachStatisticsPage />} />
          <Route path={"/add"} element={<AddPage />} />
          <Route path={"/inspector/notifications"} element={<InspectorNotificationsPage /> } />
          <Route path={"/inspector/statistics"} element={<InspectorStatisticsPage />} />
          <Route path={"/inspector/statistics/:id"} element={<EachInspectorStatisticsPage /> } />
          <Route path={"/admin/statistics"} element={<AdminStatisticsPage />} />
          <Route path={"/inspectorlist"} element={<InspectorListPage />} />
      </Routes>
    </>
  )
}

export default App
