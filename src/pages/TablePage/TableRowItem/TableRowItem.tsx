import { Delete, Edit, Save } from '@mui/icons-material';
import { Box, IconButton, TableCell, TableRow, TextField } from '@mui/material';

import { EditedData, TableRowData } from '../../../types';
import { formatDate } from '../../../utils/formatDate.ts';

type Props = {
  row: TableRowData;
  columns: { label: string; key: string }[];
  editingRow: string | null;
  editedData: EditedData;
  onEditClick: (row: TableRowData) => void;
  onEditChange: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    field: string
  ) => void;
  onSaveEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

export const TableRowItem = ({
  row,
  columns,
  editingRow,
  editedData,
  onEditClick,
  onEditChange,
  onSaveEdit,
  onDelete,
}: Props) => (
  <TableRow>
    {columns.map(({ key }) => (
      <TableCell key={key}>
        {key === 'actions' ? (
          <Box display="flex">
            {editingRow === row.id ? (
              <IconButton color="primary" onClick={() => onSaveEdit(row.id)}>
                <Save />
              </IconButton>
            ) : (
              <IconButton color="primary" onClick={() => onEditClick(row)}>
                <Edit />
              </IconButton>
            )}
            <IconButton color="error" onClick={() => onDelete(row.id)}>
              <Delete />
            </IconButton>
          </Box>
        ) : editingRow === row.id ? (
          <TextField
            value={editedData[key as keyof EditedData] || ''}
            onChange={(e) => onEditChange(e, key)}
          />
        ) : key.includes('Date') ? (
          formatDate(row[key as keyof TableRowData] as string)
        ) : (
          row[key as keyof TableRowData]
        )}
      </TableCell>
    ))}
  </TableRow>
);
