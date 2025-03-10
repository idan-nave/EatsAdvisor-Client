import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import './step-specific-dishes.css';
var StepSpecificDishes = function (_a) {
    var register = _a.register, errors = _a.errors, fields = _a.fields, append = _a.append, remove = _a.remove, nextStep = _a.nextStep, prevStep = _a.prevStep;
    var _b = useState(''), newDish = _b[0], setNewDish = _b[1];
    var _c = useState(''), localError = _c[0], setLocalError = _c[1];
    var handleAddDish = function () {
        var dishName = newDish.trim();
        if (!dishName) {
            setLocalError('Dish name is required');
            return;
        }
        // Check for duplicate dish (case-insensitive)
        var duplicate = fields.some(function (field) {
            return field.name.toLowerCase() === dishName.toLowerCase();
        });
        if (duplicate) {
            setLocalError('This dish has already been added.');
            return;
        }
        // If valid, add the dish and clear the input and error.
        append({ name: dishName });
        setNewDish('');
        setLocalError('');
    };
    return (_jsxs("div", { className: "user-profile-form-step-container step-4", children: [_jsx("h2", { className: "user-profile-step-headers", children: "Specific Dishes" }), _jsxs("div", { className: "add-dish-container", children: [_jsx("input", { className: 'add-dish-input', type: "text", value: newDish, placeholder: "Enter dish name", onChange: function (e) {
                            setNewDish(e.target.value);
                            if (localError)
                                setLocalError('');
                        } }), _jsx("button", { className: 'add-dish-btn', type: "button", onClick: handleAddDish, children: "Add" })] }), _jsx("div", { className: "dishes-list", children: fields.map(function (field, index) {
                    return field.name ? (_jsxs("div", { className: "dish-item", children: [_jsx("div", { className: 'dish-name', children: field.name }), _jsx("button", { className: "dish-item-btn", type: "button", onClick: function () { return remove(index); }, children: "Delete" })] }, field.id)) : null;
                }) }), localError && _jsx("span", { className: "error-message", children: localError }), _jsxs("div", { className: "specific-dishes-nav-btns-container", children: [_jsx("button", { className: "specific-dishes-btn", type: "button", onClick: prevStep, children: "Back" }), _jsx("button", { className: "specific-dishes-btn", type: "button", onClick: nextStep, children: "Next" })] })] }));
};
export default StepSpecificDishes;
