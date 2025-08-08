export function validateField(value, rules = {}) {
    if (rules.required && (value === undefined || value === "" || String(value).trim() === "")) {
      return "This field is required";
    }
    if (rules.minLength && String(value).length < rules.minLength) {
      return `Minimum length is ${rules.minLength}`;
    }
    if (rules.maxLength && String(value).length > rules.maxLength) {
      return `Maximum length is ${rules.maxLength}`;
    }
    if (rules.email && !/\S+@\S+\.\S+/.test(value || "")) {
      return "Invalid email format";
    }
    if (rules.passwordRule && !/^(?=.*\d).{8,}$/.test(value || "")) {
      return "Password must be at least 8 characters and contain a number";
    }
    return "";
  }