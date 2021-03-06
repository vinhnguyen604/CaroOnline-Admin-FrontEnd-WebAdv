import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import ProfileImage from './ProfileImage';
import Title from '../../Title';
import ConfirmDialog from '../../ConfirmDialog';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import TableContainer from '@material-ui/core/TableContainer';
import Box from '@material-ui/core/Box'
import TablePagination from '@material-ui/core/TablePagination';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useSelector, useDispatch } from 'react-redux';
import { flipUserStatus, selectUser, fetchUser } from '../../../features/users/usersSlice';
import { fetchPlayerHistory, selectPlayerGames } from '../../../features/history/historySlice';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import HistoryList from '../../History/HistoryList';
import { useStyles } from './styles';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function UserDetails() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useSelector(selectPlayerGames);
  const user = useSelector(selectUser);
  const userState = useSelector(state => state.users.state);
  const blockState = useSelector(state => state.users.blockOneUserStatus);
  const historyState = useSelector(state => state.history.state);

  const rowsOpts = [10, 20, 50, 100];
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(0);
  const [snack, setSnack] = useState(false);


  useEffect(() => {
    dispatch(fetchUser(parseInt(id)));
  }, [dispatch, id])

  useEffect(() => {
    dispatch(fetchPlayerHistory(parseInt(id)));
    setPage(0);
  }, [dispatch, id]);

  const handleSnackBarOpen = () => {
    setSnack(true);
  }

  const handleSnackBarClose = () => {
    setSnack(false);
  }

  const handleChangePage = (event, page) => {
    setPage(page);
  }

  const handleChangeRows = (event) => {
    setRows(event.target.value);
    setPage(0);
  }


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = (userId) => {
    dispatch(flipUserStatus(userId));
    handleClose();
    handleSnackBarOpen();
  }

  return (
    <React.Fragment>
      <ConfirmDialog
        open={open}
        cancel={handleClose}
        confirm={() => handleConfirm(user.id)}
      />
      <Snackbar open={snack} autoHideDuration={3000} onClose={handleSnackBarClose}>
        <Alert onClose={handleSnackBarClose} severity="success">
          User {blockState} successfully!
        </Alert>
      </Snackbar>
      <Title>Users</Title>
      {userState === 'Pending' ?
        < LinearProgress /> :
        <Grid container spacing={1} justify="space-evenly" direction="row">
          <Grid item xs={12} sm={6}>
            <ProfileImage
              user={user}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              InputProps={{ readOnly: true }} className={classes.textField} fullWidth
              label="ID" value={user.id} variant="outlined"
            />
            <TextField
              InputProps={{ readOnly: true }} className={classes.textField} fullWidth
              label="Account" value={user.account_type === 1 ? "Signed Up" : (user.account_type === 2) ? "Google" : "Facebook"} variant="outlined"
            />
            <TextField
              InputProps={{ readOnly: true }} className={classes.textField} fullWidth
              label="Email" value={user.email} variant="outlined"
            />
            <TextField
              InputProps={{ readOnly: true }} className={classes.textField} fullWidth
              label="Created at" value={user.created_at} variant="outlined"
            />
            <TextField
              InputProps={{ readOnly: true }} className={classes.textField} fullWidth
              label="Point" value={user.point} variant="outlined"
            />
            <TextField
              InputProps={{ readOnly: true }} className={classes.textField} fullWidth
              label="Total match" value={user.total_match} variant="outlined"
            />
            <TextField
              InputProps={{ readOnly: true }} className={classes.textField} fullWidth
              label="Total win" value={user.total_win} variant="outlined"
            />
            <TextField
              InputProps={{ readOnly: true }} className={classes.textField} fullWidth
              label="Win rate" value={(user.percent_win * 100) + "%"} variant="outlined"
            />
            <FormControlLabel
              control={<Checkbox color="secondary" checked={(user.status === 1) ? false : true} onChange={handleClickOpen} />}
              label="Blocked" labelPlacement="end" className={classes.checkbox}
            />
          </Grid>
        </Grid>
      }
      <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
        History:
        </Typography>
      {historyState === 'Pending' ?
        < LinearProgress /> :
        <TableContainer className={classes.container}>
          <Table size="small" stickyHeader >
            <colgroup>
              <col style={{ width: '15%' }} />
              <col style={{ width: '15%' }} />
              <col style={{ width: '15%' }} />
              <col style={{ width: '15%' }} />
              <col style={{ width: '15%' }} />
              <col style={{ width: '15%' }} />
            </colgroup>
            <TableHead>
              <TableRow>
                <TableCell>STT</TableCell>
                <TableCell>ID</TableCell>
                <TableCell>Board</TableCell>
                <TableCell>Winner</TableCell>
                <TableCell>Loser</TableCell>
                <TableCell>Win type</TableCell>
              </TableRow>
            </TableHead>
            <HistoryList
              histories={history.slice(page * rows, page * rows + rows)}
              page={page}
              rows={rows}
            />
          </Table>
        </TableContainer>
      }
      <Box display="flex" justifyContent="flex-end" m={1} p={1} bgcolor="background.paper">
        <TablePagination
          rowsPerPageOptions={rowsOpts}
          rowsPerPage={rows}
          onChangeRowsPerPage={handleChangeRows}
          count={history.length}
          page={page}
          onChangePage={handleChangePage}
        />
      </Box>
    </React.Fragment>
  );
}