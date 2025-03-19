import { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Container } from '@mui/material';

import { useTableData } from '../../hooks/useTableData.ts';
import { apiFetch } from '../../lib/api/table.ts';
import { RoutePath } from '../../lib/config/routeConfig.tsx';
import { logout } from '../../store/slices/authSlice.ts';
import { RootState } from '../../store/store.ts';
import { EditedData, TableRowData } from '../../types';

import { SnackbarNotification } from './SnackbarNotification/SnackbarNotification.tsx';
import { TableActions } from './TableActions/TableActions.tsx';
import { TableList } from './TableList/TableList.tsx';

export const TablePage = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, isLoading, errorMessage, setData, setErrorMessage } = useTableData(token);

  const [editingRow, setEditingRow] = useState<string | null>(null);
  const [editedData, setEditedData] = useState<EditedData>({});

  const handleAddRecord = async () => {
    const newRecord = {
      id: '',
      companySigDate: new Date().toISOString(),
      companySignatureName: 'Company.sig',
      documentName: 'Договор',
      documentStatus: 'Подписан',
      documentType: 'Договор на оказание услуг',
      employeeNumber: '12345',
      employeeSigDate: new Date().toISOString(),
      employeeSignatureName: 'Employee.sig',
    };
    const result = await apiFetch('create', 'POST', token, newRecord);
    if (result.data && result.data.id) {
      setData((prevData) => [...prevData, { ...newRecord, id: result.data.id }]);
    }
  };

  const handleLogOut = () => {
    dispatch(logout());
    navigate(RoutePath.login);
  };

  const handleDeleteRecord = async (id: string) => {
    const result = await apiFetch(`delete/${id}`, 'POST', token);
    if (result && result.error_code === 0) {
      setData((prevData) => prevData.filter((row) => row.id !== id));
    } else {
      console.error('Error deleting the record');
      setErrorMessage(result.error);
    }
  };
  const handleEditClick = (row: TableRowData) => {
    setEditingRow(row.id);
    setEditedData(row);
  };

  const handleEditChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => {
    setEditedData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSaveEdit = async (id: string) => {
    const result = await apiFetch(`set/${id}`, 'POST', token, editedData);
    if (result && result.error_code === 0) {
      setData((prevData) =>
        prevData.map((row) => (row.id === id ? { ...row, ...editedData } : row))
      );
      setEditingRow(null);
    } else {
      console.error('Error saving the record');
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
      <TableActions onAddRecord={handleAddRecord} onLogOut={handleLogOut} />
      <TableList
        data={data}
        isLoading={isLoading}
        editingRow={editingRow}
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
