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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// import React, { useState, useEffect } from 'react'
// import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form'
// import { useNavigate } from 'react-router-dom'
// import './user-profile.css'
// import {
//   StepAllergies,
//   StepFlavorRatings,
//   StepPersonalPreference,
//   StepRestrictions,
//   StepSpecificDishes,
// } from '@components'
// import { ROUTES } from '@constants'
// import { useUserProfileContext, useAuth } from '@context'
// import { UserPreferences } from '@interfaces'
// import { saveUserPreferences } from 'api/api'
// interface Allergy {
//   allergy: string
// }
// interface FlavorRating {
//   flavor: string
//   rating: string
// }
// export interface FormValues {
//   allergies: Allergy[]
//   restrictions: string[]
//   flavorRatings: FlavorRating[]
//   dishes: { name: string }[]
//   personalPreference: string
// }
// const flavorList = ['Sweet', 'Sour', 'Salty', 'Bitter', 'Spicy']
// const allergyOptions = [
//   'Milk',
//   'Eggs',
//   'Fish',
//   'Shellfish',
//   'Crustacean',
//   'Nuts',
//   'Peanuts',
//   'Wheat',
//   'Soy',
//   'Sesame',
//   'Gluten',
//   'Mustard',
//   'Celery',
//   'Lupin',
//   'Sulfites',
//   'Corn',
//   'Legumes',
//   'Coconut',
//   'Mollusks',
//   'Beef',
//   'Pork',
//   'Chicken',
//   'Lamb',
//   'Fruits',
//   'Vegetables',
//   'Spices',
//   'Additives',
//   'Alcohol',
// ]
// const UserProfile: React.FC = () => {
//   const navigate = useNavigate()
//   const { user } = useAuth()
//   const { profile, loading, refetchProfile } = useUserProfileContext()
//   const {
//     register,
//     control,
//     handleSubmit,
//     reset,
//     watch,
//     formState: { errors },
//   } = useForm<FormValues>({
//     defaultValues: {
//       allergies: [],
//       restrictions: [],
//       flavorRatings: flavorList.map(flavor => ({ flavor, rating: '5' })), // default rating set to 5
//       dishes: [{ name: '' }],
//       personalPreference: '',
//     },
//   })
//   const {
//     fields: allergyFields,
//     append: appendAllergy,
//     remove: removeAllergy,
//   } = useFieldArray({
//     control,
//     name: 'allergies',
//   })
//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: 'dishes',
//   })
//   // Steps: 0: Introduction, 1: Allergies, 2: Restrictions, 3: Flavor Ratings, 4: Specific Dishes, 5: Personal Preference
//   // If profile exists, we skip step 0 by setting the step to 1.
//   const [step, setStep] = useState(0)
//   const [allergyQuery, setAllergyQuery] = useState('')
//   const [allergyError, setAllergyError] = useState('')
//   useEffect(() => {
//     if (profile) {
//       const convertedProfile: FormValues = {
//         ...profile,
//         flavorRatings: profile.flavorRatings.map(fr => ({
//           flavor: fr.flavor,
//           rating: String(fr.rating),
//         })),
//       }
//       reset(convertedProfile)
//       setStep(1)
//     }
//   }, [profile, reset])
//   const onSubmit: SubmitHandler<FormValues> = async data => {
//     console.log('Form Data:', data)
//     const formattedData: UserPreferences = {
//       allergies: data.allergies.map(item => item.allergy),
//       dietaryConstraints: data.restrictions,
//       flavorPreferences: data.flavorRatings.reduce((acc, item) => {
//         acc[item.flavor] = parseInt(item.rating);
//         return acc;
//       }, {} as Record<string, number>),
//       specificDishes: data.dishes.map(dish => dish.name),
//       specialPreferences: data.personalPreference ? [data.personalPreference] : []
//     }
//     console.log("formattedData", formattedData);
//     const result = await saveUserPreferences(formattedData)
//     console.log('form save result', result)
//     //in order to keep the profile updated
//     if (result) {
//       refetchProfile()
//       navigate(ROUTES.HOME)
//     }
//   }
//   const nextStep = () => setStep(prev => prev + 1)
//   const prevStep = () => setStep(prev => prev - 1)
//   const filteredAllergyOptions = allergyOptions.filter(option =>
//     option.toLowerCase().includes(allergyQuery.toLowerCase()),
//   )
//   if (loading) {
//     return <div>Loading user profile...</div>
//   }
//   return (
//     <form className="user-profile-form" onSubmit={handleSubmit(onSubmit)}>
//       {step === 0 && !profile && (
//         <div className="user-profile-form-step-container step-0">
//           <h2 className="user-profile-step-headers">
//             Welcome to <span style={{ color: '#2e7d32' }}>E</span>ats
//             <span style={{ color: '#2e7d32' }}>A</span>dvisor
//           </h2>
//           <h3 className="user-profile-step-headers">
//             World first <span style={{ color: '#2e7d32' }}>AI</span> based
//             Culinary Adviser
//           </h3>
//           <h3 className="user-profile-step-headers">
//             Please provide us with some information about your culinary
//             preferences.
//           </h3>
//           <div>
//             <button className="form-step-btn" type="button" onClick={nextStep}>
//               Start
//             </button>
//           </div>
//         </div>
//       )}
//       {step === 1 && (
//         <StepAllergies
//           allergyQuery={allergyQuery}
//           setAllergyQuery={setAllergyQuery}
//           allergyError={allergyError}
//           setAllergyError={setAllergyError}
//           allergyFields={allergyFields}
//           appendAllergy={appendAllergy}
//           removeAllergy={removeAllergy}
//           filteredAllergyOptions={filteredAllergyOptions}
//           nextStep={nextStep}
//           prevStep={prevStep}
//         />
//       )}
//       {step === 2 && (
//         <StepRestrictions
//           register={register}
//           errors={errors}
//           nextStep={nextStep}
//           prevStep={prevStep}
//         />
//       )}
//       {step === 3 && (
//         <StepFlavorRatings
//           register={register}
//           errors={errors}
//           nextStep={nextStep}
//           prevStep={prevStep}
//           watch={watch}
//         />
//       )}
//       {step === 4 && (
//         <StepSpecificDishes
//           register={register}
//           errors={errors}
//           fields={fields}
//           append={append}
//           remove={remove}
//           nextStep={nextStep}
//           prevStep={prevStep}
//         />
//       )}
//       {step === 5 && (
//         <StepPersonalPreference
//           register={register}
//           errors={errors}
//           prevStep={prevStep}
//         />
//       )}
//     </form>
//   )
// }
// export default UserProfile
import { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import './user-profile.css';
import { StepAllergies, StepFlavorRatings, StepPersonalPreference, StepRestrictions, StepSpecificDishes, } from '@components';
import { ROUTES } from '@constants';
import { useUserProfileContext, useAuth } from '@context';
import { saveUserPreferences } from '@api/api';
import { RiseLoader } from 'react-spinners';
var flavorList = ['Sweet', 'Sour', 'Salty', 'Bitter', 'Spicy'];
var allergyOptions = [
    'Milk',
    'Eggs',
    'Fish',
    'Shellfish',
    'Crustacean',
    'Nuts',
    'Peanuts',
    'Wheat',
    'Soy',
    'Sesame',
    'Gluten',
    'Mustard',
    'Celery',
    'Lupin',
    'Sulfites',
    'Corn',
    'Legumes',
    'Coconut',
    'Mollusks',
    'Beef',
    'Pork',
    'Chicken',
    'Lamb',
    'Fruits',
    'Vegetables',
    'Spices',
    'Additives',
    'Alcohol',
];
var UserProfile = function () {
    var navigate = useNavigate();
    var user = useAuth().user;
    var _a = useUserProfileContext(), profile = _a.profile, loading = _a.loading, refetchProfile = _a.refetchProfile;
    var _b = useForm({
        defaultValues: {
            allergies: [],
            restrictions: [],
            flavorRatings: flavorList.map(function (flavor) { return ({ flavor: flavor, rating: '5' }); }), // default rating set to 5
            dishes: [{ name: '' }],
            personalPreference: '',
        },
    }), register = _b.register, control = _b.control, handleSubmit = _b.handleSubmit, reset = _b.reset, watch = _b.watch, errors = _b.formState.errors;
    var _c = useFieldArray({
        control: control,
        name: 'allergies',
    }), allergyFields = _c.fields, appendAllergy = _c.append, removeAllergy = _c.remove;
    var _d = useFieldArray({
        control: control,
        name: 'dishes',
    }), fields = _d.fields, append = _d.append, remove = _d.remove;
    // Steps: 0: Introduction, 1: Allergies, 2: Restrictions, 3: Flavor Ratings, 4: Specific Dishes, 5: Personal Preference
    // If profile exists, we skip step 0 by setting the step to 1.
    var _e = useState(0), step = _e[0], setStep = _e[1];
    var _f = useState(''), allergyQuery = _f[0], setAllergyQuery = _f[1];
    var _g = useState(''), allergyError = _g[0], setAllergyError = _g[1];
    var _h = useState(false), isSubmitting = _h[0], setIsSubmitting = _h[1];
    useEffect(function () {
        if (profile) {
            var convertedProfile = __assign(__assign({}, profile), { flavorRatings: profile.flavorRatings.map(function (fr) { return ({
                    flavor: fr.flavor,
                    rating: String(fr.rating),
                }); }) });
            reset(convertedProfile);
            setStep(1);
        }
    }, [profile, reset]);
    var onSubmit = function (data) { return __awaiter(void 0, void 0, void 0, function () {
        var formattedData, result, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setIsSubmitting(true);
                    console.log('Form Data:', data);
                    formattedData = {
                        allergies: data.allergies.map(function (item) { return item.allergy; }),
                        dietaryConstraints: data.restrictions,
                        flavorPreferences: data.flavorRatings.reduce(function (acc, item) {
                            acc[item.flavor] = parseInt(item.rating);
                            return acc;
                        }, {}),
                        specificDishes: data.dishes.map(function (dish) { return dish.name; }),
                        specialPreferences: data.personalPreference
                            ? [data.personalPreference]
                            : [],
                    };
                    console.log('formattedData', formattedData);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, saveUserPreferences(formattedData)];
                case 2:
                    result = _a.sent();
                    console.log('form save result', result);
                    if (result) {
                        refetchProfile();
                        navigate(ROUTES.HOME);
                    }
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _a.sent();
                    console.error('Error saving preferences:', error_1);
                    return [3 /*break*/, 5];
                case 4:
                    // Only update isSubmitting if the navigation did not occur
                    setIsSubmitting(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var nextStep = function () { return setStep(function (prev) { return prev + 1; }); };
    var prevStep = function () { return setStep(function (prev) { return prev - 1; }); };
    var filteredAllergyOptions = allergyOptions.filter(function (option) {
        return option.toLowerCase().includes(allergyQuery.toLowerCase());
    });
    // Display a loading indicator when the user profile is being loaded or when the form is submitting.
    if (loading || isSubmitting) {
        return _jsx(RiseLoader, { color: "#2e7d32", size: 15 });
    }
    return (_jsxs("form", { className: "user-profile-form", onSubmit: handleSubmit(onSubmit), children: [step === 0 && !profile && (_jsxs("div", { className: "user-profile-form-step-container step-0", children: [_jsxs("h2", { className: "user-profile-step-headers", children: ["Welcome to ", _jsx("span", { style: { color: '#2e7d32' }, children: "E" }), "ats", _jsx("span", { style: { color: '#2e7d32' }, children: "A" }), "dvisor"] }), _jsxs("h3", { className: "user-profile-step-headers", children: ["World first ", _jsx("span", { style: { color: '#2e7d32' }, children: "AI" }), " based Culinary Adviser"] }), _jsx("h3", { className: "user-profile-step-headers", children: "Please provide us with some information about your culinary preferences." }), _jsx("div", { children: _jsx("button", { className: "form-step-btn", type: "button", onClick: nextStep, children: "Start" }) })] })), step === 1 && (_jsx(StepAllergies, { allergyQuery: allergyQuery, setAllergyQuery: setAllergyQuery, allergyError: allergyError, setAllergyError: setAllergyError, allergyFields: allergyFields, appendAllergy: appendAllergy, removeAllergy: removeAllergy, filteredAllergyOptions: filteredAllergyOptions, nextStep: nextStep, prevStep: prevStep })), step === 2 && (_jsx(StepRestrictions, { register: register, errors: errors, nextStep: nextStep, prevStep: prevStep })), step === 3 && (_jsx(StepFlavorRatings, { register: register, errors: errors, nextStep: nextStep, prevStep: prevStep, watch: watch })), step === 4 && (_jsx(StepSpecificDishes, { register: register, errors: errors, fields: fields, append: append, remove: remove, nextStep: nextStep, prevStep: prevStep })), step === 5 && (_jsx(StepPersonalPreference, { register: register, errors: errors, prevStep: prevStep }))] }));
};
export default UserProfile;
