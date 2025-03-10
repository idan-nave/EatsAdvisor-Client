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
import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '@api';
var AuthContext = createContext(undefined);
export var AuthProvider = function (_a) {
    var children = _a.children;
    var _b = useState(null), user = _b[0], setUser = _b[1];
    var _c = useState(true), loading = _c[0], setLoading = _c[1];
    var navigate = useNavigate();
    // Helper function to check if jwt_present cookie exists
    var hasJwtCookie = function () {
        return document.cookie.split(';').some(function (cookie) { return cookie.trim().startsWith('jwt_present='); });
    };
    useEffect(function () {
        var isMounted = true;
        var fetchUser = function () { return __awaiter(void 0, void 0, void 0, function () {
            var jwtPresent, response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        console.log('[AuthProvider] Fetching user data from /auth/me');
                        console.log('[AuthProvider] document.cookie:', document.cookie);
                        jwtPresent = hasJwtCookie();
                        console.log('[AuthProvider] JWT Cookie present:', jwtPresent);
                        if (!jwtPresent) {
                            console.log('[AuthProvider] No JWT cookie found, user not authenticated');
                            setUser(null);
                            setLoading(false);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, api.get('/auth/me', { withCredentials: true })];
                    case 1:
                        response = _a.sent();
                        console.log('[AuthProvider] Response:', response.status, response.data);
                        if (response.status === 200 && isMounted) {
                            console.log('[AuthProvider] User authenticated:', response.data);
                            setUser(response.data);
                        }
                        else if (isMounted) {
                            console.log('[AuthProvider] User not authenticated, setting null');
                            setUser(null);
                        }
                        return [3 /*break*/, 4];
                    case 2:
                        error_1 = _a.sent();
                        console.error('[AuthProvider] Auth fetch failed:', error_1);
                        if (isMounted) {
                            setUser(null);
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        if (isMounted) {
                            setLoading(false);
                        }
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        fetchUser();
        // Listen for storage events for cross-tab auth sync
        var handleStorageChange = function () {
            console.log('[AuthProvider] Storage event detected, refetching user');
            fetchUser();
        };
        window.addEventListener('storage', handleStorageChange);
        return function () {
            isMounted = false;
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);
    var login = function () {
        console.log('[AuthProvider] Redirecting to Google OAuth login');
        window.location.href = "".concat(api.defaults.baseURL, "/oauth2/authorization/google");
    };
    var handleLoginRedirect = function () {
        console.log('[AuthProvider] Redirecting to /dashboard');
        navigate('/dashboard');
    };
    var logout = function () { return __awaiter(void 0, void 0, void 0, function () {
        var error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('[AuthProvider] Logging out');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, api.get('/auth/logout', { withCredentials: true })];
                case 2:
                    _a.sent();
                    setUser(null);
                    navigate('/');
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    console.error('[AuthProvider] Logout failed:', error_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    return (_jsx(AuthContext.Provider, { value: { user: user, loading: loading, login: login, logout: logout, handleLoginRedirect: handleLoginRedirect }, children: children }));
};
export var useAuth = function () {
    var context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
