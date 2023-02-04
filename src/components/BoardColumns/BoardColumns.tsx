import Box from "@mui/material/Box/Box";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useJwt } from "react-jwt";
import { useParams } from "react-router-dom";
import { decodeToken, ITask } from "../../@types/common";
import { api } from "../../services/api";
import BoardColumn from "../BoardColumn/BoardColumn";

interface ITasksByBoards {
  boardId: string;
}

function BoardColumns() {
  const { id } = useParams();
  const { data, error } = api.useGetAllColumnsQuery(id!);
  const [createTask, { error: createError }] = api.useCreateTaskMutation();
  const [deleteTask, { error: updateError }] = api.useDeleteTaskMutation();
  const tasksByBoards = new Map<string, ITask[]>();

  // if (data && id) {
  //   for (let i = 0; i < data.length; i++) {
  //     const columnId: string = data[i].boardId;
  //     const { data: tasks, error } = api.useGetAllTasksQuery({
  //       columnId,
  //       boardId: id,
  //     });
  //     tasksByBoards.set(data[i].boardId, tasks!);
  //   }
  // }
  // const { data: task } = api.useGetTaskByIdQuery(taskInfo);
  // const taskInfo: ITask = {
  //   _id: draggableId,
  //   title: "",
  //   order: 0,
  //   description: "",
  //   userId: "",
  //   users: [],
  //   boardId: id!,
  //   columnId: source.droppableId,
  // };

  function getColumnTasks(tasks: ITask[], columnId: string) {
    tasksByBoards.set(columnId, tasks);
  }

  function onDragEnd(result: DropResult) {
    console.log(result);
    const { destination, source, draggableId } = result;

    if (!destination) {
      console.log("dest");
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      console.log("dest + index");
      return;
    }

    if (destination.droppableId !== source.droppableId) {
      const task = tasksByBoards
        .get(source.droppableId)
        ?.find((element) => element._id === draggableId);

      console.log(task);

      if (task) {
        deleteTask(task);

        createTask({
          body: {
            title: task.title,
            order: 0,
            description: task.description,
            userId: task.userId,
            users: task.users,
          },
          boardId: id!,
          columnId: destination.droppableId,
        });
      }
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box sx={{ overflowX: "scroll", display: "flex", gap: "20px" }}>
        {data &&
          data.map((column) => (
            <BoardColumn column={column} getTasks={getColumnTasks} />
          ))}
      </Box>
    </DragDropContext>
  );
}

export default BoardColumns;
