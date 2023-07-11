import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import { Student, Teacher } from '@prisma/client';
import { useSnackbar } from 'notistack';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  gender: z.string(),
  name: z.string(),
  age: z.string(),
  prefecture: z.string(),
  school: z.string(),
  subject: z.array(z.string()),
  comment: z.string().nullable(),
});

export default function EditUserDataDialog(props: {
  open: boolean;
  userData: Student | Teacher;
  onClose(): void;
  onUpdate: (data: z.infer<typeof formSchema>) => Promise<boolean>;
}) {
  const { userData: user } = props;
  const { enqueueSnackbar } = useSnackbar();
  const { register, handleSubmit, control } = useForm<
    z.infer<typeof formSchema>
  >({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user.name,
      age: user.age,
      gender: user.gender,
      prefecture: user.prefecture,
      school: user.school,
      subject: user.subject,
      comment: user.comment,
    },
  });

  const updateUerInformationAccordingToRole = handleSubmit(async (data) => {
    try {
      await props.onUpdate(data);
      enqueueSnackbar('登録情報を更新しました', {
        variant: 'success',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
      });
      props.onClose();
    } catch (error: any) {
      enqueueSnackbar(
        '予期せぬエラーが発生しました。お手数ですが再度お試しください',
        {
          variant: 'error',
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'center',
          },
        }
      );
    }
  });
  return (
    <>
      <Dialog open={props.open} fullWidth>
        <DialogTitle>アカウント情報を編集</DialogTitle>
        <DialogContent>
          <form>
            <Box mt={3}>
              <Stack spacing={2}>
                <TextField {...register('name')} label="ユーザー名" />
                <TextField {...register('age')} label="年齢" />
                <Controller
                  name="gender"
                  control={control}
                  render={({ field, fieldState }) => (
                    <FormControl fullWidth>
                      <InputLabel>性別</InputLabel>
                      <Select label="性別" {...field}>
                        <MenuItem value={'MAN'}>男性</MenuItem>
                        <MenuItem value={'WOMEN'}>女性</MenuItem>
                      </Select>
                      <FormHelperText>
                        {fieldState.error?.message}
                      </FormHelperText>
                    </FormControl>
                  )}
                />
                <Controller
                  name="prefecture"
                  control={control}
                  render={({ field, fieldState }) => (
                    <FormControl fullWidth>
                      <InputLabel>都道府県</InputLabel>
                      <Select {...field} label="都道府県">
                        <MenuItem value="北海道">北海道</MenuItem>
                        <MenuItem value="青森県">青森県</MenuItem>
                        <MenuItem value="岩手県">岩手県</MenuItem>
                        <MenuItem value="宮城県">宮城県</MenuItem>
                        <MenuItem value="秋田県">秋田県</MenuItem>
                        <MenuItem value="山形県">山形県</MenuItem>
                        <MenuItem value="福島県">福島県</MenuItem>
                        <MenuItem value="茨城県">茨城県</MenuItem>
                        <MenuItem value="栃木県">栃木県</MenuItem>
                        <MenuItem value="群馬県">群馬県</MenuItem>
                        <MenuItem value="埼玉県">埼玉県</MenuItem>
                        <MenuItem value="千葉県">千葉県</MenuItem>
                        <MenuItem value="東京都">東京都</MenuItem>
                        <MenuItem value="神奈川県">神奈川県</MenuItem>
                        <MenuItem value="新潟県">新潟県</MenuItem>
                        <MenuItem value="富山県">富山県</MenuItem>
                        <MenuItem value="石川県">石川県</MenuItem>
                        <MenuItem value="福井県">福井県</MenuItem>
                        <MenuItem value="山梨県">山梨県</MenuItem>
                        <MenuItem value="長野県">長野県</MenuItem>
                        <MenuItem value="岐阜県">岐阜県</MenuItem>
                        <MenuItem value="静岡県">静岡県</MenuItem>
                        <MenuItem value="愛知県">愛知県</MenuItem>
                        <MenuItem value="三重県">三重県</MenuItem>
                        <MenuItem value="滋賀県">滋賀県</MenuItem>
                        <MenuItem value="京都府">京都府</MenuItem>
                        <MenuItem value="大阪府">大阪府</MenuItem>
                        <MenuItem value="兵庫県">兵庫県</MenuItem>
                        <MenuItem value="奈良県">奈良県</MenuItem>
                        <MenuItem value="和歌山県">和歌山県</MenuItem>
                        <MenuItem value="鳥取県">鳥取県</MenuItem>
                        <MenuItem value="島根県">島根県</MenuItem>
                        <MenuItem value="岡山県">岡山県</MenuItem>
                        <MenuItem value="広島県">広島県</MenuItem>
                        <MenuItem value="山口県">山口県</MenuItem>
                        <MenuItem value="徳島県">徳島県</MenuItem>
                        <MenuItem value="香川県">香川県</MenuItem>
                        <MenuItem value="愛媛県">愛媛県</MenuItem>
                        <MenuItem value="高知県">高知県</MenuItem>
                        <MenuItem value="福岡県">福岡県</MenuItem>
                        <MenuItem value="佐賀県">佐賀県</MenuItem>
                        <MenuItem value="長崎県">長崎県</MenuItem>
                        <MenuItem value="熊本県">熊本県</MenuItem>
                        <MenuItem value="大分県">大分県</MenuItem>
                        <MenuItem value="宮崎県">宮崎県</MenuItem>
                        <MenuItem value="鹿児島県">鹿児島県</MenuItem>
                        <MenuItem value="沖縄県">沖縄県</MenuItem>
                      </Select>
                      <FormHelperText>
                        {fieldState.error?.message}
                      </FormHelperText>
                    </FormControl>
                  )}
                />
                <Controller
                  name="school"
                  control={control}
                  render={({ field, fieldState }) => (
                    <FormControl fullWidth>
                      <InputLabel>学校</InputLabel>
                      <Select {...field} label="学校">
                        <MenuItem value={'小学１年'}>小学１年</MenuItem>
                        <MenuItem value={'小学２年'}>小学２年</MenuItem>
                        <MenuItem value={'小学３年'}>小学３年</MenuItem>
                        <MenuItem value={'小学４年'}>小学４年</MenuItem>
                        <MenuItem value={'小学５年'}>小学５年</MenuItem>
                        <MenuItem value={'小学６年'}>小学６年</MenuItem>
                        <MenuItem value={'中学１年'}>中学１年</MenuItem>
                        <MenuItem value={'中学２年'}>中学２年</MenuItem>
                        <MenuItem value={'中学３年'}>中学３年</MenuItem>
                        <MenuItem value={'高校１年'}>高校１年</MenuItem>
                        <MenuItem value={'高校２年'}>高校２年</MenuItem>
                        <MenuItem value={'高校３年'}>高校３年</MenuItem>
                      </Select>
                      <FormHelperText>
                        {fieldState.error?.message}
                      </FormHelperText>
                    </FormControl>
                  )}
                />
                <Controller
                  name="subject"
                  control={control}
                  render={({ field, fieldState }) => (
                    <FormControl fullWidth>
                      <InputLabel>科目</InputLabel>
                      <Select {...field} label="科目" multiple>
                        <MenuItem value={'国語'}>国語</MenuItem>
                        <MenuItem value={'数学'}>数学</MenuItem>
                        <MenuItem value={'理科'}>理科</MenuItem>
                        <MenuItem value={'社会'}>社会</MenuItem>
                        <MenuItem value={'英語'}>英語</MenuItem>
                      </Select>
                      <FormHelperText>
                        {fieldState.error?.message}
                      </FormHelperText>
                    </FormControl>
                  )}
                />
                <TextField
                  {...register('comment')}
                  label="教師への要望や自己紹介"
                  multiline
                  rows={4}
                />
              </Stack>
            </Box>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => {
              props.onClose();
            }}
          >
            キャンセル
          </Button>
          <Button
            variant="contained"
            onClick={updateUerInformationAccordingToRole}
          >
            送信する
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
