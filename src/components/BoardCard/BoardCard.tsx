import Card from '@mui/material/Card';
import Grid2 from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
import { api } from '../../services/api';
import CreateBoard from '../CreateBoard/CreateBoard';

interface BoardCardProps {
  title: string;
  description: string;
  id: string;
}

function BoardCard({ title, description, id }: BoardCardProps) {
  type mouseEvent = React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLDivElement>;

  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [isCreateBoardOpen, setCreateBoardOpen] = useState(false);
  const [deleteBoard, { error }] = api.useDeleteBoardMutation();

  function clickHandler(event?: mouseEvent) {
    if (event) {
      event.preventDefault();
    }
    setCreateBoardOpen(!isCreateBoardOpen);
  }

  return (
    <>
      <Card sx={{ maxWidth: 300, p: 2 }}>
        <Typography variant="h3" component="h3">
          {title}
        </Typography>
        <Typography>{description}</Typography>
        <Button variant="contained" onClick={clickHandler}>
          <EditIcon />
          Edit
        </Button>
        <Button
          variant="contained"
          onClick={() => setConfirmationModalOpen(!isConfirmationModalOpen)}>
          <DeleteIcon />
          Delete
        </Button>
      </Card>
      {isConfirmationModalOpen && (
        <ConfirmationModal
          setVisible={setConfirmationModalOpen}
          confirmationFunction={() => deleteBoard(id)}
        />
      )}
      {isCreateBoardOpen && <CreateBoard handler={clickHandler} id={id} />}
    </>
  );
}

export default BoardCard;
