import { useMutation } from '@blitzjs/rpc';
import { AccountCircle, Add } from '@mui/icons-material';
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  List,
  ListItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { addDays, format } from 'date-fns';
import { useState } from 'react';
import Layout from 'src/core/layouts/Layout';
import createAssignment from 'src/server/resolver/mutations/assignment/createAssignment.resolver';

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

export default function AssignmentPage() {
  const thisMonthAndYear = format(new Date(), 'MM月 yyyy');
  const [openAssignmentDialog, setOpenAssignmentDialog] = useState(false);
  const [assignmentDialogState, setAssignmentDialogState] = useState<{
    title: string;
    content: string;
    deadline: string;
    teacherId: string;
    studentId: string;
  }>();
  const [
    createAssignmentMutation,
    { isLoading: createAssignmentMutationProgress },
  ] = useMutation(createAssignment);

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
                  <Button
                    sx={{ width: 200, mt: 1 }}
                    variant="outlined"
                    startIcon={<Add />}
                    onClick={() => {
                      setOpenAssignmentDialog(true);
                      setAssignmentDialogState({
                        deadline: format(
                          addDays(new Date(), index),
                          'yyyy/MM/dd'
                        ),
                        title: '',
                        content: '',
                        teacherId: '',
                        studentId: '',
                      });
                    }}
                  >
                    課題を追加する
                  </Button>
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
            <Stack spacing={3}>
              <TextField
                value={assignmentDialogState?.title ?? ''}
                label="タイトル"
              />
              <DatePicker
                value={
                  assignmentDialogState?.deadline
                    ? new Date(assignmentDialogState?.deadline)
                    : new Date()
                }
                format="yyyy/MM/dd"
              />
              <TextField label="コメント" />
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
              disabled={Boolean(assignmentDialogState === undefined)}
              variant="contained"
            >
              送信
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Layout>
  );
}
