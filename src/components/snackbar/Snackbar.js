import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CustomizedSnackbars = (props) => {
  const [, setOpen] = React.useState(true);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <div>
      <Snackbar open={props.appear} autoHideDuration={1500} onClose={handleClose}>
        <Alert onClose={handleClose} severity={props.motive} sx={{ width: '100%' }}>
          {props.text}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default CustomizedSnackbars;