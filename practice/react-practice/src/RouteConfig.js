import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Layout from "./commponents/Layout"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Dashboard from "./pages/Dashboard"
import ProtectedRoute from "./commponents/ProtectedRoutes"
import Login from "./pages/Login"

const RouteConfig = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                

                <Route element={<ProtectedRoute />}>
                    <Route index element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="dashboard" element={<Dashboard />} />
                </Route>
            </Route>

            <Route path="/login" element={<Login />} />
        </Routes>
    )
}

export default RouteConfig