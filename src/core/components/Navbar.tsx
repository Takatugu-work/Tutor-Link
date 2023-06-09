import {
  AccountCircle,
  AssignmentInd,
  Description,
  HowToReg,
  Login,
  Menu,
  Message,
  PermIdentityOutlined,
  School,
} from '@mui/icons-material';
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Stack,
  SwipeableDrawer,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useCurrentUser } from 'src/hooks/useCurrentUser';
import {
  ASSIGNMENT,
  CHAT,
  LOGIN,
  REGISTER,
  SEARCHSTUDENT,
  SEARCHTEACHER,
  USER,
} from 'src/router/root';

export function Navbar() {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setOpenDrawer(open);
    };
  const user = useCurrentUser();
  const router = useRouter();
  return (
    <Box>
      <AppBar elevation={0} component="nav" position="relative">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
            onKeyDown={toggleDrawer(false)}
          >
            <Menu sx={{ fontSize: 35 }} />
          </IconButton>
          <Typography
            color="text.secondary"
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Tutor Link
          </Typography>
          {user ? (
            <Tooltip title="アカウント">
              <IconButton
                onClick={async () => {
                  await router.push(USER);
                }}
              >
                <AccountCircle sx={{ fontSize: 40 }} />
              </IconButton>
            </Tooltip>
          ) : (
            <Button
              sx={{ color: '#f0f8ff' }}
              variant="outlined"
              startIcon={<PermIdentityOutlined />}
              onClick={async () => {
                await router.push(LOGIN);
              }}
            >
              サインイン
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <SwipeableDrawer
        sx={{
          width: 280,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 280,
          },
        }}
        anchor="left"
        open={openDrawer}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <Stack sx={{ marginX: 3 }} direction="row" alignItems="center">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(false)}
          >
            <Menu sx={{ fontSize: 35 }} />
          </IconButton>
          <Typography color="text.secondary" variant="h6">
            Tutor Link
          </Typography>
        </Stack>
        <Stack
          spacing={1}
          sx={{ marginX: 3 }}
          direction="column"
          alignItems="flex-start"
        >
          {user ? (
            user.role === 'STUDENT' && (
              <>
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <School sx={{ color: 'text.secondary' }} />
                  <Button
                    sx={{ color: 'black', fontSize: 20 }}
                    component={Link}
                    href={SEARCHTEACHER}
                  >
                    先生を探す
                  </Button>
                </Stack>
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <AssignmentInd sx={{ color: 'text.secondary' }} />
                  <Button
                    sx={{ color: 'black', fontSize: 20 }}
                    component={Link}
                    href={SEARCHSTUDENT}
                  >
                    生徒を探す
                  </Button>
                </Stack>
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Description sx={{ color: 'text.secondary' }} />
                  <Button
                    sx={{ color: 'black', fontSize: 20 }}
                    component={Link}
                    href={ASSIGNMENT}
                  >
                    課題管理
                  </Button>
                </Stack>
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Message sx={{ color: 'text.secondary' }} />
                  <Button
                    sx={{ color: 'text.secondary', fontSize: 20 }}
                    component={Link}
                    href={CHAT}
                  >
                    チャット
                  </Button>
                </Stack>
              </>
            )
          ) : (
            <Stack direction="row" justifyContent="center" alignItems="center">
              <School sx={{ color: 'text.secondary' }} />
              <Button
                sx={{ color: 'text.secondary', fontSize: 20 }}
                component={Link}
                href={SEARCHTEACHER}
              >
                先生を探す
              </Button>
            </Stack>
          )}

          {user ? (
            user.role === 'TEACHER' && (
              <>
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <AssignmentInd
                    sx={{ fontSize: 30, color: 'text.secondary' }}
                  />
                  <Button
                    sx={{ color: 'text.secondary', fontSize: 20 }}
                    component={Link}
                    href={SEARCHSTUDENT}
                  >
                    生徒を探す
                  </Button>
                </Stack>
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Description sx={{ color: 'text.secondary' }} />
                  <Button
                    sx={{
                      color: 'text.secondary',
                      fontSize: 20,
                    }}
                    component={Link}
                    href={ASSIGNMENT}
                  >
                    課題管理
                  </Button>
                </Stack>
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Message sx={{ color: 'text.secondary' }} />
                  <Button
                    sx={{
                      color: 'text.secondary',
                      fontSize: 20,
                    }}
                    component={Link}
                    href={CHAT}
                  >
                    チャット
                  </Button>
                </Stack>
              </>
            )
          ) : (
            <Stack direction="row" justifyContent="center" alignItems="center">
              <AssignmentInd sx={{ color: 'text.secondary' }} />
              <Button
                sx={{
                  fontSize: 20,
                  color: 'text.secondary',
                }}
                component={Link}
                href={SEARCHSTUDENT}
              >
                生徒を探す
              </Button>
            </Stack>
          )}
          {!user && (
            <>
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <HowToReg sx={{ color: 'text.secondary' }} />
                <Button
                  sx={{ color: 'text.secondary', fontSize: 20 }}
                  component={Link}
                  href={REGISTER}
                >
                  会員登録
                </Button>
              </Stack>
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Login sx={{ color: 'text.secondary' }} />
                <Button
                  sx={{ color: 'text.secondary', fontSize: 20 }}
                  component={Link}
                  href={LOGIN}
                >
                  ログイン
                </Button>
              </Stack>
            </>
          )}
        </Stack>
      </SwipeableDrawer>
    </Box>
  );
}
