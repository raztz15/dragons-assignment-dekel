import { Box, Container, Grid, Paper, Typography } from '@mui/material'
import { OrdersList } from '@src/components/OrdersList'
import OrdersMap from '@src/components/OrdersMap'

export const OrdersPage = () => {

    return (
        <Container maxWidth="lg" sx={{ height: '95vh', display: 'flex', flexDirection: 'column', gap: 2, py: 2 }}>
            <Typography variant='h4' fontWeight='bold'>Orders Dashboard</Typography>

            <Grid container spacing={2} sx={{ flexGrow: 1 }}>
                {/* Map Section */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ height: '100%', p: 2, display: 'flex', flexDirection: 'column' }}>
                        <Typography variant='h6' fontWeight='bold' sx={{ mb: 1 }}>Orders Map</Typography>
                        <Box sx={{ flexGrow: 1 }}>
                            <OrdersMap />
                        </Box>
                    </Paper>
                </Grid>

                {/* Orders List Section */}
                <Grid item xs={12} md={6}>
                    <OrdersList />
                </Grid>
            </Grid>
        </Container>
    )
}
