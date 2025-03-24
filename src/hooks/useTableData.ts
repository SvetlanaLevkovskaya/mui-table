import { useEffect, useState } from 'react';

import { apiFetch } from '../lib/api/table.ts';
import { EditedData } from '../types';

export const useTableData = (token: string | null) => {
  const [data, setData] = useState<EditedData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;
      setIsLoading(true);
      const response = await apiFetch('get', 'GET', token);

      if (response.error) {
        setErrorMessage(`Ошибка загрузки данных: ${response.error}`);
      } else {
        setData(response.data);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [token]);

  return { data, isLoading, errorMessage, setData, setErrorMessage };
};
