import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import Header from "../Components/Header";
const Layout = () => {
    return <>
    <Header></Header>
    <Outlet />
    </>;
};

export default Layout;
