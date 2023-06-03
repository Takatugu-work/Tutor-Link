import { useQuery } from '@blitzjs/rpc';
import {
  CurrencyYen,
  ImportContacts,
  LocationOn,
  Person,
  School,
} from '@mui/icons-material';
import {
  Backdrop,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  LinearProgress,
  Stack,
  Typography,
} from '@mui/material';
import { Fragment, useState } from 'react';
import Layout from 'src/core/layouts/Layout';
import getTeacher from 'src/server/resolver/queries/teacher/getTeacher.resolver';
import SearchDialog from './components/SearchDialog';
import SearchResult from './searchResult';

const borderStyle = {
  bgcolor: 'background.paper',
  m: 1,
  border: 1,
};

export default function SearchTeacher() {
  const [searchTagValue, setSearchTagValue] = useState<string>('');
  const [searchValue, setSearchValue] = useState<string | Array<string>>();
  const [searchDialogState, setSearchDialogState] = useState<
    { open: false } | { open: true; searchTarget: string }
  >({ open: false });
  const [getUserQuery, { isLoading }] = useQuery(
    getTeacher,
    {
      searchColumn: searchTagValue.toString(),
      searchColumnValue: searchValue ?? '',
    },
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
            if (newValue === searchTagValue) {
              setSearchTagValue('');
            } else {
              setSearchDialogState({ open: true, searchTarget: newValue });
            }
          }}
        >
          <BottomNavigationAction label="学歴" icon={<School />} />
          <BottomNavigationAction label="科目" icon={<ImportContacts />} />
          <BottomNavigationAction label="地域" icon={<LocationOn />} />
          <BottomNavigationAction label="授業料" icon={<CurrencyYen />} />
          <BottomNavigationAction label="性別" icon={<Person />} />
        </BottomNavigation>
      </Box>
      <Box mt={5}>
        <Stack
          direction="row"
          flexWrap="wrap"
          justifyContent="center"
          useFlexGap
          sx={{ maxWidth: 1800, margin: '0 auto' }}
          spacing={5}
        >
          {getUserQuery.map((teacher) => (
            <Fragment key={teacher.id}>
              <Card sx={{ width: 425, backgroundColor: '#E8FBFF' }}>
                <CardContent>
                  <Typography variant="h6" textAlign="center">
                    {teacher.name}
                  </Typography>
                  <Stack direction="row" sx={{ mt: 5 }} spacing={3}>
                    <Stack direction="row" spacing={2}>
                      <School />
                      <Typography>{teacher.school}</Typography>
                    </Stack>
                    <Stack direction="row" spacing={2}>
                      <ImportContacts />
                      <Typography>{teacher.subject.join(' ')}</Typography>
                    </Stack>
                    <Stack direction="row" spacing={2}>
                      <LocationOn />
                      <Typography>{teacher.prefecture}</Typography>
                    </Stack>
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
      </Box>
      {searchDialogState.open && (
        <SearchDialog
          setSearchValue={setSearchValue}
          setSearchTag={setSearchTagValue}
          onClose={() => {
            setSearchDialogState({ open: false });
          }}
          value={searchDialogState.searchTarget}
        />
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
