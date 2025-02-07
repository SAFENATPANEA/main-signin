import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import "./ContentPanel.css"

const ContentPanel = ({ children, sidebarOpen }) => {
  const drawerWidth = 240

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 5,
        width: { sm: `calc(100% - ${sidebarOpen ? drawerWidth : 64}px)` },
        marginLeft: { sm: sidebarOpen ? `${drawerWidth}px` : "64px" },
        transition: "margin-left 0.3s ease",
      }}
    >
      <Toolbar />
      {children}
    </Box>
  )
}

export default ContentPanel

