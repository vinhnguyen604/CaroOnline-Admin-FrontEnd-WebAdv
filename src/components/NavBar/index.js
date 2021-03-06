import clsx from 'clsx';
import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from '@material-ui/core/Drawer';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import IconButton from '@material-ui/core/IconButton';
import HistoryIcon from '@material-ui/icons/History';
import Divider from '@material-ui/core/Divider';
import AccountCircleSharpIcon from '@material-ui/icons/AccountCircleSharp';
import { selectDrawer, openNavBar, closeNavBar } from '../../features/drawer/drawerSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useContext } from 'react';
import { AuthContext } from '../../context/auth';
import { useStyles } from '../Dashboard/styles';

export default function NavBar() {
  const classes = useStyles();
  const auth = useContext(AuthContext);
  const dispatch = useDispatch();
  const open = useSelector(selectDrawer);

  const handleClick = (path) => {
    window.location.href = path;
  }

  return (
    <>
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={() => dispatch(openNavBar())}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" onClick={() => { window.location.href = "/dashboard" }}
            noWrap className={classes.title}>
            Dashboard
          </Typography>
          <IconButton color="inherit" onClick={() => window.location.href = "/auth/profile"}>
            <AccountCircleSharpIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={() => dispatch(closeNavBar())}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />

        <List>
          <ListItem button
            onClick={() => handleClick('/dashboard/')}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button
            onClick={() => handleClick('/dashboard/users')}>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItem>
          <ListItem button
            onClick={() => handleClick('/dashboard/history')} >
            <ListItemIcon>
              <HistoryIcon />
            </ListItemIcon>
            <ListItemText primary="History" />
          </ListItem>

          <Divider />

          <ListItem button
            onClick={() => auth.logout()}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}