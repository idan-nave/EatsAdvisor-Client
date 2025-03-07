function env(key: string, defaultValue?: string): string {
  const value = import.meta.env[key];

  console.log(value);
  

  if (value === undefined || value === null) {
    if (defaultValue !== undefined) return defaultValue;

    throw new Error(`Environment variable ${key} is not defined`);
  }

  return value;
}

export default env;
