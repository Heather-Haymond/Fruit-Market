import React from 'react';
import { Card, CardContent, CardActions, Button, Typography } from '@mui/material';

const FruitCard = ({ fruit }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          {fruit.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price: ${parseFloat(fruit.current_price).toFixed(2)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Buy</Button>
      </CardActions>
    </Card>
  );
};

export default FruitCard;
