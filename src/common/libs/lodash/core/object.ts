export const ObjectUtils = {
  cloneDeep<T>(obj: T): T {
    if (typeof structuredClone === 'function') {
      return structuredClone(obj);
    }
    const deepClone = (value: any): any => {
      if (value === null || typeof value !== 'object') return value;
      if (Array.isArray(value)) return value.map(deepClone);
      const result: Record<string, any> = {};
      for (const key of Object.keys(value)) {
        result[key] = deepClone(value[key]);
      }
      return result as T;
    };
    return deepClone(obj);
  },

  merge(target: any, source: any): any {
    for (const key in source) {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        target[key] = this.merge(target[key] || {}, source[key]);
      } else {
        target[key] = source[key];
      }
    }
    return target;
  },

  get(obj: any, path: string, defaultValue?: any): any {
    const keys = path.split('.');
    let result = obj;
    for (const key of keys) {
      result = result?.[key];
      if (result === undefined) return defaultValue;
    }
    return result;
  },

  set(obj: any, path: string, value: any): any {
    const keys = path.split('.');
    let temp = obj;

    for (const key of keys.slice(0, -1)) {
      if (!temp[key]) temp[key] = {};
      temp = temp[key];
    }

    temp[keys.at(-1)] = value;
    return obj;
  },

  pick(obj: any, keys: string[]) {
    const result: any = {};
    for (const key of keys) {
      if (obj[key] !== undefined) result[key] = obj[key];
    }
    return result;
  },

  omit(obj: any, keys: string[]) {
    const result = { ...obj };
    for (const key of keys) {
      delete result[key];
    }
    return result;
  },
};
