import React, {useState, useEffect} from 'react';
import {Snackbar, IconButton, Alert} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const CustomizedSnackbars = (props) => {
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway')
      return;
    setOpen(false);
  };

  useEffect(() => {
    if(props.appear)
      setOpen(true);
  }, [props]);

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        message={props.text}
        action={action}
      >
        <Alert onClose={handleClose} severity={props.motive} sx={{ width: '100%' }}>{props.text}</Alert>
      </Snackbar>
    </div>
  );
}

export default CustomizedSnackbars;