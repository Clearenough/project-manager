import Box from '@mui/material/Box/Box';
import Button from '@mui/material/Button/Button';
import Stack from '@mui/material/Stack/Stack';
import Typography from '@mui/material/Typography/Typography';
import { useState } from 'react';
import { ITask } from '../../@types/common';
import { api } from '../../services/api';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
import CreateTask from '../CreateTask/CreateTask';

interface IProps {
  task: ITask;
  closeDescription: () => void;
}

function TaskDescription({ task, closeDescription }: IProps) {
  const [deleteTask, { error }] = api.useDeleteTaskMutation();
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [isCreateTaskModalOpen, setCreateTaskModalOpen] = useState(false);

  return (
    <>
      <Box
        onClick={closeDescription}
        sx={{
          position: 'absolute',
          width: '100vw',
          height: '100vh',
          top: '0',
          left: '0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba($color: rgb(0, 0, 0), $alpha: 0.4)',
          zIndex: '1',
        }}>
        <Stack spacing={2}>
          <Typography variant="h4">{task.title}</Typography>
          <Typography variant="h5">{task.description}</Typography>
          <Button
            onClick={() => setConfirmationModalOpen(true)}
            variant="contained"
            disableElevation>
            Edit
          </Button>
          <Button
            onClick={() => setConfirmationModalOpen(true)}
            variant="contained"
            disableElevation>
            Delete
          </Button>
        </Stack>
      </Box>
      {isConfirmationModalOpen && (
        <ConfirmationModal
          setVisible={setConfirmationModalOpen}
          confirmationFunction={() => deleteTask(task)}
        />
      )}
      {isCreateTaskModalOpen && (
        <CreateTask handler={() => setCreateTaskModalOpen(false)} task={task} />
      )}
    </>
  );
}

export default TaskDescription;
