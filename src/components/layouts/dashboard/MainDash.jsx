"use client"

import { useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import CssBaseline from "@mui/material/CssBaseline"
import Box from "@mui/material/Box"
import Sidebar from "./components/Sidebar"
import ContentPanel from "./components/ContentPanel"
import Productos from "./components/Productos"
import Ventas from "./components/Ventas"
import Clientes from "./components/Clientes"
import Reportes from "./components/Reportes"
import Inventario from "./components/Inventario"
import Configuracion from "./components/Configuracion"
import "./MainDash.css"

const MainDash = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
 
  
  const handleDrawerToggle = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
  
        <Box sx={{ display: "flex" }}>
           <Sidebar open={sidebarOpen} toggleSidebar={handleDrawerToggle} />
          <ContentPanel sidebarOpen={sidebarOpen}>
            <Routes>
              <Route path="/productos" element={<Productos />} />
              <Route path="/ventas" element={<Ventas />} />
              <Route path="/clientes" element={<Clientes />} />
              <Route path="/reportes/*" element={<Reportes />} />
              <Route path="/inventario" element={<Inventario />} />
              <Route path="/configuracion" element={<Configuracion />} />
              <Route path="/" element={<Productos />} />
            </Routes>
          </ContentPanel>
         
        </Box>
  )
}

export default MainDash
