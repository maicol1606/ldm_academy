import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const InputForm = (props) => {
  return (
    <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: '30ch' } }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label={props.label} variant="outlined" type={props.type} value={props.value} onChange={props.onChange} />
    </Box>
  );
}

export default InputForm