import Button from '@mui/material/Button/Button';
import TextField from '@mui/material/TextField/TextField';
import Typography from '@mui/material/Typography/Typography';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useJwt } from 'react-jwt';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { decodeToken, IColumn, IColumnCreate } from '../../@types/common';
import { api } from '../../services/api';
import { setIsCreated } from '../../store/reducers/isColumnCreated';

interface IProps {
  handler: (event?: mouseEvent) => void;
  setIsColumnCreated: () => void;
  column?: IColumn;
}

type mouseEvent = React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLDivElement>;

function CreateColumn({ handler, setIsColumnCreated, column }: IProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ title: string }>();
  const [createColumn, { error: createError }] = api.useCreateColumnMutation();
  const [updateColumn, { error: updateError }] = api.useUpdateColumnMutation();
  const { decodedToken, isExpired } = useJwt(localStorage['TOKEN_AUTH_LOCALSTORAGE']);
  const { id: boardId } = useParams();
  // const userId = (decodedToken as decodeToken).id;
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<{ title: string }> = (data) => {
    if (boardId) {
      if (!column) {
        const newColumn: IColumnCreate = {
          title: data.title,
          order: 0,
        };
        dispatch(setIsCreated(true));
        createColumn({ body: newColumn, id: boardId });
        setIsColumnCreated();
      } else {
        const updatedColumn: IColumn = {
          _id: column._id,
          boardId: column.boardId,
          title: data.title,
          order: 0,
        };
        updateColumn(updatedColumn);
      }
    }

    handler();
  };

  return (
    <div onClick={handler}>
      <form onSubmit={handleSubmit(onSubmit)} onClick={(e) => e.stopPropagation()}>
        <Typography
          variant="h5"
          align="center"
          sx={{
            color: 'black',
            marginBottom: '10px',
          }}>
          {column ? 'Edit Column' : 'Add Column'}
        </Typography>

        <div>
          <TextField
            {...register('title', { required: true })}
            name="title"
            label="task title"
            variant="outlined"
            autoFocus={true}
            error={errors.title && true}
          />
          {errors.title && (
            <Typography variant="subtitle2" sx={{ color: 'red' }}>
              title is required
            </Typography>
          )}
        </div>
        <div>
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
}

export default CreateColumn;
