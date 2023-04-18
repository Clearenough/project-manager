import Box from '@mui/material/Box/Box';
import { useParams } from 'react-router-dom';
import BoardColumns from '../components/BoardColumns/BoardColumns';
import BoardHeader from '../components/BoardHeader/BoardHeader';
import { api } from '../services/api';

function Board() {
  return (
    <>
      <BoardHeader />
      <BoardColumns />
    </>
  );
}

export default Board;
