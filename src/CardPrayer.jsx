import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export default function MediaCard({ name, time, image }) {
  return (
    <Card sx={{ width: '100%' ,bgcolor: `#eceff1`, color: "#1a1a1a"  }}
    style={{ marginTop: '20px' ,boxShadow: '0 4px 8px 0 rgba(253, 251, 251, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
      <CardMedia
        sx={{ height: 140 }}
        image={image}
        title={name}
      />
      <CardContent sx={{textAlign:'center' , flexDirection:'column', margin:'10px' }}>
        <Typography gutterBottom variant="h5" component="div" sx={{  fontFamily: 'Oswald' }}>
          {name}
        </Typography>
        <Typography variant="h4" sx={{ fontWeight:'bold' ,marginTop:'30px', fontFamily: 'Oswald'}} component="div">
          {time}
        </Typography>
      </CardContent>
     
    </Card>
  );
}