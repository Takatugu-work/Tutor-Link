import { useMutation } from '@blitzjs/rpc';
import { zodResolver } from '@hookform/resolvers/zod';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { AuthenticationError } from 'blitz';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import login from 'src/auth/mutations/login';
import Layout from 'src/core/layouts/Layout';
import { z } from 'zod';

const formSchema = z.object({
  email: z.string().email('無効なメールアドレスです'),
  password: z
    .string()
    .min(8, 'パスワードは8文字以上で入力してください')
    .regex(
      /^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,100}$/i,
      'パスワードは半角英数字混合で入力してください'
    ),
});

export default function Login() {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loginMutation, { isLoading: loginMutationProgress }] =
    useMutation(login);

  const isLoading = loginMutationProgress;

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const sendUserNameAndPassword: SubmitHandler<
    z.infer<typeof formSchema>
  > = async (data) => {
    try {
      await loginMutation(data);
      return router.push('/');
    } catch (error: any) {
      if (error instanceof AuthenticationError) {
        enqueueSnackbar('メールアドレスまたはパスワードが不正です', {
          variant: 'error',
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'center',
          },
        });
      } else {
        enqueueSnackbar(
          '申し訳ございません、予期せぬエラーが生じた為再度お試しください',
          {
            variant: 'error',
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'center',
            },
          }
        );
      }
    }
  };
  return (
    <Layout>
      <Box sx={{ width: '540px', margin: '0 auto' }}>
        <Typography textAlign="center" variant="h5" my={3}>
          ログイン
        </Typography>
        <Box
          sx={{
            border: 1,
            borderColor: 'grey.500',
            borderRadius: '20px',
            padding: 3,
          }}
        >
          <form onSubmit={handleSubmit(sendUserNameAndPassword)}>
            <Stack spacing={2}>
              <TextField
                label="メールアドレス"
                variant="outlined"
                error={!!errors.email}
                helperText={errors.email && errors.email.message}
                {...register('email')}
              />
              <FormControl sx={{ m: 1 }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  パスワード
                </InputLabel>
                <OutlinedInput
                  type={showPassword ? 'text' : 'password'}
                  {...register('password')}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  error={!!errors.password}
                  label="パスワード"
                />
                {errors.password && (
                  <FormHelperText error>
                    {errors.password.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Stack>
            <Button
              sx={{ mt: '20px' }}
              variant="contained"
              type="submit"
              fullWidth
            >
              送信
            </Button>
          </form>
        </Box>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>
    </Layout>
  );
}
