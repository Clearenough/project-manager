import Box from "@mui/material/Box/Box";
import Typography from "@mui/material/Typography/Typography";
import { Draggable } from "react-beautiful-dnd";
import { useState } from "react";
import { ITask } from "../../@types/common";
import TaskDescription from "../TaskDescription/TaskDescription";

interface IProps {
  task: ITask;
  taskIndex: number;
}

function ColumnTask({ task, taskIndex }: IProps) {
  const [taskDescription, isTaskDescription] = useState(false);

  return (
    <>
      <Draggable draggableId={task._id} index={taskIndex}>
        {(provided) => (
          <Box
            onClick={() => isTaskDescription(true)}
            sx={{
              margin: "10px",
              backgroundColor: "white",
              boxShadow: "6px 6px 8px 0px rgba(34, 60, 80, 0.2)",
              borderRadius: "3px",
              cursor: "pointer",
            }}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            <Typography variant="h5" sx={{ padding: "5px" }}>
              {task.title}
            </Typography>
          </Box>
        )}
      </Draggable>
      {taskDescription && (
        <TaskDescription
          task={task}
          closeDescription={(e) => {
            isTaskDescription(false);
            e.stopPropagation();
          }}
        />
      )}
    </>
  );
}

export default ColumnTask;
