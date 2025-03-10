var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '@constants';
import { uploadMenu } from '../../api/api';
import './ScanAnimation.css';
var ScanAnimation = function () {
    var _a;
    var location = useLocation();
    var navigate = useNavigate();
    var file = (_a = location.state) === null || _a === void 0 ? void 0 : _a.file;
    var _b = useState(null), imageSrc = _b[0], setImageSrc = _b[1];
    var _c = useState(null), error = _c[0], setError = _c[1];
    useEffect(function () {
        if (!file)
            return;
        var objectUrl = URL.createObjectURL(file);
        setImageSrc(objectUrl);
        var uploadFile = function () { return __awaiter(void 0, void 0, void 0, function () {
            var data_1, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, uploadMenu(file)];
                    case 1:
                        data_1 = _a.sent();
                        console.log("data", data_1);
                        setTimeout(function () { return navigate(ROUTES.MENU_TABLE, { state: { data: data_1 } }); }, 2000);
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        setError(err_1.response.data.error || 'Failed to upload menu');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        uploadFile();
        return function () { return URL.revokeObjectURL(objectUrl); };
    }, [file, navigate]);
    return (_jsxs("div", { className: "scan-container", children: [!error && imageSrc && (_jsx("img", { src: imageSrc, alt: "Scanning", className: "scan-image" })), !error && _jsx("div", { className: "scan-line" }), error && (_jsxs("div", { className: "upload-status error", children: [error, _jsx("div", { className: "go-back-home", onClick: function () {
                            navigate(ROUTES.HOME);
                        }, children: "Try again" })] }))] }));
};
export default ScanAnimation;
