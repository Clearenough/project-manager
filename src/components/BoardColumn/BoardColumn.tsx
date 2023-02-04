import Box from "@mui/material/Box/Box";
import Button from "@mui/material/Button/Button";
import Stack from "@mui/material/Stack/Stack";
import { Droppable } from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import { useJwt } from "react-jwt";
import { IColumn, ITask } from "../../@types/common";
import { api } from "../../services/api";
import ColumnTask from "../ColumnTask/ColumnTask";
import CreateTask from "../CreateTask/CreateTask";
import { calculateProvidedBy } from "@reduxjs/toolkit/dist/query/endpointDefinitions";

interface IProps {
  column: IColumn;
  getTasks: (tasks: ITask[], columnId: string) => void;
}

function BoardColumn({ column, getTasks }: IProps) {
  const { data, error } = api.useGetAllTasksQuery({
    columnId: column._id,
    boardId: column.boardId,
  });
  const [isCreateTaskModalOpen, setCreateTaskModalOpen] = useState(false);
  useEffect(() => {
    getTasks(data!, column._id);
  });

  return (
    <>
      <Box
        sx={{
          minWidth: 300,
          border: "solid 1px black",
          backgroundColor: "#ebecf0",
        }}
      >
        <Droppable droppableId={column._id}>
          {(provided) => (
            <Stack {...provided.droppableProps} ref={provided.innerRef}>
              {data &&
                data.map((task, index) => (
                  <ColumnTask task={task} taskIndex={index} />
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
        </Droppable>
      </Box>
      {isCreateTaskModalOpen && (
        <CreateTask
          handler={() => setCreateTaskModalOpen(false)}
          task={undefined}
          column={column}
          order={data ? data.length + 1 : undefined}
        />
      )}
    </>
  );
}

export default BoardColumn;
