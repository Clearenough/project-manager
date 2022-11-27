import Grid2 from '@mui/material/Unstable_Grid2';
import { api } from '../../services/api';
import BoardCard from '../BoardCard/BoardCard';

import { boardInfoParser } from '../../utils';
import { useNavigate } from 'react-router-dom';

function BoardCards() {
  const { data, error } = api.useGetAllBoardsQuery();

  const navigate = useNavigate();

  function openBoard(id: string) {
    // console.log(id);
    navigate(`/boards/${id}`);
  }

  return (
    <>
      <Grid2 container spacing={{ md: 3 }}>
        {data?.map((board, i) => {
          const [title, description] = boardInfoParser(board.title);
          console.log(board._id);
          return (
            <Grid2 md={4} onClick={() => openBoard(board._id)} sx={{ cursor: 'pointer' }}>
              {<BoardCard title={title} description={description} id={board._id} key={board._id} />}
            </Grid2>
          );
        })}
      </Grid2>
    </>
  );
}

export default BoardCards;
