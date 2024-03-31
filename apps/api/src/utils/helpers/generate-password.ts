export const generatePassword = (length: number = 8): string => {
  const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

  let password = '';

  for (let i = 0; i < length; i++) {
    const character = characters.charAt(Math.floor(Math.random() * characters.length));

    password += character;
  }

  return password;
};
