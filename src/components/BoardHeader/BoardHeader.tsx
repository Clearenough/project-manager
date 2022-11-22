import Box from '@mui/material/Box/Box';
import Button from '@mui/material/Button/Button';
import Typography from '@mui/material/Typography/Typography';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { IBoard, IBoardCreate } from '../../@types/common';
import { api } from '../../services/api';

import styles from './BoardHeader.module.scss';

interface Props {}

function BoardHeader({}: Props) {
  const [isTitle, setIsTitle] = useState(true);
  const { id } = useParams();
  const { data: boardInfo, error } = api.useGetBoardByIDQuery(id!);
  const [updateBoard, { error: changeTitleError }] = api.useUpdateBoardMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ title: string }>();

  const onSubmit: SubmitHandler<{ title: string }> = async ({ title }) => {
    const newBoardInfo: IBoardCreate = {
      title,
      owner: boardInfo?.owner!,
      users: boardInfo?.users!,
    };
    updateBoard({ body: newBoardInfo, id: boardInfo?._id! });
    setIsTitle(true);
  };

  function cancelHandler(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    setIsTitle(true);
  }
  return (
    <>
      <Box onClick={() => setIsTitle(false)} sx={{ cursor: 'pointer' }}>
        {isTitle ? (
          <Typography variant="h5">{boardInfo?.title}</Typography>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <Box>
              <input type="text" {...register('title', { required: true })} />
              {errors.title && (
                <Typography variant="subtitle2" sx={{ color: 'red' }}>
                  this field is required
                </Typography>
              )}
            </Box>
            <Button type="submit">Submit</Button>
            <Button onClick={cancelHandler}>Cancel</Button>
          </form>
        )}
      </Box>
    </>
  );
}

export default BoardHeader;
