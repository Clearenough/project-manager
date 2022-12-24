import Box from '@mui/material/Box/Box';
import Typography from '@mui/material/Typography/Typography';
import { useState } from 'react';
import { ITask } from '../../@types/common';
import TaskDescription from '../TaskDescription/TaskDescription';

interface IProps {
  task: ITask;
}

function ColumnTask({ task }: IProps) {
  const [taskDescription, isTaskDescription] = useState(false);

  return (
    <>
      <Box onClick={() => isTaskDescription(true)}>
        <Typography variant="h5">{task.title}</Typography>
      </Box>
      {taskDescription && (
        <TaskDescription task={task} closeDescription={() => isTaskDescription(false)} />
      )}
    </>
  );
}

export default ColumnTask;
