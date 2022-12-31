import Card from '@mui/material/Card';
import { Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import styles from './ConfirmationModal.module.scss';

interface Props {
  setVisible: (param: boolean) => void;
  confirmationFunction: () => void;
}

function ConfirmationModal({ setVisible, confirmationFunction }: Props) {
  return (
    <>
      <div className={styles.modal}>
        <Typography variant="h3"></Typography>
        <Box sx={{ display: 'flex' }}>
          <Button variant="outlined" onClick={confirmationFunction}>
            Confirm
          </Button>
          <Button
            variant="outlined"
            onClick={(e) => {
              setVisible(false);
              e.stopPropagation();
            }}>
            Close
          </Button>
        </Box>
      </div>
    </>
  );
}

export default ConfirmationModal;
