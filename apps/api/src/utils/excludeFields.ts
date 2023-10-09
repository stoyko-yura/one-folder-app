export const excludeFields = <T, Key extends keyof T>(
  obj: T | T[],
  keys: Key[]
): Omit<T, Key> | Omit<T, Key>[] => {
  if (Array.isArray(obj)) {
    const result = obj.map((item) => {
      const filteredEntries = Object.entries(item as { [key: string]: any }).filter(
        ([key]) => !keys.includes(key as Key)
      );

      return Object.fromEntries(filteredEntries) as Omit<T, Key>;
    });

    return result;
  }

  const filteredEntries = Object.entries(obj as { [key: string]: any }).filter(
    ([key]) => !keys.includes(key as Key)
  );

  return Object.fromEntries(filteredEntries) as Omit<T, Key>;
};
