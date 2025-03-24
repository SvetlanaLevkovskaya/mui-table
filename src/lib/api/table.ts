import { EditedData } from '../../types';
import { ENV } from '../config/enviorement.ts';

export const apiFetch = async (
  endpoint: string,
  method: string,
  token: string | null,
  body?: EditedData
) => {
  try {
    const response = await fetch(`${ENV.apiBaseUrl}/userdocs/${endpoint}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'x-auth': token || '',
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    const result = await response.json();

    if (!response.ok) {
      console.error(`Error ${method} ${endpoint}`, result);
      return { error: result.title || 'Ошибка запроса' };
    }

    return result;
  } catch (error) {
    console.error(`Request failed: ${method} ${endpoint}`, error);
    return { error: 'Ошибка сети или сервера' };
  }
};
