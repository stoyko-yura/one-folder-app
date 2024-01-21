type AllKeys<T> =
  T extends Record<string, unknown>
    ? {
        [K in keyof T]: K extends string ? K | `${K}.${AllKeys<T[K]>}` : never;
      }[keyof T]
    : never;

export const excludeFields = <T extends Record<string, unknown>, Keys extends AllKeys<T>>(
  obj: T | T[],
  keys: Keys[]
): Omit<T, Keys> | Omit<T, Keys>[] => {
  if (Array.isArray(obj)) {
    const result = obj.map((item) => excludeFields(item, keys));

    return result as Omit<T, Keys>[];
  }

  const filteredEntries = Object.entries(obj).filter(([key]) => !keys.includes(key as Keys));

  const filteredObjects: Record<string, unknown> = Object.fromEntries(filteredEntries);

  const objectEntries = Object.entries(obj);

  for (let i = 0; i < objectEntries.length; i++) {
    const [key, value] = objectEntries[i];

    if (typeof value === 'object' && value !== null) {
      const editedKeys = keys
        .filter((item) => item.startsWith(key))
        .map((item) => item.replace(`${key}.`, ''));

      filteredObjects[key] = excludeFields(value as Record<string, unknown>, editedKeys as Keys[]);

      if (
        editedKeys.includes(key) ||
        !Object.keys(filteredObjects[key] as Record<string, unknown>).length
      ) {
        delete filteredObjects[key];
      }
    }
  }

  return filteredObjects as Omit<T, Keys>;
};
