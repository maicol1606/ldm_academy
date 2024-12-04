import * as React from 'react';
import Button from '@mui/material/Button';

const BottonForm = (props) => {
  return (
      <Button variant="contained" color='primary' sx={{ mt: 3, mb: 2, borderRadius: '25px', py: 1.5 }} fullWidth={props.fullsize} onClick={props.onClick} >
        {props.descripcion}
      </Button>
  );
}

export default BottonForm