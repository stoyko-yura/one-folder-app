type ClsxArgs = string | undefined | Record<string, boolean>;

export const clsx = (...args: ClsxArgs[]) => {
  const classes: string[] = [];

  for (const arg of args) {
    switch (typeof arg) {
      case 'string':
        classes.push(arg);
        break;
      case 'object':
        for (const key in arg) {
          if (arg[key]) {
            classes.push(key);
          }
        }
        break;
      default:
        break;
    }
  }

  return classes.join(' ');
};
