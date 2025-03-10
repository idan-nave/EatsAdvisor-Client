import { jsx as _jsx } from "react/jsx-runtime";
import { ImageUploader } from '@components';
import './home.css';
export default function Home() {
    return (_jsx("div", { className: "home-container", children: _jsx("div", { className: "home-content-container", children: _jsx(ImageUploader, {}) }) }));
}
