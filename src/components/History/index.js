import React from 'react';
import { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import Title from '../Title';
import HistoryList from './HistoryList';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Box from '@material-ui/core/Box'
import LinearProgress from '@material-ui/core/LinearProgress';
import TablePagination from '@material-ui/core/TablePagination';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllHistory, fetchHistory } from '../../features/history/historySlice';
import { useStyles } from './styles';

export default function History() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useSelector(selectAllHistory);
  const state = useSelector(state => state.history.state);

  const rowsOpts = [10, 20, 50, 100];
  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(0);

  useEffect(() => {
    dispatch(fetchHistory());
    setPage(0);
  }, [dispatch]);

  const handleChangePage = (event, page) => {
    setPage(page);
  }

  const handleChangeRows = (event) => {
    setRows(event.target.value);
    setPage(0);
  }

  return (
    <React.Fragment>
      <Title>History</Title>
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          {state === 'Pending' ?
            <LinearProgress /> :
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
          }
        </TableContainer>
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
      </Paper>
    </React.Fragment>
  );
}