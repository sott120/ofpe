import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import Header from "../Components/Header";
const LayoutNotHeader = () => {
    return (
        <>
            <Outlet></Outlet>
        </>
    );
};

export default LayoutNotHeader;
