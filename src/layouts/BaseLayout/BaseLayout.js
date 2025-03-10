import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { NavBar } from '@components';
import { Outlet } from 'react-router';
import './base-layout.css';
export default function BaseLayout() {
    return (_jsxs("div", { className: "base-layout-container", children: [_jsx(NavBar, {}), _jsx(Outlet, {})] }));
}
