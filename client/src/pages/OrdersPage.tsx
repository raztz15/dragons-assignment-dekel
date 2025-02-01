import { Box, Container, Grid, IconButton, Paper, Typography } from '@mui/material'
import { OrdersList } from '@src/components/OrdersList'
import OrdersMap from '@src/components/OrdersMap'
import { RtlToggle } from '@src/components/RtlToggle'
import { RootState } from '@src/store'
import { useSelector } from 'react-redux'

export const OrdersPage = () => {

    const { direction } = useSelector((state: RootState) => state.directions);

    return (
        <Container maxWidth="lg" sx={{ height: '95vh', display: 'flex', flexDirection: 'column', gap: 2, py: 2 }}>
            {/* Header Section with Title and RTL Toggle */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} dir={direction}>
                <Typography variant='h4' fontWeight='bold'>Orders Dashboard</Typography>
                <RtlToggle />
            </Box>

            <Grid container spacing={2} sx={{ flexGrow: 1 }}>
                {/* Map Section */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ height: '100%', p: 2, display: 'flex', flexDirection: 'column' }}>
                        <Typography variant='h6' fontWeight='bold' sx={{ mb: 1 }} dir={direction}>Orders Map</Typography>
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
