import { useState, useEffect } from "react";
function useLocalStorage(key, initialValue) {
    var _a = useState(function () {
        try {
            var item = localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        }
        catch (_a) {
            return initialValue;
        }
    }), value = _a[0], setValue = _a[1];
    useEffect(function () {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        }
        catch (_a) { }
    }, [key, value]);
    return [value, setValue];
}
export default useLocalStorage;
