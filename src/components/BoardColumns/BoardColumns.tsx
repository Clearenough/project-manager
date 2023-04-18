import Box from "@mui/material/Box/Box";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";
import { useJwt } from "react-jwt";
import { useParams } from "react-router-dom";
import {
  decodeToken,
  IColumn,
  IColumnCreate,
  ITask,
  ITaskCreate,
  ITaskUpdate,
} from "../../@types/common";
import { api } from "../../services/api";
import { sortDataByOrder } from "../../utils";
import BoardColumn from "../BoardColumn/BoardColumn";
import { StrictModeDroppable } from "../Droppable";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

interface ITasksByBoards {
  boardId: string;
}

function BoardColumns() {
  const { id } = useParams();
  const { data, error } = api.useGetAllColumnsQuery(id!);
  const [createTask, { error: createError }] = api.useCreateTaskMutation();
  const [deleteTask, { error: deleteError }] = api.useDeleteTaskMutation();
  const [
    updateTask,
    { error: taskUpdateError, isLoading: isUpdateTaskLoading },
  ] = api.useUpdateTaskMutation();
  const [
    updateColumn,
    { error: columnUpdateError, isLoading: isUpdateColumnLoading },
  ] = api.useUpdateColumnMutation();
  const tasksByBoards = new Map<string, ITask[]>();

  const sortedColumns = sortDataByOrder(data)!;

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

    if (result.type === "COLUMN") {
      let transformedArray = sortDataByOrder([...data!])!;

      const movedColumn = transformedArray?.splice(source.index, 1)[0];

      if (movedColumn) {
        transformedArray?.splice(destination.index, 0, movedColumn);
        for (let i = 0; i < transformedArray.length; i++) {
          if (transformedArray[i].order !== i) {
            const obj = { ...transformedArray[i] };
            obj.order = i;
            console.log(obj);
            const updatedObject: IColumnCreate = {
              title: obj.title,
              order: obj.order,
            };
            updateColumn({
              body: updatedObject,
              columnId: obj._id,
              boardId: id!,
            });
          }
        }
        return;
      }
    }

    if (result.type === "TASK") {
      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      ) {
        console.log("dest + index");
        return;
      }

      if (destination.droppableId !== source.droppableId) {
        console.log(destination.index, source.index);

        let destinationArray = sortDataByOrder([
          ...tasksByBoards.get(destination.droppableId)!,
        ])! as ITask[];
        let sourceArray = sortDataByOrder([
          ...tasksByBoards.get(source.droppableId)!,
        ])! as ITask[];

        const movedTask = sourceArray?.splice(source.index, 1)[0];

        if (movedTask) {
          deleteTask(movedTask);
          console.log("delete", movedTask);

          destinationArray?.splice(destination.index, 0, movedTask);

          console.log(destinationArray, sourceArray);

          createTask({
            body: {
              title: movedTask.title,
              order: destination.index,
              description: movedTask.description,
              userId: movedTask.userId,
              users: movedTask.users,
            },
            boardId: id!,
            columnId: destination.droppableId,
          });
          console.log("create");

          for (let i = 0; i < sourceArray.length; i++) {
            if (sourceArray[i].order !== i) {
              const obj = { ...sourceArray[i] };
              obj.order = i;
              console.log(obj);
              const updatedObject: ITaskUpdate = {
                title: obj.title,
                order: obj.order,
                description: obj.description,
                userId: obj.userId,
                users: obj.users,
                columnId: obj.columnId,
              };
              updateTask({
                body: updatedObject,
                boardId: obj.boardId,
                _id: obj._id,
              });
            }
          }

          for (let i = 0; i < destinationArray.length; i++) {
            if (destinationArray[i].order !== i) {
              const obj = { ...destinationArray[i] };
              obj.order = i;
              console.log(obj);
              const updatedObject: ITaskUpdate = {
                title: obj.title,
                order: obj.order,
                description: obj.description,
                userId: obj.userId,
                users: obj.users,
                columnId: obj.columnId,
              };
              updateTask({
                body: updatedObject,
                boardId: obj.boardId,
                _id: obj._id,
              });
            }
          }
        }

        return;
      }

      if (
        destination.droppableId === source.droppableId &&
        destination.index !== source.index
      ) {
        let taskArray = sortDataByOrder([
          ...tasksByBoards.get(source.droppableId)!,
        ])! as ITask[];
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
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <StrictModeDroppable
        droppableId={id!}
        direction="horizontal"
        type="COLUMN"
      >
        {(provided) => (
          <Box
            sx={{ overflowX: "scroll", display: "flex", gap: "20px" }}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {provided.placeholder}
            {sortedColumns &&
              sortedColumns.map((column) => (
                <BoardColumn
                  column={column}
                  columnIndex={column.order}
                  getTasks={getColumnTasks}
                />
              ))}
          </Box>
        )}
      </StrictModeDroppable>
      {isUpdateColumnLoading && <LoadingScreen />}
      {isUpdateTaskLoading && <LoadingScreen />}
    </DragDropContext>
  );
}

export default BoardColumns;
