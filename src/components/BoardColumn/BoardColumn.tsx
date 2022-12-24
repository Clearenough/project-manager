import Box from '@mui/material/Box/Box';
import Button from '@mui/material/Button/Button';
import Stack from '@mui/material/Stack/Stack';
import { useState } from 'react';
import { useJwt } from 'react-jwt';
import { IColumn } from '../../@types/common';
import { api } from '../../services/api';
import ColumnTask from '../ColumnTask/ColumnTask';
import CreateTask from '../CreateTask/CreateTask';

interface IProps {
  column: IColumn;
}

function BoardColumn({ column }: IProps) {
  const { data, error } = api.useGetAllTasksQuery({
    columnId: column._id,
    boardId: column.boardId,
  });
  const [isCreateTaskModalOpen, setCreateTaskModalOpen] = useState(false);

  return (
    <>
      <Box sx={{ backgroundColor: 'grey' }}>
        <Stack spacing={2}>
          {data && data.map((task) => <ColumnTask task={task} />)}
          <Button variant="outlined" onClick={() => setCreateTaskModalOpen(true)}>
            Add New Task
          </Button>
        </Stack>
      </Box>
      {isCreateTaskModalOpen && (
        <CreateTask
          handler={() => setCreateTaskModalOpen(false)}
          task={undefined}
          column={column}
        />
      )}
    </>
  );
}

export default BoardColumn;
