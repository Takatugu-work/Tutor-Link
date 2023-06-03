import { AccountCircle } from '@mui/icons-material';
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCurrentUser } from 'src/hooks/useCurrentUser';
import { LOGIN, REGISTER, SEARCHTEACHER, USER } from 'src/router/root';

export function Navbar() {
  const user = useCurrentUser();
  const router = useRouter();
  return (
    <Box mb={5}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Tutor Link
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {user ? (
              user.role === 'STUDENT' && (
                <Button
                  component={Link}
                  href={SEARCHTEACHER}
                  sx={{ color: '#fff' }}
                >
                  先生を探す
                </Button>
              )
            ) : (
              <Button
                component={Link}
                href={SEARCHTEACHER}
                sx={{ color: '#fff' }}
              >
                先生を探す
              </Button>
            )}

            {user ? (
              user.role === 'TEACHER' && (
                <Button component={Link} href={REGISTER} sx={{ color: '#fff' }}>
                  生徒を探す
                </Button>
              )
            ) : (
              <Button component={Link} href={REGISTER} sx={{ color: '#fff' }}>
                生徒を探す
              </Button>
            )}
            {!user && (
              <>
                <Button component={Link} href={REGISTER} sx={{ color: '#fff' }}>
                  会員登録
                </Button>
                <Button component={Link} href={LOGIN} sx={{ color: '#fff' }}>
                  ログイン
                </Button>
              </>
            )}
            {user && (
              <Tooltip title="アカウント">
                <IconButton
                  size="large"
                  onClick={async () => {
                    await router.push(USER);
                  }}
                >
                  <AccountCircle />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
