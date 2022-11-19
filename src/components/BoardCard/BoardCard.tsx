import Card from '@mui/material/Card';
import Grid2 from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
import { api } from '../../services/api';

interface BoardCardProps {
  title: string;
  description: string;
  id: string;
}

function BoardCard({ title, description, id }: BoardCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [deleteBoard, { error }] = api.useDeleteBoardMutation();

  return (
    <>
      <Card sx={{ maxWidth: 300, p: 2 }}>
        <Typography variant="h3" component="h3">
          {title}
        </Typography>
        <Typography>{description}</Typography>
        <Button variant="contained">
          <EditIcon />
          Edit
        </Button>
        <Button variant="contained" onClick={() => setIsOpen(!isOpen)}>
          <DeleteIcon />
          Delete
        </Button>
      </Card>
      {isOpen && (
        <ConfirmationModal setVisible={setIsOpen} confirmationFunction={() => deleteBoard(id)} />
      )}
    </>
  );
}

export default BoardCard;
