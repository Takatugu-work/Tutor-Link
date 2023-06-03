import { useMutation, useQuery } from '@blitzjs/rpc';
import { AccountCircle, Delete } from '@mui/icons-material';
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Divider,
  LinearProgress,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import Layout from 'src/core/layouts/Layout';
import UpdateUserDataAccordingToRole from 'src/server/resolver/mutations/user/updateUser.resolver';
import getUserDataAccordingToRole from 'src/server/resolver/queries/user/getUser.resolver';
import EditUserDataDialog from './components/EditUserDialog';
import { useSnackbar } from 'notistack';
import logout from 'src/auth/mutations/logout';
import { useRouter } from 'next/router';

export default function User() {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const [userMasterData, { isLoading: userMasterDataProgress, refetch }] =
    useQuery(getUserDataAccordingToRole, null, { suspense: false });
  const [
    updateUerInformationAccordingToRoleMutation,
    { isLoading: updateUerInformationAccordingToRoleProgress },
  ] = useMutation(UpdateUserDataAccordingToRole);
  const [isEditUserDialogOpen, setIsEditUserDialogOpen] =
    useState<boolean>(false);
  const [
    logoutMutation,
    { isLoading: logoutMutationProgress, isSuccess: isULogoutUserSuccess },
  ] = useMutation(logout);

  if (!userMasterData || userMasterDataProgress) return <LinearProgress />;
  return (
    <Layout>
      <Box mb={10}>
        <Box mt={10} mb={5}>
          <Stack alignItems="center">
            <Box>
              <AccountCircle sx={{ fontSize: 80 }} />
            </Box>
            <Box>
              <>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 750 }} aria-label="simple table">
                    <TableBody>
                      <TableRow
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <TableCell align="center">ユーザー名</TableCell>
                        <TableCell align="center">
                          {userMasterData.name}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="center">お住まいの都道府県</TableCell>
                        <TableCell align="center">
                          {userMasterData.prefecture}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="center">学年</TableCell>
                        <TableCell align="center">
                          {userMasterData.school}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="center">年齢</TableCell>
                        <TableCell align="center">
                          {userMasterData.age}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="center">性別</TableCell>
                        <TableCell align="center">
                          {userMasterData.gender === 'MAN' ? '男性' : '女性'}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="center">受講したい科目</TableCell>
                        <TableCell align="center">
                          {userMasterData.subject.join(' ')}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="center">
                          先生への要望やコメント
                        </TableCell>
                        <TableCell align="center">
                          {userMasterData.comment}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            </Box>
          </Stack>
        </Box>
        <Stack direction="row" justifyContent="center" spacing={5}>
          <Button
            variant="outlined"
            onClick={async () => {
              try {
                await logoutMutation();
                enqueueSnackbar('ログアウトしました', {
                  variant: 'success',
                  anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center',
                  },
                });
                if (isULogoutUserSuccess) {
                  void router.push('/');
                }
              } catch (error: any) {
                enqueueSnackbar(
                  'ログアウトに失敗しました。もう一度お試しください',
                  {
                    variant: 'error',
                    anchorOrigin: {
                      vertical: 'bottom',
                      horizontal: 'center',
                    },
                  }
                );
              }
            }}
          >
            ログアウト
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              setIsEditUserDialogOpen(true);
            }}
          >
            アカウントを更新する
          </Button>
        </Stack>
      </Box>
      <Box sx={{ maxWidth: '60%', margin: '0 auto' }}>
        <Divider />
        <Typography sx={{ lineHeight: 4 }} variant="h6">
          アカウントの削除
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          アカウントを削除すると二度と復元できません。
          <br />
          よろしければ削除ボタンを押してください。
        </Typography>
        <Button
          sx={{ marginTop: '30px' }}
          variant="outlined"
          color="error"
          onClick={() => {
            enqueueSnackbar('この機能は未実装です', {
              variant: 'error',
              anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'center',
              },
            });
          }}
        >
          <Delete color="error" />
          アカウントを削除する
        </Button>
      </Box>
      <EditUserDataDialog
        open={isEditUserDialogOpen}
        userData={userMasterData}
        onClose={async () => {
          setIsEditUserDialogOpen(false);
          await refetch();
        }}
        onUpdate={(data) => updateUerInformationAccordingToRoleMutation(data)}
      />
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={
          updateUerInformationAccordingToRoleProgress ||
          logoutMutationProgress ||
          isULogoutUserSuccess
        }
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Layout>
  );
}
