import { useState, useEffect } from "react";
function useWindowSize() {
    var _a = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    }), windowSize = _a[0], setWindowSize = _a[1];
    useEffect(function () {
        var handleResize = function () {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
        window.addEventListener("resize", handleResize);
        return function () { return window.removeEventListener("resize", handleResize); };
    }, []);
    return windowSize;
}
export default useWindowSize;
