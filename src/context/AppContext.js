import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState } from 'react';
var AppContext = createContext(undefined);
export var AppProvider = function (_a) {
    var children = _a.children;
    var _b = useState('light'), theme = _b[0], setTheme = _b[1];
    var toggleTheme = function () {
        setTheme(function (prev) { return (prev === 'light' ? 'dark' : 'light'); });
    };
    return (_jsx(AppContext.Provider, { value: { theme: theme, toggleTheme: toggleTheme }, children: children }));
};
export var useAppContext = function () {
    var context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};
