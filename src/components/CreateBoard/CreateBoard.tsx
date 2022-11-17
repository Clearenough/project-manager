import { FC } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';

import styles from './CreateBoard.module.scss';
import { api } from '../../services/api';
import { IBoardCreate } from '../../@types/common';

interface ICreateBoard {
  name: string;
  description: string;
}

// interface IPropsDiv {
//   handler(event: React.MouseEvent<HTMLDivElement>): void,
// }

interface IPropsButton {
  handler: (event?: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLDivElement>) => void;
}

type mouseEvent = React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLDivElement>;

const CreateBoard: FC<IPropsButton> = ({ handler }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateBoard>();
  const [createBoard, { error }] = api.useCreateBoardMutation();
  const onSubmit: SubmitHandler<ICreateBoard> = (data) => {
    console.log(data);
    const boardInfo: IBoardCreate = {
      title: `${data.name}|${data.description}`,
      owner: 'user',
      users: [],
    };
    createBoard(boardInfo);
    handler();
  };

  function submitHandler(e: mouseEvent) {
    e.preventDefault();
    console.log(e.target);
  }

  return (
    <div className={styles.modal} onClick={handler}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        onClick={(e) => e.stopPropagation()}
        className={styles.boardCreation}>
        <Typography
          variant="h5"
          align="center"
          sx={{
            color: 'black',
            marginBottom: '10px',
          }}>
          Add Board
        </Typography>

        <div className={styles.inputs}>
          <TextField
            {...register('name', { required: true })}
            name="name"
            label="board name"
            variant="outlined"
            autoFocus={true}
            error={errors.name && true}
          />
          {errors.name && (
            <Typography variant="subtitle2" sx={{ color: 'red' }}>
              name is required
            </Typography>
          )}
          <TextField
            {...register('description', { required: true })}
            name="description"
            label="board description"
            variant="outlined"
            multiline={true}
            minRows="3"
            error={errors.description && true}
          />
          {errors.description && (
            <Typography variant="subtitle2" sx={{ color: 'red' }}>
              description is required
            </Typography>
          )}
        </div>
        <div className={styles.buttons}>
          <Button variant="text" color="success" type="submit">
            submit
          </Button>
          <Button variant="text" color="warning" onClick={handler}>
            cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateBoard;
