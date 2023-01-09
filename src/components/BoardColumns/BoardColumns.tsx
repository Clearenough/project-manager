import Box from "@mui/material/Box/Box";
import { useJwt } from "react-jwt";
import { useParams } from "react-router-dom";
import { decodeToken } from "../../@types/common";
import { api } from "../../services/api";
import BoardColumn from "../BoardColumn/BoardColumn";

function BoardColumns() {
  const { id } = useParams();
  const { data, error } = api.useGetAllColumnsQuery(id!);
  return (
    <Box sx={{ overflowX: "scroll", display: "flex", gap: "20px" }}>
      {data && data.map((column) => <BoardColumn column={column} />)}
    </Box>
  );
}

export default BoardColumns;
