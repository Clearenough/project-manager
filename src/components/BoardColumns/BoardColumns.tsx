import Box from "@mui/material/Box/Box";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useJwt } from "react-jwt";
import { useParams } from "react-router-dom";
import {
  decodeToken,
  ITask,
  ITaskCreate,
  ITaskUpdate,
} from "../../@types/common";
import { api } from "../../services/api";
import { sortDataByOrder } from "../../utils";
import BoardColumn from "../BoardColumn/BoardColumn";

interface ITasksByBoards {
  boardId: string;
}

function BoardColumns() {
  const { id } = useParams();
  const { data, error } = api.useGetAllColumnsQuery(id!);
  const [createTask, { error: createError }] = api.useCreateTaskMutation();
  const [deleteTask, { error: deleteError }] = api.useDeleteTaskMutation();
  const [updateTask, { error: updateError }] = api.useUpdateTaskMutation();
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

      console.log(task, "asf");

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

      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index !== source.index
    ) {
      let taskArray = sortDataByOrder([
        ...tasksByBoards.get(source.droppableId)!,
      ])!;
      let transformedTaskArray = [...taskArray]!;
      console.log(taskArray, transformedTaskArray);
      const movedTask = transformedTaskArray?.splice(source.index, 1);
      if (movedTask) {
        transformedTaskArray?.splice(destination.index, 0, movedTask[0]);
        console.log(transformedTaskArray, "after transformation");
      }
      for (let i = 0; i < taskArray!.length; i++) {
        if (taskArray[i].order !== transformedTaskArray[i].order) {
          // console.log(i, transformedTaskArray[i]);
          const obj = { ...transformedTaskArray[i] };
          obj.order = i;
          // transformedTaskArray[i] = obj;
          // console.log(obj);
          const updatedObject: ITaskUpdate = {
            title: obj.title,
            order: obj.order,
            description: obj.description,
            userId: obj.userId,
            users: obj.users,
            columnId: obj.columnId,
          };
          console.log(updatedObject, "after update");
          updateTask({
            body: updatedObject,
            boardId: obj.boardId,
            _id: obj._id,
          });
        }
      }
      // console.log(transformedTaskArray, "a");
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
