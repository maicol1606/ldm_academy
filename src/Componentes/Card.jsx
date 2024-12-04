import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const CardComponent = ({children}) => {
  return (
    <Card>
        <CardContent>
          { children }
        </CardContent>
    </Card>
  );
}

export default CardComponent
