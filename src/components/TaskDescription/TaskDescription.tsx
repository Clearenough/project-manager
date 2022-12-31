import Box from '@mui/material/Box/Box';
import Button from '@mui/material/Button/Button';
import Stack from '@mui/material/Stack/Stack';
import Typography from '@mui/material/Typography/Typography';
import { useState } from 'react';
import { ITask } from '../../@types/common';
import { api } from '../../services/api';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
import CreateTask from '../CreateTask/CreateTask';
import styles from './TaskDescription.module.scss';

interface IProps {
  task: ITask;
  closeDescription: (e: React.MouseEvent<HTMLDivElement>) => void;
}

function TaskDescription({ task, closeDescription }: IProps) {
  const [deleteTask, { error }] = api.useDeleteTaskMutation();
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [isCreateTaskModalOpen, setCreateTaskModalOpen] = useState(false);

  return (
    <>
      <div className={styles.modal} onClick={closeDescription}>
        <div className={styles.taskDescription} onClick={(e) => e.stopPropagation()}>
          <Typography variant="h4">{task.title}</Typography>
          <Typography variant="h5">{task.description}</Typography>
          <div className={styles.buttons}>
            <Button
              onClick={() => setCreateTaskModalOpen(true)}
              variant="text"
              color="success"
              disableElevation>
              Edit
            </Button>
            <Button
              onClick={() => setConfirmationModalOpen(true)}
              variant="text"
              color="warning"
              disableElevation>
              Delete
            </Button>
          </div>
        </div>
      </div>
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
