import { useMutation, useQuery } from '@blitzjs/rpc';
import { zodResolver } from '@hookform/resolvers/zod';
import { AccountCircle, Add } from '@mui/icons-material';
import {
  Backdrop,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  LinearProgress,
  List,
  ListItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { addDays, format } from 'date-fns';
import { useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Layout from 'src/core/layouts/Layout';
import { useCurrentUser } from 'src/hooks/useCurrentUser';
import createAssignment from 'src/server/resolver/mutations/assignment/createAssignment.resolver';
import getAssignment from 'src/server/resolver/queries/assignment/getAssignment.resolver';
import { z } from 'zod';

function getListOfWeeks(): Array<string> {
  const weeks = ['日', '月', '火', '水', '木', '金', '土'];
  const weeksListFromToday: string[] = [];
  const currentDate = new Date();

  for (var i = 0; i < 7; i++) {
    var startOfWeek = Number((currentDate.getDay() + i) % 7);
    weeksListFromToday.push(weeks[startOfWeek]!);
  }

  return weeksListFromToday;
}

const formSchema = z.object({
  title: z.string(),
  deadline: z.date().transform((value) => format(value, 'yyyy/MM/dd')),
  content: z.string(),
});

export default function AssignmentPage() {
  const authorizedUser = useCurrentUser();
  const thisMonthAndYear = format(new Date(), 'MM月 yyyy');
  const [openAssignmentDialog, setOpenAssignmentDialog] = useState(false);
  const [assignmentDateForDialogState, setAssignmentDateForDialogState] =
    useState<string>('');

  const { register, handleSubmit, control, formState } = useForm<
    z.infer<typeof formSchema>
  >({ resolver: zodResolver(formSchema) });
  const [getAssignmentQuery, { isLoading: getAssignmentQueryProgress }] =
    useQuery(getAssignment, null, { suspense: false });
  const [
    createAssignmentMutation,
    { isLoading: createAssignmentMutationProgress },
  ] = useMutation(createAssignment);
  const assignmentMapByDate = useMemo(() => {
    getAssignmentQuery?.reduce((map, cur) => {
      const list: Object[] = [];
      if (map.get(cur.deadline)) {
        list.push(cur);
        return map.set(cur.deadline, list);
      }
      list.push(cur);
      return map.set(cur.deadline, list);
    }, new Map());
  }, []);

  const isLoading =
    createAssignmentMutationProgress || getAssignmentQueryProgress;

  if (!authorizedUser) {
    return <LinearProgress />;
  }

  return (
    <Layout>
      <Box sx={{ width: 1400, margin: '0 auto' }}>
        <Typography sx={{ marginTop: 3 }} variant="h4">
          {thisMonthAndYear}
        </Typography>
        <Stack
          sx={{ marginY: 2, marginX: 3 }}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          {getListOfWeeks().map((week, index) => {
            return (
              <Stack key={index}>
                <Typography textAlign="center">{week}</Typography>
                <Typography textAlign="center">
                  {new Date().getDate() + index}
                </Typography>
              </Stack>
            );
          })}
        </Stack>
        <Divider />
        <Box mt={4}>
          <Typography variant="h5">期限切れ</Typography>
        </Box>
        <Box mt={4}>
          <Typography variant="h5">今後の予定</Typography>
          <Box mt={3}>
            {getListOfWeeks().map((week, index) => {
              return (
                <Stack sx={{ mb: 5 }} key={index}>
                  <Typography variant="h6" color="text.secondary">
                    {format(addDays(new Date(), index), 'MM月dd日')}・{week}曜日
                  </Typography>
                  <Divider />
                  <List>
                    <ListItem>
                      <Stack>
                        <Stack
                          direction="row"
                          justifyContent="center"
                          alignItems="center"
                        >
                          <Checkbox size="medium" />
                          <Typography variant="h6">
                            英語ワーク５ページ
                          </Typography>
                          <Stack ml={2} direction="row">
                            <AccountCircle />
                            <Typography>佐藤太郎 先生</Typography>
                          </Stack>
                        </Stack>
                        <Typography variant="subtitle2" color="text.secondary">
                          コメント：
                        </Typography>
                      </Stack>
                    </ListItem>
                    <Divider />
                  </List>
                  {authorizedUser.role === 'TEACHER' && (
                    <Button
                      sx={{ width: 200, mt: 1 }}
                      variant="outlined"
                      startIcon={<Add />}
                      onClick={() => {
                        setOpenAssignmentDialog(true);
                        setAssignmentDateForDialogState(
                          format(addDays(new Date(), index), 'yyyy/MM/dd')
                        );
                      }}
                    >
                      課題を追加する
                    </Button>
                  )}
                </Stack>
              );
            })}
          </Box>
        </Box>
      </Box>
      {openAssignmentDialog && (
        <Dialog open fullWidth>
          <DialogTitle>課題を追加する</DialogTitle>
          <DialogContent>
            <Stack mt={3} spacing={3}>
              <TextField {...register('title')} label="タイトル" />
              <Controller
                control={control}
                name="deadline"
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    value={new Date(assignmentDateForDialogState)}
                  />
                )}
              />
              <TextField {...register('content')} label="コメント" />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button
              variant="outlined"
              onClick={() => {
                setOpenAssignmentDialog(false);
              }}
            >
              キャンセル
            </Button>
            <Button
              onClick={handleSubmit(async (data) => {
                console.log(data);
                await createAssignmentMutation({
                  userId: authorizedUser.id,
                  studentId: '266f0c8f-a1de-4983-86e6-603501acbb29',
                  title: data.title,
                  content: data.content,
                  deadline: data.deadline,
                  isDone: false,
                });
              })}
              // disabled={!formState.isValid}
              variant="contained"
            >
              送信
            </Button>
          </DialogActions>
        </Dialog>
      )}
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Layout>
  );
}
