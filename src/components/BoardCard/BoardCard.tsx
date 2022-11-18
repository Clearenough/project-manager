import Card from '@mui/material/Card';
import Grid2 from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

interface BoardCardProps {
  title: string;
  description: string;
}

function BoardCard({ title, description }: BoardCardProps) {
  return (
    <>
      <Card sx={{ maxWidth: 300, p: 2 }}>
        <Typography variant="h3" component="h3">
          {title}
        </Typography>
        <Typography>{description}</Typography>
      </Card>
    </>
  );
}

export default BoardCard;
