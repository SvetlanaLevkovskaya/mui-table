import { ChangeEvent } from 'react';

import {
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

import { EditedData } from '../../../../types';
import { TableRowItem } from '../TableRowItem/TableRowItem.tsx';
import { columns } from '../constants/columns.ts';

type Props = {
  data: EditedData[];
  isLoading: boolean;
  editedData: EditedData | null;
  onEditClick: (row: EditedData) => void;
  onEditChange: <T extends keyof EditedData>(
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    field: T
  ) => void;
  onSaveEdit: (id?: string) => void;
  onDelete: (id?: string) => void;
};

export const TableList = ({
  data,
  isLoading,
  editedData,
  onEditClick,
  onEditChange,
  onSaveEdit,
  onDelete,
}: Props) => (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          {columns.map(({ label, width }) => (
            <TableCell key={label} sx={{ width }}>
              {label}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {isLoading
          ? Array.from({ length: 2 }).map((_, index) => (
              <TableRow key={index}>
                {Array.from({ length: 9 }).map((_, cellIndex) => (
                  <TableCell key={cellIndex} sx={{ paddingTop: '13px', paddingBottom: '13px' }}>
                    <Skeleton variant="text" width="100%" height={24} />
                  </TableCell>
                ))}
              </TableRow>
            ))
          : data.map((row) => (
              <TableRowItem
                key={row.id}
                row={row}
                columns={columns}
                editedData={editedData}
                onEditClick={onEditClick}
                onEditChange={onEditChange}
                onSaveEdit={onSaveEdit}
                onDelete={onDelete}
              />
            ))}
      </TableBody>
    </Table>
  </TableContainer>
);
