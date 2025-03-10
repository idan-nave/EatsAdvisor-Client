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
import { createContext, useContext, useState, useEffect, } from 'react';
// Create the context
var UserProfileContext = createContext(undefined);
// Custom hook that fetches the user profile data
export var useUserProfile = function () {
    var _a = useState(null), profile = _a[0], setProfile = _a[1];
    var _b = useState(true), loading = _b[0], setLoading = _b[1];
    var fetchProfile = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            setLoading(true);
            try {
                // // Await the check of the user profile
                // const hasProfile = await checkUserProfile('')
                // if (hasProfile) {
                //   // Await the API call to get user preferences
                //   const userPreferencesServer = await getUserPreferences()
                //   // Map server response (UserPreferencesServer) to our FormValues format
                //   const mappedProfile: FormValues = {
                //     allergies:
                //       userPreferencesServer.allergies?.map((allergy: string) => ({
                //         allergy,
                //       })) || [],
                //     // Map dietaryConstraints to restrictions
                //     restrictions: userPreferencesServer.dietaryConstraints || [],
                //     // Map flavorPreferences object to an array of FlavorRating objects
                //     flavorRatings: userPreferencesServer.flavorPreferences
                //       ? Object.entries(userPreferencesServer.flavorPreferences).map(
                //           ([flavor, rating]) => ({
                //             flavor,
                //             rating,
                //           }),
                //         )
                //       : [],
                //     // Map specificDishes (array of strings) to dishes array
                //     dishes:
                //       userPreferencesServer.specificDishes?.map((dish: string) => ({
                //         name: dish,
                //       })) || [],
                //     // Map specialPreferences array to a single string (joined by comma)
                //     personalPreference: userPreferencesServer.specialPreferences
                //       ? userPreferencesServer.specialPreferences.join(', ')
                //       : '',
                //   }
                //   setProfile(mappedProfile)
                // }
            }
            catch (error) {
                console.error('Error fetching profile:', error);
                setProfile(null);
            }
            finally {
                setLoading(false);
            }
            return [2 /*return*/];
        });
    }); };
    useEffect(function () {
        fetchProfile();
    }, []);
    var refetchProfile = function () {
        console.log('Profile has been refetched');
        fetchProfile();
    };
    return { profile: profile, loading: loading, refetchProfile: refetchProfile };
};
// Create a provider component that makes the data available via context
export var UserProfileProvider = function (_a) {
    var children = _a.children;
    var _b = useUserProfile(), profile = _b.profile, loading = _b.loading, refetchProfile = _b.refetchProfile;
    return (_jsx(UserProfileContext.Provider, { value: { profile: profile, loading: loading, refetchProfile: refetchProfile }, children: children }));
};
// Custom hook for consuming the context in your components
export var useUserProfileContext = function () {
    var context = useContext(UserProfileContext);
    if (context === undefined) {
        throw new Error('useUserProfileContext must be used within a UserProfileProvider');
    }
    return context;
};
