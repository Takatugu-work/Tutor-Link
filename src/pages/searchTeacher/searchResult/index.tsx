import { useQuery } from '@blitzjs/rpc';
import { ImportContacts, School } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardContent,
  LinearProgress,
  Stack,
  Typography,
} from '@mui/material';
import { Fragment } from 'react';
import getTeacher from 'src/server/resolver/queries/teacher/getTeacher.resolver';

export default function SearchResult(props: {
  searchTag: string;
  searchValue: string;
}) {
  const [
    getTeacherSearchResultQuery,
    { isLoading: getTeacherSearchResultQueryProgress },
  ] = useQuery(
    getTeacher,
    {
      searchColumn: props.searchTag,
      searchColumnValue: props.searchValue,
    },
    { suspense: false }
  );
  if (!getTeacherSearchResultQuery) return <LinearProgress />;

  return (
    <>
      {getTeacherSearchResultQuery.map((teacher) => (
        <Fragment key={teacher.id}>
          <Card sx={{ width: 425, backgroundColor: '#E8FBFF' }}>
            <CardContent>
              <Typography variant="h6" textAlign="center">
                {teacher.name}
              </Typography>
              <Stack sx={{ mt: 5 }} direction="row" spacing={2}>
                <School />
                <Typography>{teacher.school}</Typography>
              </Stack>
              <Stack direction="row" spacing={2}>
                <ImportContacts />
                <Typography>{teacher.subject.join(' ')}</Typography>
              </Stack>
              <Box mt={5} sx={{ textAlign: 'center' }}>
                <Button variant="contained" sx={{ textAlign: 'center' }}>
                  先生の詳細を見る
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Fragment>
      ))}
    </>
  );
}
