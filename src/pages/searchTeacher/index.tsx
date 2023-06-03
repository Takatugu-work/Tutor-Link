import { useQuery } from '@blitzjs/rpc';
import {
  CurrencyYen,
  ImportContacts,
  LocationOn,
  Person,
  School,
} from '@mui/icons-material';
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Button,
  Card,
  CardContent,
  LinearProgress,
  Stack,
  Typography,
} from '@mui/material';
import { Fragment, useState } from 'react';
import Layout from 'src/core/layouts/Layout';
import getTeacher from 'src/server/resolver/queries/teacher/getTeacher.resolver';
import SearchDialog from './components/SearchDialog';

const borderStyle = {
  bgcolor: 'background.paper',
  m: 1,
  border: 1,
};

export default function SearchTeacher() {
  const [searchTagValue, setSearchTagValue] = useState<string>('');
  const [getUserQuery, { isLoading: getUserQueryProgress }] = useQuery(
    getTeacher,
    null,
    { suspense: false }
  );
  if (!getUserQuery) return <LinearProgress />;

  return (
    <Layout>
      <Box
        sx={{
          ...borderStyle,
          borderColor: 'primary.main',
          width: '800px',
          margin: '0 auto',
        }}
      >
        <BottomNavigation
          showLabels
          value={searchTagValue}
          onChange={(_, newValue: string) => {
            setSearchTagValue(newValue);
          }}
        >
          <BottomNavigationAction
            label="学歴"
            icon={<School />}
            onClick={(e) => {
              e.preventDefault();
              <SearchDialog value="school" />;
            }}
          />
          <BottomNavigationAction label="科目" icon={<ImportContacts />} />
          <BottomNavigationAction label="地域" icon={<LocationOn />} />
          <BottomNavigationAction label="授業料" icon={<CurrencyYen />} />
          <BottomNavigationAction label="性別" icon={<Person />} />
        </BottomNavigation>
      </Box>
      <Stack
        direction="row"
        flexWrap="wrap"
        justifyContent="center"
        useFlexGap
        sx={{ maxWidth: 1800, mt: 10 }}
        spacing={5}
      >
        {getUserQuery.map((teacher) => (
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
      </Stack>
    </Layout>
  );
}
