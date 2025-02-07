"use client"

import React from "react"
import { AppBar, Toolbar, IconButton, Typography, Avatar, Menu, MenuItem } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined"
import Brightness4OutlinedIcon from "@mui/icons-material/Brightness4Outlined"
import Brightness7OutlinedIcon from "@mui/icons-material/Brightness7Outlined"
import { useTheme } from "@mui/material/styles"
import "./Navbar.css"

const Navbar = ({ toggleSidebar, toggleDarkMode, sidebarOpen }) => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const theme = useTheme()

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <AppBar position="fixed" className="navbar" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={toggleSidebar}
          sx={{ marginRight: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          Dashboard
        </Typography>
        <IconButton color="inherit" onClick={toggleDarkMode}>
          {theme.palette.mode === "dark" ? <Brightness7OutlinedIcon /> : <Brightness4OutlinedIcon />}
        </IconButton>
        <div>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <Avatar>
              <AccountCircleOutlinedIcon />
            </Avatar>
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Perfil</MenuItem>
            <MenuItem onClick={handleClose}>Mi cuenta</MenuItem>
            <MenuItem onClick={handleClose}>Cerrar sesión</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar

