import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';

const SECRET_KEY = import.meta.env.VITE_REACT_APP_COOKIE_SECRET || 'your-secret-key';

const setSecureCookie = (name: string, value: unknown): void => {
  const encrypted = CryptoJS.AES.encrypt(JSON.stringify(value), SECRET_KEY).toString();
  Cookies.set(name, encrypted, { secure: true, sameSite: 'strict' });
};

const getSecureCookie = (name: string): string | null => {
  const encrypted = Cookies.get(name);
  if (!encrypted) return null;

  try {
    const decrypted = CryptoJS.AES.decrypt(encrypted, SECRET_KEY).toString(CryptoJS.enc.Utf8);
    return JSON.stringify(JSON.parse(decrypted));
  } catch {
    return null;
  }
};

const removeSecureCookie = (name: string): void => {
  Cookies.remove(name);
};

export { setSecureCookie, getSecureCookie, removeSecureCookie };
