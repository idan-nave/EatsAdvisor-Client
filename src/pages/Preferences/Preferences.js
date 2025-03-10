var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useAuth } from '@context';
import './preferences.css';
var Preferences = function () {
    var user = useAuth().user;
    var _a = useState(true), loading = _a[0], setLoading = _a[1];
    var _b = useState({
        allergies: [],
        dietaryConstraints: [],
        flavors: [],
        specialPreferences: []
    }), preferences = _b[0], setPreferences = _b[1];
    var availableOptions = {
        allergies: ['Dairy', 'Eggs', 'Fish', 'Shellfish', 'Tree Nuts', 'Peanuts', 'Wheat', 'Soy'],
        dietaryConstraints: ['Vegetarian', 'Vegan', 'Gluten-Free', 'Kosher', 'Halal', 'Low-Carb', 'Keto', 'Paleo'],
        flavors: ['Spicy', 'Sweet', 'Sour', 'Bitter', 'Savory', 'Umami'],
        specialPreferences: ['Low-Sodium', 'Low-Sugar', 'High-Protein', 'Low-Fat', 'Organic', 'Locally Sourced']
    };
    var _c = useState({ text: '', type: '' }), message = _c[0], setMessage = _c[1];
    useEffect(function () {
        // Fetch user preferences from the backend
        var fetchPreferences = function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    setLoading(true);
                    // This would be replaced with an actual API call
                    // const response = await api.get('/profile/preferences')
                    // setPreferences(response.data)
                    // Simulating API response for now
                    setTimeout(function () {
                        setPreferences({
                            allergies: ['Dairy', 'Peanuts'],
                            dietaryConstraints: ['Vegetarian'],
                            flavors: ['Spicy', 'Sweet'],
                            specialPreferences: ['Low-Sodium']
                        });
                        setLoading(false);
                    }, 1000);
                }
                catch (error) {
                    console.error('Error fetching preferences:', error);
                    setLoading(false);
                }
                return [2 /*return*/];
            });
        }); };
        if (user) {
            fetchPreferences();
        }
    }, [user]);
    var handleTogglePreference = function (category, item) {
        setPreferences(function (prev) {
            var _a;
            var updatedCategory = prev[category].includes(item)
                ? prev[category].filter(function (i) { return i !== item; })
                : __spreadArray(__spreadArray([], prev[category], true), [item], false);
            return __assign(__assign({}, prev), (_a = {}, _a[category] = updatedCategory, _a));
        });
    };
    var handleSavePreferences = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            try {
                setLoading(true);
                // This would be replaced with an actual API call
                // await api.post('/profile/preferences', preferences)
                // Simulating API response
                setTimeout(function () {
                    setMessage({ text: 'Preferences saved successfully!', type: 'success' });
                    setLoading(false);
                    // Clear message after 3 seconds
                    setTimeout(function () {
                        setMessage({ text: '', type: '' });
                    }, 3000);
                }, 1000);
            }
            catch (error) {
                console.error('Error saving preferences:', error);
                setMessage({ text: 'Failed to save preferences. Please try again.', type: 'error' });
                setLoading(false);
            }
            return [2 /*return*/];
        });
    }); };
    if (loading) {
        return _jsx("div", { className: "preferences-container loading", children: "Loading preferences..." });
    }
    return (_jsxs("div", { className: "preferences-container", children: [_jsx("h1", { children: "Your Dietary Preferences" }), _jsx("p", { className: "preferences-intro", children: "Customize your dietary preferences to get personalized menu recommendations. These settings will be used to highlight dishes that match your preferences." }), message.text && (_jsx("div", { className: "message ".concat(message.type), children: message.text })), _jsxs("div", { className: "preferences-section", children: [_jsx("h2", { children: "Allergies" }), _jsx("div", { className: "preferences-options", children: availableOptions.allergies.map(function (allergy) { return (_jsx("div", { className: "preference-option ".concat(preferences.allergies.includes(allergy) ? 'selected' : ''), onClick: function () { return handleTogglePreference('allergies', allergy); }, children: allergy }, allergy)); }) })] }), _jsxs("div", { className: "preferences-section", children: [_jsx("h2", { children: "Dietary Constraints" }), _jsx("div", { className: "preferences-options", children: availableOptions.dietaryConstraints.map(function (constraint) { return (_jsx("div", { className: "preference-option ".concat(preferences.dietaryConstraints.includes(constraint) ? 'selected' : ''), onClick: function () { return handleTogglePreference('dietaryConstraints', constraint); }, children: constraint }, constraint)); }) })] }), _jsxs("div", { className: "preferences-section", children: [_jsx("h2", { children: "Flavor Preferences" }), _jsx("div", { className: "preferences-options", children: availableOptions.flavors.map(function (flavor) { return (_jsx("div", { className: "preference-option ".concat(preferences.flavors.includes(flavor) ? 'selected' : ''), onClick: function () { return handleTogglePreference('flavors', flavor); }, children: flavor }, flavor)); }) })] }), _jsxs("div", { className: "preferences-section", children: [_jsx("h2", { children: "Special Preferences" }), _jsx("div", { className: "preferences-options", children: availableOptions.specialPreferences.map(function (pref) { return (_jsx("div", { className: "preference-option ".concat(preferences.specialPreferences.includes(pref) ? 'selected' : ''), onClick: function () { return handleTogglePreference('specialPreferences', pref); }, children: pref }, pref)); }) })] }), _jsx("button", { className: "save-preferences-button", onClick: handleSavePreferences, disabled: loading, children: loading ? 'Saving...' : 'Save Preferences' })] }));
};
export default Preferences;
