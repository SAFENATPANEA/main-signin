import { Typography, Grid, Card, CardContent } from "@mui/material"
import "./Productos.css"

const Productos = () => {
  return (
    <div className="productos">
      <Typography variant="h4" gutterBottom>
        Productos
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Producto 1</Typography>
              <Typography variant="body2" color="text.secondary">
                Descripción del producto 1
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Producto 2</Typography>
              <Typography variant="body2" color="text.secondary">
                Descripción del producto 2
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Producto 3</Typography>
              <Typography variant="body2" color="text.secondary">
                Descripción del producto 3
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}

export default Productos

