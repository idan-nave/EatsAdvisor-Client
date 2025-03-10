import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useUserProfileContext } from '@context';
import './step-allergies.css';
var StepAllergies = function (_a) {
    var allergyQuery = _a.allergyQuery, setAllergyQuery = _a.setAllergyQuery, allergyError = _a.allergyError, setAllergyError = _a.setAllergyError, allergyFields = _a.allergyFields, appendAllergy = _a.appendAllergy, removeAllergy = _a.removeAllergy, filteredAllergyOptions = _a.filteredAllergyOptions, nextStep = _a.nextStep, prevStep = _a.prevStep;
    var _b = useUserProfileContext(), profile = _b.profile, loading = _b.loading;
    return (_jsxs("div", { className: "user-profile-form-step-container step-1", children: [_jsx("h2", { className: "user-profile-step-headers", children: "Allergies" }), _jsx("p", { className: "user-profile-step-headers", children: "Search for common allergies below or enter your own free text." }), _jsxs("div", { className: "allergy-search-container", children: [_jsx("input", { type: "text", id: "allergy-input", value: allergyQuery, onChange: function (e) {
                            setAllergyQuery(e.target.value);
                            if (allergyError)
                                setAllergyError('');
                        }, placeholder: "Search for an Allergy:" }), _jsx("button", { type: "button", className: "add-allergy-btn", onClick: function () {
                            if (allergyQuery.trim() !== '') {
                                var newAllergy_1 = allergyQuery.trim();
                                var duplicate = allergyFields.some(function (field) {
                                    return field.allergy.trim().toLowerCase() ===
                                        newAllergy_1.toLowerCase();
                                });
                                if (duplicate) {
                                    setAllergyError('This allergy has already been selected.');
                                }
                                else {
                                    appendAllergy({ allergy: newAllergy_1 });
                                    setAllergyQuery('');
                                    setAllergyError('');
                                }
                            }
                        }, children: "Add" })] }), allergyQuery && (_jsx("ul", { className: "allergy-suggestion-container", style: { listStyleType: 'none', padding: 0 }, children: filteredAllergyOptions.map(function (option, index) { return (_jsx("li", { style: { cursor: 'pointer' }, onClick: function () { return setAllergyQuery(option); }, className: "allergy-suggestion", children: option }, index)); }) })), allergyFields.length > 0 && (_jsx("div", { className: "allergys-fields-container", children: _jsx("ul", { className: "allergys-fields-list", style: { listStyleType: 'none', padding: 0 }, children: allergyFields.map(function (field, index) { return (_jsxs("div", { className: "allergys-couple", children: [_jsx("li", { className: "allergy-field", children: field.allergy }), _jsx("button", { className: "allergy-field allergy-btn", type: "button", onClick: function () { return removeAllergy(index); }, children: "Remove" })] }, field.id)); }) }) })), allergyError && _jsx("div", { className: "error-message", children: allergyError }), _jsxs("div", { className: "allergy-buttons-container", children: [!profile && (_jsx("button", { className: "allergy-btn", type: "button", onClick: prevStep, children: "Back" })), _jsx("button", { disabled: !!allergyError, className: "allergy-btn ".concat(profile ? 'full-width' : ''), type: "button", onClick: nextStep, children: "Next" })] })] }));
};
export default StepAllergies;
