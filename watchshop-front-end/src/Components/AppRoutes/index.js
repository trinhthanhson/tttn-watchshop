import { BrowserRouter, Route, Routes } from "react-router-dom";
import Customers from "../../Pages/Customers";
import Dashboard from "../../Pages/Dashbaord";
import Inventory from "../../Pages/Inventory";
import Orders from "../../Pages/Orders";
import Login from "../../Pages/LoginPage/Login";
import AppHeader from "../AppHeader";
import SideMenu from "../SideMenu";
import AppFooter from "../AppFooter";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/manager/*"
        element={
          <div className="App">
            <AppHeader />
            <div className="SideMenuAndPageContent">
              <SideMenu />
              <div className="PageContent">
                <Routes>
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="products" element={<Inventory />} />
                  <Route path="orders" element={<Orders />} />
                  <Route path="customers" element={<Customers />} />
                </Routes>
              </div>
            </div>
            <AppFooter />
          </div>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
