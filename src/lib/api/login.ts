import { ENV } from '../config/enviorement.ts';

export const loginRequest = async (username: string, password: string) => {
  try {
    const response = await fetch(`${ENV.apiBaseUrl}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (response.ok && data.data?.token) {
      return { token: data.data.token };
    } else if (data.error_code === 2004 && data.error_text) {
      return { error: data.error_text };
    } else {
      console.error('Login failed', data);
      return { error: data.error_text || 'Unknown error occurred' };
    }
  } catch (error) {
    console.error('Error during login', error);
    return { error: 'Network error, please try again' };
  }
};
