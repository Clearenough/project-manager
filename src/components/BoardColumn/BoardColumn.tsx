import Box from "@mui/material/Box/Box";
import Button from "@mui/material/Button/Button";
import Stack from "@mui/material/Stack/Stack";
import { Droppable } from "react-beautiful-dnd";
import { useState } from "react";
import { useJwt } from "react-jwt";
import { IColumn } from "../../@types/common";
import { api } from "../../services/api";
import ColumnTask from "../ColumnTask/ColumnTask";
import CreateTask from "../CreateTask/CreateTask";
import { calculateProvidedBy } from "@reduxjs/toolkit/dist/query/endpointDefinitions";

interface IProps {
  column: IColumn;
}

function BoardColumn({ column }: IProps) {
  const { data, error } = api.useGetAllTasksQuery({
    columnId: column._id,
    boardId: column.boardId,
  });
  const [isCreateTaskModalOpen, setCreateTaskModalOpen] = useState(false);

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
              {data && data.map((task) => <ColumnTask task={task} />)}
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
        />
      )}
    </>
  );
}

export default BoardColumn;
