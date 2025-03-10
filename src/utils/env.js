function env(key, defaultValue) {
    var value = import.meta.env[key];
    console.log(value);
    if (value === undefined || value === null) {
        if (defaultValue !== undefined)
            return defaultValue;
        throw new Error("Environment variable ".concat(key, " is not defined"));
    }
    return value;
}
export default env;
