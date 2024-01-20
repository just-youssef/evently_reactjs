import { Typography, IconButton, Button, Stack, Box } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { toggleDarkMode } from '../lib/features/darkModeReducer';
import { useDispatch, useSelector } from 'react-redux';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import { Link, useNavigate } from 'react-router-dom';
import { useKindeAuth } from '@kinde-oss/kinde-auth-react';
import LogoutIcon from '@mui/icons-material/Logout';

const Navbar = () => {
  const { login, register, logout, isAuthenticated } = useKindeAuth();
  const darkModeState = useSelector((state) => state.darkMode.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Stack
      direction="row" alignItems="center" justifyContent="space-between"
      sx={{ px: {xs:3, sm: 4}, py: 1, boxShadow: 5, bgcolor: "background.paper" }}
    >
      <Stack
        direction="row"
        alignItems="center"
      >
        <Link to="/" style={{textDecoration: "none"}}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.4, color: "text.primary"}}>
            <Box component='img' src='/logo.png' height={40} />
            <Typography
              fontSize={25}
              fontWeight={600}
              component="div"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              Evently
            </Typography>
          </Box>
        </Link>
      </Stack>

      <Stack direction="row" gap={1} alignItems="center">
        <IconButton onClick={() => dispatch(toggleDarkMode())} color="inherit">
          {darkModeState ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>

        {
          isAuthenticated?
            <>
              <Button
                variant="contained"
                onClick={() => navigate("/addEvent")}
                sx={{ display: { xs: 'none', sm: 'block' } }}
              >
                Add Event
              </Button>
              <Button variant="outlined" onClick={logout} sx={{display: {xs: 'none', sm: 'block'}}}>
                  Logout
              </Button>

              {/* mobile button */}
              <IconButton
                onClick={() => navigate("/addEvent")}
                sx={{ display: { sm: 'none' } }}
                color='primary' 
              >
                <AddToPhotosIcon />
              </IconButton>
              <IconButton
                onClick={logout}
                sx={{ display: { sm: 'none' } }}
                color='inherit'
              >
                <LogoutIcon />
              </IconButton>
            </>
            : <>
              <Button variant="contained" onClick={login}>
                Login
              </Button>

              <Typography color="text.secondary">OR</Typography>

              <Button variant="outlined" onClick={register}>
                Register
              </Button>
            </>
        }
      </Stack>
    </Stack>
  );
}

export default Navbar