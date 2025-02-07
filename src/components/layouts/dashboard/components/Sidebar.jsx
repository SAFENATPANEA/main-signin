"use client"

import React, { useState } from "react"
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Collapse, Box } from "@mui/material"
import { Link } from "react-router-dom"
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined"
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined"
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined"
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined"
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined"
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined"
import ExpandLess from "@mui/icons-material/ExpandLess"
import ExpandMore from "@mui/icons-material/ExpandMore"
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined"
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined"
import PieChartOutlinedIcon from "@mui/icons-material/PieChartOutlined"
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined"
import "./Sidebar.css"

const Sidebar = ({ open, toggleSidebar }) => {
  const [reportesOpen, setReportesOpen] = useState(false)

  const handleReportesClick = () => {
    setReportesOpen(!reportesOpen)
  }

  const menuItems = [
    { text: "Productos", icon: <ShoppingCartOutlinedIcon />, path: "/productos" },
    { text: "Ventas", icon: <ReceiptOutlinedIcon />, path: "/ventas" },
    { text: "Clientes", icon: <PeopleOutlinedIcon />, path: "/clientes" },
    {
      text: "Reportes",
      icon: <BarChartOutlinedIcon />,
      subItems: [
        { text: "Ventas", icon: <AssessmentOutlinedIcon />, path: "/reportes/ventas" },
        { text: "Inventario", icon: <TimelineOutlinedIcon />, path: "/reportes/inventario" },
        { text: "Clientes", icon: <PieChartOutlinedIcon />, path: "/reportes/clientes" },
        { text: "Finanzas", icon: <TrendingUpOutlinedIcon />, path: "/reportes/finanzas" },
      ],
    },
    { text: "Inventario", icon: <InventoryOutlinedIcon />, path: "/inventario" },
    { text: "Configuración", icon: <SettingsOutlinedIcon />, path: "/configuracion" },
  ]

  const drawerWidth = 240

  return (
    <Drawer
      variant="permanent"
      className={`sidebar ${open ? "open" : ""}`}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          transition: "width 0.3s ease",
          overflowX: "hidden",
          width: open ? drawerWidth : "64px",
        },
      }}
      open={open}
    >
      <Box sx={{ height: (theme) => theme.mixins.toolbar }} />
      <List>
        {menuItems.map((item) =>
          item.subItems ? (
            <React.Fragment key={item.text}>
              <ListItem button onClick={handleReportesClick}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                {open && <ListItemText primary={item.text} />}
                {open && (reportesOpen ? <ExpandLess /> : <ExpandMore />)}
              </ListItem>
              <Collapse in={reportesOpen && open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.subItems.map((subItem) => (
                    <ListItem button key={subItem.text} component={Link} to={subItem.path} sx={{ pl: 4 }}>
                      <ListItemIcon>{subItem.icon}</ListItemIcon>
                      {open && <ListItemText primary={subItem.text} />}
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </React.Fragment>
          ) : (
            <ListItem button key={item.text} component={Link} to={item.path}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              {open && <ListItemText primary={item.text} />}
            </ListItem>
          ),
        )}
      </List>
    </Drawer>
  )
}

export default Sidebar

