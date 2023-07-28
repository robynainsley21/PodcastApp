import React, { useEffect, useState } from 'react';

import CardMedia from '@mui/material/CardMedia';

import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Card = ({ randomCard }) => {
  return (
    <>
      <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)', minWidth: 275 }}
      >
        <CardContent variant="outlined" className='suggestions-card'>
        <CardMedia
        component="img"
        height="300"
        width='auto'
        image={randomCard.image}
        alt="Paella dish"
      />
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Title: {randomCard.title}
          </Typography>
          <Typography variant="h5" component="div">
            {/* Display other properties of randomCard here */}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            adjective
          </Typography>
          <Typography variant="body2">
            {/* Display the content of randomCard here */}
            <br />
            {'"a benevolent smile"'}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Box>
    </>
  );
};

const Suggested = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("https://podcast-api.netlify.app/")
      .then(res => res.json())
      .then(data => {
        setUserData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setError(true);
        setLoading(false);
      });
  }, []);

  if (error) {
    return <div>Error fetching data</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  const random = () => {
    const randomNumber1 = Math.floor(Math.random() * userData.length);
    const randomCard1 = userData[randomNumber1];
    return randomCard1;
  };

  const randomCard1 = random();

  return (
    <div className='random-card-container'>
      <Card randomCard={randomCard1} />
    </div>
  );
};

export default Suggested;
