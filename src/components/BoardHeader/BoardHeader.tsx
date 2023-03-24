import Box from "@mui/material/Box/Box";
import Button from "@mui/material/Button/Button";
import Typography from "@mui/material/Typography/Typography";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useJwt } from "react-jwt";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { decodeToken, IBoard, IBoardCreate } from "../../@types/common";
import { api } from "../../services/api";
import { RootState } from "../../store/store";
import { boardInfoParser } from "../../utils";
import CreateColumn from "../CreateColumn/CreateColumn";

import styles from "./BoardHeader.module.scss";

interface Props {}

function BoardHeader({}: Props) {
  const [isTitle, setIsTitle] = useState(true);
  // const isColumnCreated = useSelector((state: RootState) => state.columnCreator.isCreated);
  const [isColumnCreated, setIsColumnCreated] = useState(false);
  const [isCreateColumnModalOpen, setIsCreateColumnModalOpen] = useState(false);
  const { id } = useParams();
  // const { data: boardInfo, error } = api.useGetBoardByIDQuery(id!);
  const { data: boardsInfo, error: boardsError } = api.useGetAllBoardsQuery();
  const { data: columnsInfo, error: columnsError } = api.useGetAllColumnsQuery(
    id!
  );
  const boardInfo = boardsInfo?.filter((a) => a._id === id)[0];
  const [updateBoard, { error: changeTitleError }] =
    api.useUpdateBoardMutation();
  const [title, description] = boardInfoParser(boardInfo?.title!);
  const { decodedToken, isExpired } = useJwt(
    localStorage["TOKEN_AUTH_LOCALSTORAGE"]
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ title: string }>();

  const onSubmit: SubmitHandler<{ title: string }> = async ({ title }) => {
    const newBoardInfo: IBoardCreate = {
      title,
      owner: boardInfo?.owner!,
      users: boardInfo?.users!,
    };
    updateBoard({ body: newBoardInfo, id: boardInfo?._id! });
    setIsTitle(true);
  };

  function cancelHandler(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    setIsTitle(true);
  }

  function setColumnIsCreated() {
    setIsColumnCreated(true);
  }

  return (
    <>
      <Box onClick={() => setIsTitle(false)} sx={{ cursor: "pointer" }}>
        {isTitle ? (
          <Typography variant="h5">{title}</Typography>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <Box>
              <input type="text" {...register("title", { required: true })} />
              {errors.title && (
                <Typography variant="subtitle2" sx={{ color: "red" }}>
                  this field is required
                </Typography>
              )}
            </Box>
            <Button type="submit">Submit</Button>
            <Button onClick={cancelHandler}>Cancel</Button>
          </form>
        )}
        {/* {!isColumnCreated && ( */}
        <Button
          onClick={() => setIsCreateColumnModalOpen(true)}
          variant="outlined"
        >
          Create Column
        </Button>
        {/* // )} */}
      </Box>
      {isCreateColumnModalOpen && (
        <CreateColumn
          handler={() => setIsCreateColumnModalOpen(false)}
          setIsColumnCreated={setColumnIsCreated}
          order={columnsInfo ? columnsInfo.length : undefined}
        />
      )}
    </>
  );
}

export default BoardHeader;
