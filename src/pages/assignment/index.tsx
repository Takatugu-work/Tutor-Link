import { AccountCircle, Add } from '@mui/icons-material';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  List,
  ListItem,
  Stack,
  Typography,
} from '@mui/material';
import { format } from 'date-fns';
import Layout from 'src/core/layouts/Layout';

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
            <Stack>
              <Typography variant="h6" color="text.secondary">
                06月05日・今日・水曜日
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
                      <Typography variant="h6">英語ワーク５ページ</Typography>
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
              <Button variant="outlined" startIcon={<Add />}>
                Delete
              </Button>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
}
