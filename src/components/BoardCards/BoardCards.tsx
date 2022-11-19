import Grid2 from '@mui/material/Unstable_Grid2';
import { api } from '../../services/api';
import BoardCard from '../BoardCard/BoardCard';

import { boardInfoParser } from '../../utils';

function BoardCards() {
  const { data, error } = api.useGetAllBoardsQuery();

  return (
    <>
      <Grid2 container spacing={{ md: 3 }}>
        {data?.map((board, i) => {
          const [title, description] = boardInfoParser(board.title);
          console.log(board._id);
          return (
            <Grid2 md={4}>
              {<BoardCard title={title} description={description} id={board._id} key={board._id} />}
            </Grid2>
          );
        })}
      </Grid2>
    </>
  );
}

export default BoardCards;
