import Button from "@mui/material/Button/Button";
import TextField from "@mui/material/TextField/TextField";
import Typography from "@mui/material/Typography/Typography";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  decodeToken,
  ITask,
  ITaskCreate,
  IColumn,
  ITaskUpdate,
} from "../../@types/common";
import { useAppSelector } from "./../../hooks/redux";
import { api } from "../../services/api";
import styles from "./CreateTask.module.scss";

interface IProps {
  handler: (event?: mouseEvent) => void;
  order?: number | undefined;
  task?: ITask;
  column?: IColumn;
}

type mouseEvent =
  | React.MouseEvent<HTMLButtonElement>
  | React.MouseEvent<HTMLDivElement>;

function CreateTask({ handler, task, column, order }: IProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ITaskCreate>();
  const [createTask, { error: createError }] = api.useCreateTaskMutation();
  const [updateTask, { error: updateError }] = api.useUpdateTaskMutation();

  const userId = useAppSelector((state) => state.app.id);
  console.log(userId);

  const onSubmit: SubmitHandler<ITaskCreate> = (data) => {
    console.log(order, "haha");
    if (task) {
      console.log(task);
      const newTask: ITaskUpdate = {
        title: data.title,
        order: task.order,
        description: data.description,
        userId: task.userId,
        users: task.users,
        columnId: task.columnId,
      };
      console.log(newTask);
      updateTask({
        body: newTask,
        boardId: task.boardId,
        _id: task._id,
      });
      handler();
    } else if (column && userId && order !== undefined) {
      const newTask: ITaskCreate = {
        title: data.title,
        order,
        description: data.description,
        userId,
        users: [],
      };
      createTask({
        body: newTask,
        boardId: column.boardId,
        columnId: column._id,
      });

      handler();
    }
  };

  return (
    <div className={styles.modal} onClick={handler}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        onClick={(e) => e.stopPropagation()}
        className={styles.taskCreation}
      >
        <Typography
          variant="h5"
          align="center"
          sx={{
            color: "black",
            marginBottom: "10px",
          }}
        >
          {task ? "Edit Task" : "Add Task"}
        </Typography>

        <div className={styles.inputs}>
          <TextField
            {...register("title", { required: true })}
            name="title"
            label="task title"
            variant="outlined"
            autoFocus={true}
            error={errors.title && true}
          />
          {errors.title && (
            <Typography variant="subtitle2" sx={{ color: "red" }}>
              title is required
            </Typography>
          )}
          <TextField
            {...register("description", { required: true })}
            name="description"
            label="task description"
            variant="outlined"
            multiline={true}
            minRows="3"
            error={errors.description && true}
          />
          {errors.description && (
            <Typography variant="subtitle2" sx={{ color: "red" }}>
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
}

export default CreateTask;
