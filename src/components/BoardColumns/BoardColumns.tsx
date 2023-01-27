import Box from "@mui/material/Box/Box";
import { DragDropContext } from "react-beautiful-dnd";
import { useJwt } from "react-jwt";
import { useParams } from "react-router-dom";
import { decodeToken } from "../../@types/common";
import { api } from "../../services/api";
import BoardColumn from "../BoardColumn/BoardColumn";

function BoardColumns() {
  const { id } = useParams();
  const { data, error } = api.useGetAllColumnsQuery(id!);

  function onDragEnd() {}

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box sx={{ overflowX: "scroll", display: "flex", gap: "20px" }}>
        {data && data.map((column) => <BoardColumn column={column} />)}
      </Box>
    </DragDropContext>
  );
}

export default BoardColumns;
