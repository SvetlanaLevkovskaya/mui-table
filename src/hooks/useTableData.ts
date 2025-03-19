import { useEffect, useState } from 'react';

import { apiFetch } from '../lib/api/table.ts';
import { TableRowData } from '../types';

export const useTableData = (token: string | null) => {
  const [data, setData] = useState<TableRowData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;
      setIsLoading(true);
      const response = await apiFetch('get', 'GET', token);
      if (response) setData(response.data);
      else setErrorMessage('Ошибка загрузки данных');
      setIsLoading(false);
    };

    fetchData();
  }, [token]);

  return { data, isLoading, errorMessage, setData, setErrorMessage };
};
