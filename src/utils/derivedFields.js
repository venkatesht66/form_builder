
export function computeDerivedValue(formula, parentValues = {}) {
    try {
      const keys = Object.keys(parentValues);
      const vals = Object.values(parentValues);
      const fn = new Function(...keys, `return ${formula}`);
      return fn(...vals);
    } catch (err) {
      console.error("Derived eval error:", err);
      return "";
    }
  }