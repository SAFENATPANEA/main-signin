"use client"

import { useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import Box from "@mui/material/Box"
import Navbar from "./components/Navbar"
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
  const [darkMode, setDarkMode] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: "#618c35",
      },
      secondary: {
        main: "#87a668",
      },
      background: {
        default: darkMode ? "#333333" : "#f2f2f2",
        paper: darkMode ? "#424242" : "#ffffff",
      },
    },
    typography: {
      fontFamily: "Roboto, sans-serif",
    },
  })

  const handleDrawerToggle = () => {
    if (window.innerWidth < 600) {
      setMobileOpen(!mobileOpen)
    } else {
      setSidebarOpen(!sidebarOpen)
    }
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
  
    <Box sx={{ display: "flex" }}>
          <Sidebar open={window.innerWidth < 600 ? mobileOpen : sidebarOpen} toggleSidebar={handleDrawerToggle} />
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

 