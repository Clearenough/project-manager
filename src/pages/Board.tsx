import Box from '@mui/material/Box/Box';
import { useParams } from 'react-router-dom';
import BoardHeader from '../components/BoardHeader/BoardHeader';
import { api } from '../services/api';

function Board() {
  const { id } = useParams();

  const { data, error } = api.useGetBoardByIDQuery(id!);
  console.log(data, error);

  console.log(id);

  return (
    <>
      <BoardHeader />
    </>
  );
}

export default Board;
