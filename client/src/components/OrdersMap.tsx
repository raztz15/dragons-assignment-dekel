import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useSelector } from 'react-redux';
import { RootState } from '@src/store';
import { Box, LinearProgress, List, ListItem, Typography } from '@mui/material';

export default function OrdersMap() {
    const { orders } = useSelector((state: RootState) => state.orders)
    const [mapReady, setMapReady] = useState(false);

    useEffect(() => {
        // This ensures the map is only rendered after the component has mounted
        setMapReady(true);
    }, []);

    if (!mapReady) {
        return <LinearProgress />;
    }

    return (
        <MapContainer center={[51.505, -0.09]} zoom={4} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
            {orders.map((order) => (
                <Marker
                    key={order._id}
                    position={[order.orderLocation.lat, order.orderLocation.lng] as L.LatLngExpression}
                    eventHandlers={{
                        mouseover: (e) => {
                            const marker = e.target;
                            marker.openPopup();
                        },
                        mouseout: (e) => {
                            const marker = e.target;
                            marker.closePopup();
                        },
                    }}>
                    <Popup>
                        <Box>
                            <Typography variant="h6" fontWeight="bold">
                                {order.customerName || 'Unknown Customer'}
                            </Typography>

                            <Typography variant="body2" color="textSecondary">
                                Order Time: {new Date(order.orderTime).toLocaleString()}
                            </Typography>

                            <Typography variant="body2" color="textSecondary">
                                Status: {order.status}
                            </Typography>

                            <Typography variant="body2" color="textSecondary">
                                Total Price: ${order.totalPrice?.toFixed(2) || 'N/A'}
                            </Typography>

                            <List dense>
                                {order.subItems.map((item, idx) => (
                                    <ListItem key={idx} sx={{ pl: 0 }}>
                                        {item.amount}x {item.title} ({item.type})
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}
