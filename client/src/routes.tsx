import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { OrdersPage } from "./pages/OrdersPage";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to='/orders' />} />
                <Route path="/orders" element={< OrdersPage />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;