import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';

import { apiFetch } from '../../lib/api/table.ts';
import { RoutePath } from '../../lib/config/routeConfig.tsx';
import { logout } from '../../store/slices/authSlice.ts';
import { RootState } from '../../store/store.ts';

interface TableRowData {
  id: string;
  companySigDate: string;
  companySignatureName: string;
  documentName: string;
  documentStatus: string;
  documentType: string;
  employeeNumber: string;
  employeeSigDate: string;
  employeeSignatureName: string;
}

interface EditedData extends Partial<TableRowData> {}

export const TablePage = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState<TableRowData[]>([]);
  const [editingRow, setEditingRow] = useState<string | null>(null);
  const [editedData, setEditedData] = useState<EditedData>({});

  useEffect(() => {
    const fetchData = async () => {
      const result = await apiFetch('get', 'GET', token);
      if (result) {
        setData(result.data);
      }
    };
    if (token) fetchData();
  }, [token]);

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
    }
  };

  const handleEditClick = (row: any) => {
    setEditingRow(row.id);
    setEditedData(row);
  };

  const handleEditChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => {
    setEditedData((prev) => ({ ...prev, [field]: e.target.value }));
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

  return (
    <Container>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddRecord}
        style={{ marginBottom: '16px' }}
      >
        Add Record
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleLogOut}
        style={{ marginBottom: '16px' }}
      >
        Log Out
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Company Sig Date</TableCell>
              <TableCell>Company Signature Name</TableCell>
              <TableCell>Document Name</TableCell>
              <TableCell>Document Status</TableCell>
              <TableCell>Document Type</TableCell>
              <TableCell>Employee Number</TableCell>
              <TableCell>Employee Sig Date</TableCell>
              <TableCell>Employee Signature Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  {editingRow === row.id ? (
                    <TextField
                      value={editedData.companySigDate}
                      onChange={(e) => handleEditChange(e, 'companySigDate')}
                    />
                  ) : (
                    row.companySigDate
                  )}
                </TableCell>
                <TableCell>
                  {editingRow === row.id ? (
                    <TextField
                      value={editedData.companySignatureName}
                      onChange={(e) => handleEditChange(e, 'companySignatureName')}
                    />
                  ) : (
                    row.companySignatureName
                  )}
                </TableCell>
                <TableCell>
                  {editingRow === row.id ? (
                    <TextField
                      value={editedData.documentName}
                      onChange={(e) => handleEditChange(e, 'documentName')}
                    />
                  ) : (
                    row.documentName
                  )}
                </TableCell>
                <TableCell>
                  {editingRow === row.id ? (
                    <TextField
                      value={editedData.documentStatus}
                      onChange={(e) => handleEditChange(e, 'documentStatus')}
                    />
                  ) : (
                    row.documentStatus
                  )}
                </TableCell>
                <TableCell>
                  {editingRow === row.id ? (
                    <TextField
                      value={editedData.documentType}
                      onChange={(e) => handleEditChange(e, 'documentType')}
                    />
                  ) : (
                    row.documentType
                  )}
                </TableCell>
                <TableCell>
                  {editingRow === row.id ? (
                    <TextField
                      value={editedData.employeeNumber}
                      onChange={(e) => handleEditChange(e, 'employeeNumber')}
                    />
                  ) : (
                    row.employeeNumber
                  )}
                </TableCell>
                <TableCell>
                  {editingRow === row.id ? (
                    <TextField
                      value={editedData.employeeSigDate}
                      onChange={(e) => handleEditChange(e, 'employeeSigDate')}
                    />
                  ) : (
                    row.employeeSigDate
                  )}
                </TableCell>
                <TableCell>
                  {editingRow === row.id ? (
                    <TextField
                      value={editedData.employeeSignatureName}
                      onChange={(e) => handleEditChange(e, 'employeeSignatureName')}
                    />
                  ) : (
                    row.employeeSignatureName
                  )}
                </TableCell>
                <TableCell>
                  {editingRow === row.id ? (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleSaveEdit(row.id)}
                    >
                      Save
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleEditClick(row)}
                    >
                      Edit
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDeleteRecord(row.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};
