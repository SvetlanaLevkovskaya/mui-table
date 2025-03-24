import { ChangeEvent, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { Delete, Edit, Save } from '@mui/icons-material';
import { Box, IconButton, TableCell, TableRow, TextField } from '@mui/material';

import { EditedData, TableRowData } from '../../../../types';
import { formatDate, validationSchema } from '../../../../utils';

type Props = {
  row: EditedData;
  columns: { label: string; key: keyof TableRowData; width: string }[];
  editedData: EditedData | null;
  onEditClick: (row: EditedData) => void;
  onEditChange: <T extends keyof EditedData>(
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    field: T
  ) => void;
  onSaveEdit: (id?: string) => void;
  onDelete: (id?: string) => void;
};

export const TableRowItem = ({
  row,
  columns,
  editedData,
  onEditClick,
  onEditChange,
  onSaveEdit,
  onDelete,
}: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<EditedData>({
    resolver: yupResolver(validationSchema),
    defaultValues: editedData ?? {},
  });

  const onSubmit = () => onSaveEdit(row.id);

  useEffect(() => {
    if (editedData) {
      Object.entries(editedData).forEach(([key, value]) => {
        setValue(key as keyof EditedData, value as never);
      });
    }
  }, [editedData, setValue]);

  return (
    <TableRow>
      {columns.map(({ key }) => {
        if (key === 'actions') {
          return (
            <TableCell key={key}>
              <Box display="flex">
                {editedData?.id === row.id ? (
                  <IconButton color="primary" onClick={handleSubmit(onSubmit)}>
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
            </TableCell>
          );
        }

        return (
          <TableCell key={key}>
            {editedData?.id === row.id ? (
              <Controller
                name={key}
                control={control}
                render={({ field }) => {
                  return (
                    <TextField
                      {...field}
                      onChange={(e) => onEditChange(e, key)}
                      value={field.value ?? ''}
                      error={!!errors[key]}
                      onBlur={() => setValue(key, field.value, { shouldValidate: true })}
                    />
                  );
                }}
              />
            ) : key.includes('Date') ? (
              formatDate(row[key as keyof EditedData] ? String(row[key as keyof EditedData]) : '')
            ) : row[key as keyof EditedData] != null ? (
              String(row[key as keyof EditedData])
            ) : (
              ''
            )}
          </TableCell>
        );
      })}
    </TableRow>
  );
};
