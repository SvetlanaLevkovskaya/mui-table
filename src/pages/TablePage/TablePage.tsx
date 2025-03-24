import { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Container } from '@mui/material';

import { SnackbarNotification } from '../../components';
import { useTableData } from '../../hooks';
import { apiFetch } from '../../lib/api/table.ts';
import { RoutePath } from '../../lib/config/routeConfig.tsx';
import { logout } from '../../store/slices/authSlice.ts';
import { RootState } from '../../store/store.ts';
import { EditedData } from '../../types';
import { formatDate } from '../../utils';

import { TableActions } from './ui/TableActions/TableActions.tsx';
import { TableList } from './ui/TableList/TableList.tsx';

const TablePage = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, isLoading, errorMessage, setData, setErrorMessage } = useTableData(token);

  const [editedData, setEditedData] = useState<EditedData | null>(null);

  const handleAddRecord = async () => {
    const newRecord = {
      id: '',
      companySigDate: formatDate(new Date().toISOString()),
      companySignatureName: '',
      documentName: 'Договор.pdf',
      documentStatus: 'подписан',
      documentType: '',
      employeeNumber: undefined,
      employeeSigDate: formatDate(new Date().toISOString()),
      employeeSignatureName: '',
    };

    const result = await apiFetch('create', 'POST', token, newRecord);

    if (result.error) {
      setErrorMessage(`Ошибка при добавлении записи: ${result.error}`);
    } else {
      setData((prevData) => [...prevData, { ...newRecord, id: result.data.id }]);
    }
  };

  const handleLogOut = () => {
    dispatch(logout());
    navigate(RoutePath.login);
  };

  const handleDeleteRecord = async (id?: string) => {
    const result = await apiFetch(`delete/${id}`, 'POST', token);
    if (result.error) {
      setErrorMessage(`Ошибка удаления: ${result.error}`);
    } else {
      setData((prevData) => prevData.filter((row) => row.id !== id));
    }
  };
  const handleEditClick = (row: EditedData) => {
    setEditedData(row);
  };

  const handleEditChange = <T extends keyof EditedData>(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: T
  ) => {
    setEditedData((prev) => ({
      ...prev!,
      [field]: e.target.value,
    }));
  };

  const handleSaveEdit = async (id?: string) => {
    if (!editedData?.id) return;

    const result = await apiFetch(`set/${id}`, 'POST', token, editedData);

    if (result.error) {
      setErrorMessage(`Ошибка сохранения: ${result.error}`);
    } else {
      setData((prevData) =>
        prevData.map((row) => (row.id === id ? { ...row, ...editedData } : row))
      );
      setEditedData(null);
    }
  };

  const handleCloseSnackbar = () => setErrorMessage('');

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: '80vh',
      }}
    >
      <TableActions onAddRecord={handleAddRecord} onLogOut={handleLogOut} isLoading={isLoading} />
      <TableList
        data={data}
        isLoading={isLoading}
        editedData={editedData}
        onEditClick={handleEditClick}
        onEditChange={handleEditChange}
        onSaveEdit={handleSaveEdit}
        onDelete={handleDeleteRecord}
      />
      <SnackbarNotification message={errorMessage} onClose={handleCloseSnackbar} />
    </Container>
  );
};

export default TablePage;
