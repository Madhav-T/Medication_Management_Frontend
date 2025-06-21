import {jwtDecode} from 'jwt-decode';

export const saveToken = (token: string) => {
  localStorage.setItem('token', token);
};

export const getToken = (): string | null => {
  return localStorage.getItem('token');
};

export const removeToken = () => {
  localStorage.removeItem('token');
};

export const getUserRole = (): string | null => {
  const token = getToken();
  if (!token) return null;
  try {
    const decoded: any = jwtDecode(token);
    return decoded.role || null;
  } catch {
    return null;
  }
};
