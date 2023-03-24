import Box from "@mui/material/Box/Box";
import Button from "@mui/material/Button/Button";
import Stack from "@mui/material/Stack/Stack";
import { Droppable } from "react-beautiful-dnd";
import { Draggable } from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import { useJwt } from "react-jwt";
import { IColumn, ITask } from "../../@types/common";
import { api } from "../../services/api";
import ColumnTask from "../ColumnTask/ColumnTask";
import CreateTask from "../CreateTask/CreateTask";
import { calculateProvidedBy } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { sortDataByOrder } from "../../utils";
import { StrictModeDroppable } from "../Droppable";
import Typography from "@mui/material/Typography/Typography";

interface IProps {
  column: IColumn;
  columnIndex: number;
  getTasks: (tasks: ITask[], columnId: string) => void;
}

function BoardColumn({ column, columnIndex, getTasks }: IProps) {
  const { data, error } = api.useGetAllTasksQuery({
    columnId: column._id,
    boardId: column.boardId,
  });
  const [isCreateTaskModalOpen, setCreateTaskModalOpen] = useState(false);
  useEffect(() => {
    getTasks(data!, column._id);
  });

  const sortedTasks = sortDataByOrder(data) as ITask[];
  console.log("rerender", sortedTasks);
  return (
    <>
      <Draggable draggableId={column._id} index={columnIndex} key={column._id}>
        {(provided) => (
          <Box
            sx={{
              minWidth: 300,
              border: "solid 1px black",
              backgroundColor: "#ebecf0",
            }}
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            <Typography variant="h5" {...provided.dragHandleProps}>
              {column.title}
            </Typography>
            <StrictModeDroppable droppableId={column._id} type="TASK">
              {(provided) => (
                <Stack {...provided.droppableProps} ref={provided.innerRef}>
                  {sortedTasks &&
                    sortedTasks.map((task, index) => (
                      <ColumnTask task={task} taskIndex={task.order} />
                    ))}
                  <Button
                    variant="outlined"
                    onClick={() => setCreateTaskModalOpen(true)}
                  >
                    Add New Task
                  </Button>
                  {provided.placeholder}
                </Stack>
              )}
            </StrictModeDroppable>
          </Box>
        )}
      </Draggable>

      {isCreateTaskModalOpen && (
        <CreateTask
          handler={() => setCreateTaskModalOpen(false)}
          task={undefined}
          column={column}
          order={data ? data.length : undefined}
        />
      )}
    </>
  );
}

export default BoardColumn;
