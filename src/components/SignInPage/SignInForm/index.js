import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import LinearProgress from '@material-ui/core/LinearProgress';
import Alert from '@material-ui/lab/Alert';
import Typography from '@material-ui/core/Typography';
import { useState, useContext, useEffect } from 'react';
import { adminLogin } from '../../../features/admin/adminSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AuthContext } from '../../../context/auth';
import { useStyles } from '../styles';

export default function SignInForm() {
  const classes = useStyles();
  const auth = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [waiting, setWaiting] = useState(false);
  const [invalid, setInvalid] = useState(false);

  const dispatch = useDispatch();
  const adminStatus = useSelector(state => state.admin.status);
  const loginState = useSelector(state => state.admin.state);

  const usernameInput = (e) => {
    setUsername(e.target.value);
  }

  const passwordInput = (e) => {
    setPassword(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username: username,
      password: password
    }
    if (adminStatus === 'idle') {
      dispatch(adminLogin(user));
    }
  }

  useEffect(() => {
    if (loginState === 'Pending') {
      setInvalid(false);
      setWaiting(true);
    } else {
      setWaiting(false);
    }
    if (loginState === 'Unauthorized') {
      setInvalid(true);
    } else if (loginState === 'OK') {
      auth.login();
      window.location.href = '/dashboard';
    }
  }, [loginState])

  return (
    <>
      <Typography component="h1" variant="h5">
        Sign in
        </Typography>
      <form className={classes.form} onSubmit={handleSubmit}>
        {waiting ? <LinearProgress /> : ""}
        {invalid ?
          <Alert severity="error">
            Invalid username or password!
        </Alert> : ""}
        <TextField
          variant="outlined" margin="normal" required fullWidth
          id="email" label="Username" name="email" autoComplete="email"
          autoFocus onChange={usernameInput}
        />
        <TextField
          variant="outlined" margin="normal" required fullWidth
          name="password" label="Password" type="password" id="password"
          autoComplete="current-password"
          onChange={passwordInput}
        />

        <Button
          type="submit" fullWidth variant="contained"
          color="primary" className={classes.submit}
        >
          Sign In
      </Button>

        <Grid container>
          <Grid item xs>
            <Link href="/auth/forgot-password" variant="body2">
              Forgot password?
              </Link>
          </Grid>
        </Grid>
      </form>
    </>
  )
}