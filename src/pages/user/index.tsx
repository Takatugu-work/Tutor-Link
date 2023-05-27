import { useQuery } from '@blitzjs/rpc';
import { AccountCircle } from '@mui/icons-material';
import {
  Box,
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
import getStudentData from '../../server/resolver/queries/student/student.resolver';

export default function User() {
  const [studentMasterData, { isLoading: studentMasterDataProgress }] =
    useQuery(getStudentData, null, { suspense: false });

  if (!studentMasterData) return <LinearProgress />;
  return (
    <Box>
      <Stack>
        <Box>
          <AccountCircle sx={{ fontSize: 80 }} />
        </Box>
        <Box>
          <Typography>プロフィール</Typography>
          <>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableBody>
                  <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      ユーザー名
                    </TableCell>
                    <TableCell align="right">
                      {studentMasterData.name}
                    </TableCell>
                    <TableCell align="right">お住まいの都道府県</TableCell>
                    <TableCell align="right">
                      {studentMasterData.prefecture}
                    </TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </>
        </Box>
      </Stack>
    </Box>
  );
}
