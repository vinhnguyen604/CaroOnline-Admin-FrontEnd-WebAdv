import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useDispatch } from 'react-redux';
import { changePassword } from '../../features/admin/adminSlice';
import { useState } from 'react';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function ChangPassword({ open, handleClose, userId }) {
  const dispatch = useDispatch();
  const [pass, setPass] = useState('');
  const [conf, setConf] = useState('');
  const [snack, setSnack] = useState(false);
  const [warn, setWarn] = useState(false);
  const [blank, setBlank] = useState(false);

  const handleConfirm = () => {
    if (!pass) {
      setBlank(true);
      return;
    }
    if (pass !== conf) {
      setWarn(true);
      return
    }
    const info = {
      pass: pass,
      id: userId
    }
    dispatch(changePassword(info));
    handleDialogClose();
    handleSnackBarOpen();
  }

  const handleSnackBarOpen = () => {
    setSnack(true);
  }

  const handleSnackBarClose = () => {
    setSnack(false);
    setWarn(false);
    setBlank(false);
  }

  const handleDialogClose = () => {
    setPass('');
    setConf('');
    handleClose();
  }

  const handleInput = (event, setter) => {
    setter(event.target.value);
  }

  return (
    <div>
      <Snackbar open={snack} autoHideDuration={3000} onClose={handleSnackBarClose}>
        <Alert onClose={handleSnackBarClose} severity="success">
          Password changed successfully!
        </Alert>
      </Snackbar>
      <Snackbar open={warn} autoHideDuration={3000} onClose={handleSnackBarClose}>
        <Alert onClose={handleSnackBarClose} severity="error">
          Password not match!
        </Alert>
      </Snackbar>
      <Snackbar open={blank} autoHideDuration={3000} onClose={handleSnackBarClose}>
        <Alert onClose={handleSnackBarClose} severity="error">
          Password must not blank!
        </Alert>
      </Snackbar>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth>
        <DialogTitle id="form-dialog-title">Change password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter and confirm to change your password
          </DialogContentText>
          <TextField
            autoFocus margin="dense"
            label="New password" type="password"
            onChange={(event) => handleInput(event, setPass)}
            fullWidth
          />
          <TextField
            margin="dense" label="Confirm password"
            type="password" onChange={(event) => handleInput(event, setConf)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}